import { useRef, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type MyCustomAutoFocusPluginProps = {
  editorState: string;
};

export function MyCustomAutoFocusPlugin({
  editorState,
}: MyCustomAutoFocusPluginProps) {
  const [editor] = useLexicalComposerContext();
  const initialStateSet = useRef(false);

  useEffect(() => {
    if (editorState && !initialStateSet.current) {
      initialStateSet.current = true;
      const newEditorState = editor.parseEditorState(editorState);

      editor.setEditorState(newEditorState);
    }
  }, [editor, editorState]);

  return null;
}
