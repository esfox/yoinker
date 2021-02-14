import { yoink } from './yoink';
import { remove } from './remove';
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
    name: 'help',
    run: help,
    description: 'Shows this message.',
  },
];
