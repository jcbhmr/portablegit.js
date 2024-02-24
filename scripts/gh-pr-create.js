#!/usr/bin/env node
import { $ } from "execa"
import { readFile } from "node:fs/promises"
import * as github from "@actions/github"

const packageText = await readFile("./package.json", "utf8")
const package_ = JSON.parse(packageText)
const octokit = github.getOctokit(process.env.GH_TOKEN)

const [baseVersion, gitForWindowsVersion] = package_.version.split("+")

const latestGitForWindowsVersion = (await octokit.rest.repos.getLatestRelease({
    owner: "git-for-windows",
    repo: "git",
})).data.tag_name.slice(1)

if (gitForWindowsVersion !== latestGitForWindowsVersion) {
    const v = baseVersion.split(".", 3);
    v[1] = (+v[1] + 1).toString();
    v[2] = "0"
    const newVersion = `${v.join(".")}+${latestGitForWindowsVersion}`
    
    const existingBranch  = await octokit.rest.repos.getBranch({
        owner: process.env.GITHUB_REPOSITORY.split("/")[0],
        repo: process.env.GITHUB_REPOSITORY.split("/")[1],
        branch: newVersion
    }).catch(() => null)
    if (!existingBranch) {
        const newPackage = { ...package_ };
        newPackage.version = newVersion;
        await writeFile("./package.json", JSON.stringify(newPackage, null, 2))
        await $({ stdio: "inherit" })`git checkout -b ${newVersion}`
        await $({ stdio: "inherit" })`git add -A`
        await $({ stdio: "inherit" })`git commit -m ${"Update version"}`
        await $({ stdio: "inherit" })`git push -u origin ${newVersion}`
        await $({ stdio: "inherit" })`gh pr create -f`
        await new Promise(r => setTimeout(r, 5000))
        await $({ stdio: "inherit" })`gh pr merge ${newVersion} --auto`
    }
}
