import stayles from './Body.module.css';

function Body({children}) {

	return (
		<div className={stayles['body']}>
			{children}
		</div>
	);
}

export default Body;
