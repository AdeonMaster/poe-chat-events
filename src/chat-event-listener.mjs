import Tail from 'always-tail2';

import CHAT_EVENT from './chat-event';
import { parseLogLine, extractChatEvent } from './utils';

export default class ChatEventListener {
  constructor(params, callback) {
    this.filePath = params.filePath;
    this.interval = params.interval || 300;
    this.fireUnknownEvents = params.fireUnknownEvents || false;
    this.callback = callback;

    this.tail = new Tail(this.filePath, '\n', {
      interval: this.interval
    });

    this.tail.on('line', line => {
      const parsedLine = parseLogLine(line);
      const event = extractChatEvent(parsedLine);

      if(event.type !== CHAT_EVENT.UNKNOWN || this.fireUnknownEvents) {
        this.callback(event);
      }
    });

    this.tail.on('error', data => {
      throw new Error(data);
    });
  }

  attach() {
    this.tail.watch();
  }

  detach() {
    this.tail.unwatch();
  }
}
