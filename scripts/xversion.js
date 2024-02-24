#!/usr/bin/env node
import { $ } from "execa"
import { readFile, writeFile } from "node:fs/promises"
import * as github from "@actions/github"
import * as core from "@actions/core"

const package_ = JSON.parse(await readFile("./package.json", "utf8"))
const octokit = github.getOctokit(process.env.GH_TOKEN)

const gitForWindowsVersion = package_.version.split("+", 2)[1]
const latestGitForWindowsVersion = (await octokit.rest.repos.getLatestRelease({
    owner: "git-for-windows",
    repo: "git",
})).data.tag_name.slice(1)

if (gitForWindowsVersion !== latestGitForWindowsVersion) {
    const versionParts = package_.version.split("+", 2)[0].split(".", 3);
    versionParts[1] = (+versionParts[1] + 1).toString();
    versionParts[2] = "0";
    const newVersion = `${versionParts.join(".")}+${latestGitForWindowsVersion}`
    const existingBranch  = await octokit.rest.repos.getBranch({
        owner: process.env.GITHUB_REPOSITORY.split("/")[0],
        repo: process.env.GITHUB_REPOSITORY.split("/")[1],
        branch: newVersion
    }).catch(() => null)
    if (!existingBranch) {
        core.setOutput("new-version", newVersion);
        await $({ stdio: "inherit" })`npm pkg set version=${newVersion}`
    }
}