// 去promise的value
type PromiseValue = Promise<Promise<Promise<Promise<string>>>>
type GetValue<T> = T extends Promise<infer Value> ? GetValue<Value> : T
type sds = GetValue<PromiseValue>

// 数组类型的递归 把它反过来
type arr = [1, 2, 3, 4, 5];
type arr2 = [5, 4, 3, 2, 1];
type ReverseArr<ARR> = ARR extends [infer R, ...infer K] ? [...ReverseArr<K>, R] : ARR
type reverse = ReverseArr<arr>

// 递归查找某个元素
type InCludes<Arr, Num> = Arr extends [infer R, ...infer K] ? R extends Num ? true : InCludes<K, Num> : false
type getsd = InCludes<arr, 4>
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

// 删除某个元素
type Delete<Arr extends unknown[], Item, Arr2 extends unknown[] = []> = Arr extends [infer R, ...infer K] ? IsEqual<R, Item> extends true ? Delete<K, Item, [...Arr2]> : Delete<K, Item, [...Arr2, R]> : Arr2
type dfsf = Delete<arr2, 2>

// BuildArray
// 构造制定长度的数组
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = Arr['length'] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>
type das = BuildArray<6, 1, [35]>

// 字符串类型的递归
// 替换字符

type ReplaceAll<str extends string, from extends string, to extends number> = str extends `${infer R}${from}${infer K}` ? ReplaceAll<`${R}${to}${K}`, from, to> : str;
type dgs = ReplaceAll<'grdgfdfvxfewtfgssdfg', 'g', 111>

// 字符串转联合类型
type StringToUnion<str extends string> = str extends `${infer R}${infer K}` ? K : never;
type sdg = StringToUnion<'gdfyte'>

// 字符串的反转
type ReverseStr<Str extends string, Res extends string = ''> = Str extends `${infer First}${infer K}` ? ReverseStr<K, `${First}${Res}`> : Res
type stee = ReverseStr<'asdfghj'>

// 对象类型的递归
// ts只有涉及到计算才会显示类型
type DeepReadonly<T> = T extends any ? {
  readonly [key in keyof T]: T[key] extends object ? DeepReadonly<T[key]> : T[key]
} : never
type dfsfe = DeepReadonly<{
  a: string, b: {
    c: number;
    d: {
      s: any
    }
  }
}>
const a: dfsfe = {
  a: '23',
  b: {
    c: 1,
    d: {
      s: 1
    }
  }
}
a.b.d.s = 1