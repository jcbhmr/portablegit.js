import test from "node:test";
import assert from "node:assert/strict";
import { $ } from "execa";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const package_ = JSON.parse(
  await readFile(new URL(import.meta.resolve("./package.json")), "utf8"),
);

await $({ stdio: "inherit" })`npm run build`;
// simulate postinstall
await $({
  cwd: fileURLToPath(import.meta.resolve("./out/")),
  stdio: "inherit",
  reject: false,
})`post-install.bat`;

test("git", async () => {
  await $({ stdio: "inherit" })`${package_.bin.git} --version`;
});

test("bash", async () => {
  await $({ stdio: "inherit" })`${package_.bin.bash} --version`;
});

test("import.meta.resolve() cat", async () => {
    const cat = fileURLToPath(import.meta.resolve("portablegit/usr/bin/cat"))
    await $({ stdio: "inherit" })`${cat} --version`
    const catExe = fileURLToPath(import.meta.resolve("portablegit/usr/bin/cat.exe"))
    await $({ stdio: "inherit" })`${catExe} --version`
})
