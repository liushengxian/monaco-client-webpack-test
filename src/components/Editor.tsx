import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import * as client from './client';


// @ts-ignore
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
	getWorkerUrl: function (_moduleId: any, label: string) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

export const Editor: React.FC = () => {
	const divEl = useRef<HTMLDivElement>(null);
	let editor: monaco.editor.IStandaloneCodeEditor;
	useEffect(() => {
		if (divEl.current) {
			const value = `{
				"$schema": "http://json.schemastore.org/coffeelint",
				"line_endings": "unix"
			}`;

			editor = monaco.editor.create(divEl.current, {
				model: monaco.editor.createModel(value, 'json', monaco.Uri.parse('inmemory://model.json')),
				value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
				language: 'typescript'
			});

			// monaco.editor.create(document.getElementById('container')!, {
			// 	model: monaco.editor.createModel(value, 'json', monaco.Uri.parse('inmemory://model.json')),
			// 	glyphMargin: true,
			// 	lightbulb: {
			// 		enabled: true
			// 	},
			// 	automaticLayout: true
			// });
		}

		console.log('client:', client);
		return () => {
			editor.dispose();
		};
	}, []);
	return <div className="Editor" ref={divEl}></div>;
};
