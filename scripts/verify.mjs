import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const requiredFiles = [
  ".env.example",
  "src/app/(protected)/layout.tsx",
  "src/app/(protected)/page.tsx",
  "src/app/(public)/login/page.tsx",
  "src/app/api/login/route.ts",
  "src/app/api/logout/route.ts",
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/components/BrandLockup.tsx",
  "src/components/ChapterPayoff.tsx",
  "src/components/GrokBotWindow.tsx",
  "src/components/HeroDemo.tsx",
  "src/components/JobSection.tsx",
  "src/components/QuoteWall.tsx",
  "src/components/RosterChart.tsx",
  "src/data/fleet.ts",
  "src/data/hero-jobs.ts",
  "src/data/jobs.ts",
  "src/data/quotes.ts",
  "src/data/screens.ts",
  "src/lib/auth.ts",
  "src/lib/gate.ts",
  "src/middleware.ts",
  "public/brand/spacexai.svg",
  "public/brand/thomson-reuters-watercolor-header.jpg",
  "public/brand/thomson-reuters.svg",
];
const textExtensions = new Set([".css", ".mjs", ".ts", ".tsx", ".svg", ".wgsl"]);
const sourceFolders = ["src", "public"];
const sourceResidue = [
  ["data", "dog"].join(""),
  ["sea", "gate"].join(""),
  ["ac", "me"].join(""),
  ["kri", "sta"].join(""),
  ["made", "line"].join(""),
];
const priorColors = [
  "181512",
  "403a35",
  "6f655d",
  "f8f5ef",
  "fffdfa",
  "ddd5ca",
  "b7aa9d",
  "fa4f23",
  "9f2e15",
  "ffd9cf",
  "6d43ff",
  "d9e9ff",
  "247968",
  "d4eee7",
  "20231f",
  "686b63",
  "f5f1e8",
  "fbf9f4",
  "d8d3c8",
  "632ca6",
  "4c1d82",
  "6ebe49",
  "3d6b28",
  "788274",
  "5e7180",
  "c8c3b7",
  "007aff",
  "e9e9eb",
].map((value) => `#${value}`);

function collectFiles(folder) {
  const absolute = join(root, folder);
  if (!existsSync(absolute)) return [];

  return readdirSync(absolute).flatMap((name) => {
    const path = join(absolute, name);
    return statSync(path).isDirectory()
      ? collectFiles(relative(root, path))
      : textExtensions.has(extname(path))
        ? [path]
        : [];
  });
}

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (path) => readFileSync(join(root, path), "utf8");

for (const file of requiredFiles) {
  check(existsSync(join(root, file)), `Missing ${file}`);
}

const files = sourceFolders.flatMap(collectFiles);
const source = files
  .map((file) => `${relative(root, file)}\n${readFileSync(file, "utf8")}`)
  .join("\n")
  .toLowerCase();

for (const token of sourceResidue) {
  check(!source.includes(token), `Found source residue: ${token}`);
}

for (const color of priorColors) {
  check(!source.includes(color), `Found prior palette value: ${color}`);
}

check(!source.includes(String.fromCodePoint(8212)), "Found an em dash in customer source");
check(!existsSync(join(root, "app")), "Found obsolete root app directory");
check(!existsSync(join(root, "components")), "Found obsolete root components directory");
check(!existsSync(join(root, "lib")), "Found obsolete root lib directory");
check(!existsSync(join(root, "public/avatars")), "Found inherited avatar artwork");
check(!existsSync(join(root, "public/media")), "Found inherited media artwork");
check(!existsSync(join(root, "private/media")), "Found inherited private media");
check(
  !existsSync(join(root, "public/brand", ["data", "dog-wordmark.svg"].join(""))),
  "Found inherited wordmark",
);

