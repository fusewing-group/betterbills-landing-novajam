import  { createClient } from "contentful-management";
import { type NextRequest } from "next/server";

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_PERSONAL_ACCESS_TOKEN ?? ""
})

export async function POST(req: NextRequest) {
  const reqBody = await req.json()
  // console.log("REQ", reqBody)
  for (const key in reqBody) {
    reqBody[key] = {
      'en-US': reqBody[key]
    }
  }
  return client
    .getSpace(process.env.CONTENTFUL_SPACE_ID ?? "")
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT ?? ""))
    .then((environment) => {
      return environment.createEntry("inquiryFormSubmission", {
        fields: { ...reqBody }
      });
    })
    .then((response) => {
      console.log("RES", response)
      return new Response(null, {
        status: 200,
      })
    })
    .catch((error) => {
      console.error("ERROR", error)
      return error
    });
}

// export async function GET(req: NextRequest) {
//   return new Response('Hello, Next.js!', {
//     status: 200,
//   })
// }
