import React from 'react';
import './Settings.css';
import Background from '../../Images/Background.jpg';
import Logo from '../../Images/Logo.png';
import { useSelector } from 'react-redux';
import SettingsImage from '../../Images/Settings.png';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Actions/userActions';
import { setBalance } from '../../Redux/Actions/balanceActions';
import axios from '../../Utils/axios';

function Settings() {
	const user = useSelector((state) => state.user);
	const history = useHistory();
	const dispatch = useDispatch();
	const handleLogOut = () => {
		axios
			.post('/api/user/logout', {
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
					withCredentials: true,
				},
			})
			.then((response) => {
				console.log('repsonse', response);
				dispatch(logout());

				dispatch(
					setBalance({
						balance: '',
					})
				);

				history.push('/');
			});
	};
	return (
		<div
			className="settings__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<div className="settings__center">
				<div className="settings__header">
					<div className="settings__user_info">
						<h4>{user.username}</h4>
						<h5>EST. SEP 2019</h5>
					</div>
					<div className="settings__logo">
						<img src={Logo} className="settings__logo_img" alt="Logo" />
					</div>
				</div>
				<div className="settings__content">
					<div className="settings__png">
						<img
							src={SettingsImage}
							className="settings_png_img"
							alt="SettingsImage"
						></img>
					</div>
					<div className="settings__main">
						<button className="settings__buttons">Select Language</button>
						<button
							className="settings__buttons"
							onClick={() => handleLogOut()}
						>
							Sign Out
						</button>
						<button className="settings__buttons">About</button>
						<button className="settings__buttons">User Agreement</button>
						<button className="settings__buttons">
							Privacy and Cookies Policy
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
