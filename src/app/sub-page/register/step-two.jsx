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
import TextField from '../../../components/inputs/material/text-field';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initialState } from '../../../redux/reducers/verifty/initial';
import { verifty_create, verifty_response, verifty_result } from '../../../redux/reducers/verifty';

import FormData from 'form-data';

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
	const { loginReducers, verifty, verifty_create, verifty_response, verifty_result, setSteps } = props;
	const [verify, setVerify] = useState({ ...initialState });
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const [fullWidth, setFullWidth] = useState(true);
	const [maxWidth, setMaxWidth] = useState('sm');
	const [counter, setCounter] = useState(0);
	const [code, setCode] = useState({
		one: "",
		two: "",
		three: "",
		four: "",
		five: "",
		six: "",
	});
	const [loading, isLoading] = useState(false);

	const vrf = async () => {
		const fResponse = new FormData();
		fResponse.append('phone', verifty.entity.phone);
		fResponse.append('code', "");
		const response = await verifty_response(fResponse);
		if (response.type === "FETCH_RESPONSE_VERIFTY") {
			setVerify({
				...initialState,
				loading: false,
				isSuccess: true,
				result: true,
				entity: {
					...initialState.entity,
					...response.payload
				},
			});
			new Promise((resolve, reject) => {
				if ( loginReducers.isSuccess )
					return resolve("Mesaj Gönderme Başarılı!");
				else
					return reject("Mesaj Gönderilemedi Lütfen Giriş Yapın veya Kayıt Olun!");
			})
			.then(info => toast.info(info, {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			}))
			.then(() => setCounter(120))
			.then(() => setOpen(true))
			.catch(err => toast.error(err, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }));
		}
	}

	const vrf_result = async () => {
		isLoading(true);
		const fResponse = new FormData();
		fResponse.append('phone', verifty.entity.phone);
		const new_code = Object.values(code).map(val => val).join("");
		fResponse.append('code', new_code);

		const result = await verifty_result(fResponse);
		if ( result.type === "FETCH_RESULT_VERIFTY" ) {
			isLoading(false);
			toast.success("Doğrulama kodu başarılı!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
			toast.info("Lütfen Bekleyiniz! Yönlendiriliyorsunuz...", {
				position: "bottom-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return setTimeout(() => setSteps("step3"), 1200);
		} else {
			isLoading(false);
			return toast.error("Doğrulama kodu hatalı veya geçersiz lütfen tekrar gönderin!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
		}
	}

	useLayoutEffect(() => {
		!verify.result && vrf();
	}, [verify]);

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

	const handleClickOpen = () => new Promise((resolve, reject) => {
		if ( loginReducers.isSuccess )
			resolve(true);
		else
			reject("Lütfen Giriş Yapın veya Kayıt Olun!")
	})
	.then(info => setOpen(info))
	.catch(err => toast.info(err, {
		position: "bottom-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	}));

	const handleClickOpenR = () => vrf();

	const handleClose = () => setOpen(false);

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
						<b>{verifty.phone}</b> numaralı telefona gönderdiğimiz 6 haneli kodu girin.
          			</DialogContentText>
					<div className="d-flex flex-wrap dialog-center">
						<div className="d-flex group-text">
							{Object.keys(code).map(name => 
								<TextField key={`code-${name}`} type="number" name={name} maxLength={1} onChange={e => setCode({...code, [e.target.name]: e.target.value})}/>
							)}
						</div>
						<Button onClick={handleClickOpenR} variant="link" style={{ color: "#00B2A9", fontSize: "11pt", marginBottom: "15px", background: "transparent!important" }}>
							{counter > 0 ? `Güvenlik kodunu girmek için kalan süreniz ${counter} veya tekrar gönder.` : `Güvenlik kodunu tekrar gönder.`}
						</Button>
						{!loading ? <Button onClick={vrf_result} text={`İleri`} blue /> : <Button onClick={() => console.log("Lütfen Bekleyiniz...")} text={`Lütfen Bekleyiniz...`} blue />}
					</div>
				</DialogContent>
				<DialogActions>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch,
		...bindActionCreators({ verifty_create, verifty_response, verifty_result }, dispatch),
	}
}

const mapStateToProps = ({ loginReducers, verifty }) => ({ loginReducers, verifty });

export default connect(mapStateToProps, mapDispatchToProps)(stepTwo);