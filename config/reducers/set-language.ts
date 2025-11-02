import type {State} from '../state';
import {createWord} from '../state';
import en1000 from '../../wordlists/en1000.json';
import ru1000 from '../../wordlists/ru1000.json';
import type {Language} from '../../lib/i18n';

type SetLanguageAction = {
	type: 'SET_LANGUAGE';
	payload: Language;
};

const wordlists: Record<Language, string[]> = {
	en: en1000,
	ru: ru1000,
};

const setLanguage = (state: State, action: SetLanguageAction): State => {
	const newWordlist = wordlists[action.payload];
	const currentWordlist = state.customWordlist ?? wordlists[state.language];

	// Preserve custom wordlist if it doesn't match any default wordlist
	const isCustomWordlist = !Object.values(wordlists).some(list => list === currentWordlist);

	return {
		...state,
		language: action.payload,
		customWordlist: isCustomWordlist ? currentWordlist : undefined,
		word: createWord(isCustomWordlist ? currentWordlist : newWordlist, state.level),
		lastSave: Date.now(),
	};
};

export default setLanguage;
export type {
	SetLanguageAction,
};

