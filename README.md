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

You can install this package using npm or your favorite npm package manager. If possible you should use the user or global [Git for Windows](https://gitforwindows.org/) installation instead of this package.

```sh
npm install --save-dev portablegit
```

⚠️ **It's not recommended to install this package globally!** [Install Git for Windows normally](https://gitforwindows.org/) on your system instead. Interested in installing Git globally on more that just Windows machines? Check out [Git - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

🛑 Only works on Windows x64 systems. Does not work on macOS or Linux.

ℹ There is no JavaScript component to this package; it's just a redistribution of the various PortableGit files and binaries.

## Usage

![Windows](https://img.shields.io/static/v1?style=for-the-badge&message=Windows&color=0078D4&logo=Windows&logoColor=FFFFFF&label=)

You can use this package just as you would any other npm package that provides
binaries! It's just that these binaries are Windows-specific. 🤷‍♂️

```sh
npx portablegit --version
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

You can `import.meta.resolve()` or `require.resolve()` anything that would normally be in the extracted `PortableGit/*` folder. Here's an example:

```js
const cat = import.meta.resolve("portablegit/usr/bin/cat.exe");
console.log(cat);
//=> 'file:///C:/Users/you/Documents/myproject/node_modules/portablegit/out/portablegit/usr/bin/cat.exe'

const cut = require.resolve("portablegit/usr/bin/cut.exe");
console.log(cut);
//=> 'C:\\Users\\you\\Documents\\myproject\\node_modules\\portablegit\\out\\portablegit\\usr\\bin\\cut.exe'
```

This can be useful if you need to resolve the path to a specific binary (`cat.exe`, `cut.exe`, etc.) that isn't exposed by default.

## Development

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![GitHub Actions](https://img.shields.io/static/v1?style=for-the-badge&message=GitHub+Actions&color=2088FF&logo=GitHub+Actions&logoColor=FFFFFF&label=)

You'll need a Windows computer to test this package locally. You can run `npm run build` to make sure everything looks good locally. `npm run generate` will check for a new Git for Windows PortableGit release and download it if it exists. There's a CI script that automatically runs `npm run generate` every so often and will open Pull Requests for updates. Merging these PRs to `main` **does not automatically create a new release** -- that must be done manually. Each new release automagically publishes to npm.
