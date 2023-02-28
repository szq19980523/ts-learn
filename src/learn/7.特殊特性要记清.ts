/**
 * 
 * 特殊类型的特性
TypeScript 类型系统中有些类型比较特殊，比如 any、never、联合类型，比如 class 有 public、protected、private 的属性，比如索引类型有具体的索引和可索引签名，索引还有可选和非可选。。。

如果给我们一种类型让我们判断是什么类型，应该怎么做呢？

类型的判断要根据它的特性来，比如判断联合类型就要根据它的 distributive 的特性。
 */

// 判断any类型 利用any和任何类型联合都是any
type IsAny<T> = 'a' extends ('b' & T) ? true : false;
type dfse = IsAny<any>

// 判断类型是否相等
// 用于任何类型和any都是true 所以any得单独处理下
/**
如果是两个条件类型 T1 extends U1 ? X1 : Y1 和 T2 extends U2 ? X2 : Y2 相关的话，那 T1 和 T2 相关、X1 和 X2 相关、Y1 和 Y2 相关，而 U1 和 U2 相等。

注意，这里 U1 和 U2 是相等的，不是相关。

如果是判断相关性的话，任意类型 extends any 都是 true，但通过构造两个条件类型判断相关性，就可以利用 extends 右边部分相等的性质来判断两个类型是否 equal。
 */
type IsEqual1<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true
type dfssee = IsEqual1<8, 5>

type dsfe = (<T>() => T) extends (<T>() => T) ? true : false;
type TypeFunc = <T>(a: T) => T
// type dfwer<T> = (parame: string) => T
const dsae: TypeFunc = (a) => {
  return a
}

// 判断是不是union
type IsUnion<A, B = A> = A extends B ? [B] extends [A] ? false : true : never;
type dfssd = IsUnion<1 | 2>

// 判断是不是never
type isNever<T> = [T] extends [never] ? true : false;
type nev = isNever<never>

// 判断是不是元组Tuple类型
//  Tuple类型length是具体数字 数组length是number
type IsTuple<T> = T extends [...infer R] ? NotEqual<R['length'], number> : false
type sdar = IsTuple<[1]>

// 联合类型转交叉类型
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
  ? R
  : never
type dfsa = UnionToIntersection<{ a: 1 } | { b: 2 }>
interface Person {
  a: 1
}
type dasds = ({ a: 1 }) extends ({ a: 1 } | { b: 2 }) ? true : false

interface Guang {
  name: string;
  age: number;
  hobbies: string[]
}
let printHobbies: (guang: dfsa) => void;

printHobbies = (guang) => {
  console.log(3124);
}
type daes = typeof printHobbies;
type dae32s = typeof printName;
type se = dae32s extends daes ? true : false

let printName: (person: Person) => void;

printName = (person) => {
}
printHobbies = printName


type Func = (a: 123) => number;

const sdsa: Func = (a: number) => 456

// GetOptional
// 提取索引类型中的可选索引 利用可选索引的值为undefined和值类型的联合类型
type Obj = {
  name: string;
  age?: number;
}

type GetOptional<T> = {
  [
  Key in keyof Obj
  as {} extends Pick<Obj, Key> ? Key : never
  ]: Obj[Key];
}
type sdsde = GetOptional<Obj>

// GetRequired
// 提取索引类型中的必选索引
type GetRequired<T extends object> = { [
  Key in keyof Obj
  as {} extends Pick<Obj, Key> ? never : Key
  ]: Obj[Key] };
type ds = GetRequired<Obj>

// RemoveIndexSignature
// 索引类型可能有索引，也可能有可索引签名。 移除可索引签名

type Dong = {
  [key: string]: any;
  sleep(): void;
}

type RemoveIndexSignature<T extends object> = {
  [key in keyof T as key extends `${infer str}` ? key : never]: T[key]
}
type srrs = RemoveIndexSignature<Dong>

/**
 * any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。
never 作为类型参数出现在条件类型左侧时，会直接返回 never。
any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
元组类型也是数组类型，但 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
可选索引的索引可能没有，那 Pick 出来的就可能是 {}，可以用来过滤可选索引，反过来也可以过滤非可选索引。
索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。
默认推导出来的不是字面量类型，加上 as const 可以推导出字面量类型，但带有 readonly 修饰，这样模式匹配的时候也得加上 readonly 才行。
 */
