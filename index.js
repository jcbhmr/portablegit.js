import { readFile } from "node:fs/promises";

const package_ = JSON.parse(
  await readFile(import.meta.resolve("./package.json")),
);
export const GIT_VERSION = package_.version
  .split("+")[1]
  .match(/\d+\.\d+\.\d+/);
export const GIT_FOR_WINDOWS_VERSION = package_.version.split("+")[1];

export const bash = import.meta.resolve("./out/PortableGit/bin/bash.exe");
export const git = import.meta.resolve("out/PortableGit/bin/git.exe");
export const gitBash = import.meta.resolve("out/PortableGit/git-bash.exe");
export { gitBash as "git-bash" };
export const gitCmd = import.meta.resolve("out/PortableGit/git-cmd.exe");
export const gitGui = import.meta.resolve("out/PortableGit/cmd/git-gui.exe");
export { gitGui as "git-gui" };
export const gitk = import.meta.resolve("out/PortableGit/cmd/gitk.exe");
export const sh = import.meta.resolve("out/PortableGit/bin/sh.ex");
