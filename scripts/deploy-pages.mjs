import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    branch: { type: "string", default: "main" },
    project: { type: "string", default: process.env.CLOUDFLARE_PAGES_PROJECT || "bes3" },
    "dry-run": { type: "boolean", default: false },
  },
});

if (!/^[a-z0-9][a-z0-9-]{0,62}$/i.test(values.project)) {
  throw new Error("Cloudflare Pages project names may only contain letters, numbers and hyphens.");
}

if (!/^[a-z0-9][a-z0-9-]{0,62}$/i.test(values.branch)) {
  throw new Error("Deployment branch names may only contain letters, numbers and hyphens.");
}

if (!existsSync("dist")) {
  throw new Error("dist/ is missing. Run npm run build before deploying.");
}

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const args = [
  "--yes",
  "wrangler@latest",
  "pages",
  "deploy",
  "dist",
  "--project-name",
  values.project,
  "--branch",
  values.branch,
];

if (values["dry-run"]) {
  process.stdout.write(`Would run: ${command} ${args.join(" ")}\n`);
  process.exit(0);
}

for (const name of ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID"]) {
  if (!process.env[name]) {
    throw new Error(`${name} must be set before deploying to Cloudflare Pages.`);
  }
}

const result = spawnSync(command, args, { stdio: "inherit", env: process.env });
if (result.error) throw result.error;
process.exit(result.status || 0);
