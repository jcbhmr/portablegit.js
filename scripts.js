#!/usr/bin/env node
export {};

async function generate() {
  const { createWriteStream } = await import("node:fs");
  const { Writable } = await import("node:stream");
  const { default: assert } = await import("node:assert/strict");

  // CHANGE ME
  const gfwVersion = "2.45.2.windows.1";
  const filename = `PortableGit-2.45.2-64-bit.7z.exe`;

  const url = `https://github.com/git-for-windows/git/releases/download/v${gfwVersion}/${filename}`;
  console.debug("url=%o", url);
  const response = await fetch(url);
  assert(response.status === 200, `${response.status} ${response.url}`);
  const dest = new URL(import.meta.resolve("./PortableGit-64-bit.7z.exe"));
  await response.body.pipeTo(Writable.toWeb(createWriteStream(dest)));
  console.log("Downloaded %s to %s", url, dest);
}

// POSTINSTALL RUNS WITH NO DEV DEPENDENCIES!
async function postinstall() {
  const { $ } = await import("execa");
  const { existsSync } = await import("node:fs");
  const { sep } = await import("node:path");
  const { fileURLToPath } = await import("node:url");

  if (
    process.env.INIT_CWD === process.cwd() ||
    process.env.INIT_CWD?.startsWith(process.cwd() + sep)
  ) {
    // Skip! Local dev `npm install`, not as a dep.
    console.debug("Skipping postinstall in local dev");
  } else {
    // May have already been installed once and had the files deleted.
    if (existsSync(new URL(import.meta.resolve("./out/post-install.bat")))) {
      const { failed, exitCode, signal, signalDescription, command } = await $({
        cwd: fileURLToPath(import.meta.resolve("./out/")),
        stdio: "inherit",
        reject: false,
        verbose: "short",
      })`post-install.bat`;
      if (failed) {
        console.error("$ %o failed", command);
        if (exitCode) {
          console.error("exitCode=%o", exitCode);
        } else if (signal) {
          console.error(
            "signal=%o signalDescription=%o",
            signal,
            signalDescription
          );
        }
      }
    } else {
      // Assume already ran.
    }
  }
}

async function squash() {
  const { $ } = await import("execa");

  await $({ stdio: "inherit", verbose: "short" })`git --version`;
}

await { generate, postinstall, squash }[process.argv[2]]();
