import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import { ElementType, Key, Props, Ref, Type } from 'shared/ReactTypes'

function ReactElement(type: Type, key: Key, ref: Ref, props: Props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    key,
    ref,
    props,
    type,
    __mark: 'learn'
  }

  return element
}

export function jsx(type: ElementType, config: any, ...maybeChildren: any[]) {
  let key: Key = null
  let ref: Ref = null

  const props: Props = {}

  for (const prop in config) {
    const val = config[prop]
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val
      }
      continue
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = '' + val
      }
      continue
    }
    if (Object.prototype.hasOwnProperty.call(config, prop)) {
      props[prop] = val
    }
  }

  const maybeChildrenLength = maybeChildren.length
  if (maybeChildrenLength) {
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0]
    } else {
      props.children = maybeChildren
    }
  }

  return ReactElement(type, key, ref, props)
}

export function jsxDEV(type: ElementType, config: any) {
  let key: Key = null
  let ref: Ref = null

  const props: Props = {}

  for (const prop in config) {
    const val = config[prop]
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val
      }
      continue
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = '' + val
      }
      continue
    }
    if (Object.prototype.hasOwnProperty.call(config, prop)) {
      props[prop] = val
    }
  }

  return ReactElement(type, key, ref, props)
}
