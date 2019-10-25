const CHAT_EVENT = {
	UNKNOWN: 'unknown',
	CHARACTER_NOT_FOUND: 'character-not-found',
	CHARACTER_INFO: 'character-info',
	AFK_MODE: 'afk-mode',
	LOCAL_MESSAGE: 'local-message',
	GLOBAL_MESSAGE: 'global-message',
	PARTY_MESSAGE: 'party-message',
	WHISPER_MESSAGE: 'whisper-message',
	TRADE_MESSAGE: 'trade-message',
	GUILD_MESSAGE: 'guild-message',
	AREA_ENTER: 'area-enter',

	// TO DO
	AREA_JOIN: 'area-join',
	AREA_LEAVE: 'area-leave',
	DEATH: 'death',
	LEVEL_UP: 'level-up',
	TRADE: 'trade',
	DEATHS: 'deaths',
	AGE: 'age',
	PLAYED: 'played',
	ITEM_ON_CURSOR_DESTROYED: 'item-on-cursor-destroyed'
};

export default CHAT_EVENT;
