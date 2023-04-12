import { NextResponse } from "next/server";


export function middleware(req) {
  const credentials = req.headers.get("Authorization");
  if (!credentials) {
    return new Response("Access denied", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const [username, password] = Buffer.from(
    credentials.replace("Basic ", ""),
    "base64"
  )
    .toString()
    .split(":");

  // Replace these values with your own
  const USERNAME = process.env.USERNAME;
  const PASSWORD = process.env.PASSWORD;

  if (username !== USERNAME || password !== PASSWORD) {
    return new Response("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}
