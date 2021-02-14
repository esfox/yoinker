import { yoink } from './yoink';
import { remove } from './remove';

export const commands =
[
  {
    name: 'yoink',
    aliases: [ 'y' ],
    run: yoink,
  },
  {
    name: 'remove',
    aliases: [ 'rm' ],
    run: remove,
  },
];
