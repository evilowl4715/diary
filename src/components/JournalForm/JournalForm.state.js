export const INITIAL_STATE = {
	isValid: {
		title: true,
		text: true,
		date: true,
		tag: true
	},
	values: {
		title: undefined,
		text: undefined,
		date: undefined,
		tag: undefined
	},
	isFormReadyToSubmit: false
};

export function formReducer (state, action) {
	switch(action.type) {

	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
            
	case 'SUBMIT' : {
		const titleValidity = action.payload.title?.trim().length;
		const textValidity = action.payload.text?.trim().length;
		const dateValidity = action.payload.date;
		const tagValidity = action.payload.tag?.trim().length;
		return {
			values: action.payload,
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