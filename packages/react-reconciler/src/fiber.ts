import { Key, Props, Ref } from 'shared/ReactTypes'
import { WorkTag } from './workTags'
import { Flags, NoFlags } from './fiberFlags'

export class FiberNode {
  tag: number
  key: Key
  stateNode: any
  type: any
  return: FiberNode | null
  sibling: FiberNode | null
  child: FiberNode | null
  index: number
  ref: Ref | null
  pendingProps: any
  memoizedProps: null
  alternate: FiberNode | null
  flags: Flags

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // FiberNode是什么类型的节点
    this.tag = tag
    this.key = key
    // eg: HostComponent <div> 的 stateNode 保存了 div dom
    this.stateNode = null
    // fiberNode类型,例如tag为FC，那么type就是Function本身
    this.type = null

    /** 形成链表树结构 */
    // 指向父FiberNode
    this.return = null
    // 指向右侧兄弟FiberNode
    this.sibling = null
    // 指向子节点的fiberNode
    this.child = null

    this.index = 0

    this.ref = null

    /** 作为工作单元 */
    // 工作单元刚开始准备工作时的props
    this.pendingProps = pendingProps
    // 工作单元工作完成时的props
    this.memoizedProps = null
    // 指针，current -> WIP，WIP -> current
    this.alternate = null
    // 副作用
    this.flags = NoFlags
  }
}
