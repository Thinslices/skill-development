import type { EditorState } from 'lexical';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

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

const onError = (error: Error) => {
  console.error(error);
};

type EditorProps = {
  value: string | EditorState;
  onChange: (editorState: string) => void;
};

export const Editor = ({ value, onChange }: EditorProps) => {
  const prepopulatedRichText = () => {
    const root = $getRoot();
    const paragraphNode = $createParagraphNode();
    const textNode = $createTextNode(value as string);
    paragraphNode.append(textNode);
    root.append(paragraphNode);
  };

  const onChangeLexical = (editorState: EditorState) => {
    console.log({ editorState });
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();

      onChange(text);
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
    editorState: prepopulatedRichText,
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
