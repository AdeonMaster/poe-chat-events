import path from 'path';

import ChatEventListener from '../src/chat-event-listener';

const listener = new ChatEventListener({
  filePath: path.resolve('example/log.txt'),
  fireUnknownEvents: true
}, event => {
  console.log(event);
});

listener.attach();
