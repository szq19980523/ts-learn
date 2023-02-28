function parseQueryString<T extends string>(queryStr: T): ParseQueryString<T>
function parseQueryString(queryStr: string) {
  if (!queryStr || !queryStr.length) {
    return {};
  }
  const queryObj: Record<string, any> = {};
  const items = queryStr.split('&');
  items.forEach(item => {
    const [key, value] = item.split('=');
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value);
      } else {
        queryObj[key] = [queryObj[key], value]
      }
    } else {
      queryObj[key] = value;
    }
  });
  return queryObj;
}
const asd = parseQueryString('a=2&b=3')
type GEtPromiseType<T extends any> = T extends Promise<infer R> ? R : T;
// asd.b
type PromiseAllType<T extends any[], Res extends unknown[] = []> = T extends [infer S, ...infer Rest] ? PromiseAllType<Rest, [S, ...Res]> : Res
interface PromiseConstructor {
  all<T extends readonly unknown[] | []>
    (values: T): Promise<{
      -readonly [P in keyof T]: Awaited<T[P]>
    }>;
}
function all<T extends Promise<any>[]>(a: T): PromiseAllType<T>
function all(a: any[]) {
  return a
}

type Arrsde = [[2], 345, { a: 1 }];
type DRE<T> = {
  [key in keyof T]: T[key]
}
type sdrer = DRE<Arrsde>

/**
 * 
 * currying
做了一个参数类型和返回值类型有关系的案例，再来看一个更复杂点的：

有这样一个 curring 函数，接受一个函数，返回柯里化后的函数。

也就是当传入的函数为：

const func = (a: string, b: number, c: boolean) => {};
返回的函数应该为：

(a: string) => (b: number) => (c: boolean) => void
 */

const funcs = (a: string, b: number, c: boolean) => { };
type Currying<T> = T extends (a: infer R, ...b: infer Rest) => void ? 123 : 456

type CurriedFunc<Params, Return> =
  Params extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurriedFunc<Rest, Return>
  : never;

declare function currying<Func>(fn: Func):
  Func extends (...args: infer Params) => infer Result ? CurriedFunc<Params, Result> : never;

const ase = currying(funcs)
