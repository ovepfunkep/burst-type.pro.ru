import {useAppState} from '@app/config/state';
import {getTranslations, type Language} from '@app/lib/i18n';
import type en from '../locales/en.json';

type Translations = typeof en;

export const useTranslations = (): Translations => {
	const [state] = useAppState();
	return getTranslations(state.language);
};

export type {Language};

