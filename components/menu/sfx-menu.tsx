import {useCallback} from 'react';
import {useAppState} from '@app/config/state';
import MenuButton from '../menu-button';
import {useTranslations} from '@app/hooks/use-translations';

type SFXMenuProperties = {
	onClose: () => void;
};

const SFXMenu = ({onClose: handleOnClose}: SFXMenuProperties): React.ReactElement => {
	const [state, dispatch] = useAppState();
	const t = useTranslations();

	const handleSetSFXConfetti = useCallback((enabled: boolean) => (): void => {
		dispatch({type: 'SET_SFX_CONFETTI', payload: enabled});
	}, [dispatch]);

	const handleSetSFXSound = useCallback((enabled: boolean) => (): void => {
		dispatch({type: 'SET_SFX_SOUND', payload: enabled});
	}, [dispatch]);

	return (
		<div className="fixed flex items-center justify-center inset-0 w-full h-full bg-neutral-100 dark:bg-neutral-900 bg-opacity-80 backdrop-blur-md z-50">
			<div className="mx-auto w-full max-w-xl">
				<h2 className="text-neutral-900 dark:text-neutral-100 uppercase text-4xl font-bold">{t.sfxMenu.title}</h2>
				<div className="mt-6 flex flex-col">
					<p className="text-neutral-900 dark:text-neutral-100 uppercase text-xs">{t.sfxMenu.confetti}</p>
					<div className="mt-4 flex flex-wrap items-center gap-4">
						<MenuButton
							label={t.sfxMenu.conf}
							value={t.sfxMenu.on}
							theme="green"
							enabled={state.enableSFXConfetti ?? true}
							onClick={handleSetSFXConfetti(true)}
						/>
						<MenuButton
							label={t.sfxMenu.conf}
							value={t.sfxMenu.off}
							theme="green"
							enabled={!(state.enableSFXConfetti ?? true)}
							onClick={handleSetSFXConfetti(false)}
						/>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<p className="text-neutral-900 dark:text-neutral-100 uppercase text-xs">{t.sfxMenu.sounds}</p>
					<div className="mt-4 flex flex-wrap items-center gap-4">
						<MenuButton
							label={t.sfxMenu.sound}
							value={t.sfxMenu.on}
							theme="green"
							enabled={state.enableSFXSound ?? true}
							onClick={handleSetSFXSound(true)}
						/>
						<MenuButton
							label={t.sfxMenu.sound}
							value={t.sfxMenu.off}
							theme="green"
							enabled={!(state.enableSFXSound ?? true)}
							onClick={handleSetSFXSound(false)}
						/>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<button className="w-full px-4 py-2 text-neutral-900 dark:text-neutral-200 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border-2 border-neutral-400 dark:border-neutral-700 rounded-md" type="button" onClick={handleOnClose}>{t.sfxMenu.close}</button>
				</div>
			</div>
		</div>
	);
};

export default SFXMenu;
