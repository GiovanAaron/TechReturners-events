export function getRandomImageAll(images: string[]): string {
  const idx = Math.floor(Math.random() * images.length);
  return images[idx];
}
