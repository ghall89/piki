import chalk from 'chalk';

export async function getImage(
  path: string,
): Promise<Uint8Array<ArrayBufferLike> | undefined> {
  const image = Bun.file(path);
  const type = image.type;

  if (!type.includes('image')) {
    console.log(chalk.red(`File at ${path} is not a valid image file.`));
    return;
  }

  const imageBytes = await image.bytes();

  return imageBytes;
}
