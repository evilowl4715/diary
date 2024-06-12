import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { DateIcon, FolderIcon } from '../SvgIcons/SvgIcons';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({onSubmit}) {

	const [formState, dispatchForm] = useReducer (formReducer, INITIAL_STATE);
	const {isValid,  isFormReadyToSubmit, values} = formState;

	useEffect(() => { 
		let timerId;
		if(!isValid.date || !isValid.text || !isValid.title || !isValid.tag) {
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};


	}, [isValid]);

	useEffect(() => {
		if(isFormReadyToSubmit) {
			onSubmit(values);
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (e) => {

		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({type: 'SUBMIT', payload: formProps});
	
	};

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div className={styles['header-title']}>
					<input type="text" name='title' className={cn(styles['input-title'], {
						[styles['invalid']] : !isValid.title
					})}/>
				</div>
				<div className={cn(styles['input-block'], {
					[styles['invalid']] : !isValid.date
				})}>
					<label htmlFor="date" className={styles['label-row']}>
						<DateIcon/>
						<span>Дата</span>
					</label>
					<input type="date" name='date' id="date" className={styles['input']}/>
				</div>
				<div className={cn(styles['input-block'], {
					[styles['invalid']] : !isValid.tag
				})}>
					<label htmlFor="tag" className={styles['label-row']}>
						<FolderIcon/>
						<span>Метки</span>
					</label>
					<input type="text" name='tag' id="tag" className={styles['input']}/>
				</div>
				<div>
					<textarea name="text" id="" className={cn(styles['textarea'], {
						[styles['invalid']] : !isValid.text
					})}></textarea>
				</div>
				<Button onClick={() => {console.log('ggg');}} text="Сохранить"/>
			</form>
		</>
	);
}

export default JournalForm;
