import CardButton from '../CardButton/CardButton';
import { PlusIcon } from '../SvgIcons/SvgIcons';
import './JournalAddButton.css';

function JournalAddButton() {

	return (
		<CardButton className="journal-add">
			<PlusIcon/>
            Новое воспоминание
		</CardButton>

	);
}

export default JournalAddButton;