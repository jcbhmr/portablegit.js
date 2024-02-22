#!/usr/bin/env node
import { $ } from "execa"
import { readFile, mkdir } from "node:fs/promises"
import { createWriteStream } from "node:fs"
import { resolve, dirname } from "node:path"
import { Writable } from "node:stream"

const packageText = await readFile("./package.json", "utf8")
const package_ = JSON.parse(packageText)

const gitForWindowsVersion = package_.version.split("+")[1]
const gitVersion = gitForWindowsVersion.match(/^\d+\.\d+\.\d+/)[0]

const filename = `PortableGit-${gitVersion}-64-bit.7z.exe`
const url = `https://github.com/git-for-windows/git/releases/download/v${gitForWindowsVersion}/${filename}`
const response = await fetch(url)
const archivePath = resolve(`out/${filename}`)
await mkdir(dirname(archivePath), { recursive: true })
const writable = Writable.toWeb(createWriteStream(archivePath))
await response.body.pipeTo(writable)

const portableGitRoot = resolve(`out/PortableGit`)
await mkdir(portableGitRoot, { recursive: true })
await $({
    stdio: "inherit",
    cwd: portableGitRoot,
})`7z x -aos ${archivePath}`
