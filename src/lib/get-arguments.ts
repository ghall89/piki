import { parseArgs } from 'util';

import { exitWithMessage } from './exit-with-message';

export function getArguments(): {
  path: string;
  showPreview: boolean;
  model?: string;
} {
  const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
      model: {
        type: 'string',
        short: 'm',
      },
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
    exitWithMessage('Please provide the path to an image.');
  }

  return {
    path,
    showPreview: values.preview,
    model: values?.model,
  };
}
