/// <reference path="./typings/index.d.ts" />

import { Client } from 'discord.js';
import { ConfigHelper } from './helpers/config';
import { commands } from './commands/map';

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

(async () =>
{
  /** @type {Config} */
  const config = await ConfigHelper.getConfig();
  if(! config)
    return;

  const { prefix } = config;

  const bot = new Client();
  bot.login(process.env.BOT_TOKEN);

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  bot.on('ready', () => console.log(`Bot connected as ${bot.user.tag}`));

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  bot.on('message', message =>
  {
    if(message.author.bot)
      return;

    let { content } = message;

    /* Check if the message content starts with the bot prefix. */
    if(! content.startsWith(prefix))
      return;

    /* Remove the prefix from the message content. */
    content = content.substr(prefix.length);

    /* Get the index of the first space in the message content. */
    const firstSpace = content.indexOf(' ');

    /* Trim spaces on both ends and replace all two or more spaces to single spaces and
      of the message content, then get the first word which corresponds to the command,
      then change it to lowercase. */
    const command = content
      .trim()
      .replace(/\s{2,}/g, ' ')
      .substr(0, firstSpace < 0 ? content.length : firstSpace)
      .toLowerCase();

    for(const { name, alias, run } of commands)
    {
      if((name === command || alias === command) && run)
        run(message);
    }
  });
})();

