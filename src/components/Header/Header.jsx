import SelectUser from '../SelectUser/SelectUser';
import { LogoIcon } from '../SvgIcons/SvgIcons';
import styles from './Header.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
const textBtn = ['Открыть', 'Закрыть'];

function Header() {
	const [textBtnIndex, setTextBtnIndex] = useState(0);

	const toggleTextBtn = () => {
		setTextBtnIndex(state => Number(!state));
	};

	return (
		<div className="header">
			<div className={styles.logo}>
				<LogoIcon/>
			</div>
			<SelectUser/>
			<Button onClick={toggleTextBtn}>{textBtn[textBtnIndex]}</Button>
		</div>

	);
}

export default Header;