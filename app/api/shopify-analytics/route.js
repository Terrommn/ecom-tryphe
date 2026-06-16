import { NextResponse } from "next/server";

const SHOP_DOMAIN = (process.env.SHOPIFY_STORE_DOMAIN ?? "")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const API_VERSION = "2024-04";

export async function POST(request) {
  if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_body" }, { status: 400 });
  }

  const { url, path, title, referrer, visitorId, sessionId } = body;

  // Shopify Storefront API → sendAnalytics mutation
  // Registra page views que aparecen en el panel Analytics > Visitas
  const mutation = /* GraphQL */ `
    mutation sendAnalytics($events: [AnalyticsEvent!]!, $analyticsConsent: AnalyticsConsent!) {
      sendAnalytics(events: $events, analyticsConsent: $analyticsConsent) {
        clientErrors {
          code
          message
        }
      }
    }
  `;

  const variables = {
    analyticsConsent: {
      analyticsAllowed: true,
      firstPartyMarketingAllowed: true,
    },
    events: [
      {
        type: "PAGE_VIEW",
        url: url ?? "",
        referrer: referrer ?? "",
        title: title ?? "",
        shopifyCookies: {
          _shopifyY: visitorId ?? "",
          _shopifyS: sessionId ?? "",
        },
      },
    ],
  };

  try {
    const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const data = await res.json();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json({ ok: false, reason: String(err) }, { status: 500 });
  }
}
