import sharp from 'sharp';
import axios from 'axios';

import { getMedia } from '../helpers/common';

/**
 * Resizes an image to emote size (48x48).
 *
 * @param {import('discord.js').Message} message
 */
export async function resize(message)
{
  const url = getMedia(message);
  if(! url)
    return;

  try
  {
    message.channel.startTyping();
    const { data } = await axios({ url, responseType: 'arraybuffer' });
    const resized = await sharp(data)
      .resize({ height: 48 })
      .toBuffer();

    message.channel.send({ files: [{ attachment: resized }] });
    message.channel.stopTyping(true);
  }
  catch(error)
  {
    console.error(error);
    message.channel.send('Cannot resize image. Please try again.');
    message.channel.stopTyping(true);
  }
}
