// import styles from './SelectUser.module.css';

import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser({changedUser}) {
	const { userId } = useContext(UserContext);
	const  changeUser = (e) => {
		changedUser(e.target.value);
	};

	return (
		<select name="user" id="user" value={userId} onChange={changeUser}>
			<option value="1">Анастасия</option>
			<option value="2">Ксения</option>
		</select>

	);
}

export default SelectUser;