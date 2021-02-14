import { cleanString } from '../helpers/common';

/**
 * Creates an emote from the given image link or attachment.
 *
 * @param {import('discord.js').Message} message
 */
export async function remove(message)
{
  const { content } = message;
  let [ , emoteName ] = cleanString(content).split(' ');
  const emoteNamePart = emoteName.match(/:(.*):/g);
  emoteName = (emoteNamePart ? emoteNamePart.pop() : emoteName).replace(/:/g, '');

  const emote = message.guild.emojis.cache.find(({ name }) => name === emoteName);
  if(! emote)
    return message.channel.send('There is no emote with that name.');

  try
  {
    const deleted = await emote.delete();
    message.channel.send(`\`${deleted}\` has been deleted.`);
    message.channel.stopTyping(true);
  }
  catch(error)
  {
    message.channel.stopTyping(true);
  }
}
