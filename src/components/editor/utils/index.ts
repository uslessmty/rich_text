import { HEADING_LEVEL } from './types';
export * from './types';
export * from './components';
import { Editor, Transforms, Element, } from 'slate'

export const CustomEditor = {
  toggleDefaultBlock(editor) {
    Transforms.setNodes(
      editor,
      { type: null },
      { match: n => Editor.isBlock(editor, n) && Element.isElement(n) }
    )
  },
  toggleHeading(editor, level) {
    Transforms.setNodes(
      editor,
      { type: level === HEADING_LEVEL.LEVEL_1 ? 'heading1' : 'heading2' },
      { match: n => Editor.isBlock(editor, n) && Element.isElement(n) }
    )
  },
}