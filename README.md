# CRA Tasks After Init README

A highly opinionated clean up tool for Create-React-App, designed to carry out initial file removal and updating.
**This is a destructive process - files will be deleted. If you run this on a project you've already worked on, it may break. This extension should be run immediately after the initial creation of the app.**
Inspired by WP Tasks After Install.

## Features

- Deletes the following files:
  `/public/favicon.ico`
  `/public/logo192.png`
  `/public/logo512.png`
  `/public/manifest.json`
  `/src/App.css`
  `/src/index.css`
  `/src/logo.svg`
  `/src/serviceWorker.*`
- Optionally removes test files
- Moves and updates `/src/App.*` to `/src/View/App.*`
- Updates `/public/index.html`, `/src/index.*`
- Updates package.json to prevent running the extension a second time on the same project

## Requirements

A workspace containing a single directory which was initialised via Create-React-App. This can be a TypeScript or Javascript project.

## Known Issues

None

## Release Notes

### 1.0.0

Initial release of CRA Tasks After Init
