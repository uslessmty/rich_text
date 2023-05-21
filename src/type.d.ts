
import { BaseEditor, BaseNode, BaseElement, BaseText } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { 
  type: string; 
  children: CustomText[];
}
type CustomText = { 
  text: string 
}
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: BaseElement & CustomElement
    Text: BaseText & CustomText,
    Node: BaseNode 
  }
}