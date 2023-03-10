// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { Console } = require('console');
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "headreplacer" is now2 active!');

	
	vscode.workspace.onDidChangeTextDocument(function(event) {
		event.contentChanges.forEach((change) => {
			console.log(change.text)


			vscode.env.clipboard.readText()
				.then(function(clipboardText) {
					if(change.text == clipboardText) {
						if(change.text.startsWith("/give @p skull 1 3")) {
							let replacedString = replaceHeadString(change.text)
							let editor = vscode.window.activeTextEditor;

							editor.edit(editBuilder => {
								let startPos = new vscode.Position(change.range.start.line, change.range.start.character)
								let endPos = new vscode.Position(change.range.start.line, change.range.start.character + change.text.length)
								let range = new vscode.Range(startPos, endPos)

								editBuilder.replace(range, replacedString)
							})
						}
					}
				})
				.then(undefined, err => {})
		})
	})

	//const commandHandler = () => {
		//console.log(`Hello world! Jeg har lavet en command`);
	//};

	//context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}

function replaceHeadString(string) {
	string = string.replace("/give @p skull 1 3 ", "")
	string = string.replaceAll('"', '""')
    string = '"' + string + '"';
    return string;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
