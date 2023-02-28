type TestUnion<A, B = A> = B extends B ? { a: A, b: B } : never;
type TestUnionResult = TestUnion<'a' | 'b' | 'c'>;
type eres = ('d' | 'b' | 'c') extends string ? true : false;

// 数组转联合类型
type union = [3, 1, 2][number]
type Bem<Str extends string, Arr1 extends string[], Arr2 extends string[]> = `${Str}__${Arr1[number]}--${Arr2[number]}` | `${Str}__${Arr2[number]}--${Arr1[number]}`;
type bemResult = Bem<'guang', ['aaa', 'bbb'], ['warning', 'success', '432f']>;

type AllCombinations<A, B = A> = A | B | `${A & string}_${B & string}` | `${B & string}_${A & string}`
type sawe = AllCombinations<'awe' | 'bg' | 'sd'>

type IsEquasl<A, B> = (() => void extends B ? true : false) extends (() => void extends A ? true : false) ? true : false
type sdssf = IsEquasl<2, 2>