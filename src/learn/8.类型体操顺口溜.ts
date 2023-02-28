// ParseQueryString
// a=1&b=2&c=3&d=4，这样的字符串明显是 query param 个数不确定的，遇到数量不确定的问题，条件反射的就要想到递归：
type ParseString<T> = T extends `${infer First}=${infer Value}` ? {
  [key in First]: Value;
} : {}

type MergeValues<value1, value2> = IsEqual1<value1, value2> extends true ? value1 : [value1, value2]

type MergeParams<Obj1 extends object, Obj2 extends object> = {
  [key in keyof Obj1 | keyof Obj2]: key extends keyof Obj1 ? key extends keyof Obj2 ? MergeValues<Obj1[key], Obj2[key]> : Obj1[key] : key extends keyof Obj2 ? Obj2[key] : never
}
type dse = MergeParams<{ a: 1 }, { a: 2, b: 2 }>


type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
  ? MergeParams<ParseString<Param>, ParseQueryString<Rest>>
  : ParseString<Str>;

type Obj123 = ParseQueryString<`a=1&b=2&c=3&d=4&b=5`>