# Site architecture

## Problem

The site must feel specific to Thomson Reuters, protect every customer route with one shared password, and stay small enough for an account team to maintain.

## Usage

The visitor opens `/`, enters the shared password, and returns to the protected page. The page starts with a watercolor scene and a pinned cream paper hero. It then shows six agent computers and three scene timelines. Every timeline ends with the finished artifact. The visitor can lock the page from the footer.

## Shape

`lib/site-content.ts` owns the `SiteContent` model and all customer copy. A use case has exactly three working frames followed by one `ArtifactFrame`. The tuple makes the final artifact part of the page model.

`app/(protected)/page.tsx` renders the report as a server component. `components/agent-desk.tsx` owns the frame selector. It always renders chat first and the agent computer second. The first desktop column is therefore chat and the second is the computer.

`app/api/login/route.ts` parses the external request. `lib/auth.ts` owns password comparison, signed access tokens, cookie policy, and safe return paths. `proxy.ts` redirects anonymous root requests. `app/(protected)/layout.tsx` repeats the token check at the authoritative page boundary.

The public interface stays small. Content enters through one typed object. Authentication enters through four pure functions and one cookie name.

## Synthesis decision

The chosen shape keeps the page on the server and sends only the scene selectors to the browser. It follows the approved live architecture. A watercolor header opens the page. A report contains the hero, agent fleet, sample job index, numbered job sections, comparison, and footer. The first pass job cards and generic landing-page sections were deleted.

## Tradeoffs accepted

- The account team edits one long content file in exchange for a single source of truth.
- The scene model uses a fixed four-frame tuple. A new use case must include a finished artifact.
- The repository stores the official customer wordmark in exchange for a stable lockup without a runtime request.
- The password gate controls access but does not replace identity-based authentication.

## Alternatives considered

A fully client-rendered page lost because it sends static content and layout code to the browser. Per-section content files lost because this site has one customer and one page. Proxy-only access control lost because request interception should not be the only protection. Reusing prior customer watercolor art lost because the restyle needs original customer-specific artwork.

## Open risk

The wordmark is a stored copy of a customer-hosted asset. Future brand changes require replacing that file from the source URL named in `components/brand-lockup.tsx`. The watercolor header is original generated artwork and contains no customer mark. The official mark remains a separate asset.
