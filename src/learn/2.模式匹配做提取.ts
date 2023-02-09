// 在正则表达式中我们可以匹配后提取 在ts中一样可以
// 我们想提取value类型
type GetValue<T extends Promise<string>> = T extends Promise<infer S> ? S : 'guang'
type Get1 = GetValue<Promise<'123'>>
type a = never
type s<T extends never> = T extends never ? 'youzi' : 'juzi'
// type gets = p<'4323'>

// 提取数组中的第一个元素类型
type GetFirstArr<T extends unknown[]> = T extends [infer R, ...infer K] ? R : never
type Arr1 = GetFirstArr<[1, 2, 3, 4]>

// 提取数组中的最后一个元素类型
type GetFirstArr2<T extends unknown[]> = T extends [...infer R, infer K] ? K : never
type Arr2 = GetFirstArr2<[1, 2, 3, 4]>

// 提取数组中的除去第一个元素类型
type GetFirstArr3<T extends unknown[]> = T extends [] ? [] : T extends [infer R, ...infer K] ? K : never
type Arr3 = GetFirstArr3<[]>

// 提取数组中的除去最后一个元素类型
type GetFirstArr4<T extends unknown[]> = T extends [] ? [] : T extends [...infer R, string] ? R : never
type Arr4 = GetFirstArr4<[5, 6, '5']>

// 字符串类型
// 匹配字符是否是第一个字符
type GetFirstStr<Str extends string, Pre extends string> = Str extends `${Pre}${string}` ? true : false
type getFirst = GetFirstStr<`afgsgd`, 'af'>