import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Main.css';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/NavBar/NavBar';
import Home from '../../Components/Home/Home';
import Settings from '../../Components/Settings/Settings';
import Inventory from '../../Components/Inventory/Inventory';
import Store from '../../Components/Store/Store';
import Transfer from '../../Components/Transfer/Transfer';
import TransferList from '../../Components/TransferList/TransferList';
import { setNav } from '../../Redux/Actions/navActions';
import TransferTarget from '../../Components/TransferTarget/TransferTarget';
import TransferMarket from '../../Components/TransferMarket/TransferMarket';

function Main() {
	const nav = useSelector((state) => state.nav.nav);
	const loggedIn = useSelector((state) => state.user.loggedIn);
	const [navigation, setNavigation] = useState(nav);
	const dispatch = useDispatch();
	dispatch(setNav(navigation));

	return (
		<div>
			{loggedIn === true ? (
				<div className="main__container">
					<Header navigation={navigation} setNavigation={setNavigation} />
					<div className="main__content">
						<div>
							<NavBar navigation={navigation} setNavigation={setNavigation} />
						</div>
						{nav === 'HOME' ? (
							<Home setNavigation={setNavigation} />
						) : nav === 'SETTINGS' ? (
							<Settings />
						) : nav === 'INVENTORY' ? (
							<Inventory />
						) : nav === 'TRANSFER' ? (
							<Transfer setNavigation={setNavigation} />
						) : nav === 'TRANSFER LIST' ? (
							<TransferList />
						) : nav === 'TRANSFER TARGET' ? (
							<TransferTarget />
						) : nav === 'TRANSFER MARKET' ? (
							<TransferMarket />
						) : (
							<Store />
						)}
					</div>
				</div>
			) : (
				<div className="_404">
					<h1>404</h1>
					<div>Please Sign In Again To Continue</div>
					<a href="/">Sign In</a>
				</div>
			)}
		</div>
	);
}
export default Main;
