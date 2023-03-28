import type { EditorState } from 'lexical';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { ChangeEvent, useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { TableCellNode, TableRowNode, TableNode } from '@lexical/table';

import { TRANSFORMERS } from '@lexical/markdown';
import theme from './theme';

//extract this
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}
/////////////

const onError = (error: Error) => {
  console.error(error);
};

type EditorProps = {
  value: string | EditorState;
  onChange: (editorState: EditorState) => void;
};

export const Editor = ({ value, onChange }: EditorProps) => {
  const prepopulatedRichText = () => {
    const root = $getRoot();
    const paragraphNode = $createParagraphNode();
    const textNode = $createTextNode(value as string);
    paragraphNode.append(textNode);
    root.append(paragraphNode);
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
    editorState: prepopulatedRichText,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="border border-borders p-2 focus:border-black focus:outline-0" />
            }
            placeholder={<div className="editor-placeholder">Answer</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
