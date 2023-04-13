import React from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
	fontSize: 15,
	fontFamily: 'Consolas, Menlo',
};

type ShareOptions = Partial<{
	code: string;
	fontS: number;
	fontF: string;
	line: number;
	theme: string;
}>;

const safeParseJson = (value: string) => {
	try {
		return JSON.parse(value);
	} catch (e) {
		return {};
	}
};

const parseShareOptionsFromQuery = (): ShareOptions => {
	const searchParams = new URLSearchParams(window.location.search);
	const content = safeParseJson(window.atob(searchParams.get('q') ?? 'e30='));
	return content;
};

const defaultCodeValue = `console.log('Welcome to Typescript Playground')

`;

function App() {
	const onMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
		const { code, fontS, fontF, line, theme } = parseShareOptionsFromQuery();
		editor.updateOptions({
			fontSize: fontS ?? defaultOptions.fontSize,
			fontFamily: fontF ?? defaultOptions.fontFamily,
		});
		editor.getModel();
		editor.setValue(code ?? defaultCodeValue);
		editor.setPosition({ column: 0, lineNumber: line ?? 1 });
		monaco.editor.setTheme(theme ?? 'vs-dark');
	};

	return (
		<div className='w-100 h-100'>
			<Editor
				defaultLanguage='typescript'
				defaultValue={defaultCodeValue}
				onMount={onMount}
			/>
		</div>
	);
}

export default App;
