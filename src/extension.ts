// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as os from 'os';

const cmd_separator = '------------------------------------------------------------------------\n';

class ICPP {
	// icpp output channel
	output:vscode.OutputChannel;
	// executable file extension
	exe:string;
	// cli path
	icpp:string;
	iopad:string;

	constructor() {
		this.output = vscode.window.createOutputChannel('ICPP'); 
		this.exe = os.platform() != 'win32' ? '' : '.exe';

		const root = this.getConfig('a.root');
		if (root.length) {
			this.log("Using icpp package " + root + ".");
			this.icpp = path.join(root, 'bin', 'icpp' + this.exe);
			this.iopad = path.join(root, 'bin', 'iopad' + this.exe);
		}
		else {
			if (this.logging())
				this.log("Warning: you haven't set the icpp package root directory, please make sure ICPP_ROOT/bin is in your system PATH environment.");
			this.icpp = 'icpp';
			this.iopad = 'iopad';
		}
	}

	dispose() {}

	logging() {
		return this.getConfigBool('a.logging');
	}

	log(msg: string) {
		this.output.appendLine(msg);
	}

	getConfigRaw(key: string) {
		return vscode.workspace.getConfiguration().get('icpp.' + key);
	}

	getConfig(key: string) :string {
		var cfg = this.getConfigRaw(key);
		return cfg ? String(cfg) : "";
	}

	getConfigBool(key: string) {
		var cfg = this.getConfigRaw(key);
		return cfg ? Boolean(cfg) : false;
	}

	getConfigList(key: string) {
		var cfg = this.getConfig(key);
		if (cfg.length)
			return cfg.split(',');
		return [];
	}

	command(cmd: string) {
		if (this.logging())
			this.log(cmd_separator + cmd + '\n');
	
		cp.exec(cmd, (error, stdout, stderr) => {
			if (error) this.log(error.message);
			if (stdout.length) this.log(stdout);
			if (stderr.length) this.log(stderr);
		});
	}

	execute(exe: string, args:string[]) {
		if (this.logging()) {
			var cmd = exe;
			for (let a of args)
				cmd += ' ' + a;
			this.log(cmd_separator + cmd + '\n');
		}

		const child = cp.spawn(exe, args);
		child.on('error', (err) => {
			this.log(err.message);
		});
		child.stdout.on('data', (data) => {
	  	this.log(data);
		});
		child.stderr.on('data', (data) => {
  	  this.log(data);
		});
		if (child.exitCode)
			this.log('Failed to execute the command, exit code is ' + child.exitCode + '.');
	}

	icpp_main(action: string) {
		let activeTextEditor = vscode.window.activeTextEditor;
		if (!activeTextEditor)
			return;
		let activeDocument = activeTextEditor.document;
		if (activeDocument.languageId != 'cpp')
			return;

		activeDocument.save().then(() => {
			const filepath = activeDocument.fileName;
			const argv = this.getConfigList('icpp.args');
			const opt = this.getConfig('icpp.opt');
			const incs = this.getConfigList('a.includes');
			const libds = this.getConfigList('icpp.libdirs');
			const frameworkds = this.getConfigList('icpp.frameworkdirs');
			const shlibs = this.getConfigList('icpp.shlibs');
			const frameworks = this.getConfigList('icpp.frameworks');
			const ip = this.getConfig('iopad.ip');
			const port = this.getConfig('iopad.port');
			const ndk = this.getConfig('iopad.ndk');
			var exe = '';
			var args:string[] = [];
			switch (action) {
			case 'run':
				exe = this.icpp;
				for (let i of incs)
					args.push('-I' + i);
				if (opt.length)
					args.push(opt);
				for (let i of libds)
					args.push('-L' + i);
				for (let i of frameworkds)
					args.push('-F' + i);
				for (let i of shlibs)
					args.push('-l' + i);
				for (let i of frameworks)
					args.push('-f' + i);
				args.push(filepath);
				if (argv.length)
					args.push('--');
				for (let i of argv)
					args.push(i);
				break;
			case 'fire':
				exe = this.iopad;
				if (ip.length)
					args.push('--ip=' + ip);
				if (port.length)
					args.push('--port=' + port);
				if (ndk.length)
					args.push('--ndk=' + ndk);
				for (let i of incs)
					args.push('--incdir=' + i);
				args.push('--fire=' + filepath);
				break;
			case 'format':
				exe = this.icpp;
				args.push('-f');
				args.push(filepath);
				break;
			default:
				break;
			}
			this.execute(exe, args);
		});
	}
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let icpp = new ICPP;
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposablerun = vscode.commands.registerCommand('extension.icpp.run', () => {
		icpp.icpp_main('run');
	});
	const disposablefire = vscode.commands.registerCommand('extension.icpp.fire', () => {
		icpp.icpp_main('fire');
	});
	const disposableformat = vscode.commands.registerCommand('extension.icpp.format', () => {
		icpp.icpp_main('format');
	});
	context.subscriptions.push(icpp);
	context.subscriptions.push(disposablerun);
	context.subscriptions.push(disposablefire);
	context.subscriptions.push(disposableformat);
}
