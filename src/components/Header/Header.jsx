import SelectUser from '../SelectUser/SelectUser';
import { LogoIcon } from '../SvgIcons/SvgIcons';
import styles from './Header.module.css';

function Header() {

	return (
		<div className="header">
			<div className={styles.logo}>
				<LogoIcon/>
			</div>
			<SelectUser/>

		</div>

	);
}

export default Header;