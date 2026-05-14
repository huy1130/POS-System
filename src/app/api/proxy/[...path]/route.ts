import { NextRequest, NextResponse } from "next/server";

// Server-side only — not exposed to the browser
const BACKEND_URL =
  process.env.API_BACKEND_URL ?? "http://localhost:3000";

async function proxyRequest(
  req: NextRequest,
  params: { path: string[] }
): Promise<NextResponse> {
  const path   = params.path.join("/");
  const search = req.nextUrl.search;
  const target = `${BACKEND_URL}/${path}${search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const auth = req.headers.get("authorization");
  if (auth) headers["authorization"] = auth;

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  try {
    const upstream = await fetch(target, {
      method:  req.method,
      headers,
      body,
    });

    const text = await upstream.text();

    return new NextResponse(text, {
      status:  upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { message: "Backend server is unreachable" },
      { status: 503 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}
export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}
export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}
export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}
export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return proxyRequest(req, params);
}
