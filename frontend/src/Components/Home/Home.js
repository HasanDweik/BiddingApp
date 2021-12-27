import React from 'react';
import './Home.css';
import Background from '../../Images/Background.jpg';
import SettingsImage from '../../Images/Settings.png';
import InventoryImage from '../../Images/Inventory.png';
import StoreImage from '../../Images/Store.png';
import TransferImage from '../../Images/Transfer.png';

function Home(props) {
	return (
		<div
			className="home__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<div className="home__main_content">
				<div className="home__main_content_upper">
					<div
						className="home__shortcut"
						onClick={() => props.setNavigation('TRANSFER')}
					>
						<div className="home__shortcut_title">
							<h1>
								<i>TRANSFER</i>
							</h1>
						</div>
						<div className="home__shortcut_logo">
							<img
								src={TransferImage}
								className="home__shortcut_logo_img"
								alt="TransferImage"
							/>
						</div>
						<div className="home__shortcut_description">
							<label>
								Use the transfer market to bid on and buy items. Use it also to
								list your items into the market.
							</label>
						</div>
					</div>
					<div
						className="home__shortcut"
						onClick={() => props.setNavigation('STORE')}
					>
						<div className="home__shortcut_title">
							<h1>
								<i>STORE</i>
							</h1>
						</div>
						<div className="home__shortcut_logo">
							<img
								src={StoreImage}
								className="home__shortcut_logo_img home__shortcut_logo_img_store"
								alt="StoreImage"
							/>
						</div>
						<div className="home__shortcut_description">
							<label>
								Use the store to buy units, and start using it in auctions right
								away!!
							</label>
						</div>
					</div>
				</div>

				<div className="home__main_content_lower">
					<div
						className="home__shortcut"
						onClick={() => props.setNavigation('INVENTORY')}
					>
						<div className="home__shortcut_title">
							<h1>
								<i>INVENTORY</i>
							</h1>
						</div>
						<div className="home__shortcut_logo">
							<img
								src={InventoryImage}
								className="home__shortcut_logo_img"
								alt="InventoryImage"
							/>
						</div>
						<div className="home__shortcut_description">
							<label>
								In the inventory tou can store items and add new items to use it
								on the market.
							</label>
						</div>
					</div>
					<div
						className="home__shortcut"
						onClick={() => props.setNavigation('SETTINGS')}
					>
						<div className="home__shortcut_title">
							<h1>
								<i>SETTINGS</i>
							</h1>
						</div>
						<div className="home__shortcut_logo">
							<img
								src={SettingsImage}
								className="home__shortcut_logo_img"
								alt="SettingsImage"
							/>
						</div>
						<div className="home__shortcut_description">
							<label>Don't miss using the settings.</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
