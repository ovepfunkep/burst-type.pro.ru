import {useCallback} from 'react';
import {useAppState} from '@app/config/state';
import MenuButton from '../menu-button';
import {useTranslations} from '@app/hooks/use-translations';
import type {Language} from '@app/lib/i18n';

type LanguageMenuProperties = {
	onClose: () => void;
};

const languages: Language[] = ['en', 'ru'];

const LanguageMenu = ({onClose: handleOnClose}: LanguageMenuProperties): React.ReactElement => {
	const [state, dispatch] = useAppState();
	const t = useTranslations();

	const handleLanguageChange = useCallback((language: Language) => (): void => {
		dispatch({type: 'SET_LANGUAGE', payload: language});
		handleOnClose();
	}, [dispatch, handleOnClose]);

	return (
		<div className="fixed flex items-center justify-center inset-0 w-full h-full bg-neutral-100 dark:bg-neutral-900 bg-opacity-80 backdrop-blur-md z-50">
			<div className="mx-auto w-full max-w-xl">
				<h2 className="text-neutral-900 dark:text-neutral-100 uppercase text-4xl font-bold">{t.menu.language}</h2>
				<div className="mt-6 flex flex-col">
					<p className="text-neutral-900 dark:text-neutral-100 uppercase text-xs">Languages</p>
					<div className="mt-4 flex flex-wrap items-center gap-4">
						{languages.map((language) => (
							<MenuButton
								key={language}
								label={language.toUpperCase()}
								value={language.toUpperCase()}
								theme="green"
								enabled={language === state.language}
								onClick={handleLanguageChange(language)}
							/>
						))}
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<button className="w-full px-4 py-2 text-neutral-900 dark:text-neutral-200 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-2 border-neutral-400 dark:border-neutral-700 rounded-md" type="button" onClick={handleOnClose}>{t.targetMenu.close}</button>
				</div>
			</div>
		</div>
	);
};

export default LanguageMenu;

