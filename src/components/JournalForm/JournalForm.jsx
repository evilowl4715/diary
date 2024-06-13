import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { DateIcon, FolderIcon } from '../SvgIcons/SvgIcons';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({onSubmit}) {

	const [formState, dispatchForm] = useReducer (formReducer, INITIAL_STATE);
	const {isValid,  isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const tagRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.tag:
			tagRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => { 
		let timerId;
		if(!isValid.date || !isValid.text || !isValid.title || !isValid.tag) {
			focusError(isValid);
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
			dispatchForm({type: 'CLEAR_FORM'});
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	
	};

	return (

		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			{userId}
			<div className={styles['header-title']}>
				<Input type="text" name='title' value={values.title} ref={titleRef} isValid={isValid.title} onChange={onChange} appearence='title'/>

			</div>
			<div className={cn(styles['input-block'], {
				[styles['invalid']] : !isValid.date
			})}>
				<label htmlFor="date" className={styles['label-row']}>
					<DateIcon/>
					<span>Дата</span>
				</label>
				<Input type="date" name='date' value={values.date} ref={dateRef} isValid={isValid.date} onChange={onChange} appearence='input' id="date"/>
			</div>
			<div className={cn(styles['input-block'], {
				[styles['invalid']] : !isValid.tag
			})}>
				<label htmlFor="tag" className={styles['label-row']}>
					<FolderIcon/>
					<span>Метки</span>
				</label>
				<Input type="text" name='tag' value={values.tag} ref={tagRef} isValid={isValid.tag} onChange={onChange} appearence='input' id="tag"/>
			</div>
			<div>
				<textarea name="text" value={values.text} ref={textRef} onChange={onChange} className={cn(styles['textarea'], {
					[styles['invalid']] : !isValid.text
				})}></textarea>
			</div>
			<Button onClick={() => {console.log('ggg');}} text="Сохранить"/>
		</form>
	);
}

export default JournalForm;
