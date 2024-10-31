import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, ContentState, ContentBlock, CharacterMetadata } from 'draft-js';
import { List } from 'immutable';
import { studentlivetclient } from '../../lib/studentlivetclient';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

dynamic(() => import('react-draft-wysiwyg/dist/react-draft-wysiwyg.css'));

const RichTextEditor = forwardRef(({ initialContent, onSave, selectedentryid, setFormChangedTextEditor }, ref) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      try {
        const blocks = initialContent.map(block => {
          let blockType = 'unstyled';
          let listType = null;
          if (block.style) {
            const styleMap = {
              normal: 'unstyled',
              h1: 'header-one',
              h2: 'header-two',
              h3: 'header-three',
              h4: 'header-four',
              h5: 'header-five',
              h6: 'header-six',
              blockquote: 'blockquote'
            };
            blockType = styleMap[block.style] || 'unstyled';
          }

          if (block.listItem) {
            const listMap = {
              bullet: 'unordered-list-item',
              number: 'ordered-list-item'
            };
            blockType = listMap[block.listItem] || blockType;
          }

          const characterListLength = block.children.map(child => child.text).join('').length;
          let characterList = List(
            new Array(characterListLength).fill(null).map(() =>
              CharacterMetadata.create()
            )
          );
          const boldMap = {
            strong: 'BOLD',
            em: 'ITALIC',
          };
          let indexOffset = 0;
          block.children.forEach(child => {
            const text = child.text;
            for (let i = 0; i < text.length; i++) {
              const index = indexOffset + i;
              characterList = characterList.set(index, CharacterMetadata.create(
                child.marks && child.marks.length > 0 && {
                  style: CharacterMetadata.create().getStyle().add(boldMap[child.marks])
                }
              ));
            }
            indexOffset += text.length;
          });

          const contentBlock = new ContentBlock({
            key: block._key,
            type: blockType,
            text: block.children.map(child => child.text).join(''),
            data: block.data,
            characterList: characterList,
            listType: listType
          });

          return contentBlock;
        });

        const contentState = ContentState.createFromBlockArray(blocks);
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error('Error converting initialContent:', error);
      }
    }
    return EditorState.createEmpty();
  });

  // Function to count the total characters in the content
  const countCharacters = (contentState) => {
    return contentState.getPlainText('').length;
  };

  // Store initial character count in a ref
  const initialCharacterCountRef = useRef(countCharacters(editorState.getCurrentContent()));

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const currentCharacterCount = countCharacters(newEditorState.getCurrentContent());
    const isChanged = initialCharacterCountRef.current !== currentCharacterCount;
    setFormChangedTextEditor(isChanged);
  };

  const handleSaveinEditor = async () => {
    try {
      const patch = studentlivetclient.patch(selectedentryid);
      const contentState = editorState.getCurrentContent();

      const blockTypeMap = {
        'header-one': 'h1',
        'header-two': 'h2',
        'header-three': 'h3',
        'header-four': 'h4',
        'header-five': 'h5',
        'header-six': 'h6',
      };

      const listTypeMap = {
        'unordered-list-item': 'bullet',
        'ordered-list-item': 'number',
      };

      const formattedContent = contentState.getBlockMap().toArray().map(block => {
        const blockType = blockTypeMap[block.getType()] || 'normal';
        const listType = listTypeMap[block.getType()] || null;
        const text = block.getText().trim();

        let children = [];
        let currentMarks = [];

        block.findStyleRanges(
          () => true,
          (start, end) => {
            const charText = block.getText().slice(start, end);
            const charStyles = block.getInlineStyleAt(start);

            if (charStyles.has('BOLD')) {
              currentMarks.push('strong');
            }
            if (charStyles.has('ITALIC')) {
              currentMarks.push('em');
            }

            children.push({
              _key: `${start}-${end}`,
              _type: 'span',
              text: charText,
              marks: [...currentMarks],
            });

            currentMarks = [];
          }
        );

        children = children.length > 0 ? children : [{
          _key: Date.now() + Math.random().toString(36).substring(7),
          _type: 'span',
          text: '',
          marks: [],
        }];

        return {
          _key: block.getKey(),
          _type: 'block',
          children,
          style: blockType,
          listItem: listType,
          level: listType !== null ? 1 : 0,
          markDefs: [],
        };
      });

      patch.set({ description: formattedContent });
      await patch.commit();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSaveinEditor
  }));

  useEffect(() => {
    if (typeof window !== 'undefined') {
    }
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .rdw-editor-toolbar .rdw-option-wrapper {
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 2px;
        padding: 2px;
        }
        .rdw-editor-toolbar .rdw-dropdown-wrapper {
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 2px;
        }
        .rdw-editor-toolbar .rdw-dropdown-wrapper .rdw-dropdown-selectedtext {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 1px;
        }
        .rdw-editor-toolbar .rdw-dropdown-wrapper .rdw-dropdown-optionwrapper {
        border: 1px solid #ccc;
        border-radius: 4px;
        }
        .rdw-editor-toolbar .rdw-dropdown-wrapper .rdw-dropdown-optionwrapper li {
        border-top: 1px solid #ccc;
        }
        .rdw-editor-main {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding-left: 10px;
        padding-right: 10px;
        }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '5px', borderRadius: '8px' }}>
      <Editor
        key={selectedentryid}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbar={{
          options: ['inline', 'blockType', 'list', 'history'],
          inline: {
            options: ['bold', 'italic']
          },
          blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
            defaultValue: "Normal",
          },
          list: {
            inDropdown: false,
            options: ['unordered']
          },
        }}
        defaultBlockType="Normal"
      />
      
      {/* 
      <button style={{ border: '1px solid gray', padding: '5px 10px', borderRadius: '4px', marginTop: '10px' }} onClick={handleSaveinEditor}>Save</button>
    */}
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;