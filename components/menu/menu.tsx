import {Fragment, useCallback, useMemo, useState} from 'react';
import {streakOptions, useAppState, wpmOptions} from '@app/config/state';
import MenuButton from '@app/components/menu-button';
import {useTranslations} from '@app/hooks/use-translations';
import LanguageMenu from './language-menu';
import SFXMenu from './sfx-menu';
import WordlistMenu from './wordlist-menu';
import type {TargetMenuProperties} from './target-menu';
import TargetMenu from './target-menu';

type MenuState = 'closed' | 'sfx' | 'streak' | 'words' | 'wpm' | 'language';

const Menu = (): React.ReactElement => {
	const [state, dispatch] = useAppState();
	const [menuState, setMenuState] = useState<MenuState>('closed');
	const t = useTranslations();

	const handleTargetWPMChange = useCallback((wpm: number) => (): void => {
		dispatch({type: 'SET_TARGET_WPM', payload: wpm});
	}, [dispatch]);

	const handleTargetStreakChange = useCallback((streak: number) => (): void => {
		dispatch({type: 'SET_TARGET_STREAK', payload: streak});
	}, [dispatch]);

	const handleReset = useCallback((): void => {
		if (!confirm(t.menuActions.resetConfirm)) {
			return;
		}

		dispatch({type: 'RESET_STATE'});
	}, [dispatch, t]);

	const handleSave = useCallback((): void => {
		dispatch({type: 'SAVE_STATE'});

		alert(t.menuActions.saveSuccess);
	}, [dispatch, t]);

	const handleToggleDarkMode = useCallback((): void => {
		dispatch({type: 'TOGGLE_DARK_MODE'});
	}, [dispatch]);

	const handleMenuStateChange = useCallback((menuState: MenuState) => (): void => {
		setMenuState(menuState);
	}, []);

	const hasSFXEnabled = useMemo(
		() => [state.enableSFXConfetti, state.enableSFXSound].some(Boolean),
		[state.enableSFXConfetti, state.enableSFXSound],
	);

	const targetMenus: Record<string, TargetMenuProperties> = useMemo(() => ({
		wpm: {
			title: t.menu.wpm,
			onClose: handleMenuStateChange('closed'),
			presetValues: wpmOptions,
			onTargetChange: handleTargetWPMChange,
			currentValue: state.targetWPM,
			label: t.menu.wpm,
			maxValue: 9999,
			theme: 'green',
		},
		streak: {
			title: t.menu.streak,
			onClose: handleMenuStateChange('closed'),
			presetValues: streakOptions,
			onTargetChange: handleTargetStreakChange,
			currentValue: state.targetStreak,
			label: t.menu.streak,
			maxValue: 25,
			theme: 'green',
		},
	}), [handleMenuStateChange, handleTargetStreakChange, handleTargetWPMChange, state.targetStreak, state.targetWPM, t]);

	return (
		<Fragment>
			<div className="fixed flex justify-center top-0 right-0 w-full p-10">
				<div className="relative inline-flex flex-wrap justify-center items-center gap-4 mx-auto">
					<MenuButton label={t.menu.wpm} value={state.targetWPM} theme="green" onClick={handleMenuStateChange('wpm')}/>
					<MenuButton label={t.menu.streak} value={state.targetStreak} theme="green" onClick={handleMenuStateChange('streak')}/>
					<MenuButton label={t.menu.words} value="W" theme="green" onClick={handleMenuStateChange('words')}/>
					<div className="h-10 border-l-2 border-neutral-300 dark:border-neutral-800 mx-4"/>
					<MenuButton label={t.menu.sfx} value={hasSFXEnabled ? t.sfxMenu.on : t.sfxMenu.off} theme="green" enabled={hasSFXEnabled} onClick={handleMenuStateChange('sfx')}/>
					<div className="h-10 border-l-2 border-neutral-300 dark:border-neutral-800 mx-4"/>
					<MenuButton label={t.menu.theme} value={state.darkMode ? 'D' : 'L'} theme="green" onClick={handleToggleDarkMode}/>
					<MenuButton label={t.menu.save} value="S" theme="green" onClick={handleSave}/>
					<MenuButton label={t.menu.reset} value="R" theme="red" onClick={handleReset}/>
					<MenuButton label={t.menu.language} value={state.language.toUpperCase()} theme="green" onClick={handleMenuStateChange('language')}/>
					<div className="absolute h-4 bottom-0 -mb-8 w-full border-l-2 border-b-2 border-r-2 border-neutral-300 dark:border-neutral-800 rounded-b-md text-center">
						<span className="absolute bottom-0 left-[50%] -translate-x-[50%] bg-neutral-50 dark:bg-neutral-900 -mb-3 px-3 font-bold uppercase text-sm text-neutral-400 dark:text-neutral-600 transition-colors">{t.menu.options}</span>
					</div>
				</div>
				{!['www.burst-type.pro', 'localhost'].includes(window.location.hostname) && (
					<div className="absolute h-4 bottom-0 -mb-16 w-full text-center">
						<span className="text-sm text-neutral-950 dark:text-yellow-400 bg-yellow-200 dark:bg-transparent px-4 py-2 border border-yellow-400 dark:border-yellow-400 rounded-md">
							<span>{t.experimental.message}</span>
							{' '}
							<a className="underline" href="https://www.burst-type.pro">burst-type.pro</a>
						</span>
					</div>
				)}
			</div>
			{menuState === 'wpm' && <TargetMenu {...targetMenus.wpm}/>}
			{menuState === 'streak' && <TargetMenu {...targetMenus.streak}/>}
			{menuState === 'words' && <WordlistMenu onClose={handleMenuStateChange('closed')}/>}
			{menuState === 'sfx' && <SFXMenu onClose={handleMenuStateChange('closed')}/>}
			{menuState === 'language' && <LanguageMenu onClose={handleMenuStateChange('closed')}/>}
		</Fragment>
	);
};

export default Menu;
