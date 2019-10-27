import path from 'path';

import ChatEventListener from '../src/chat-event-listener';

const listener = new ChatEventListener({
  filePath: path.resolve('C:\\Programs\\Steam\\steamapps\\common\\Path of Exile\\logs\\Client.txt'),
  fireUnknownEvents: true
}, event => {
  console.log(event);
});

listener.attach();
