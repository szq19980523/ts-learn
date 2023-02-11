// 在正则表达式中我们可以匹配后提取 在ts中一样可以

import { Class } from "@babel/types"

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
type getFirst = GetFirstStr<`a fgsgd`, 'a f'>

// 替换字符
type Replace<Str extends string, From extends string, To extends string> = Str extends `${infer str}${From}${infer end}` ? `${str}${To}${end}` : Str
type ss = Replace<'2sfdsfdsf', '2', '1dfdf'>

// 去除左边空白字符
type TrimLeft<Str extends string> = Str extends `${(' ' | '\n' | '\t')}${infer str}` ? TrimLeft<str> : Str;
type sss = TrimLeft<' fs  dfsd  fdfs'>

// 去除右边空白字符
type TrimRight<Str extends string> = Str extends `${infer str}${(' ' | '\n' | '\t')}` ? TrimRight<str> : Str;
type ssss = TrimRight<' fs  dfsd  fdfs   '>

// 去除所有空白字符
type TrimCenter<Str extends string> = Str extends `${infer str}${(' ' | '\n' | '\t')}${infer str1}` ? TrimCenter<`${str}${str1}`> : Str;
type sssss = TrimCenter<' fsdfsdfdfs'>

// 函数
// 提取函数的参数
type getFuncParameters<T extends Function> = T extends (...args: infer R) => any ? R : never
type sdf = getFuncParameters<(s: string, gds: number, dfgds: {}) => unknown>

// 提取函数的返回值
type getFuncReturn<T extends Function> = T extends (...args: any[]) => infer R ? R : never
type sdfs = getFuncReturn<() => string>

// class
class Dong {
  name: string;

  constructor() {
    this.name = "dong";
  }

  hello(this: Dong) {
    console.log('hello, I\'m ' + this.name);

  }
}

const dong = new Dong();
dong.hello();
// dong.hello.call({ x: 111 });
type GetThisParameterType<T>
  = T extends (this: infer ThisType, ...args: any[]) => any
  ? ThisType
  : unknown;
type get = GetThisParameterType<typeof dong.hello>

// 提取构造器参数类型
interface PersonCon {
  new(name: string, age: number): { name: string, age: number }
}
type GetConstructor<T extends new (...args: any[]) => void> = T extends new (...args: infer R) => void ? R : never
type se = GetConstructor<PersonCon>

// 提取构造器返回参数类型
type GetConstructors<T extends new (...args: any[]) => void> = T extends new (...args: any[]) => infer R ? R : never
type selectstart = GetConstructors<PersonCon>
type ss32 = 'ss'
type b = ss32 extends keyof { ss: number } ? true : false


// 索引类型
// 拿react计算ref举例
type refProps<props extends object> = 'ref' extends keyof props ? props extends { ref?: infer Value }
  ? Value
  : never
  : never;
type seew = refProps<{ ref: 2 }>