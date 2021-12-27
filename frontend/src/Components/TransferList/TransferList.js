import React, { useState, useEffect } from 'react';
import './TransferList.css';
import Background from '../../Images/Background.jpg';
import axios from '../../Utils/axios';
import ItemTransferList from '../ItemTransferList/ItemTransferList';

function TransferList() {
	const [items, setItems] = useState([]);
	const fetchItems = async () => {
		axios
			.get('api/marketplace/transfer_list', {
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
				'api/marketplace/transfer_list/move_to_inventory',
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
	const [listOnTransferMarketState, setListOnTransferMarketState] =
		useState(null);

	const listOnTransferMarket = (item) => {
		setListOnTransferMarketState(item);
	};
	const [minBid, setMinBid] = useState();
	const [buyOut, setBuyOut] = useState();
	const [duration, setDuration] = useState('0d 0h 1m');

	const listItem = () => {
		axios
			.post(
				'api/marketplace/transfer_list/auction',
				JSON.stringify({
					list_id: listOnTransferMarketState,
					buyout_price: buyOut,
					starting_price: minBid,
					duration: duration,
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
				setListOnTransferMarketState(null);
				fetchItems();
			});
	};
	let available = 0;
	let sold = 0;
	let unsold = 0;
	let active = 0;
	return (
		<div
			className="transferlist__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<div className="transferlist__main_content">
				<div className="transferlist__sold_items transferlist__partition">
					<div className="transferlist__partition_title">
						<h3>SOLD ITEMS</h3>
					</div>
					{items.map(function (item) {
						if (item.transfer_list_section_id === 3) {
							unsold++;
							return (
								<ItemTransferList
									item={item}
									moveToInventory={moveToInventory}
									section={3}
								/>
							);
						}
					})}
					{sold === 0 ? (
						<div className="transferlist__items_list">
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
							<h4>Make Bank</h4>
							<h5>Successfully sold items will appear here</h5>
						</div>
					) : (
						''
					)}
				</div>
				<div className="transferlist__unsold_items transferlist__partition">
					<div className="transferlist__partition_title">
						<h3>UNSOLD ITEMS</h3>
					</div>
					{items.map(function (item) {
						if (item.transfer_list_section_id === 4) {
							unsold++;
							return (
								<ItemTransferList
									item={item}
									moveToInventory={moveToInventory}
									listOnTransferMarket={listOnTransferMarket}
									section={4}
								/>
							);
						}
					})}
					{unsold === 0 ? (
						<div className="transferlist__items_list">
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
							<h4>Better Luck Next Time</h4>`{' '}
							<h5>Items you have listed but did not sell will appear here</h5>`{' '}
						</div>
					) : (
						''
					)}
				</div>
				<div className="transferlist__available_items transferlist__partition">
					<div className="transferlist__partition_title">
						<h3>AVAILABLE ITEMS</h3>
					</div>
					{items.map(function (item) {
						if (item.transfer_list_section_id === 1) {
							available++;
							return (
								<ItemTransferList
									item={item}
									moveToInventory={moveToInventory}
									listOnTransferMarket={listOnTransferMarket}
									section={1}
								/>
							);
						}
					})}
					{available === 0 ? (
						<div className="transferlist__items_list">
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
							<h4>Start Selling</h4>
							<h5>Items you add to your Transfer List will appear here</h5>
						</div>
					) : (
						''
					)}
				</div>
				<div className="transferlist__active_transfers transferlist__partition">
					<div className="transferlist__partition_title">
						<h3>ACTIVE TRANSFERS</h3>
					</div>
					{items.map(function (item) {
						if (item.transfer_list_section_id === 2) {
							active++;
							return (
								<ItemTransferList
									item={item}
									moveToInventory={moveToInventory}
									section={2}
								/>
							);
						}
					})}
					{active === 0 ? (
						<div className="transferlist__items_list">
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
							<h4>Waiting for Bids</h4>
							<h5>
								Items you have currently listed for transfer will appear here
							</h5>
						</div>
					) : (
						''
					)}
				</div>
			</div>
			{listOnTransferMarketState !== null ? (
				<div className="transferlist_list_item_container">
					<div className="transferlist_list_item_popup">
						<div className="transferlist_list_item_popup_header">
							<h2> List Item To Transfer List</h2>
							<button
								className="transferlist_list_item_popup_close_button"
								onClick={() => setListOnTransferMarketState(null)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="transferlist_list_item_popup_close_svg"
									height="45px"
									width="45px"
									fill="rgb(196, 247, 80)"
								>
									<path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
									<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
								</svg>
							</button>
						</div>
						<div className="transferlist_list_item_popup_form">
							<div className="transferlist_list_item_popup_section">
								<label>Min Bid</label>
								<input
									type="number"
									className="transferlist_list_item_popup_section_input"
									onChange={(e) => setMinBid(e.target.value)}
								/>
							</div>
							<div className="transferlist_list_item_popup_section">
								<label>Buy Out Price</label>
								<input
									type="number"
									className="transferlist_list_item_popup_section_input"
									onChange={(e) => setBuyOut(e.target.value)}
								/>
							</div>
							<div className="transferlist_list_item_popup_section">
								<label>Duration</label>
								<select
									type="number"
									className="transferlist_list_item_popup_section_input"
									defaultValue="0d 1h"
									onChange={(e) => setDuration(e.target.value)}
								>
									<option value="0d 0h 1m">1 Minute</option>
									<option value="0d 1h 0m">1 Hour</option>
									<option value="0d 3h 0m">3 Hour</option>
									<option value="0d 6h 0m">6 Hour</option>
									<option value="0d 12h 0m">12 Hour</option>
									<option value="1d 0h 0m">1 Day</option>
									<option value="2d 0h 0m">2 Day</option>
								</select>
							</div>
							<button
								className="transferlist_list_item_popup_form_button"
								onClick={() => listItem()}
							>
								List
							</button>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default TransferList;
