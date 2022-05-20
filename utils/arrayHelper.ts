export const getSubArray = <T>(arr: T[], [first, last]: [T, T]) =>
    arr.slice(arr.indexOf(first), arr.indexOf(last) + 1)

export const getReversedArray = <T,>(arr: T[]) => 
    arr.reduce((acc, curr) => {
        acc.unshift(curr)
        return acc
    }, [] as T[])
