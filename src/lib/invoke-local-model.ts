import { spawn } from 'bun';
import ollama, { ChatRequest } from 'ollama';
import ora from 'ora';
import { tryCatch } from 'try-catcher-ts';

export async function invokeLocalModel(props: ChatRequest) {
  const spinner = ora('Initializing model...').start();

  const ollamaProc = spawnOllama(props.model);

  const result = await tryCatch(() => ollama.chat({ ...props, stream: true }));

  if (result instanceof Error) {
    spinner.fail('Failed to start Ollama chat');
    ollamaProc.kill();
    throw result;
  }

  // @ts-expect-error - itr is private but is required for logic
  const { itr } = result;

  spinner.stop();

  for await (const chunk of itr) {
    process.stdout.write(chunk.message.content);
  }

  process.stdout.write('\n');

  ollamaProc.kill();
}

function spawnOllama(model: string) {
  const ollamaProc = spawn({
    cmd: ['ollama', 'serve', model],
    stdout: 'pipe',
    stderr: 'pipe',
  });

  return ollamaProc;
}
