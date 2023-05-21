import React from 'react'
import ReactDOM from 'react-dom';
import { Editor, Node } from 'slate';
import { useFocused, useSlate, useSlateSelection, ReactEditor } from 'slate-react';

export const SelectBar = (props) => {
  const { read_only } = props;
  const focus = useFocused();
  const editor = useSlate();
  const selection = useSlateSelection();
  const text = selection ? Editor.string(editor, selection) : null;

  return text && focus && !read_only ? <div>
    {text}
  </div> : null
}