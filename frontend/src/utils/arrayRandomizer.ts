//gets random element from an array

export function arrayRandomizer(array: string[]): string {
  const idx = Math.floor(Math.random() * array.length);
  return array[idx];
}
