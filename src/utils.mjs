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
  [CHAT_EVENT.AFK_MODE]: /^: AFK mode is now (?<state>.+)\.(?: Autoreply "(?<autoreplyMessage>.+)")?$/,
  [CHAT_EVENT.GLOBAL_MESSAGE]: /^#(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.PARTY_MESSAGE]: /^%(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.WHISPER_MESSAGE]: /^@(?<direction>From|To) (?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.TRADE_MESSAGE]: /^\$(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.GUILD_MESSAGE]: /^&(?:<(?<guild>.+)> )?(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.AREA_ENTER]: /^: You have entered (?<area>.+)\.$/,
  [CHAT_EVENT.LOCAL_MESSAGE]: /^(?<character>.+): (?<message>.+)$/,
  [CHAT_EVENT.CHARACTER_AGE]: /^: Your character was created (?:(?<days>\d+) days?, )?(?:(?<hours>\d+) hours?, )?(?:(?<minutes>\d+) minutes?, )?(and )?(?<seconds>\d+) seconds? ago\.$/,
  [CHAT_EVENT.CHARACTER_DEATH]: /^: (?<character>.+) has been slain\.$/,
  [CHAT_EVENT.CHARACTER_LEVEL_UP]: /^: (?<character>.+) \((?<characterClass>.+)\) is now level (?<level>\d+)$/,
  [CHAT_EVENT.PLAYED]: /^: You have played for (?:(?<hours>\d+) hours?, )?(?:(?<minutes>\d+) minutes?, )?(?:and )?(?<seconds>\d+) seconds?\.$/,
  [CHAT_EVENT.DEATHS]: /^: You have died (?<deaths>\d+) times\.$/,
  [CHAT_EVENT.ITEM_ON_CURSOR_DESTROYED]: /^: Item on cursor destroyed\.$/,
  [CHAT_EVENT.TRADE_ACCEPTED]: /^: Trade accepted\.$/,
  [CHAT_EVENT.TRADE_DECLINED]: /^: Trade declined\.$/,
  [CHAT_EVENT.MONSTERS_REMAIN]: /^: (?<monsters>\d+) monsters? remains?\.$/,
  [CHAT_EVENT.MISSION_COMPLETE]: /^: Mission complete\.$/,
  [CHAT_EVENT.NPC_SPEECH]: /^(?<npc>.+): (?<text>.+)$/,
  [CHAT_EVENT.PASSIVE_POINT_RECEIVED]: /^: You have received (?<points>a|\d+) Passive (?<pointType>Skill|Respec) Points?\.$/,
  [CHAT_EVENT.CHARACTER_AREA_LEAVE]: /^: (?<character>.+) has left the area\.$/,
  [CHAT_EVENT.CHARACTER_AREA_JOIN]: /^: (?<character>.+) has joined the area\.$/
};

export const extractChatEvent = line => {
  for (const type in regExprMap) {
    const match = regExprMap[type].exec(line);

    if (match) {
      switch (type) {
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
          const { state, autoreplyMessage } = match.groups;

          return {
            type,
            raw: line,
            state,
            autoreplyMessage
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

        case CHAT_EVENT.CHARACTER_AGE: {
          const { days, hours, minutes, seconds } = match.groups;

          return {
            type,
            raw: line,
            days,
            hours,
            minutes,
            seconds
          };
        }

        case CHAT_EVENT.CHARACTER_DEATH: {
          const { character } = match.groups;

          return {
            type,
            raw: line,
            character
          };
        }

        case CHAT_EVENT.CHARACTER_LEVEL_UP: {
          const { character, characterClass, level } = match.groups;

          return {
            type,
            raw: line,
            character,
            characterClass,
            level
          };
        }

        case CHAT_EVENT.PLAYED: {
          const { hours, minutes, seconds } = match.groups;

          return {
            type,
            raw: line,
            hours,
            minutes,
            seconds
          };
        }

        case CHAT_EVENT.DEATHS: {
          const { deaths } = match.groups;

          return {
            type,
            raw: line,
            deaths
          };
        }

        case CHAT_EVENT.MONSTERS_REMAIN: {
          const { monsters } = match.groups;

          return {
            type,
            raw: line,
            monsters
          };
        }

        case CHAT_EVENT.NPC_SPEECH: {
          const { npc, text } = match.groups;

          return {
            type,
            raw: line,
            npc,
            text
          };
        }

        case CHAT_EVENT.PASSIVE_POINT_RECEIVED: {
          const { points, pointType } = match.groups;

          return {
            type,
            raw: line,
            points: points === 'a' ? 1 : parseInt(points),
            pointType: pointType.toLowerCase()
          };
        }

        case CHAT_EVENT.CHARACTER_AREA_LEAVE:
        case CHAT_EVENT.CHARACTER_AREA_JOIN: {
          const { character } = match.groups;

          return {
            type,
            raw: line,
            character
          };
        }

        case CHAT_EVENT.CHARACTER_NOT_FOUND:
        case CHAT_EVENT.ITEM_ON_CURSOR_DESTROYED:
        case CHAT_EVENT.TRADE_ACCEPTED:
        case CHAT_EVENT.TRADE_DECLINED:
        case CHAT_EVENT.MISSION_COMPLETE:
          return {
            type,
            raw: line
          };

        default:
          break;
      }
    }
  }

  return {
    type: '',
    raw: line
  };
}
