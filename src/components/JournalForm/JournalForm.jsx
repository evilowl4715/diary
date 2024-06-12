import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';
import { DateIcon, FolderIcon } from '../SvgIcons/SvgIcons';

function JournalForm({onSubmit}) {

	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true,
		tag: true
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

		if (!formProps.tag) {
			setFormValidState(state => ({...state, tag: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, tag: true}));
		}

		if(!isFormValid) {
			return;
		}

		onSubmit(formProps);
	};

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div className={styles['header-title']}>
					<input type="text" name='title' className={cn(styles['input-title'], {
						[styles['invalid']] : !formValidState.title
					})}/>
				</div>
				<div className={cn(styles['input-block'], {
					[styles['invalid']] : !formValidState.date
				})}>
					<label htmlFor="date" className={styles['label-row']}>
						<DateIcon/>
						<span>Дата</span>
					</label>
					<input type="date" name='date' id="date" className={styles['input']}/>
				</div>
				<div className={cn(styles['input-block'], {
					[styles['invalid']] : !formValidState.tag
				})}>
					<label htmlFor="tag" className={styles['label-row']}>
						<FolderIcon/>
						<span>Метки</span>
					</label>
					<input type="text" name='tag' id="tag" className={styles['input']}/>
				</div>
				<div>
					<textarea name="text" id="" className={cn(styles['textarea'], {
						[styles['invalid']] : !formValidState.text
					})}></textarea>
				</div>
				<Button onClick={() => {console.log('ggg');}} text="Сохранить"/>
			</form>
		</>
	);
}

export default JournalForm;
