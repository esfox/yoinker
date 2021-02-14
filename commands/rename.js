import { cleanString } from '../helpers/common';

/**
 * Renames an emote.
 *
 * @param {import('discord.js').Message} message
 */
export async function rename(message)
{
  let [ , emote, newName ] = cleanString(message.content).split(' ');
  if(! emote)
    return message.channel.send('Please type the emote to rename.');

  if(! newName)
    return message.channel.send('Please type the new name for the emote.');

  const emoteName = emote.match(/:(.*):/g);
  emote = (emoteName ? emoteName.pop() : emote).replace(/:/g, '');

  const foundEmote = message.guild.emojis.cache.find(({ name }) => name === emote);
  if(! foundEmote)
    return message.channel.send('Cannot find that emote.');

  try
  {
    const updatedEmote = await foundEmote.edit({ name: newName });
    message.channel.send(`Renamed ${updatedEmote} to \`:${updatedEmote.name}:\``);
  }
  catch(error)
  {
    console.error(error);
    message.channel.send('Cannot rename the emote. Please try again.');
    message.channel.stopTyping(true);
  }
}
