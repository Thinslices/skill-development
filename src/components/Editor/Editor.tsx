// External libraries
import React from "react";
import type { ChangeEvent } from "react";

// Theme
import DefaultTheme from "./themes/defaultTheme";

// Lexical components
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

// Lexical nodes
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { TableCellNode, TableRowNode, TableNode } from "@lexical/table";

// Markdown transformers
import { TRANSFORMERS } from "@lexical/markdown";

//plugins
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";

const editorConfig = {
    namespace: "Editor",
    // The editor theme
    theme: DefaultTheme,
    // Handling of errors during update
    onError(error: Error) {
        throw error;
    },
    // Any custom nodes go here
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
};

type EditorProps = {
    className?: string;
    value: string;
    onChange: (question: ChangeEvent<HTMLInputElement>) => void;
};

export const Editor: React.FC<EditorProps> = ({
    className = "border p-2 border-borders focus:outline-0 focus:border-black",
    value,
    onChange,
}) => {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                className={`${className} editor-input`}
                                value={value}
                                onChange={onChange}
                            />
                        }
                        placeholder={() => (
                            <div className="editor-placeholder">Answer</div>
                        )}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
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
