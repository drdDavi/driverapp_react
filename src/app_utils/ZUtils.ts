export function numberParser({ number, fixed }: { number: string | number; fixed?: number }): number {
  if (Number.isNaN(parseFloat(number.toString()))) {
    return 0;
  } else {
    return parseFloat(parseFloat(number.toString()).toFixed(fixed ?? 2));
  }
}

export function stringTruncate({ value, numberCharacter }: { value: string | number; numberCharacter: number }): string {
  if (typeof value !== 'string') return '';

  if (value.length > numberCharacter) {
    return `${value.substring(0, numberCharacter)}...`;
  } else {
    return value;
  }
}
