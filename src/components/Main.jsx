// @ts-nocheck
import React from 'react';

/**
 * @param {JSX.IntrinsicAttributes & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>} props
 */
const Main = (props) => {
	return (
		<main className="main">
			<section className="app-root">
				{props.children}
			</section>
		</main>
	);
};

export default Main;