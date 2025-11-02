import {createWord, getWordlist, type State} from '../state';

type JumpBackwardsAction = {
	type: 'JUMP_BACKWARDS';
};

const jumpBackwards = (state: State): State => {
	if (state.showInstructions) {
		return state;
	}

	if (state.highestLevel === undefined) {
		return state;
	}

	const previousLevel = Math.max(0, state.level - 1);
	const wordlist = getWordlist(state);

	return {
		...state,
		level: previousLevel,
		word: createWord(wordlist, previousLevel),
		buffer: '',
		focused: true,
		finished: false,
		lastSave: Date.now(),
	};
};

export default jumpBackwards;

export type {
	JumpBackwardsAction,
};
