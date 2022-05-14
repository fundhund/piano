type ClassName = string | boolean | null | undefined

export const joinClassNames = (...args: ClassName[]) => args
    ?.filter(Boolean)
    .filter(className => typeof className === 'string')
    .join(' ')
    .trim()
