import chalk from 'chalk';
import terminalImage from 'terminal-image';
import { parseArgs } from 'util';

import { getImage } from './lib/get-image';
import { invokeLocalModel } from './lib/invoke-local-model';

async function main() {
  try {
    const { values, positionals } = parseArgs({
      args: Bun.argv,
      options: {
        preview: {
          type: 'boolean',
          default: false,
          short: 'p',
        },
      },
      allowPositionals: true,
    });

    const path = positionals[2];

    if (!path) {
      console.log(chalk.red('Please provide the path to an image.'));
      return;
    }

    const image = await getImage(path);

    if (!image) {
      console.log(chalk.red(`Failed to load image at path: ${path}`));
      return;
    }

    if (values.preview === true) {
      console.log(await terminalImage.file(path, { width: 50 }));
    }

    await invokeLocalModel({
      model: 'llava',
      messages: [
        {
          role: 'user',
          content:
            'Describe all parts of this image in an accessibility-friendly format for alt text.',
          images: [image],
        },
      ],
    });

    process.exit();
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
    process.exit(1);
  }
}

main();
