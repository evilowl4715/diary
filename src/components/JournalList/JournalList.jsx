import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

function JournalList({items}) {
	const {userId} = useContext(UserContext);

	if (items.length === 0) {
		return <p>Записей нет</p>;
	}

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};


	return (
		<>
			{items
				.filter(el => el.userId === userId)
				.sort(sortItems)
				.map(item => (
					<CardButton key={item.id} className='journal-item'>
						<JournalItem
							title={item.title}
							text={item.text}
							date={item.date}
						/>
					</CardButton>
				))}
		</>

	);
}

export default JournalList;