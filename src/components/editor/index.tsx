import React, { useState, useCallback, useMemo, } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor, } from 'slate-react'
import { withHistory } from 'slate-history';
import { HeadingElement, DefaultElement, Leaf, SelectBar, CustomEditor, HEADING_LEVEL } from './utils';


export function EditorComponent () {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [read_only, set_read_only] = useState(false);
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'heading1':
        return <HeadingElement {...props} level={HEADING_LEVEL.LEVEL_1} />
      case 'heading2':
        return <HeadingElement {...props} level={HEADING_LEVEL.LEVEL_2} />
      case 'paragraph':
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])
  const initialValue = useMemo(
    () =>
      [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
        
        {
          type: 'paragraph',
          children: [{ text: '1111.' }],
        },
        
        {
          type: 'paragraph',
          children: [{ text: '2222.' }],
        },
        
        {
          type: 'paragraph',
          children: [{ text: '3333.' }],
        },
        
        {
          type: 'paragraph',
          children: [{ text: '4444.' }],
        },
      ],
    []
  )

  return <Slate 
    onChange={value => {
      const isAstChange = editor.operations.some(
        op => 'set_selection' !== op.type
      )
      if (isAstChange) {
        // Save the value to Local Storage.
        const content = JSON.stringify(value)
        localStorage.setItem('content', content)
      }
    }}
    editor={editor} value={initialValue}>
    <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            ReactEditor.blur(editor)
            editor.undo()
          }}
        >
          undo
        </button>
        <button
          
          onMouseDown={event => {
            event.preventDefault()
            ReactEditor.blur(editor)
            editor.redo()
          }}
        >
          redo
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleHeading(editor, HEADING_LEVEL.LEVEL_1)
          }}
        >
          H1
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleHeading(editor, HEADING_LEVEL.LEVEL_2)
          }}
        >
          H2
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleDefaultBlock(editor)
          }}
        >
          T
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            set_read_only(true);
          }}
        >
          set readonly true
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            set_read_only(false);
          }}
        >
          set readonly false
        </button>
        <button
          
          onMouseDown={event => {
            event.preventDefault()
            const p = document.querySelector('p');
          }}
        >
          focus
        </button>
    </div>
    <SelectBar read_only={read_only} />
    <Editable 
      renderElement={renderElement}
      readOnly={read_only}
      renderLeaf={renderLeaf}
      style={{
        paddingLeft: 30,
      }}
    />
  </Slate>
}
