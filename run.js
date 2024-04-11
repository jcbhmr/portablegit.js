#!/usr/bin/env node
import { $ } from "execa";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { Octokit } from "octokit";
import { createWriteStream } from "node:fs";
import { resolve, dirname } from "node:path";
import { Writable } from "node:stream";
process.env.DEBUG ||= "execa";
const package_ = JSON.parse(await readFile("./package.json", "utf8"));

async function generate() {
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN || process.env.GITHUB_TOKEN,
  });
  const localGfwVersion = package_.version.split("+", 2)[1];
  const { data: latestGfwRelease } = await octokit.rest.repos.getLatestRelease({
    owner: "git-for-windows",
    repo: "git",
  });
  const remoteGfwVersion = latestGfwRelease.tag_name.slice(1);
  console.debug("local %o", localGfwVersion);
  console.debug("remote %o", remoteGfwVersion);

  if (localGfwVersion !== remoteGfwVersion) {
    console.log("new git for windows version released");
    const versionParts = package_.version.split("+", 2)[0].split(".", 3);
    versionParts[1] = (+versionParts[1] + 1).toString();
    versionParts[2] = "0";
    const newVersion = `${versionParts.join(".")}+${remoteGfwVersion}`;
    console.debug("new version %o", newVersion);
    await $({ stdio: "inherit" })`npm pkg set version=${newVersion}`;
    console.log("updated package.json version to %o", newVersion);
  }

  const gfwVersion = package_.version.split("+")[1];
  const gitVersion = gfwVersion.match(/^\d+\.\d+\.\d+/)[0];
  console.debug("gfw version %o", gfwVersion);
  console.debug("git version %o", gitVersion);

  const filename = `PortableGit-${gitVersion}-64-bit.7z.exe`;
  const url = `https://github.com/git-for-windows/git/releases/download/v${gfwVersion}/${filename}`;
  console.debug("url %o", url);
  const response = await fetch(url);
  await response.body.pipeTo(Writable.toWeb(createWriteStream("PortableGit-64-bit.7z.exe")));
  console.log("downloaded %o to %o", url, "PortableGit-64-bit.7z.exe");
}

async function build() {
  await mkdir("out", { recursive: true });
  await $({ stdio: "inherit", cwd: "out" })`7z x -aos ../PortableGit-64-bit.7z.exe`;
  console.log("extracted to %o", "out");
}

await { build, generate }[process.argv[2]]();
