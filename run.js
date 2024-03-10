#!/usr/bin/env node
export async function build() {
  const { $ } = await import("execa");
  const { readFile, mkdir } = await import("node:fs/promises");
  const { createWriteStream } = await import("node:fs");
  const { resolve, dirname } = await import("node:path");
  const { Writable } = await import("node:stream");

  const packageText = await readFile("./package.json", "utf8");
  const package_ = JSON.parse(packageText);

  const gitForWindowsVersion = package_.version.split("+")[1];
  const gitVersion = gitForWindowsVersion.match(/^\d+\.\d+\.\d+/)[0];

  const filename = `PortableGit-${gitVersion}-64-bit.7z.exe`;
  const url = `https://github.com/git-for-windows/git/releases/download/v${gitForWindowsVersion}/${filename}`;
  const response = await fetch(url);
  const archivePath = resolve(`out/${filename}`);
  await mkdir(dirname(archivePath), { recursive: true });
  const writable = Writable.toWeb(createWriteStream(archivePath));
  await response.body.pipeTo(writable);

  const portableGitRoot = resolve(`out/PortableGit`);
  await mkdir(portableGitRoot, { recursive: true });
  await $({
    stdio: "inherit",
    cwd: portableGitRoot,
  })`7z x -aos ${archivePath}`;
}

export async function xversion() {
  const { $ } = await import("execa");
  const { readFile, writeFile } = await import("node:fs/promises");
  const github = await import("@actions/github");
  const core = await import("@actions/core");

  const package_ = JSON.parse(await readFile("./package.json", "utf8"));
  const octokit = github.getOctokit(process.env.GH_TOKEN);

  const gitForWindowsVersion = package_.version.split("+", 2)[1];
  const latestGitForWindowsVersion = (
    await octokit.rest.repos.getLatestRelease({
      owner: "git-for-windows",
      repo: "git",
    })
  ).data.tag_name.slice(1);

  if (gitForWindowsVersion !== latestGitForWindowsVersion) {
    const versionParts = package_.version.split("+", 2)[0].split(".", 3);
    versionParts[1] = (+versionParts[1] + 1).toString();
    versionParts[2] = "0";
    const newVersion = `${versionParts.join(".")}+${latestGitForWindowsVersion}`;
    const existingBranch = await octokit.rest.repos
      .getBranch({
        owner: process.env.GITHUB_REPOSITORY.split("/")[0],
        repo: process.env.GITHUB_REPOSITORY.split("/")[1],
        branch: newVersion,
      })
      .catch(() => null);
    if (!existingBranch) {
      core.setOutput("new-version", newVersion);
      await $({ stdio: "inherit" })`npm pkg set version=${newVersion}`;
    }
  }
}

await { build, xversion }[process.argv[2]];
