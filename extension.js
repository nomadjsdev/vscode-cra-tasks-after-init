const vscode = require('vscode')
const fs = require('fs')
const path = require('path')

const templates = require('./templates')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.craTasksAfterInit',
    async () => {
      // Get the rootpath of the workspace
      // NOTE: this extension is designed for single folder workspaces
      const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath

      // Get the contents of package.json
      const packageJsonString = await vscode.workspace
        .openTextDocument(path.join(rootPath, '/package.json'))
        .then(document => document.getText())

      const packageJson = JSON.parse(packageJsonString)

      // Only run if the extension has not already been successfully run in this workspace
      if (!packageJson.TasksAfterInitHasRun) {
        // Files common to both TS and JS environments
        let filesToDelete = [
          '/public/favicon.ico',
          '/public/index.html',
          '/public/logo192.png',
          '/public/logo512.png',
          '/public/manifest.json',
          '/src/App.css',
          '/src/index.css',
          '/src/logo.svg',
          '/src/App.tsx',
          '/src/index.tsx',
          '/src/serviceWorker.ts',
          '/src/App.test.tsx',
          '/src/App.js',
          '/src/index.js',
          '/src/serviceWorker.js',
          '/src/App.test.js'
        ]

        // Ask user if tests should be deleted
        const shouldDeleteTests = await vscode.window.showQuickPick(
          ['Yes', 'No'],
          {
            placeHolder: 'Delete tests?',
            canPickMany: false,
            ignoreFocusOut: true
          }
        )
        const deleteTests =
          shouldDeleteTests === 'Yes' || shouldDeleteTests === undefined
            ? true
            : false

        // Ask user if jsconfig.json file should be created
        const shouldCreateJsconfig = await vscode.window.showQuickPick(
          ['Yes', 'No'],
          {
            placeHolder: 'Create jsconfig.json?',
            canPickMany: false,
            ignoreFocusOut: true
          }
        )

        // Delete files
        filesToDelete.forEach(file => {
          if (fs.existsSync(path.join(rootPath, file))) {
            fs.unlinkSync(path.join(rootPath, file))
          }
        })

        // Create View directory
        if (!fs.existsSync(path.join(rootPath, '/src/View'))) {
          fs.mkdirSync(path.join(rootPath, '/src/View'))
        }

        // Write new index.html, index.*, app.*, and test files
        fs.writeFileSync(
          path.join(rootPath, '/public/index.html'),
          templates.publicHtml
        )

        // Check if Typescript is a listed dependency in package.json
        if (packageJson.dependencies.typescript) {
          fs.writeFileSync(
            path.join(rootPath, '/src/index.tsx'),
            templates.tsIndex
          )
          fs.writeFileSync(
            path.join(rootPath, '/src/View/App.tsx'),
            templates.tsApp
          )
          if (!deleteTests) {
            fs.writeFileSync(
              path.join(rootPath, 'src/View/App.test.tsx'),
              templates.tsAppTest
            )
          } else {
            fs.unlinkSync(path.join(rootPath, '/src/setupTests.ts'))
          }
        } else {
          fs.writeFileSync(
            path.join(rootPath, '/src/index.js'),
            templates.jsIndex
          )
          fs.writeFileSync(
            path.join(rootPath, '/src/View/App.js'),
            templates.jsApp
          )
          if (!deleteTests) {
            fs.writeFileSync(
              path.join(rootPath, 'src/View/App.test.js'),
              templates.jsAppTest
            )
          } else {
            fs.unlinkSync(path.join(rootPath, '/src/setupTests.js'))
          }
          if (shouldCreateJsconfig) {
            fs.writeFileSync(
              path.join(rootPath, 'jsconfig.json'),
              templates.jsconfigJson
            )
          }
        }

        // Write package.json "TasksAfterInitHasRun: true"
        const newPackageJson = { ...packageJson, TasksAfterInitHasRun: true }
        fs.writeFileSync(
          path.join(rootPath, '/package.json'),
          JSON.stringify(newPackageJson)
        )

        vscode.window.showInformationMessage('Done!')
      }
    }
  )

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
