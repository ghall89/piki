import { spawn } from 'bun';
import ollama, { ChatRequest } from 'ollama';
import { tryCatch } from 'try-catcher-ts';

export async function invokeLocalModel(props: ChatRequest) {
  const ollamaProc = spawnOllama(props.model);

  // @ts-expect-error - itr is private but is required for logic
  const { itr } = await tryCatch(() => ollama.chat({ ...props, stream: true }));

  for await (const chunk of itr) {
    process.stdout.write(chunk.message.content);
  }

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
