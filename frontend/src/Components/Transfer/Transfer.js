import React from 'react';
import './Transfer.css';
import Background from '../../Images/Background.jpg';
import TransferImage from '../../Images/Transfer.png';

function Transfer(props) {
	return (
		<div
			className="transfer__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<div className="transfer__main_content">
				<div className="transfer__main_content_upper">
					<div
						className="transfer__shortcut transfer__shortcut_upper"
						onClick={() => props.setNavigation('TRANSFER MARKET')}
					>
						<div className="transfer__shortcut_title">
							<h1>
								<i>SEARCH THE TRANSFER MARKET</i>
							</h1>
						</div>
						<div className="transfer__shortcut_logo">
							<img
								src={TransferImage}
								className="transfer__shortcut_logo_img"
								alt="TransferLogo"
							/>
						</div>
					</div>
				</div>
				<div className="transfer__main_content_lower">
					<div
						className="transfer__shortcut"
						onClick={() => props.setNavigation('TRANSFER LIST')}
					>
						<div className="transfer__shortcut_title">
							<h1>
								<i>TRANSFER LIST</i>
							</h1>
						</div>
						<div className="transfer__content">
							<div className="transfer__content_left">
								<h1>0</h1>
								<h2>ITEMS</h2>
							</div>
							<div className="transfer__content_right">
								<h3>Selling:0</h3>
								<h3>Sold:0</h3>
							</div>
						</div>
						<div className="transfer__shortcut_logo">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								enable-background="new 0 0 24 24"
								height="120px"
								viewBox="0 0 24 24"
								width="120px"
								fill="rgb(61, 230, 235)"
							>
								<rect fill="none" height="24" width="24" />
								<path d="M3,5v14h18V5H3z M7,7v2H5V7H7z M5,13v-2h2v2H5z M5,15h2v2H5V15z M19,17H9v-2h10V17z M19,13H9v-2h10V13z M19,9H9V7h10V9z" />
							</svg>
						</div>
					</div>
					<div
						className="transfer__shortcut"
						onClick={() => props.setNavigation('TRANSFER TARGET')}
					>
						<div className="transfer__shortcut_title">
							<h1>
								<i>TRANSFER TARGETS</i>
							</h1>
						</div>
						<div className="transfer__content">
							<div className="transfer__content">
								<div className="transfer__content_left">
									<h1>0</h1>
									<h2>ITEMS</h2>
								</div>
								<div className="transfer__content_right">
									<h3>Winning:0</h3>
									<h3>Outbid:0</h3>
								</div>
							</div>
						</div>
						<div className="transfer__shortcut_logo">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="120px"
								viewBox="0 0 24 24"
								width="120px"
								fill="rgb(61, 230, 235)"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Transfer;
