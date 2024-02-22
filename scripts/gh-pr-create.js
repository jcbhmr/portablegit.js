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

if (gitForWindowsVersion !== latestGitForWindowsVersion && !openPR) {
    const newVersion = `${baseVersion}+${latestGitForWindowsVersion}`
    
    const existingBranch  = await octokit.rest.repos.getBranch({
        owner: process.env.GITHUB_REPOSITORY.split("/")[0],
        repo: process.env.GITHUB_REPOSITORY.split("/")[1],
        branch: newVersion
    }).catch(() => null)
    if (!existingBranch) {
        await $`npm version ${newVersion} --no-git-tag-version`
        await $`git branch -b ${newVersion}`
        await $`git add -A`
        await $`git commit -m "Update version"`
        await $`gh pr create`
        await new Promise(r => setTimeout(r, 5000))
        await $`gh pr merge --auto`
    }
}
