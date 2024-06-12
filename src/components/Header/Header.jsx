import { LogoIcon } from '../SvgIcons/SvgIcons';
import styles from './Header.module.css';

function Header() {



	return (
		<div className="header">
			<div className={styles.logo}>
				<LogoIcon/>
			</div>
		</div>

	);
}

export default Header;