import chromeTheme from './themes/chrome';
import monokaiTheme from './themes/monokai';
import { format } from './format';
import { loader } from '@monaco-editor/react';
import { initNpmCDNRegistry } from '../../registry';
import { initDeclarations } from './declarations';

initNpmCDNRegistry(loader);

let initialized = false;

export const initMonaco = () => {
  if (initialized) return;

  loader.init().then((monaco) => {
    console.log('init Monaco Input');
    monaco.editor.defineTheme('monokai', monokaiTheme as any);
    monaco.editor.defineTheme('chrome-devtools', chromeTheme as any);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: true,
    });
    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      async provideDocumentFormattingEdits(model) {
        return [
          {
            text: await format(
              model['getDesignerLanguage']?.() || 'typescript',
              model.getValue()
            ),
            range: model.getFullModelRange(),
          },
        ];
      },
    });
    monaco.languages.register({ id: 'less' });
    monaco.languages.setLanguageConfiguration('less', {
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: "'", close: "'" },
        { open: '"', close: '"' },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: "'", close: "'" },
        { open: '"', close: '"' },
      ],
    });

    monaco.languages.setMonarchTokensProvider('less', {
      tokenizer: {
        root: [
          [/#[0-9A-Fa-f]{6}/, 'color.hex'],
          [/\$[\w-]+/, 'variable'],
          // 其他的 LESS 语法规则
        ],
      },
    });

    // 添加 LESS 语言的 IntelliSense 支持
    monaco.languages.registerCompletionItemProvider('less', {
      provideCompletionItems: function (model, position) {
        const suggestions = [];

        // 根据需要添加 LESS 语法的提示项
        suggestions.push({
          label: 'color',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'color: #000000;',
        });
        suggestions.push({
          label: 'background',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'background: #ffffff;',
        });
        // 其他的提示项

        return { suggestions };
      },
    });

    initDeclarations(monaco);

    initialized = true;
  });
};
