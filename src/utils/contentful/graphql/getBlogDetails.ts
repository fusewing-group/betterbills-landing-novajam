import normalizeDataCollection from "./normalizeDataCollection"

export default async function getBlogDetails(slug: string) {
  const res = await fetch(`${process.env.CONTENTFUL_GRAPHQL_ENDPOINT}/${process.env.CONTENTFUL_SPACE_ID}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authenticate the request
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN}`,
    },
    // send the GraphQL query
    body: JSON.stringify({ query: `
      query($slug: String) {
        blogCollection(
          where: { 
            slug: $slug
          } 
        ) {
          items {
            sys {
              id
            }
            title
            slug
            media {
              title
              url
              width
              height
            }
            summary
            content {
              json
            }
            categoryCollection {
              items {
                title
                slug
              }
            }
            topics
            author {
              sys {
                id
              }
              fullName
              portrait {
                url
                title
                width
                height
              }
              role
            }
            metaTitle
            metaDescription
          }
        }
      }
    `, 
      variables: {
        slug
      },
    }),
  })

  const data = await res.json()
  if (res.status !== 200) {
    console.error(data)
    throw new Error("Failed to fetch Blog data. Error", data.error)
  }
  const normalizedData = normalizeDataCollection({...data.data})

  console.log(`BLOG DATA: ${JSON.stringify(normalizedData[0], null, 4)}`)
  return normalizedData[0]
}