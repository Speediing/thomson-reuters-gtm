# Site architecture

The protected page keeps the approved report, storyboard, and agent-computer architecture. It opens with original watercolor art, then places the hero on a pinned cream paper band.

`src/data/jobs.ts` owns the three customer scenarios. Each storyboard contains three working frames followed by one finished artifact. `src/components/JobSection.tsx` separates that final frame and gives it to `ChapterPayoff`.

`src/components/RosterChart.tsx` renders six agent computers from `src/data/fleet.ts`. `src/components/GrokBotWindow.tsx` renders the working desk. Chat is the first desktop column and the agent computer is the second.

`src/data/screens.ts` maps each agent message to the tool open on its computer. `src/components/SiteScreens.tsx` renders those tool views. The interactive layer stays inside the existing demo playback model.

`src/lib/hero-telemetry.wgsl` and `src/components/HeroTelemetry.tsx` retain the template's vgpu treatment with customer-specific computer artwork.

The password boundary runs in `src/middleware.ts` and `src/app/(protected)/layout.tsx`. `src/lib/auth.ts` derives the session token from `SITE_PASSWORD`. Login and logout routes own the cookie lifecycle.

The official customer wordmark is bundled from the Thomson Reuters source named in `src/components/BrandLockup.tsx`. The watercolor header is original artwork and contains no customer mark.
