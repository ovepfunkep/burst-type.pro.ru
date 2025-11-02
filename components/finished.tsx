import {useAppState} from '@app/config/state';
import {useTranslations} from '@app/hooks/use-translations';

const Finished = (): React.ReactElement | undefined => {
	const [state] = useAppState();
	const t = useTranslations();

	if (!state.finished) {
		return undefined;
	}

	return (
		<div className="text-center">
			<p className="text-8xl">🎉</p>
			<h1 className="mt-6 text-8xl font-bold text-neutral-950 dark:text-neutral-50">{t.finished.title}</h1>
			<p className="mt-8 text-xl font-bold text-neutral-900 dark:text-neutral-100">{t.finished.message}</p>
			<p className="text-neutral-600 dark:text-neutral-400">{t.finished.continue}</p>
		</div>
	);
};

export default Finished;
