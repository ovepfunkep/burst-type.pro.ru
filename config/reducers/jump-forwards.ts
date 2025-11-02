import {createWord, getWordlist, type State} from '../state';

type JumpForwardsAction = {
	type: 'JUMP_FORWARDS';
};

const jumpForwards = (state: State): State => {
	if (state.showInstructions) {
		return state;
	}

	if (state.highestLevel === undefined) {
		return state;
	}

	const nextLevel = Math.min(state.highestLevel, state.level + 1);
	const wordlist = getWordlist(state);

	return {
		...state,
		level: nextLevel,
		word: createWord(wordlist, nextLevel),
		buffer: '',
		focused: true,
		finished: false,
		lastSave: Date.now(),
	};
};

export default jumpForwards;

export type {
	JumpForwardsAction,
};
