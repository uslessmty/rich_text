import React from 'react'
import ReactDOM from 'react-dom';
import { HEADING_LEVEL } from '.';

export const HeadingElement = props => {
  const { level } = props;
  switch(level) {
    case HEADING_LEVEL.LEVEL_2: {
      return <h2 {...props.attributes}>
        {props.children}
      </h2>
    }
    case HEADING_LEVEL.LEVEL_1: 
    default: {
      return <h1 {...props.attributes}>
        {props.children}
      </h1>
    }
  }
}

export const DefaultElement = props => {
  return <div>
    <div
      contentEditable={false}
      style={{
        userSelect: 'none',
        color: 'red'
      }}
    >
    菜单
    </div>
    <p 
    style={{
      position: 'relative'
    }}
    {...props.attributes}>
      {props.children}</p>
  </div>
}

export const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ 
        fontWeight: props.leaf.bold ? 'bold' : 'normal' ,
        color: props.leaf.color ? props.leaf.color : 'auto'
      }}
    >
      {props.children}
    </span>
  )
}


export * from './SelectBar';