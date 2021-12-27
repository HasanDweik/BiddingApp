import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../../Images/Logo.png';
import { login } from '../../Redux/Actions/userActions';
import { setBalance } from '../../Redux/Actions/balanceActions';
import { setNav } from '../../Redux/Actions/navActions';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from '../../Utils/axios';

function Login() {
	const [username_email, setUsername_Email] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();
	const [loginFail, setLoginFail] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				'/api/user/login',
				JSON.stringify({
					username: username_email,
					password: password,
				}),
				{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						withCredentials: true,
					},
				}
			)
			.then((response) => {
				console.log('repsonse', response.data.data);
				let data = response.data.data;

				if (response.status === 200) {
					dispatch(
						login({
							username: username_email,
							loggedIn: true,
							firstName: data.firstname,
							lastName: data.lastname,
							email: data.email,
							id: data.id,
						})
					);
					dispatch(
						setBalance({
							balance: parseInt(data.units),
						})
					);
					dispatch(setNav('HOME'));

					history.push('/main');
				}
			});
		setLoginFail(true);
		setUsername_Email('');
		setPassword('');
	};
	// const handleClick = () => history.push('/main');
	return (
		<div className="login__container">
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="login__main_div">
					<div className="login__logo">
						<img src={Logo} className="login__logo_img" alt="Logo"></img>
					</div>
					<div className="login__title">
						<h2>Sign in with your HDA Account</h2>
					</div>
					<div className="login__username_or_email">
						<h5>USERNAME OR EMAIL</h5>
						<input
							placeholder="Enter your username or email"
							value={username_email}
							onChange={(e) => setUsername_Email(e.target.value)}
						/>
					</div>
					<div className="login__password">
						<h5>PASSWORD</h5>
						<input
							type="password"
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					<div className="login__remember_me">
						<input type="checkbox" value="remember_me" />
						<label> Remember me</label>
					</div>
					<div className="login__signin">
						<label
							className={'login__error_label'}
							hidden={loginFail ? false : true}
						>
							Invalid Credentials!
						</label>
						<button className="login__signin_button" type="submit">
							Sign In
						</button>
					</div>
					<div className="login__sign_up">
						New to HDA?
						<Link to="/signup" className="login__sign_up_link">
							Create an HDA Account
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login;
