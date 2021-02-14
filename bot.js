/// <reference path="./typings/index.d.ts" />

import { Client } from 'discord.js';
import { getConfig } from './helpers/config';
import { commands } from './commands/command-index';

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

(async () =>
{
  /** @type {Config} */
  const config = await getConfig();
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

    /* Trim spaces on both ends and replace all two or more spaces to single spaces and
      of the message content, then get the first word which corresponds to the command,
      then change it to lowercase. */
    let firstSpace = content.indexOf(' ');
    firstSpace = firstSpace < 0 ? content.length : firstSpace;
    const command = content
      .trim()
      .replace(/\s{2,}/g, ' ')
      .substr(0, firstSpace)
      .trim()
      .toLowerCase();

    for(const { name, aliases, run } of commands)
    {
      if((name === command || (aliases && aliases.includes(command))) && run)
        run(message);
    }
  });
})();

