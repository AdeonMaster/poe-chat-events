import CHAT_EVENT from './chat-event';

export const parseLogLine = line => {
  // matches 2019/02/25 21:51:33 12256046 a21 [INFO Client 9528] #Wind_Reaperr: u must have smoked something good
  const match = /\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} \d+ \w+ \[\w+ \w+ \w+\] (.+)/.exec(line);

  return match
    ? match[1]
    : '';
};

const regExprMap = {
  [CHAT_EVENT.CHARACTER_NOT_FOUND]: /^: The specified character does not exist\.$/,
  [CHAT_EVENT.CHARACTER_INFO]: /^: (?<character>.+) is a level (?<level>\d+) (?<characterClass>.+) in the (?<league>.+) league (.+)\.$/,
  [CHAT_EVENT.AFK_MODE]: /^: AFK mode is now (?<state>.+)\.$/,
  [CHAT_EVENT.GLOBAL_MESSAGE]: /^#(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.PARTY_MESSAGE]: /^%(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.WHISPER_MESSAGE]: /^@(?<direction>From|To) (?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.TRADE_MESSAGE]: /^\$(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.GUILD_MESSAGE]: /^&(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.AREA_ENTER]: /^: You have entered (?<area>.+)\.$/,
  [CHAT_EVENT.LOCAL_MESSAGE]: /^(?<character>.+): (?<message>.+)$/
};

export const extractChatEvent = line => {
  for (const type in regExprMap) {
    const match = regExprMap[type].exec(line);

    if (match) {
      switch (type) {
        case CHAT_EVENT.CHARACTER_NOT_FOUND:
          return {
            type,
            raw: line
          };

        case CHAT_EVENT.CHARACTER_INFO: {
          const { character, level, characterClass, league } = match.groups;
          const isOnline = match[5] !== 'who is not currently online';
          const location = isOnline ? /and is currently playing in (.+)/.exec(match[5])[1] : null;

          return {
            type,
            raw: line,
            character,
            level,
            characterClass,
            league,
            isOnline,
            location
          };
        }

        case CHAT_EVENT.AFK_MODE: {
          const { state } = match.groups;

          return {
            type,
            raw: line,
            state
          };
        }

        case CHAT_EVENT.LOCAL_MESSAGE: {
          const { character, message } = match.groups;

          return {
            type,
            raw: line,
            character,
            message
          };
        }

        case CHAT_EVENT.GLOBAL_MESSAGE: {
          const { guild, character, message } = match.groups;

          return {
            type,
            raw: line,
            guild,
            character,
            message
          };
        }

        case CHAT_EVENT.PARTY_MESSAGE: {
          const { guild, character, message } = match.groups;

          return {
            type,
            raw: line,
            guild,
            character,
            message
          };
        }

        case CHAT_EVENT.WHISPER_MESSAGE: {
          const { direction, guild, character, message } = match.groups;

          return {
            type,
            raw: line,
            direction,
            guild,
            character,
            message
          };
        }

        case CHAT_EVENT.TRADE_MESSAGE: {
          const { guild, character, message } = match.groups;

          return {
            type,
            raw: line,
            guild,
            character,
            message
          };
        }

        case CHAT_EVENT.GUILD_MESSAGE: {
          const { guild, character, message } = match.groups;

          return {
            type,
            raw: line,
            guild,
            character,
            message
          };
        }

        case CHAT_EVENT.AREA_ENTER: {
          const { area } = match.groups;

          return {
            type,
            raw: line,
            area
          };
        }

        default:
          break;
      }
    }
  }

  return {
    type: CHAT_EVENT.UNKNOWN,
    raw: line
  };
}
