# PortableGit via npm

🔄 Redistribution of [Git for Windows](https://gitforwindows.org/)'s [PortableGit](https://git-scm.com/download/win) via npm

<table align=center><td>

```sh
npx -p portablegit git add --all
npx -p portablegit git commit --message "Hello world!"
npx -p portablegit bash -c "grep version package.json"
npx -p portablegit sh ./build.sh
npx -p portablegit git-bash
npx -p portablegit gitk HEAD
```

</table>

🔶 Use Git for Windows via npm \
👨‍💻 Provides `bash` via Git Bash \
💾 Uses a portable installation of Git & Bash \
**🟦 Only works on Windows** \
🧰 Useful when you need a specific Git version

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)
![Windows](https://img.shields.io/static/v1?style=for-the-badge&message=Windows&color=0078D4&logo=Windows&logoColor=FFFFFF&label=)

🛑 Only works on Windows x64 systems. Does not work on macOS or Linux.

You can install this package using npm or your favorite npm package manager. If possible you should use the user or global [Git for Windows](https://gitforwindows.org/) installation instead of this package.

```sh
npm install --save-dev portablegit
```

<sup>This package has a `postinstall` script</sup>

⚠️ **It's not recommended to install this package globally!** [Install Git for Windows normally](https://gitforwindows.org/) on your system instead. Interested in installing Git globally on more that just Windows machines? Check out [Git - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Usage

![Windows](https://img.shields.io/static/v1?style=for-the-badge&message=Windows&color=0078D4&logo=Windows&logoColor=FFFFFF&label=)
![Terminal](https://img.shields.io/static/v1?style=for-the-badge&message=Terminal&color=4D4D4D&logo=Windows+Terminal&logoColor=FFFFFF&label=)

ℹ There is no JavaScript component to this package; it's just a redistribution of the PortableGit files and binaries.

You can use this package just as you would any other npm package that provides
binaries! **PortableGit only provides binaries for Windows.**

```sh
npx -p portablegit git --version
#=> git version 2.X.Y.windows.Z
```

Available binary commands exposed through this npm package are:

- **`bash`:** Git Bash `bash.exe`. Useful for cross-platform scripting. You can run Bash scripts on Windows!
- **`sh`:** Git Bash `sh.exe`. Runs `bash.exe` in POSIX mode.
- **`git`:** The actual `git.exe` binary for Windows. See [the Git website](https://git-scm.com/) to learn more about Git.
- **`git-bash`:** Launches a terminal emulator running Git Bash. Uses [MinTTY](https://mintty.github.io/).
- **`git-cmd`:** Starts a `cmd.exe` subshell preloaded with `git.exe` and other things in `$PATH`. Does **not** launch a new window.
- **`git-gui`:** Starts [the Git GUI](https://git-scm.com/docs/git-gui).
- **`gitk`:** Starts [the GitK GUI](https://git-scm.com/docs/gitk/).
- `tig`, `start-ssh-agent`, `start-ssh-pagent`, `scalar`, `git-receive-pack` `git-upload-pack`: Extra things that I'm not not smart enough to understand.

This `portablegit` npm package is versioned to follow Git for Windows releases. For example, Git for Windows `v2.45.1.windows.1` (derived from Git 2.45.1) would be released as `portablegit@2.45.11` on npm. **Note that there's a `1` suffix appended to the version number.** Git for Windows `v2.45.1.windows.2` would then be released as `portablegit@2.45.12` on npm. **The suffix is now a `2`** just like `.windows.2`. For `X.Y.0.windows.1` releases the npm-ified `X.Y.01` version specifier is invalid; we need to drop the leading zero to create an `X.Y.1` release.

You can `import.meta.resolve()` or `require.resolve()` anything that would normally be in the extracted `PortableGit/*` folder. Here's an example:

```js
const cat = import.meta.resolve("portablegit/usr/bin/cat");
console.log(cat);
//=> 'file:///C:/myproject/node_modules/portablegit/out/portablegit/usr/bin/cat'

const cut = require.resolve("portablegit/usr/bin/cut");
console.log(cut);
//=> 'C:\\myproject\\node_modules\\portablegit\\out\\portablegit\\usr\\bin\\cut'
```

This can be useful if you need to resolve the path to a specific binary (`cat.exe`, `cut.exe`, etc.) that isn't exposed by default. Note that you don't need to use the `.exe` suffix since Windows will helpfully add `.exe` suffix when attempting to run the file.

## Development

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Windows](https://img.shields.io/static/v1?style=for-the-badge&message=Windows&color=0078D4&logo=Windows&logoColor=FFFFFF&label=)

You'll need a Windows computer to test this package locally. You can run `npm run build` to make sure everything looks good locally. `npm run generate` redownloads the configured version of Git for Windows PortableGit as a 7zip self-extracting archive.

Each new upcoming release will first be tried as a prerelease `X.Y.Z-rc.N` first to make sure that everything is 99% guarenteed to work when autopublishing. Make sure to `--tag next`!

This package currently relies on **manual updates** to bump the Git for Windows version. Make sure you update the `version` field in `package.json` and the `gfwVersion` and `filename` constants in `scripts.js` `generate()`.

You can publish a release to GitHub releases and npm using [the npm publish GitHub actions workflow](https://github.com/jcbhmr/portablegit.js/actions/workflows/npm-publish.yml).
