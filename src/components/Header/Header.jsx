import SelectUser from '../SelectUser/SelectUser';
import { LogoIcon } from '../SvgIcons/SvgIcons';
import styles from './Header.module.css';

function Header({changedUser}) {

	const changeUser = (e) => {
		changedUser(e.target.value);
	};

	return (
		<div className="header">
			<div className={styles.logo}>
				<LogoIcon/>
			</div>
			<SelectUser changeUser={changeUser}/>

		</div>

	);
}

export default Header;