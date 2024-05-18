#!/usr/bin/env node
export {};

async function generate() {
  const { createWriteStream } = await import("node:fs");
  const { Writable } = await import("node:stream");
  const { default: assert } = await import("node:assert/strict");

  // CHANGE ME
  const gfwVersion = "2.45.1.windows.1";
  const filename = `PortableGit-2.45.1-64-bit.7z.exe`;

  const url = `https://github.com/git-for-windows/git/releases/download/v${gfwVersion}/${filename}`;
  console.debug("url=%o", url);
  const response = await fetch(url);
  assert(response.status === 200, `${response.status} ${response.url}`);
  await response.body.pipeTo(
    Writable.toWeb(createWriteStream("PortableGit-64-bit.7z.exe")),
  );
  console.log("Downloaded %o to %o", url, "PortableGit-64-bit.7z.exe");
}

// POSTINSTALL RUNS WITH NO DEV DEPENDENCIES!
async function postinstall() {
  const { $ } = await import("execa");
  const { existsSync } = await import("node:fs");
  const { sep } = await import("node:path")

  if (process.env.INIT_CWD === process.cwd() || process.env.INIT_CWD?.startsWith(process.cwd() + sep)) {
    // Skip! Local dev `npm install`, not as a dep.
  } else {
    // May have already been installed once and had the files deleted.
    if (existsSync("out/post-install.bat")) {
      await $({
        cwd: "out",
        stdio: "inherit",
        reject: false,
      })`post-install.bat`;
    } else {
      // Assume already ran.
    }
  }
}

await { generate, postinstall }[process.argv[2]]();
