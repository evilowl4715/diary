import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({onSubmit}) {

	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});

	const addJournalItem = (e) => {

		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;

		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
		}

		if (!formProps.text?.trim().length) {
			setFormValidState(state => ({...state, text: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, text: true}));
		}

		if (!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, date: true}));
		}

		if(!isFormValid) {
			return;
		}

		onSubmit(formProps);
	};

	return (
		<>
			<form className='journal-form' onSubmit={addJournalItem}>
				<input type="text" name='title' style={{border: formValidState.title ? 'none' : '1px solid red'}}/>
				<input type="date" name='date'  style={{border: formValidState.date ? 'none' : '1px solid red'}}/>
				<textarea name="text" id="" style={{border: formValidState.text ? 'none' : '1px solid red'}}></textarea>
				<Button onClick={() => {console.log('ggg');}} text="Сохранить"/>
			</form>
		</>
	);
}

export default JournalForm;
