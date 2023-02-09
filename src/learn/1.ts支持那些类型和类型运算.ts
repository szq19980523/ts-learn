interface IPerson {
  name: string;
  age: number;
}

interface PersonCon {
  new(name: string, age: number): IPerson
}
// 构造器
function createPerson(ctor: PersonCon): IPerson {
  return new ctor('123', 18)
}

// 索引类型
interface Student {
  [key: string]: number | number[]
}
const obj: Student = {};
// obj.name = 'guang';
obj.age = 18;
// obj.age = [12, '323'];

function func(str: `sr${number}s3`): number {
  return 23
}
// func(`srdd332`)
func(`sr332s3`)

// 条件 extends
type Turple<T> = T extends 2 ? 1 : string;
type res = Turple<1>
type ress = Turple<2>

// 推导infer
// 这里的extends是类型约束
type Infer<T extends (number | string)[]> = T extends [infer R, ...infer K] ? [...K, R] : never;
type InferRes = Infer<[5, 6, 7, '6']>
const arr: InferRes = [6, 7, '6', 5]

// 联合类型&
type Unino = { a: string } & { b: number }
const on: Unino = {
  a: '434',
  b: 323
}
// 如果联合的不同类型 就会舍弃变成never
type Unino2 = { a: 323 } & string
type Unino3 = number & string
// const unino2: Unino2 = { a: 323 }


// 映射类型
type MapType<T> = {
  [key in keyof T]: [T[key]]
}
type Maps = MapType<{ a: 23, b: '45' }>
//keyof T 是查询索引类型中所有的索引，叫做索引查询。
//T[Key] 是取索引类型某个索引的值，叫做索引访问。
// 重映射用as
type MapTypes2<T> = {
  [key in keyof T as `${key extends string ? key : '323'}`]: [T[key], T[key]]
}
// 这里用& 是因为索引类型是string ｜ number ｜ symbol 这里只能取string
const df = Symbol(1)

const obj1 = {
  [df]: '323',
  'test': '535'
}
type Maps2 = MapTypes2<typeof obj1>