import React from 'react';
import './NavBar.css';
import { useSelector } from 'react-redux';

function NavBar(props) {
	const nav = useSelector((state) => state.nav.nav);

	return (
		<div className="navbar__container">
			<div className="navbar__main">
				<div
					className={
						nav === 'HOME'
							? ' navbar__home navbar__topic checked_nav'
							: ' navbar__home navbar__topic'
					}
					onClick={() => props.setNavigation('HOME')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						enable-background="new 0 0 24 24"
						height="35px"
						viewBox="0 0 24 24"
						width="35px"
						fill="rgb(203,218,229)"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
					</svg>
					<h5>Home</h5>
				</div>
				<div
					className={
						nav === 'TRANSFER' ||
						nav === 'TRANSFER LIST' ||
						nav === 'TRANSFER TARGET' ||
						nav === 'TRANSFER MARKET'
							? 'navbar__transfer navbar__topic checked_nav'
							: ' navbar__transfer navbar__topic '
					}
					onClick={() => props.setNavigation('TRANSFER')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						enable-background="new 0 0 24 24"
						height="35px"
						viewBox="0 0 24 24"
						width="35px"
						fill="rgb(203,218,229)"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
					</svg>
					<h5>Transfer</h5>
				</div>

				<div
					className={
						nav === 'STORE'
							? 'navbar__store navbar__topic checked_nav'
							: 'navbar__store navbar__topic '
					}
					onClick={() => props.setNavigation('STORE')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						enable-background="new 0 0 24 24"
						height="35px"
						viewBox="0 0 24 24"
						width="35px"
						fill="rgb(203,218,229)"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
					</svg>
					<h5>Store</h5>
				</div>

				<div
					className={
						nav === 'INVENTORY'
							? ' navbar__inventory navbar__topic checked_nav'
							: 'navbar__inventory navbar__topic '
					}
					onClick={() => props.setNavigation('INVENTORY')}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						enable-background="new 0 0 24 24"
						height="35px"
						viewBox="0 0 24 24"
						width="35px"
						fill="rgb(203,218,229)"
					>
						<path d="M0 0h24v24H0V0z" fill="none" />
						<path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4l16-.02V7z" />
					</svg>
					<h5>Inventory</h5>
				</div>
			</div>

			<div
				className={
					nav === 'SETTINGS'
						? 'navbar__settings navbar__topic checked_nav'
						: 'navbar__settings navbar__topic'
				}
				onClick={() => props.setNavigation('SETTINGS')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					enable-background="new 0 0 24 24"
					height="35px"
					viewBox="0 0 24 24"
					width="35px"
					fill="rgb(203,218,229)"
				>
					<g>
						<path d="M0,0h24v24H0V0z" fill="none" />
						<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
					</g>
				</svg>
				<h5>Settings</h5>
			</div>
		</div>
	);
}
export default NavBar;
