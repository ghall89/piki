import terminalImage from 'terminal-image';
import { tryCatch } from 'try-catcher-ts';

import { getConfig } from './lib/config/get-config';
import { getArguments } from './lib/get-arguments';
import { getImage } from './lib/get-image';
import { invokeLocalModel } from './lib/invoke-local-model';

async function main() {
  const { path, model, showPreview } = getArguments();
  const config = await getConfig();

  const image = await getImage(path);

  if (image) {
    if (showPreview === true) {
      console.log(await terminalImage.file(path, { width: 50 }));
    }

    const DEFAULT_PROMPT =
      'Describe this image for accessibility purposes. Do not comment on things that are not in the image. Avoid subjective statements. Do not describe things that are not actually in the image. Only comment on text if it exists. Do not describe the absence of anything in the image.';

    await invokeLocalModel({
      model: model ?? config.model,
      messages: [
        {
          role: 'user',
          content: config.prompt_override ?? DEFAULT_PROMPT,
          images: [image],
        },
      ],
    });

    process.exit();
  }
}

tryCatch(() => main());
