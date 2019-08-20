import React from 'react';
import history from '@history';
import { useDispatch } from 'react-redux';
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimate } from '@fuse';
import { useForm } from '@fuse/hooks';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';

const ColoredTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: '#ffffff80',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#ffffff80',
		},
		'& .MuiOutlinedInput-root': {
			'&:hover fieldset': {
				borderColor: '#ffffff80',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#ffffff80',
			},
		},
	},
})(TextField);
const useStyles = makeStyles(theme => ({
	root: {
		background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
		color: theme.palette.primary.contrastText
	}
}));

function ForgotPasswordPage() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { form, handleChange } = useForm({
		email: ''
	});

	function isFormValid() {
		return form.email.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		jwtService.forgotPassword(form.email)
			.then(message => {
				dispatch(Actions.showMessage({ message }));

				history.push({
					pathname: '/login'
				});
			})
			.catch(err => {
				dispatch(Actions.showMessage({ message: err }));
			})
	}

	return (
		<div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

			<div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">

				<FuseAnimate animation="transition.expandIn">
					<img className="w-128 mb-32" src="assets/images/logos/brand-logo.svg" alt="logo" />
				</FuseAnimate>

				<FuseAnimate animation="transition.slideUpIn" delay={300}>
					<Typography variant="h3" color="inherit" className="font-light">
						青年職涯發展中心
					</Typography>
				</FuseAnimate>

				{/* <FuseAnimate delay={400}>
							<Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit
									facilisis facilisis.
							</Typography>
					</FuseAnimate> */}
			</div>

			<FuseAnimate animation={{ translateX: [0, '100%'] }}>

				<Card className="w-full max-w-400 mx-auto m-16 md:m-0 rounded-12">

					<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

						<Typography variant="h6" className="md:w-full mb-32 text-center">忘記密碼</Typography>

						<form
							name="recoverForm"
							noValidate
							className="flex flex-col justify-center w-full"
							onSubmit={handleSubmit}
						>

							<ColoredTextField
								className="mb-16"
								label="信箱"
								autoFocus
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
							/>

							<Button
								variant="contained"
								color="primary"
								className="w-224 mx-auto mt-16 rounded-full"
								aria-label="Reset"
								disabled={!isFormValid()}
								type="submit"
							>
								寄送重設密碼信件
							</Button>

						</form>

						<div className="flex flex-col items-center justify-center pt-32 pb-24">
							<Link className="font-medium" to="/login">登入</Link>
						</div>

					</CardContent>
				</Card>
			</FuseAnimate>
		</div>
	);
}

export default ForgotPasswordPage;
