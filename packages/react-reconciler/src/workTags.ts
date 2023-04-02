export type WorkTag =
  | typeof FunctionComponent
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText

export const FunctionComponent = 0

export const HostRoot = 3
// eg: div 对应的fibder Node 就是 HostComponent
export const HostComponent = 5
// eg: <div>123</div> 123->hostText
export const HostText = 6
