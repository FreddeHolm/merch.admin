
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { EditorState, convertFromRaw, ContentState, ContentBlock } from 'draft-js'; // Import EditorState and convertFromRaw
import { studentlivetclient } from '../../lib/studentlivetclient';

// Import react-draft-wysiwyg dynamically to prevent server-side rendering
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false, // Disable server-side rendering
});

// Import react-draft-wysiwyg CSS dynamically
dynamic(() => import('react-draft-wysiwyg/dist/react-draft-wysiwyg.css'));

function RichTextEditorRead({ initialContent, onSave, selectedentryid }) {
  // Parse initial content and set it to the editor state
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      try {
        const contentBlocks = initialContent.map(block => {
          
          
          const blockWithMarginTop = `${block.children.map(child => child.text).join("")}\n`;
          
          return new ContentBlock({
            key: block._key, // Assuming _key is a unique identifier for each block
            type: block._type, // Assuming _type specifies the type of block (e.g., paragraph)
            text: blockWithMarginTop,            
            data: block.data, // Pass data directly since it's already an object
          });
        });

        const contentState = ContentState.createFromBlockArray(contentBlocks);
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error('Error converting initialContent:', error);
      }
    }
    return EditorState.createEmpty();
  });

  // Disable editor toolbar
  const toolbar = {
    options: [],
  };

  // Ensure the component is only mounted in the browser environment
  useEffect(() => {
    // Check if window object is available
    if (typeof window !== 'undefined') {
      // You can perform any client-side initialization here
    }
  }, []);

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarHidden
        readOnly
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbar={toolbar}
      />
    </div>
  );
}

export default RichTextEditorRead;