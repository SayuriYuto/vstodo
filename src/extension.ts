// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { HelloWorldPanel } from "./HelloWorldPanel";
import { SidebarProvider } from "./SidebarProvider";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);

    const item = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right
    );

    item.text = "$(add) Add ToDo";
    item.command = "vstodo.addtodo";
    item.show();

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "vstodo-sidebar",
            sidebarProvider
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.helloWorld", () => {
            HelloWorldPanel.createOrShow(context.extensionUri);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.addtodo", () => {
            const { activeTextEditor } = vscode.window;
            if (!activeTextEditor) {
                vscode.window.showErrorMessage("No text editor open!");
                return;
            }
            const text = activeTextEditor.document.getText(
                activeTextEditor.selection
            );
            if (text.length === 0) {
                return;
            }
            vscode.window.showInformationMessage("To Do task added : " + text);
            sidebarProvider._view?.webview.postMessage({
                type: "add-todo",
                value: text,
            });
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.refresh", async () => {
            // HelloWorldPanel.kill();
            // HelloWorldPanel.createOrShow(context.extensionUri);
            await vscode.commands.executeCommand(
                "workbench.action.closeSidebar"
            );
            await vscode.commands.executeCommand(
                "workbench.view.extension.vstodo-sidebar-view"
            );
            // setTimeout(() => {
            //   vscode.commands.executeCommand(
            //     "workbench.action.webview.openDeveloperTools"
            //   );
            // }, 500);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("vstodo.askQuestion", async () => {
            const answer = await vscode.window.showInformationMessage(
                "How was your day?",
                "Good :)",
                "Bad :("
            );
            if (answer === "Bad :(") {
                vscode.window.showInformationMessage("Sorry to hear that!");
            } else {
                console.log(answer);
            }
        })
    );
}

// This method is called when your extension is deactivated
export function deactivate() {}
