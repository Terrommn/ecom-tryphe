import { GraphQLClient } from "graphql-request";

const API_VERSION = "2024-04";

function getClient() {
  let domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const tokenType = (process.env.SHOPIFY_STOREFRONT_TOKEN_TYPE || "public").toLowerCase();

  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    );
  }

  domain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  const authHeader =
    tokenType === "private"
      ? { "Shopify-Storefront-Private-Token": token }
      : { "X-Shopify-Storefront-Access-Token": token };

  if (process.env.NODE_ENV === "development") {
    console.log("[shopify] Endpoint:", endpoint, "| token:", tokenType);
  }

  return new GraphQLClient(endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
    },
  });
}

async function storefrontRequest(query, variables = {}) {
  const client = getClient();
  return client.request(query, variables);
}

const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id
    handle
    onlineStoreUrl
    title
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

const PRODUCTS_PAGE_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsPage($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...ProductCardFields
        }
      }
    }
  }
`;

/**
 * Fetch all products (paginated server-side). Stops at MAX_PRODUCTS if set.
 */
export async function getProducts() {
  const max = Number(process.env.MAX_PRODUCTS) || 500;
  const pageSize = 50;
  const all = [];
  let after = null;

  while (all.length < max) {
    const first = Math.min(pageSize, max - all.length);
    const data = await storefrontRequest(PRODUCTS_PAGE_QUERY, {
      first,
      after,
    });
    const conn = data.products;
    for (const edge of conn.edges) {
      all.push(edge.node);
    }
    if (!conn.pageInfo.hasNextPage || conn.edges.length === 0) break;
    after = conn.pageInfo.endCursor;
  }

  return all;
}

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      handle
      availableForSale
      productType
      tags
      options {
        name
        values
      }
      images(first: 20) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      metafields(identifiers: [
        { namespace: "custom", key: "material" },
        { namespace: "custom", key: "care" },
        { namespace: "custom", key: "specs" }
      ]) {
        namespace
        key
        value
        type
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            sku
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            image {
              url
              altText
              width
              height
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export async function getProductByHandle(handle) {
  const data = await storefrontRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.product ?? null;
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    discountCodes {
      code
      applicable
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
                onlineStoreUrl
              }
            }
          }
        }
      }
    }
  }
`;

const GET_CART_QUERY = `
  ${CART_FRAGMENT}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

export async function getCart(cartId) {
  const data = await storefrontRequest(GET_CART_QUERY, { cartId });
  return data.cart ?? null;
}

const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function createCart(lines = []) {
  const input =
    lines.length > 0
      ? {
          lines: lines.map((l) => ({
            merchandiseId: l.merchandiseId,
            quantity: l.quantity,
          })),
        }
      : {};
  const data = await storefrontRequest(CART_CREATE_MUTATION, { input });
  return {
    cart: data.cartCreate?.cart ?? null,
    userErrors: data.cartCreate?.userErrors ?? [],
  };
}

const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function addToCart(cartId, lines) {
  const data = await storefrontRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: lines.map((l) => ({
      merchandiseId: l.merchandiseId,
      quantity: l.quantity,
    })),
  });
  return {
    cart: data.cartLinesAdd?.cart ?? null,
    userErrors: data.cartLinesAdd?.userErrors ?? [],
  };
}

const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function updateCart(cartId, lines) {
  const data = await storefrontRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: lines.map((l) => ({
      id: l.id,
      quantity: l.quantity,
    })),
  });
  return {
    cart: data.cartLinesUpdate?.cart ?? null,
    userErrors: data.cartLinesUpdate?.userErrors ?? [],
  };
}

const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export async function removeCartLines(cartId, lineIds) {
  const data = await storefrontRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds,
  });
  return {
    cart: data.cartLinesRemove?.cart ?? null,
    userErrors: data.cartLinesRemove?.userErrors ?? [],
  };
}

/** Returns true when Storefront API env vars are set. */
export function isShopifyConfigured() {
  return !!(
    process.env.SHOPIFY_STORE_DOMAIN &&
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
}

const COLLECTIONS_FIRST_QUERY = `
  query CollectionsFirst($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

const COLLECTIONS_CATALOG_QUERY = `
  query CollectionsCatalog($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

const PRODUCTS_FIRST_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsFirst($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ProductCardFields
        }
      }
    }
  }
`;

async function storefrontRequestSafe(query, variables = {}) {
  if (!isShopifyConfigured()) return null;
  try {
    return await storefrontRequest(query, variables);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[shopify] storefrontRequestSafe:",
        err?.message ?? err,
        variables && Object.keys(variables).length
          ? `(variables: ${JSON.stringify(variables)})`
          : "",
      );
    }
    return null;
  }
}

