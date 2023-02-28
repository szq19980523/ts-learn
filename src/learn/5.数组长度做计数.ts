type Build<Length extends number, Ele extends any = unknown, BuildArr extends unknown[] = []> = BuildArr['length'] extends Length ? BuildArr : Build<Length, Ele, [Ele, ...BuildArr]>;
type Arr = BuildArray<5>

// 数组长度实现加减乘除

// Add
type Add<A extends number, B extends number> = [...Build<A>, ...Build<B>]['length']
type ersd = Add<20, 53>
// type fushu<T extends string | number> = `-${T}`
// 减法 subTract
type subTract<A extends number, B extends number> = BuildArray<A> extends [...BuildArray<B>, ...infer K extends unknown[]] ? K['length'] : never;
type dfs = subTract<32, 56>

// Multiply 乘法
// 乘法本质上就是加法的递归
type Multiply<A extends number, B extends number, C extends number = 1, D extends number = B> = C extends A ? B : Multiply<A, Add<B, D> & number, Add<C, 1> & number, D>
type ressdf = Multiply<20, 3>

// Divide 除法
// 除法本质上是减法的递归
type Divides<A extends number, B extends number, Res extends unknown[] = []> = A extends 0 ? Res['length'] : Divides<subTract<A, B>, B, [...Res, unknown]>
type dsf = Divides<12, 3>

// 计算字符串长度
type StrLen<Str extends string, Res extends unknown[] = []> = Str extends `${infer First}${infer Rest}` ? StrLen<Rest, [...Res, First]> : Res['length']
type sdfsd = StrLen<'34f   fdsfs'>

// 数字的比较大小
type GreaterThan<A extends number, B extends number, Res extends unknown[] = []> = A extends B ? true : Res['length'] extends A ? B : Res['length'] extends B ? A : GreaterThan<A, B, [...Res, unknown]>
type dfdss = GreaterThan<5, 6>

// 谈到了数值运算，就不得不提起经典的 Fibonacci 数列的计算。
type Fibonacci<length extends number, ResArr extends unknown[] = [], F0 extends number = 1, F extends number = 0> = length extends 0 ? 1 : length extends ResArr['length'] ? F : Fibonacci<length, [...ResArr, unknown], F, Add<F0, F> & number>
type fibon = Fibonacci<17>