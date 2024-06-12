export const INITIAL_STATE = {
	isValid: {
		title: true,
		text: true,
		date: true,
		tag: true
	},
	values: {
		title: '',
		text: '',
		date: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer (state, action) {
	switch(action.type) {
	case 'SET_VALUE':
		return {...state, values: {...state.values, ...action.payload}};

	case 'CLEAR_FORM':
		return {...state, values: INITIAL_STATE.values};

	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
            
	case 'SUBMIT' : {
		const titleValidity = state.values.title?.trim().length;
		const textValidity = state.values.text?.trim().length;
		const dateValidity = state.values.date;
		const tagValidity = state.values.tag?.trim().length;
		return {
			...state,
			isValid: {
				title: titleValidity,
				text: textValidity,
				date: dateValidity,
				tag: tagValidity
			},
			isFormReadyToSubmit: titleValidity && textValidity && dateValidity && tagValidity
		};
	}

	}
}