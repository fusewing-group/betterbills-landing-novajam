import normalizeContentfulData from './normalizeContentfulData';

export async function getFooter(url: string) {
  if (process.env.DATA_SOURCE === 'CONTENTFUL') {
    try {
      const res = await fetch(
        `${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authenticate the request
            Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
          },
          // send the GraphQL query
          body: JSON.stringify({
            query: `
      query($url: String) {
        footerCollection(
          where: { 
            url: $url
          } 
        ) {
          items {
            url
            logo {
              sys {
                id
              }
              url
              title
              width
              height
              contentType
            }
            logoRedirect
            description
            copyright
            sns {
              linkedInUrl
              facebookUrl
              twitterUrl
              youtubeUrl
              instagramUrl
            }
            menuCollection (limit: 5) {
              items {
                title
                linksCollection (limit: 15) {
                  items {
                    sys {
                      id
                    }
                    text
                    openNewTab
                    url
                  }
                }
              }
            }
            backgroundColor
            backgroundImage {
              url
              title
              width
              height
              contentType
            }
            darkMode
          }
        }
      }
    `,
            variables: {
              url,
            },
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Failed to fetch Footer data: ${
            errorData.errors?.[0]?.message || res.statusText
          }`,
        );
      }

      const data = await res.json();
      const normalizedData = normalizeContentfulData(data.data);

      return normalizedData[0];
    } catch (error) {
      console.error(error);
      throw new Error(`An error occurred while fetching footer data: ${error}`);
    }
  }
}
