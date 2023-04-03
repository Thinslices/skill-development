import theme from './theme';
import { $getRoot } from 'lexical';
import type { EditorState, LexicalEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { TableCellNode, TableRowNode, TableNode } from '@lexical/table';

import CodeHighlightPlugin from './CodeHighlightPlugin';
import ToolbarPlugin from './ToolbarPlugin';

import type { AnswerType } from '../../utils/types';
import { MyCustomAutoFocusPlugin } from './MyCustomAutoFocusPlugin';

const onError = (error: Error) => {
  console.error(error);
};

type EditorProps = {
  editorState: string;
  onChange: (answer: AnswerType) => void;
};

export const Editor = ({ editorState, onChange }: EditorProps) => {
  const onChangeLexical = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      const htmlString = $generateHtmlFromNodes(editor);

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
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
