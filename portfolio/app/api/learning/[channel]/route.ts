/* eslint-disable no-undef -- the inherited Babel parser does not apply TypeScript or web-runtime globals. */
import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 64 * 1024;
const UPSTREAM_TIMEOUT_MS = 30_000;

const lumiereWebhooks = {
  "lumiere-chat": "https://shantanu1990.app.n8n.cloud/webhook/lumiere-chat",
  "lumiere-lead": "https://shantanu1990.app.n8n.cloud/webhook/lumiere-lead",
} as const;

type LumiereChannel = keyof typeof lumiereWebhooks;

function isLumiereChannel(channel: string): channel is LumiereChannel {
  return channel in lumiereWebhooks;
}

const noStoreHeaders = {
  "Cache-Control": "no-store",
} as const;

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...noStoreHeaders,
      Allow: "POST, OPTIONS",
    },
  });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ channel: string }> },
) {
  const { channel } = await context.params;

  if (!isLumiereChannel(channel)) {
    return NextResponse.json({ error: "Unknown AI course integration." }, { status: 404, headers: noStoreHeaders });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Expected application/json." }, { status: 415, headers: noStoreHeaders });
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413, headers: noStoreHeaders });
  }

  try {
    const upstream = await fetch(lumiereWebhooks[channel], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    const responseBody = await upstream.arrayBuffer();

    if (channel === "lumiere-chat" && !upstream.ok) {
      return NextResponse.json(
        { fallback: true, upstreamStatus: upstream.status },
        { status: 200, headers: noStoreHeaders },
      );
    }

    return new Response(responseBody, {
      status: upstream.status,
      headers: {
        ...noStoreHeaders,
        "Content-Type": upstream.headers.get("content-type") ?? "application/json; charset=utf-8",
      },
    });
  } catch {
    if (channel === "lumiere-chat") {
      return NextResponse.json({ fallback: true }, { status: 200, headers: noStoreHeaders });
    }
    return NextResponse.json(
      { error: "The AI course demo is temporarily unavailable." },
      { status: 502, headers: noStoreHeaders },
    );
  }
}
