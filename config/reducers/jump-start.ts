import {createWord, getWordlist, type State} from '../state';

type JumpStartAction = {
	type: 'JUMP_START';
};

const jumpStart = (state: State): State => {
	if (state.showInstructions) {
		return state;
	}

	const wordlist = getWordlist(state);

	return {
		...state,
		level: 0,
		word: createWord(wordlist, 0),
		buffer: '',
		focused: true,
		finished: false,
		lastSave: Date.now(),
	};
};

export default jumpStart;

export type {
	JumpStartAction,
};
