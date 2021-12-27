import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import Logo from '../../Images/Logo.png';
import axios from '../../Utils/axios';
import { useHistory } from 'react-router';

function Signup() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorArray, setErrorArray] = useState([]);
	const handleFirstName = (target) => {
		if (target !== 'undefined') {
			if (
				!target.match(/^[a-zA-Z]+$/) ||
				target.length < 3 ||
				target.length > 20
			) {
				if (!errorArray.includes('firstname')) {
					setErrorArray([...errorArray, 'firstname']);
				}
			} else {
				setErrorArray(errorArray.filter((item) => item !== 'firstname'));
				setFirstName(target);
			}
		}
	};

	const handleLastName = (target) => {
		if (
			!target.match(/^[a-zA-Z]+$/) ||
			target.length < 3 ||
			target.length > 20
		) {
			if (!errorArray.includes('lastname')) {
				setErrorArray([...errorArray, 'lastname']);
			}
		} else {
			setErrorArray(errorArray.filter((item) => item !== 'lastname'));
			setLastName(target);
		}
	};
	const handleUsername = (target) => {
		if (
			!target.match(/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/) ||
			target.length < 8 ||
			target.length > 20
		) {
			if (!errorArray.includes('username')) {
				setErrorArray([...errorArray, 'username']);
			}
		} else {
			setErrorArray(errorArray.filter((item) => item !== 'username'));
			setUsername(target);
		}
	};
	const handleEmail = (target) => {
		if (
			!target.match(
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
			)
		) {
			if (!errorArray.includes('email')) {
				setErrorArray([...errorArray, 'email']);
			}
		} else {
			setErrorArray(errorArray.filter((item) => item !== 'email'));
			setEmail(target);
		}
	};
	const handlePassword = (target) => {
		if (!target.match(/^[a-zA-Z0-9!@#$%^&*]{8,16}$/)) {
			if (!errorArray.includes('password')) {
				setErrorArray([...errorArray, 'password']);
			}
		} else {
			setErrorArray(errorArray.filter((item) => item !== 'password'));
			setPassword(target);
		}
	};
	const handleConfirmPassword = (target) => {
		if (password !== target) {
			if (!errorArray.includes('confirmpassword')) {
				setErrorArray([...errorArray, 'confirmpassword']);
			}
		} else {
			setErrorArray(errorArray.filter((item) => item !== 'confirmpassword'));
			setConfirmPassword(target);
		}
	};
	const history = useHistory();
	const [signupFail] = useState(false);

	const register = (form) => {
		// axios
		// 	.post('http://localhost:8000/api/user/register', form)
		// 	.then((response) => console.log(response.data));
		axios
			.post('/api/user/register', JSON.stringify(form), {
				headers: { 'Content-Type': 'application/json; charset=UTF-8' },
				// params: { userID: 1 }, //Add userID as a param
			})
			.then((response) => {
				console.log('repsonse', response.status);
				if (response.status === 200) {
					history.push('/login');
				}
			});
	};
	const handleSubmit = (e) => {
		if (
			firstName !== '' &&
			lastName !== '' &&
			email !== '' &&
			username !== '' &&
			password !== '' &&
			confirmPassword !== '' &&
			errorArray.length === 0
		) {
			const form = {
				firstname: firstName,
				lastname: lastName,
				email: email,
				username: username,
				password: password,
			};
			console.log(form);
			register(form);
		}
	};
	return (
		<div className="signup__container">
			<div className="signup__main_div">
				<div className="signup__logo">
					<img src={Logo} className="signup__logo_img" alt="Logo"></img>
				</div>
				<div className="signup__title">
					<h2>Create a new HDA Account</h2>
				</div>
				<div className="signup_form">
					<div className="signup_form_left">
						<div className="signup__first_name signup__credential_div">
							<div className="signup__title_error">
								<h5>FIRST NAME</h5>
								<label
									className={'signup__error_label'}
									hidden={errorArray.includes('firstname') ? false : true}
								>
									Invalid Input!
								</label>
							</div>
							<input
								placeholder="Enter your first name"
								onChange={(e) => handleFirstName(e.target.value)}
							/>
						</div>
						<div className="signup__last_name signup__credential_div">
							<div className="signup__title_error">
								<h5>Last NAME</h5>
								<label
									className={'signup__error_label'}
									hidden={errorArray.includes('lastname') ? false : true}
								>
									Invalid Input!
								</label>
							</div>
							<input
								placeholder="Enter your last name"
								onChange={(e) => handleLastName(e.target.value)}
							/>
						</div>
						<div className="signup__username signup__credential_div">
							<div className="signup__title_error">
								<h5>USERNAME</h5>
								<label
									className={'signup__error_label'}
									hidden={errorArray.includes('username') ? false : true}
								>
									Invalid Input!
								</label>
							</div>
							<input
								placeholder="Enter your username"
								onChange={(e) => handleUsername(e.target.value)}
							/>
						</div>
					</div>
					<div className="signup_form_right">
						<div className="signup__email signup__credential_div">
							<div className="signup__title_error">
								<h5>E-MAIL</h5>
								<label
									className={'signup__error_label'}
									hidden={errorArray.includes('email') ? false : true}
								>
									Invalid Input!
								</label>
							</div>
							<input
								placeholder="Enter your email"
								onChange={(e) => handleEmail(e.target.value)}
							/>
						</div>
						<div className="signup__password signup__credential_div">
							<div className="signup__title_error">
								<h5>PASSWORD</h5>
								<label
									className={'signup__error_label'}
									hidden={errorArray.includes('password') ? false : true}
								>
									Invalid Input!
								</label>
							</div>
							<input
								type="password"
								placeholder="Enter your password"
								onChange={(e) => handlePassword(e.target.value)}
							/>
						</div>
						<div className="signup__password signup__credential_div">
							<div className="signup__title_error">
								<h5>CONFIRM PASSWORD</h5>
								<label
									className={'signup__error_label'}
									hidden={errorArray.includes('confirmpassword') ? false : true}
								>
									Invalid Input!
								</label>
							</div>
							<input
								type="password"
								placeholder="Re-nter your password"
								onChange={(e) => handleConfirmPassword(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<div className="signup__signup">
					<label
						className={'signup__error_label'}
						hidden={signupFail ? false : true}
					>
						Invalid Input!
					</label>
					<button
						className="signup__signup_button"
						onClick={(e) => handleSubmit(e)}
					>
						Sign Up
					</button>
				</div>
				<div className="signup__sign_in">
					Have an H7D Account?
					<Link to="/login" className="signup__sign_in_link">
						Sign In
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Signup;
