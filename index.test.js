import test from "node:test";
import assert from "node:assert/strict";
import { $ } from "execa";
import { readFile } from "node:fs/promises";
const package_ = JSON.parse(
  await readFile(new URL(import.meta.resolve("./package.json")), "utf8"),
);

await $({ stdio: "inherit" })`npm run build`;
// simulate postinstall
await $({
  cwd: "out",
  stdio: "inherit",
  reject: false,
})`post-install.bat`;

test("git", async () => {
  await $({ stdio: "inherit" })`${package_.bin.git} --version`;
});

test("bash", async () => {
  await $({ stdio: "inherit" })`${package_.bin.bash} --version`;
});

test("import.meta.resolve()", () => {
    console.log(import.meta.resolve("portablegit/usr/bin/cat"))
    console.log(import.meta.resolve("portablegit/usr/bin/cat.exe"))
})