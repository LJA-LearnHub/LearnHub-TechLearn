# TechLearn v0.1.0

TechLearn is packaged as a Windows desktop application with Electron. The source app remains a static HTML/CSS/JavaScript project; Electron supplies the desktop window and `electron-builder` creates the `.exe` files.

## Requirements

- Windows 10 or later
- Node.js and npm

Check the tools from PowerShell:

```powershell
node --version
npm --version
```

## First-time setup

From the TechLearn project folder, install the build dependencies:

```powershell
npm install
```

## Run the app during development

```powershell
npm start
```

The Electron window loads the root `index.html`. Changes to `index.html`, `css/`, or `js/` are picked up the next time the app is started.

## Build the Windows executables

```powershell
npm run build
```

Build artifacts are written to `release/`:

- `TechLearn-0.1.0-win-x64-installer.exe`: normal installer
- `TechLearn-0.1.0-win-x64-portable.exe`: standalone executable

The installer is the recommended distribution file. The unpacked application is also available in `release/win-unpacked/` for local testing.

For a faster unpacked test build, use:

```powershell
npm run dist:dir
```

## Update the app

1. Edit the app source. Course content is in `js/data.js`; layout and behavior are in `index.html`, `css/style.css`, and `js/app.js`.
2. Test the changes with `npm start`.
3. Update the version in `package.json` using semantic versioning. For example, change `0.1.0` to `0.1.1` for a bug fix or `0.2.0` for a compatible feature update.
4. Rebuild with `npm run build`.
5. Distribute the new installer from `release/`.

The saved learning progress is stored by Electron in the app's local browser storage. Updating the application does not intentionally reset that progress. Uninstalling the app or clearing its application data can remove it, so export or back up user data before doing that if progress must be preserved.

## Release checklist

- Confirm the version in `package.json`.
- Run `npm start` and test opening a lesson, completing it, resetting progress, and switching themes.
- Run `npm run build` on Windows.
- Test the generated installer on a clean Windows user account.
- Keep the generated `release/` files out of source control unless the project specifically distributes binaries from this repository.