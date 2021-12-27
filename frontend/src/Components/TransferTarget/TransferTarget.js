import React, { useState, useEffect } from 'react';
import './TransferTarget.css';
import Background from '../../Images/Background.jpg';
import axios from '../../Utils/axios';
import ItemTransferTarget from '../ItemTransferTarget/ItemTransferTarget';

function TransferTarget() {
	const [items, setItems] = useState([]);
	const fetchItems = async () => {
		axios
			.get('api/transferTarget', {
				headers: {
					'Content-Type': 'application/json; charset=UTF-8',
					withCredentials: true,
				},
			})
			.catch((err) => {
				console.log('Err', err);
			})
			.then((response) => {
				let array = response.data.data;
				setItems(array);
			});
	};
	useEffect(() => {
		fetchItems();
	}, []);
	const moveToInventory = (id) => {
		axios
			.post(
				'api/transferTarget/move_to_inventory',
				JSON.stringify({
					item_id: id,
				}),
				{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						withCredentials: true,
					},
				}
			)
			.then((response) => {
				console.log('repsonse', response.status);
				fetchItems();
			});
	};
	let won = 0;
	let bid = 0;
	return (
		<div
			className="transfertarget__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<div className="transfertarget__main_content">
				<div className="transfertarget__watch transfertarget__partition">
					<div className="transfertarget__partition_title">
						<h3>WATCH ITEMS</h3>
					</div>
					<div className="transfertarget__items_list">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="40px"
							viewBox="0 0 24 24"
							width="40px"
							fill="rgb(61, 230, 235)"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
						</svg>
						<h4>Keep an Eye</h4>
						<h5>Items you watch will appear here</h5>
					</div>
				</div>
				<div className="transfertarget__unsold_items transfertarget__partition">
					<div className="transfertarget__partition_title">
						<h3>ACTIVE BIDS</h3>
					</div>
					{items.map(function (item) {
						if (item.transfer_target_section_id === 1) {
							bid++;
							return (
								<ItemTransferTarget
									item={item}
									// moveToInventory={moveToInventory}
									section={1}
								/>
							);
						}
					})}
					{bid === 0 ? (
						<div className="transfertarget__items_list">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="40px"
								viewBox="0 0 24 24"
								width="40px"
								fill="rgb(61, 230, 235)"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
							</svg>
							<h4>Hope You Win</h4>
							<h5>Items you bid on will appear here</h5>
						</div>
					) : (
						''
					)}
				</div>
				<div className="transfertarget__available_items transfertarget__partition">
					<div className="transfertarget__partition_title">
						<h3>WON ITEMS</h3>
					</div>
					{items.map(function (item) {
						if (item.transfer_target_section_id === 2) {
							won++;
							return (
								<ItemTransferTarget
									item={item}
									moveToInventory={moveToInventory}
									section={2}
								/>
							);
						}
					})}

					{won === 0 ? (
						<div className="transfertarget__items_list">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="40px"
								viewBox="0 0 24 24"
								width="40px"
								fill="rgb(61, 230, 235)"
							>
								<path d="M0 0h24v24H0V0z" fill="none" />
								<path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
							</svg>
							<h4>HEllO THERE</h4>
							<h5>Items you won will appear here</h5>
						</div>
					) : (
						''
					)}
				</div>
				<div className="transfertarget__active_transfers transfertarget__partition">
					<div className="transfertarget__partition_title">
						<h3>LOST BIDS</h3>
					</div>
					<div className="transfertarget__items_list">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="40px"
							viewBox="0 0 24 24"
							width="40px"
							fill="rgb(61, 230, 235)"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
						</svg>
						<h4>Better Luck Next Time</h4>
						<h5>Items you have bid on but lost will appear here</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TransferTarget;
