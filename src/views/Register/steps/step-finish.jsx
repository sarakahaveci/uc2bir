import React from 'react';

import { Button, Text, AwesomeIcon } from '../../../components';
import {useHistory} from 'react-router-dom';

const StepFinish = (props) => {
	const history = useHistory();
	return (
		<>
			<span style={{ marginBottom: 30, width: "100%", height: "auto", textAlign: "center" }}><AwesomeIcon.Succsess style={{ fontSize: "4em", color: "#00b2a9" }} /></span>
			<Text style={{ marginBottom: 5 }} children="Aramıza Hoş Geldin." blue textAlign="center" />
			<Text style={{ marginBottom: 25 }} fontSize="11pt" children="Sistem onayın için ilgili arkadaşlarımız en kısa zamanda seninle iletişime geçecek." textAlign="center" />
			<Button onClick={() => history.push("/")} text={`Anasayfa`} className="blue" />
		</>
	);
};

export default StepFinish;