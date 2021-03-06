import { cleanString, getMedia } from '../helpers/common';

/**
 * Creates an emote from the given image link or attachment.
 *
 * @param {import('discord.js').Message} message
 */
export async function yoink(message)
{
  message.channel.startTyping();
  await new Promise(resolve => setTimeout(resolve, 1000));

  const media = getMedia(
    message,
    [ 'image', 'gifv', 'gif' ],
    'Please add an image or gif link or attachment or try again.',
  );

  let { content } = message;
  content = cleanString(content).replace(media, '');

  const [ , emoteNamePart ] = content.split(' ');
  if(! emoteNamePart)
    return respond('Please type the name for the emote.');

  let emoteName = emoteNamePart.substr(0, emoteNamePart.indexOf(' ')).trim();
  if(! emoteName)
    emoteName = emoteNamePart;

  const { emojis } = message.guild;

  /* Check if there is already an existing emote with the given emote name. */
  const existingEmote = emojis.cache.find(({ name }) => name === emoteName);
  if(existingEmote)
    return respond(
      `There is already a \`:${existingEmote.name}:\``
      + `\nIt's ${existingEmote}`
    );

  try
  {
    const emote = await emojis.create(media, emoteName);
    respond(`${emote}`);
  }
  catch(error)
  {
    return respond(
      error.code === 50035
        ? 'The image or gif cannot be larger than 256.0 KB.'
        : 'An error occurred in adding the emote. Please try again.'
    );
  }

  function respond(string)
  {
    message.channel.stopTyping(true);
    message.channel.send(string);
  }
}