/**
 * First N collections (for homepage). Returns [] if not configured or on error.
 */
export async function getCollectionsFirst(first = 4) {
  const data = await storefrontRequestSafe(COLLECTIONS_FIRST_QUERY, { first });
  if (!data?.collections?.edges?.length) return [];
  return data.collections.edges.map((e) => e.node);
}

/**
 * List collections for /collections index.
 */
export async function getCollectionsCatalog(first = 48) {
  const data = await storefrontRequestSafe(COLLECTIONS_CATALOG_QUERY, { first });
  if (!data?.collections?.edges?.length) return [];
  const HIDDEN_HANDLES = ["frontpage", "pagina-de-inicio"];
  return data.collections.edges
    .map((e) => e.node)
    .filter((c) => !HIDDEN_HANDLES.includes(c.handle));
}

/**
 * First N products (for homepage / carousels). Returns [] if not configured or on error.
 */
export async function getProductsFirst(first = 8) {
  const data = await storefrontRequestSafe(PRODUCTS_FIRST_QUERY, { first });
  if (!data?.products?.edges?.length) return [];
  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandleSafe(handle) {
  const data = await storefrontRequestSafe(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.product ?? null;
}

const COLLECTION_PAGE_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionPage(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      title
      descriptionHtml
      handle
      image {
        url
        altText
        width
        height
      }
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        filters {
          id
          label
          type
          values {
            id
            label
            count
          }
        }
        edges {
          cursor
          node {
            ...ProductCardFields
          }
        }
      }
    }
  }
`;

const SEARCH_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!, $after: String) {
    search(query: $query, first: $first, after: $after, types: PRODUCT) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ... on Product {
            ...ProductCardFields
          }
        }
      }
    }
  }
`;

const CART_DISCOUNT_CODES_UPDATE = `
  ${CART_FRAGMENT}
  mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

/**
 * Collection with products (paginated). Returns null if missing or error.
 */
export async function getCollectionPage({
  handle,
  first = 24,
  after = null,
  sortKey = "MANUAL",
  reverse = false,
  filters = [],
}) {
  const fl = Array.isArray(filters) ? filters : [];
  const data = await storefrontRequestSafe(COLLECTION_PAGE_QUERY, {
    handle,
    first,
    after,
    sortKey,
    reverse,
    filters: fl.length ? fl : undefined,
  });
  return data?.collection ?? null;
}

/**
 * Product search (Storefront search). Returns { edges, pageInfo } or null.
 */
export async function searchProducts({ query, first = 24, after = null }) {
  const q = (query || "").trim();
  if (!q) {
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
  const data = await storefrontRequestSafe(SEARCH_QUERY, {
    query: q,
    first,
    after,
  });
  const conn = data?.search;
  if (!conn) {
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }
  return {
    edges: conn.edges || [],
    pageInfo: conn.pageInfo || {
      hasNextPage: false,
      endCursor: null,
    },
  };
}

export async function updateCartDiscountCodes(cartId, discountCodes) {
  const data = await storefrontRequest(CART_DISCOUNT_CODES_UPDATE, {
    cartId,
    discountCodes: discountCodes || [],
  });
  return {
    cart: data.cartDiscountCodesUpdate?.cart ?? null,
    userErrors: data.cartDiscountCodesUpdate?.userErrors ?? [],
  };
}

/* ── Customer create (email collection) ── */

const CUSTOMER_CREATE_MUTATION = /* GraphQL */ `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;

export async function createCustomer(email) {
  const data = await storefrontRequest(CUSTOMER_CREATE_MUTATION, {
    input: {
      email,
      password: crypto.randomUUID(),
      acceptsMarketing: true,
    },
  });
  return {
    customer: data.customerCreate?.customer ?? null,
    errors: data.customerCreate?.customerUserErrors ?? [],
  };
}
