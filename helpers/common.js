/**
 * Trims the given string and replaces all two or more spaces to one.
 *
 * @param {string} string
 */
export function cleanString(string)
{
  return string
    .trim()
    .replace(/\s\s+/g, ' ');
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
 * Gets the media in the given Discord message.
 *
 * @param {import('discord.js').Message} message
 * @param {string[]} mediaTypes
 * @param {string} errorMessage
 */
export function getMedia(
  message,
  mediaTypes = [ 'image' ],
  errorMessage = 'Please add an image link or attachment or try again.',
)
{
  const [ media ] = message.embeds;
  if(! media)
  {
    const { attachments } = message;
    return attachments.size === 0 ? respond(errorMessage) : attachments.first().url;
  }
  else
  {
    const { type, url } = media;
    return ! mediaTypes.includes(type) ? respond(errorMessage) : url;
  }

  function respond(string)
  {
    message.channel.stopTyping(true);
    message.channel.send(string);
  }
}
