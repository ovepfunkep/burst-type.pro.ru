import {createWord, getWordlist, type State} from '../state';

type JumpEndAction = {
	type: 'JUMP_END';
};

const jumpEnd = (state: State): State => {
	if (state.showInstructions) {
		return state;
	}

	if (state.highestLevel === undefined) {
		return state;
	}

	const wordlist = getWordlist(state);

	return {
		...state,
		level: state.highestLevel,
		word: createWord(wordlist, state.highestLevel),
		buffer: '',
		focused: true,
		finished: false,
		lastSave: Date.now(),
	};
};

export default jumpEnd;

export type {
	JumpEndAction,
};
