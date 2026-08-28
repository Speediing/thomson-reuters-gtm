import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const requiredFiles = [
  ".env.example",
  "app/(protected)/page.tsx",
  "app/(protected)/layout.tsx",
  "app/(public)/login/page.tsx",
  "app/api/login/route.ts",
  "app/api/logout/route.ts",
  "app/icon.svg",
  "components/agent-desk.tsx",
  "components/brand-lockup.tsx",
  "components/login-form.tsx",
  "lib/auth.ts",
  "lib/site-content.ts",
  "proxy.ts",
  "public/brand/spacexai.svg",
  "public/brand/thomson-reuters-watercolor-header.jpg",
  "public/brand/thomson-reuters.svg",
];
const textExtensions = new Set([".css", ".mjs", ".ts", ".tsx", ".svg"]);
const sourceFolders = ["app", "components", "lib", "public"];
const sourceResidue = [
  ["data", "dog"].join(""),
  ["sea", "gate"].join(""),
  ["aster", " peak"].join(""),
  ["ac", "me"].join(""),
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

check(!source.includes(String.fromCodePoint(8212)), "Found an em dash in customer-facing source");
check(!source.includes("<blockquote"), "Found a quote surface in customer-facing source");

if (existsSync(join(root, "lib/site-content.ts"))) {
  const content = read("lib/site-content.ts");
  check(content.includes('title: "Thomson Reuters x SpaceXAI"'), "Missing customer title");
  check(content.includes('name: "Nick Scallion"'), "Missing account executive");
  check(content.includes('email: "nick.scallion@cursor.com"'), "Missing account executive email");
  check(
    (content.match(/kicker: "Finished artifact"/g) ?? []).length === 3,
    "Every sample must end in one artifact frame",
  );
  check((content.match(/frames: \[/g) ?? []).length === 3, "Expected three scene timelines");
  check(
    content.includes("A fleet of agents, each with its own computer."),
    "The hero does not establish the agent fleet",
  );
}

if (existsSync(join(root, "components/brand-lockup.tsx"))) {
  const lockup = read("components/brand-lockup.tsx");
  check(
    lockup.includes(
      "https://www.thomsonreuters.com/etc.clientlibs/uefalcon/clientlibs/clientlib-bayberry/resources/images/tr-rebranded-logo.svg",
    ),
    "The lockup does not use the official Thomson Reuters asset",
  );
}

if (existsSync(join(root, "app/globals.css"))) {
  const css = read("app/globals.css");
  check(
    /\.customer-wordmark\s*\{[^}]*height:\s*(16|17|18)px/s.test(css),
    "The customer wordmark is not a 16px to 18px lockup",
  );
  check(css.includes(".watercolor-header"), "Missing the watercolor header treatment");
  check(css.includes(".hero-paper"), "Missing the pinned cream hero paper");
}

if (existsSync(join(root, "components/agent-desk.tsx"))) {
  const desk = read("components/agent-desk.tsx");
  check(
    desk.indexOf('className="chat-panel"') < desk.indexOf('className="computer-panel"'),
    "The agent desk must render chat before the computer",
  );
  check(
    desk.includes("data-frame-kind={frame.kind}"),
    "Scene controls do not expose their frame kind",
  );
  check(
    desk.includes('className="finished-artifact"'),
    "The last scene has no finished artifact treatment",
  );
}

if (existsSync(join(root, "lib/auth.ts"))) {
  const auth = read("lib/auth.ts");
  check(auth.includes("SITE_PASSWORD"), "Password validation does not use SITE_PASSWORD");
  check(auth.includes("httpOnly: true"), "The access cookie is not HttpOnly");
  check(auth.includes('sameSite: "lax"'), "The access cookie is missing SameSite=Lax");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified ${files.length} customer-facing source files.`);
