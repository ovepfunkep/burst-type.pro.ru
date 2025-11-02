import en from '../locales/en.json';
import ru from '../locales/ru.json';

export type Language = 'en' | 'ru';

type Translations = typeof en;

const translations: Record<Language, Translations> = {
	en,
	ru,
};

export const getTranslations = (language: Language): Translations => translations[language];

export const defaultLanguage: Language = 'en';
