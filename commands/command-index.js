import { yoink } from './yoink';
import { remove } from './remove';
import { resize } from './resize';
import { help } from './help';

export const commands =
[
  {
    name: 'yoink',
    aliases: [ 'y' ],
    run: yoink,
    description: 'Creates an emote from the given image link or attachment.',
    usage: '(emote name) (link or upload an image/gif)',
  },
  {
    name: 'remove',
    aliases: [ 'rm' ],
    run: remove,
    description: 'Removes the emote with the given name.',
    usage: '(emote name)',
  },
  {
    name: 'resize',
    aliases: [ 'rs' ],
    run: resize,
    description: 'Resizes an image to emote size (48x48).',
    usage: '(link or upload an image)',
  },
  {
    name: 'help',
    run: help,
    description: 'Shows this message.',
  },
];
