# 调和器的作用
jQuery是过程驱动

jquery -- 调用--> 宿主环境 api -- 显示 --> 真实UI

前端框架是状态驱动

描述UI(JSX，模板语法) -- 编译优化（react无） --> 运行时核心模块（react：reconciler，vue：renderer） -- 调用 --> 宿主环境 api -- 显示 --> 真实UI

**React**

- 消费 JSX
- 没有编译优化
- 开放通用API供不同宿主环境使用

# 如何消费jsx

React Element 如果作为 reconciler 操作的数据结构，存在的问题：

- 无法表达节点之间的关系
- 字段有限，不好扩展（比如：无法表示状态）

需要一种新的数据结构

- 介于 React Element 与真实UI节点之间
- 能够表达节点之间的关系
- 方便扩展（不仅作为数据存储单元，也能作为工作单元）

这就是**FiberNode**，即虚拟DOM在React中的实现

# 调和器的工作方式

## 对于同一个节点，比较其ReactElement与FiberNode，生成子FiberNode，并根据比较的结果生成不同标记（插入、删除、移动......），对应不同宿主环境API的执行

```javascript
// 插入 <div></div>
ReactElement: jsx('div')
fiberNode: null
标记: Placement

// <div></div> 更新为 <p></p>
ReactElement: jsx('p')
// jsx('p')执行后的React Element和原来的FiberNode比较
fiberNode: FiberNode { type: 'div' }
// 比较fiberNode发现type不同，生成子FiberNode，生成标记（先删除div后插入p）
标记: Deletion Placement

```

## 当所有 ReactElement 比较完成后，会生成一棵 FiberNode 树，一共会存在两棵 FiberNode 树

- current：与视图中真实UI对应的FiberNode树，这棵树的每个节点称之为current

- workInProgress：触发更新后，正在reconciler中计算的FiberNode树，这棵树的每个节点称之为workInProgress

workInProgress在真实UI更新之后会变成current，current会变成workInProgress，这两棵树会来回替换

## jsx消费的顺序是一个DFS的过程，即如果有子节点，遍历子节点，如果没有子节点，遍历兄弟节点，这是个递归的过程：

- 递：beginWork

- 归：completeWork

# 触发更新的方式

- ReactDOM.createRoot().render() 或者老版的 ReactDOM.render()

- this.setState

- useState 的 dispatch 方法

# 更新机制的组成部分

- 代表更新的数据结构 -- Update

- 消费update的数据结构 -- UpdateQueue

```typescript
 ------ UpdateQueue ------
 |                       |
 | -- Shared.pending --- |
 | |                   | |
 | |    update         | |
 | |                   | |
 | |    update         | |
 | |-------------------| |
 |-----------------------| 
```

- 更新可能发生于任意组件，而更新流程是从根节点递归的

- 需要一个统一的根节点保存通用信息

```typescript
ReactDOM.createRoot(rootElement).render(<App/>)

      fiberRootNode
        |     +
current |     | stateNode
        +     |
      hostRootFiber
        |     +
 child  |     | return
        +     |
          App
```

- 整个应用的统一根节点是 fiberRootNode

- rootElement 这个dom节点有它自己的fiber节点：hostRootFiber

