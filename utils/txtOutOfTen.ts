export default function txtOutOfTen(n: number): string {
  if (n <= 3) {
    return `Low (${n}/10)`;
  } else if (n <= 7) {
    return `Medium (${n}/10)`;
  } else {
    return `High (${n}/10)`;
  }
}
