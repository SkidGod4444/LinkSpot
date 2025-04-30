import { Hono } from "hono";

const help = new Hono()

help.get("/", (c) => c.json({
    title: "Implementation Guide",
    message: "Implementing the NSL API is easy. Follow me on X: https://l.devwtf.in/x",
    docs: [
        {
            method: "POST",
            path: "/api/v1/subs/add",
            secure: true,
            username: process.env.AUTH_USERNAME,
            password: process.env.AUTH_PASSWORD,
            curl: `curl -X POST https://${process.env.DOMAIN}/api/v1/subs/add \
  -u "${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}" \
  -H "Content-Type: application/json" \
  -d '{"email": ["lol@gmail.com"]}'`,
            description: "This endpoint is used to subscribe to the newsletter. Make sure to provide the mentioned username and password in the header.",
        },
        {
            method: "GET",
            path: "/api/v1/subs",
            secure: true,
            username: process.env.AUTH_USERNAME,
            password: null,
            description: "This endpoint is used to get the list of subscribers. You are not trusted to access this endpoint.",
        },
        
    ]
}))

export default help;