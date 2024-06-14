import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage-hook';
import { UserContextProvider } from './context/user.context';

function mapItems(items) {

	if(!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {

	// const INITIAL_DATA = [
	// 	{
	// 		id: 1,
	// 		title: 'Подготовка к обновлению курсов',
	// 		text: 'Сегодня провёл весь день за...',
	// 		date: new Date()
	// 	},
	// 	{
	// 		id: 2,
	// 		title: 'Test 1',
	// 		text: 'lorem',
	// 		date: new Date()
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Test 2',
	// 		text: 'lorem',
	// 		date: new Date()
	// 	}
	// ];

	const [items, setItems] = useLocalStorage(['data']);


	const addItem = item => {
		setItems([...mapItems(items), {
			...item,
			id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
			date: new Date(item.date)
		}]);
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header/>
					<JournalAddButton/>
					<JournalList className="journal-list" items={mapItems(items)}/>
				</LeftPanel>

				<Body>
					<JournalForm onSubmit={addItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
