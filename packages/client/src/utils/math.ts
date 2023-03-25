export const sum = (arr: number[]) => arr.reduce((acc, next) => acc + next, 0);

export const average = (arr: number[]) => sum(arr) / arr.length;
