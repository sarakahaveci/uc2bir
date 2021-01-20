// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Material } from '../../../components/inputs/material';
import Button from '../../../components/buttons/button';
import { toast } from 'react-toastify';
import InputText from '../../../components/inputs/InputText';
import TextField from '../../../components/inputs/material/text-field';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		margin: 'auto',
		width: 'fit-content',
	},
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
	formControlLabel: {
		marginTop: theme.spacing(1),
	},
}));

const stepTwo = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const [fullWidth, setFullWidth] = useState(true);
	const [maxWidth, setMaxWidth] = useState('sm');

	const [counter, setCounter] = useState(120);

	useEffect(() => {
		if (counter > 0) {
			const interval = setInterval(() => {
				setCounter(counter - 1);
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}, [counter])

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickOpenR = () => {
		setCounter(120);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const elemRefs = [];

	const autoTab = e => {
		const BACKSPACE_KEY = 8;
		const DELETE_KEY = 46;
		let tabindex = e.target.getAttribute("data-index") || 0;
		tabindex = Number(tabindex);
		let elem = null;
		if (e.keyCode === BACKSPACE_KEY) {
			elem = tabindex > 0 && elemRefs[tabindex - 1];
		} else if (e.keyCode !== DELETE_KEY) {
			elem = tabindex < elemRefs.length - 1 && elemRefs[tabindex + 1];
		}
		if (elem) {
			elem.current.focus();
		}
	};

	const Input = props => {
		const ref = React.createRef();
		elemRefs.push(ref);
		return (
			<input
				className={`materials new-input data-index-${props.index}`}
				data-index={props.index}
				ref={ref}
				maxLength={1}
				onKeyUp={props.autoTab}
			/>
		);
	};

	const inputs = Array.from({ length: 6 }, (element, index) => (
		<Input key={index} index={index} autoTab={autoTab} />
	));

	return (
		<React.Fragment>
			<Button style={{ marginBottom: 15 }} blue onClick={handleClickOpen} fontSize="11pt">Kodu Gir!</Button>
			<Button style={{ marginBottom: 15 }} blue onClick={handleClickOpenR} fontSize="11pt">Telefonuma Kodu Tekrar Gönder!</Button>
			<Dialog
				className="material-dialog"
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}>
				<DialogTitle className="text-center">Telefon Numaranızı Doğrulayın</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ padding: "15px 30px" }} className="text-center">
						<b>05388799778</b> numaralı telefona gönderdiğimiz 6 haneli kodu girin.
          			</DialogContentText>
					<div className="d-flex flex-wrap dialog-center">
						<div className="d-flex group-text">
							<TextField/>
							<TextField/>
							<TextField/>
							<TextField/>
							<TextField/>
							<TextField/>
						</div>
						<Button onClick={handleClickOpenR} variant="link" style={{ color: "#00B2A9", fontSize: "11pt", marginBottom: "15px", background: "transparent!important" }}>
							{counter > 0 ? `Güvenlik kodunu girmek için kalan süreniz ${counter} veya tekrar gönder.` : `Güvenlik kodunu tekrar gönder.`}
						</Button>
						<Button type="submit" text={`İleri`} blue />
					</div>
				</DialogContent>
				<DialogActions>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default stepTwo;