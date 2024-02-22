#!/usr/bin/env node
import { $ } from "execa"
import { readFile } from "node:fs/promises"
import * as github from "@actions/github"

const packageText = await readFile("./package.json", "utf8")
const package_ = JSON.parse(packageText)
const octokit = github.getOctokit(process.env.GH_TOKEN)

const currentVersionRelease = (await octokit.rest.repos.getReleaseByTag({
    owner: process.env.GITHUB_REPOSITORY.split("/")[0],
    repo: process.env.GITHUB_REPOSITORY.split("/")[1],
    tag: `v${package_.version}`
})).catch(() => null)
if (!currentVersionRelease) {
    const newTag = `v${package_.version}`
    await $`gh release create ${newTag} --generate-notes`
}