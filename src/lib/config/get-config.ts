import { Config } from './config-type';

export async function getConfig(): Promise<Config> {
  const userConfig = Bun.file('~/.picai');
  const json = await userConfig.text();

  return JSON.parse(json) as Config;
}
