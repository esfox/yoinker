/// <reference path="../typings/index.d.ts" />

import { MessageEmbed } from 'discord.js';
import { commands } from './command-index';
import { getConfig } from '../helpers/config';

/**
 * Displays the help message.
 *
 * @param {import('discord.js').Message} message
 */
export async function help(message)
{
  /** @type {Config} */
  const config = await getConfig();
  if(! config)
    return;

  const embed = new MessageEmbed()
    .setColor('GOLD')
    .setTitle('Commands')
    .setDescription(
      `Prefix: **\`${config.prefix}\`**\n\n`
      + commands.map(({ name, aliases, description, usage }) =>
        `**\`${name}\`** - ${description}\n`
        + (aliases ? `Aliases: ${aliases.map(alias => `\`${alias}\``).join(', ')}\n` : '')
        + (usage ? `Usage: \`${config.prefix}${name} ${usage}\`` : '')
      ).join('\n\n')
    );

  message.channel.send(embed);
}
