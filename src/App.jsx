import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';

function App() {

	const INITIAL_DATA = [
		// {
		// 	id: 1,
		// 	title: 'Подготовка к обновлению курсов',
		// 	text: 'Сегодня провёл весь день за...',
		// 	date: new Date()
		// },
		// {
		// 	id: 2,
		// 	title: 'Test 1',
		// 	text: 'lorem',
		// 	date: new Date()
		// },
		// {
		// 	id: 3,
		// 	title: 'Test 2',
		// 	text: 'lorem',
		// 	date: new Date()
		// }
	];

	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse( localStorage.getItem('data'));
		if(data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);


	useEffect(() => {
		if(items.length) {
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = item => {
		setItems(oldItems => [...oldItems, {
			id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1,
			title: item.title,
			text: item.text,
			tag: item.tag,
			date: new Date(item.date)
		}]);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList className="journal-list" items={items}/>
			</LeftPanel>

			<Body>
				<JournalForm onSubmit={addItem}/>
			</Body>
		</div>
	);
}

export default App;
