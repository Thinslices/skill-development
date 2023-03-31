import type { EditorState, LexicalEditor } from 'lexical';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
} from 'lexical';

import { $generateHtmlFromNodes } from '@lexical/html';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';

import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { TableCellNode, TableRowNode, TableNode } from '@lexical/table';

import { TRANSFORMERS } from '@lexical/markdown';
import theme from './theme';
import AutoLinkPlugin from './AutoLinkPlugin';
import CodeHighlightPlugin from './CodeHighlightPlugin';
import ToolbarPlugin from './ToolbarPlugin';
import type { AnswerType } from '../../utils/types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

const onError = (error: Error) => {
  console.error(error);
};

type EditorProps = {
  editorState: string;
  onChange: (answer: AnswerType) => void;
};

type MyCustomAutoFocusPluginProps = {
  editorState: string;
};
function MyCustomAutoFocusPlugin({
  editorState,
}: MyCustomAutoFocusPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (editorState) {
      console.log('aici', editorState);
      const newEditorState = editor.parseEditorState(editorState);

      // Focus the editor when the effect fires!
      editor.setEditorState(newEditorState);
    }
  }, [editorState, editor]);

  return null;
}

export const Editor = ({ editorState, onChange }: EditorProps) => {
  const onChangeLexical = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      const htmlString = $generateHtmlFromNodes(editor);

      // onChange ar trebui sa trimita
      // text - for backwards compatibility
      // htmlString - to be displayed in frontend
      // editorState - to be reinitialized in Edit

      onChange({
        text,
        htmlString,
        editorState: JSON.stringify(editorState.toJSON()),
      });
    });
  };

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,

    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editable: true,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="border border-borders p-2 focus:border-black focus:outline-0" />
            }
            placeholder={<div className="editor-placeholder">Answer</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MyCustomAutoFocusPlugin editorState={editorState} />
          <OnChangePlugin onChange={onChangeLexical} />
          <HistoryPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
};
