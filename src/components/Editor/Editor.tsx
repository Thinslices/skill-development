import theme from './theme';
import { $getRoot } from 'lexical';
import type { EditorState, LexicalEditor } from 'lexical';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { TableCellNode, TableRowNode, TableNode } from '@lexical/table';

import CodeHighlightPlugin from './CodeHighlightPlugin';
import ToolbarPlugin from './ToolbarPlugin';

import type { AnswerType } from '../../utils/types';

const onError = (error: Error) => {
  console.error(error);
};

type EditorProps = {
  markdown: string;
  onChange: (answer: AnswerType) => void;
};

export const Editor = ({ markdown, onChange }: EditorProps) => {
  const onChangeLexical = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      const htmlString = $generateHtmlFromNodes(editor);
      const markdown = $convertToMarkdownString(TRANSFORMERS);

      onChange({
        text, // for backwards compatibility
        htmlString, // display in ui
        markdown,
      });
    });
  };

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    editorState: () => $convertFromMarkdownString(markdown, TRANSFORMERS),
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
      <div className="editor-container border border-borders">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="max-w-none space-y-6 border-t border-borders px-6 py-4 text-xl focus:outline-0" />
            }
            placeholder={<div className="editor-placeholder">Answer</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChangeLexical} />
          <HistoryPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
