# Site architecture

## Problem

The site must feel specific to Thomson Reuters, protect every customer route with one shared password, and stay small enough for an account team to maintain.

## Usage

The visitor opens `/`, enters the shared password, and returns to the protected page. The page presents current account context, sample agent jobs, a working model, and a 30-day plan. The visitor can lock the page from the footer.

## Shape

`lib/site-content.ts` owns the `SiteContent` model and all customer copy. `app/(protected)/page.tsx` renders that model as a server component. `components/customer-story.tsx` owns the only interactive state and receives a non-empty scenario registry.

`app/api/login/route.ts` parses the external request. `lib/auth.ts` owns password comparison, signed access tokens, cookie policy, and safe return paths. `proxy.ts` redirects anonymous root requests. `app/(protected)/layout.tsx` repeats the token check at the authoritative page boundary.

The public interface stays small. Content enters through one typed object. Authentication enters through four pure functions and one cookie name.

## Synthesis decision

The chosen shape keeps the page on the server and sends only the workflow switcher to the browser. It uses one content registry instead of separate page-specific copy modules. It uses both the route layout and the proxy because the proxy is a useful redirect layer but not the sole security boundary.

## Tradeoffs accepted

- The account team edits one long content file in exchange for a single source of truth.
- The official customer wordmark stays remote in exchange for using the current asset from Thomson Reuters.
- The password gate controls access but does not replace identity-based authentication.

## Alternatives considered

A fully client-rendered page lost because it sends static content and layout code to the browser. Per-section content files lost because this site has one customer and one page. Proxy-only access control lost because request interception should not be the only protection.

## Open risk

The official wordmark depends on the Thomson Reuters asset host. The page keeps explicit dimensions so the lockup does not shift while the SVG loads.
