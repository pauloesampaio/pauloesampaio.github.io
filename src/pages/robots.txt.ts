import { type APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response(`User-agent: *\nAllow: /`, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};