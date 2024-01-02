# PortableGit.js

🔄 Redistribution of [Git for Windows] [PortableGit]

<table align=center><td>

```sh
npx portablegit add --all
npx portablegit commit --message "Hello world!"
npx --package portablegit bash -c "grep version package.json"
npx --package portablegit sh ./build.sh
npx --package portablegit git-bash
npx --package portablegit gitk HEAD
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

You can install this package using npm or your favorite npm package manager. If
possible you probably should just use the user's global [Git for Windows]
installation and not use this package.

```sh
npm install --save-dev portablegit
```

⚠️ It's not recommended to `npm install --global` this package. Instead,
[install Git for Windows normally on your system].

ℹ There is no JavaScript component to this package; it's just a redistribution
of the various PortableGit files and binaries.

🛑 Only works on Windows x64 systems. Does not work on macOS or Linux.

Interested in installing Git globally? Check out [Git - Installing Git].

## Usage

![Windows](https://img.shields.io/static/v1?style=for-the-badge&message=Windows&color=0078D4&logo=Windows&logoColor=FFFFFF&label=)

You can use this package just as you would any other npm package that provides
binaries! It's just that these binaries are Windows-specific. 🤷‍♂️

```sh
npx portablegit --version
#=> git version 2.43.0.windows.1
```

Available binary commands exposed through this npm package are:

- **`portablegit`:** Alias to `git.exe`. Makes it so you can `npx portablegit`
  and run Git without specifying `--package` like
  `npx --package portablegit git`.
- **`bash`:** Git Bash `bash.exe`. Useful for cross-platform scripting. You can
  run Bash scripts on Windows!
- **`sh`:** Git Bash `sh.exe`. Runs `bash.exe` in POSIX mode.
- **`git`:** The actual `git.exe` binary for Windows. See [the Git website] to
  learn more about Git.
- **`git-bash`:** Launches a terminal emulator running Git Bash. Uses [MinTTY].
- **`git-cmd`:** Starts a `cmd.exe` subshell preloaded with `git.exe` and other
  things on the `$PATH`. Does **not** launch a new window.
- **`git-gui`:** Starts [the Git GUI].
- **`gitk`:** Starts [the GitK GUI].

You can `import.meta.resolve()` or `require.resolve()` anything that would
normally be in the extracted `PortableGit/*` folder. Here's an example:

```js
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const catFileURL = import.meta.resolve("portablegit/usr/bin/cat.exe");
console.log(catFileURL);
//=> 'file:///C:/Users/you/Documents/myproject/node_modules/portablegit/out/portablegit/usr/bin/cat.exe'

const openBracketPath = require.resolve("portablegit/usr/bin/[.exe");
console.log(openBracketPath);
//=> 'C:\\Users\\you\\Documents\\myproject\\node_modules\\portablegit\\out\\portablegit\\usr\\bin\\[.exe'
```

This can be useful if you need to resolve the path to a specific binary
(`cat.exe`, `[.exe`, `cut.exe`, etc.) that isn't exposed by default.

<!-- prettier-ignore-start -->
[git for windows]: https://gitforwindows.org/
[portablegit]: https://git-scm.com/download/win#:~:text=Portable%20(%22thumbdrive%20edition%22)
[the Git website]: https://git-scm.com/
[mintty]: https://mintty.github.io/
[the git gui]: https://git-scm.com/docs/git-gui
[the gitk gui]: https://git-scm.com/docs/gitk/
[git - installing git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[install Git for Windows normally on your system]: https://gitforwindows.org/
<!-- prettier-ignore-end -->
