// @ts-nocheck
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
	const [open, setOpen] = React.useState(true);
	const [fullWidth, setFullWidth] = React.useState(true);
	const [maxWidth, setMaxWidth] = React.useState('sm');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleMaxWidthChange = (event) => {
		setMaxWidth(event.target.value);
	};

	const handleFullWidthChange = (event) => {
		setFullWidth(event.target.checked);
	};

	return (
		<React.Fragment>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open max-width dialog
      		</Button>
			<Dialog
				fullWidth={fullWidth}
				maxWidth={maxWidth}
				open={open}
				onClose={handleClose}
				aria-labelledby="max-width-dialog-title">
				<DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You can set my maximum width and whether to adapt or not.
          			</DialogContentText>
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default stepTwo;