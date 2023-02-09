// 在正则表达式中我们可以匹配后提取 在ts中一样可以
// 我们想提取value类型
type GetValue<T extends Promise<string>> = T extends Promise<infer S> ? S : 'guang'
type Get1 = GetValue<Promise<'123'>>
type a = never
type s<T extends never> = T extends never ? 'youzi' : 'juzi'
// type gets = p<'4323'>
