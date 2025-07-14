import terminalImage from 'terminal-image';
import { tryCatch } from 'try-catcher-ts';

import { getConfig } from './lib/config/get-config';
import { getArguments } from './lib/get-arguments';
import { getImage } from './lib/get-image';
import { invokeLocalModel } from './lib/invoke-local-model';

async function main() {
  const { path, prompt, showPreview } = getArguments();
  const config = await getConfig();

  const image = await getImage(path);

  if (image) {
    if (showPreview === true) {
      console.log(await terminalImage.file(path, { width: 50 }));
    }

    await invokeLocalModel({
      model: config.model,
      messages: [
        {
          role: 'user',
          content: prompt,
          images: [image],
        },
      ],
    });

    process.exit();
  }
}

tryCatch(() => main());
