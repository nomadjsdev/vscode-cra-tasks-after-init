# CRA Tasks After Init README

A **highly opinionated** clean up tool for Create-React-App, designed to carry out initial file removal and updating.

**This is a destructive process - files will be deleted. If you run this on a project you've already worked on, it may break. This extension should be run immediately after the initial creation of the app.**

Inspired by WP Tasks After Install.

## Usage

- Run `CRA Tasks After Init` from the Command Palette (`ctrl + shift + P`).
- At the first prompt select `Yes` to delete test files, or `No` to preserve them.
- At the second prompt select `Yes` to create a `jsconfig.json` file.
- At the third prompt select `Yes` to create a `_redirects` file for Netlify deployments.

## Features

- Deletes the following files:
  ```
  /public/favicon.ico,
  /public/logo192.png,
  /public/logo512.png,
  /public/manifest.json,
  /src/App.css,
  /src/index.css,
  /src/logo.svg,
  /src/serviceWorker.*
  ```
- Optionally deletes test files
- Moves and updates `/src/App.*` to `/src/View/App.*`
- Updates `/public/index.html`, `/src/index.*`
- Optionally creates `jsconfig.json` to set working root to `src` (Allows absolute paths)
- Optionally creates `_redirects` file (Allows routing on Netlify deployments)
- Updates package.json to prevent running the extension a second time on the same project

## Requirements

A workspace containing a single directory which was initialised via Create-React-App. This can be a TypeScript or Javascript project.

## Known Issues

None

## Release Notes

## [1.3.1]

- Update to App templates

---

#### Project icon made by Freepik from FlatIcon
