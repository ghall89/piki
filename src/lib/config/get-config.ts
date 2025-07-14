import { Config } from './config-type';

const CONFIG_PATH = `${Bun.env.HOME}/.picai`;

export async function getConfig(): Promise<Config> {
  const userConfig = Bun.file(CONFIG_PATH);

  if (!(await userConfig.exists())) {
    const defaultConfig: Config = {
      model: 'llava',
    };
    Bun.write(CONFIG_PATH, JSON.stringify(defaultConfig));

    return defaultConfig;
  }

  const json = await userConfig.text();

  return JSON.parse(json) as Config;
}
