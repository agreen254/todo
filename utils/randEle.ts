export default function randArrayEle<T>(arr: T[]): T {
  const randIdx = Math.floor(Math.random() * arr.length);
  return arr[randIdx];
}