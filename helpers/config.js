import { readFile } from 'jsonfile';

const configPath = './config.json';

export async function getConfig()
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
