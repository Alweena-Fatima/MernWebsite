import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';

const Toolbar = ({ editor }) => {
  if (!editor) return null;
  const addImage = () => {
    const url = window.prompt('URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };
  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border border-sky-200 bg-sky-50 rounded-t-lg">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''}>Underline</button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>Code Block</button>
      <button onClick={addImage}>Image</button>
    </div>
  );
};

const RichTextEditor = ({ onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit, // Use the default StarterKit which includes a basic code block
      Image,
      Underline,
    ],
    content: '<p>Start writing your notes here...</p>',
    onUpdate: ({ editor }) => { onUpdate(editor.getHTML()); },
    editorProps: {
      attributes: {
        class: 'prose min-h-[200px] max-w-full p-4 border border-sky-200 rounded-b-lg focus:outline-none',
      },
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;