const page = read("src/app/(protected)/page.tsx");
check(page.includes("<HeroDemo />"), "HomePage does not render HeroDemo");
check(page.includes("thomson-reuters-watercolor-header.jpg"), "Missing watercolor header");
check(page.includes("<RosterChart />"), "Missing fleet computers");
check(page.includes("<QuoteWall />"), "Missing sourced quote wall");
check(page.includes("Nick Scallion"), "Missing account executive");
check(page.includes("nick.scallion@cursor.com"), "Missing account executive email");

const hero = read("src/components/HeroDemo.tsx");
check(hero.includes("A fleet of agents, each with its own computer."), "Missing fleet hero");
for (const className of [
  "hero-copy",
  "hero-phone-jobs",
  "hero-bot-demo",
  "hero-phone",
  "notch hero-phone-notch",
  "header hero-phone-header",
  "thread hero-phone-thread",
  "composer hero-phone-composer",
]) {
  check(hero.includes(className), `Missing HeroDemo structure: ${className}`);
}

const heroJobs = read("src/data/hero-jobs.ts");
check(
  (heroJobs.match(/\n    id: "/g) ?? []).length === 8,
  "HERO_JOBS must contain exactly eight entries",
);

const layout = read("src/app/layout.tsx");
check(layout.includes("Thomson Reuters x SpaceXAI"), "Missing customer title");
check(layout.includes("Geist, Geist_Mono"), "Template Geist fonts are missing");

const jobs = read("src/data/jobs.ts");
check(
  (jobs.match(/label: "Finished artifact:/g) ?? []).length === 3,
  "Every scene timeline must end with one finished artifact",
);
check(
  (jobs.match(/storyboard: \[/g) ?? []).length === 3,
  "Expected three scene timelines",
);

const lockup = read("src/components/BrandLockup.tsx");
check(lockup.includes("www.thomsonreuters.com"), "Wordmark source is not Thomson Reuters");
check(lockup.includes("/brand/thomson-reuters.svg"), "Official wordmark is not bundled");

const css = read("src/app/globals.css");
check(css.includes("--brand-h: 17px"), "Customer lockup is not 15px to 18px");
check(css.includes(".report-paper"), "Missing cream hero paper");
check(css.includes(".paper-pin"), "Missing paper pins");
check(css.includes(".agent-computer"), "Missing computer fleet styling");
for (const selector of [".hero-phone", ".hero-bot-demo", ".hero-phone-jobs"]) {
  check(css.includes(selector), `Missing hero phone CSS: ${selector}`);
}

const quoteWall = read("src/components/QuoteWall.tsx");
const quotes = read("src/data/quotes.ts");
check(quoteWall.includes('cite={quote.source}'), "Quote wall does not cite its sources");
check(
  (quotes.match(/source: "https:\/\/x\.com\//g) ?? []).length === 3,
  "Quote wall sources are incomplete",
);

const desk = read("src/components/GrokBotWindow.tsx");
check(
  desk.indexOf('className="gb-thread"') < desk.indexOf('className="pc-screen pc-desk"'),
  "Agent desk must render chat before the computer",
);

const payoff = read("src/components/ChapterPayoff.tsx");
check(
  payoff.includes('data-frame-kind="artifact"'),
  "Finished scene is not marked as an artifact",
);

const auth = read("src/lib/auth.ts");
check(auth.includes("process.env.SITE_PASSWORD"), "Password gate does not use SITE_PASSWORD");
check(!auth.includes("land2expand"), "Password is hardcoded in application source");

const env = read(".env.example");
check(env.includes("SITE_PASSWORD=land2expand"), "Example password is incorrect");

const packageJson = JSON.parse(read("package.json"));
check(packageJson.dependencies?.vgpu === "^0.3.1", "Template vgpu dependency changed");
check(packageJson.dependencies?.next === "^15.5.24", "Template Next dependency changed");
check(packageJson.dependencies?.react === "^19.1.9", "Template React dependency changed");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified ${files.length} customer-facing source files.`);
