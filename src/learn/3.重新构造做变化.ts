// TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造。
// 数组、字符串、函数等类型的重新构造比较简单。
// 索引类型，也就是多个元素的聚合类型的重新构造复杂一些，涉及到了映射类型的语法。
// 我们先从简单的开始
// 数组类型的重新构造

type tuple = [1, 2, 3];
type Push<Arr extends unknown[], Arr2 extends unknown[]> = [...Arr, ...Arr2]
type sdf = Push<tuple, [string, number]>
type StringNumber = string | number
// 数组扁平化
type Flat<Arr extends any[]> = Arr extends StringNumber[] ? Arr : Arr extends [infer First, ...infer Rest] ? First extends StringNumber ? Flat<[...Rest, First]> : First extends any[] ? Flat<[...First, ...Rest]> : never : never
type dsaf = Flat<[1, 32, 565, 54, [23, 32, [23, [235, [456346]]]]]>
// type PushArr<Arr extends unknown[], Arr2 extends unknown[]> = Arr extends [...infer R] ? '' : ''
type fsdf = [[2, 3], 23] extends [] ? true : false
// 合并元组
// 变成这样的形式 [[1, 'guang'], [2, 'dong']];
type tuple1 = [1];
type tuple2 = ['guang'];
type ParmerArr<Arr1 extends any[], Arr2 extends any[]> = Arr1 extends [infer a, ...infer b] ? Arr2 extends [infer c, ...infer d] ? [[a, c], ...ParmerArr<b, d>] : [] : []
type dfd = ParmerArr<tuple1, tuple2>
type sdft = [] extends [] ? true : false;

// 过滤
type get<T> = T extends {
  [key in keyof T]: infer R
} ? R : ''
type FilterByValueType<
  Obj extends Record<string, any>,
  ValueType extends Record<'a', any>
> = {
    [key in keyof Obj as Obj[key] extends get<ValueType> ? key : never]: Obj[key]
  }

type sd = FilterByValueType<{ s: string, d: number }, { a: number }>
type df = Record<symbol, any>
const obsj: df = {
  [Symbol(1)]: '4235'
}