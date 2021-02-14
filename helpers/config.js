import { readFile } from 'jsonfile';

const configPath = './config.json';

export class ConfigHelper
{
  static async getConfig()
  {
    try
    {
      return readFile(configPath);
    }
    catch(error)
    {
      console.error(error);
      console.error('Cannot read config file');
    }
  }
}
