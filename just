#!/bin/bash
set -e

build()(
  portablegit_version="${npm_package_version:?}"
  git_version=$(echo "$portablegit_version" | grep -Eo '[0-9]{1,}.[0-9]{1,}.[0-9]{1,}')
  mkdir -p out
  curl -fsSL "https://github.com/git-for-windows/git/releases/download/v$portablegit_version/PortableGit-$git_version-64-bit.7z.exe" \
    -o out/portablegit.7z.exe
  mkdir -p out/portablegit
  pushd out/portablegit
  7z x -aos ../portablegit.7z.exe
)

cd "$(dirname "${BASH_SOURCE[0]}")"; c=$1; shift; "$c" "$@"
