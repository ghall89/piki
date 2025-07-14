import { parseArgs } from 'util';

import { exitWithMessage } from './exit-with-message';

export function getArguments(): {
  path: string;
  showPreview: boolean;
  prompt: string;
} {
  const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
      preview: {
        type: 'boolean',
        default: false,
        short: 'p',
      },
      prompt: {
        type: 'string',
        default:
          'Describe this image for accessibility purposes. Do not comment on things that are not in the image. Avoid subjective statements. Do not describe things that are not actually in the image. Only comment on text if it exists. Do not describe the absence of anything in the image.',
      },
    },
    allowPositionals: true,
  });

  const path = positionals[2];

  if (!path) {
    exitWithMessage('Please provide the path to an image.');
  }

  return {
    path,
    showPreview: values.preview,
    prompt: values.prompt,
  };
}
