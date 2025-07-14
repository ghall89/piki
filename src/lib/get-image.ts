import { exitWithMessage } from './exit-with-message';

export async function getImage(
  path: string,
): Promise<Uint8Array<ArrayBufferLike> | undefined> {
  const image = Bun.file(path);

  if (!(await image.exists())) {
    exitWithMessage(`File at ${path} does not exist.`);
  }

  if (!image.type.includes('image')) {
    exitWithMessage(`File at ${path} is not a valid image file.`);
  }

  try {
    const imageBytes = await image.bytes();
    return imageBytes;
  } catch {
    exitWithMessage('Error reading image.');
  }
}
