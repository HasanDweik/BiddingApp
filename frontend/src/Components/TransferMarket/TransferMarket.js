import React, { useState } from 'react';
import './TransferMarket.css';
import Background from '../../Images/Background.jpg';
import ItemTransferMarket from '../ItemTransferMarket/ItemTransferMarket';
import axios from '../../Utils/axios';
import { useDispatch } from 'react-redux';
import { setBalance } from '../../Redux/Actions/balanceActions';
import { useSelector } from 'react-redux';

function TransferMarket() {
	const dispatch = useDispatch();
	const [itemName, setItemName] = useState();
	const [minBid, setMinBid] = useState(0);
	const [maxBid, setMaxBid] = useState(0);
	const [minBuy, setMinBuy] = useState(0);
	const [maxBuy, setMaxBuy] = useState(0);
	const handlePlusMinBid = () => {
		var n = parseInt(minBid);
		if (n + 10 <= maxBid) setMinBid(n + 10);
	};
	const handlePlusMaxBid = () => {
		var n = parseInt(maxBid);
		setMaxBid(n + 10);
	};
	const handlePlusMinBuy = () => {
		var n = parseInt(minBuy);
		if (n + 10 <= maxBuy) setMinBuy(n + 10);
	};
	const handlePlusMaxBuy = () => {
		var n = parseInt(maxBuy);
		setMaxBuy(n + 10);
	};

	const handleMinusMinBid = () => {
		var n = parseInt(minBid);
		if (n - 10 >= 0) setMinBid(n - 10);
	};
	const handleMinusMaxBid = () => {
		var n = parseInt(maxBid);
		if (n - 10 >= minBid) setMaxBid(n - 10);
	};
	const handleMinusMinBuy = () => {
		var n = parseInt(minBuy);
		if (n - 10 >= 0) setMinBuy(n - 10);
	};
	const handleMinusMaxBuy = () => {
		var n = parseInt(maxBuy);
		if (n - 10 >= minBuy) setMaxBuy(n - 10);
	};
	const handleResetButton = () => {
		setMinBid(0);
		setMaxBid(0);
		setMinBuy(0);
		setMaxBuy(0);
	};
	const [searchState, setSearchState] = useState(true);
	const [items, setItems] = useState([]);
	const [takeAction, setTakeAction] = useState(null);
	const handleSearchButton = async () => {
		axios
			.get(
				'api/marketplace/search',

				{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						withCredentials: true,
					},
					data: {
						title: itemName,
						min_bid: minBid,
						max_bid: maxBid,
						min_buyout: minBuy,
						max_buyout: maxBuy,
					},
				}
			)
			.catch((err) => {
				console.log('Err', err);
			})
			.then((response) => {
				let array = response.data.data;
				setItems(array);
				setSearchState(false);
			});
	};
	const [bidOnFor, setBidOnFor] = useState(0);
	const handleBidOn = () => {
		axios
			.post(
				'api/transferTarget',
				JSON.stringify({
					item_id: takeAction[0],
					transfer_market_id: takeAction[1],
					bid: bidOnFor,
				}),
				{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						withCredentials: true,
					},
				}
			)
			.then((response) => {
				dispatch(
					setBalance({
						balance: parseInt(response.data.data.balance),
					})
				);
				setSearchState(true);
				setTakeAction(null);
			});
	};
	const handleBuy = () => {
		axios
			.post(
				'api/marketplace/buyout',
				JSON.stringify({
					item_id: takeAction[0],
					transfer_market_id: takeAction[1],
				}),
				{
					headers: {
						'Content-Type': 'application/json; charset=UTF-8',
						withCredentials: true,
					},
				}
			)
			.then((response) => {
				dispatch(
					setBalance({
						balance: parseInt(response.data.data.balance),
					})
				);
				setSearchState(true);
				setTakeAction(null);
			});
	};
	const user = useSelector((state) => state.user);
	return (
		<div
			className="transfermarket__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			{searchState ? (
				<div className="transfermarket__main_content">
					<div className="transfermarket__search">
						<input
							type="text"
							className="transfermarket__search_input"
							placeholder="Type Item Name"
							onChange={(e) => setItemName(e.target.value)}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="28px"
							viewBox="0 0 24 24"
							width="28px"
							fill="rgb(61, 230, 235)"
						>
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
						</svg>
					</div>
					<h2>BID PRICE :</h2>
					<div className="transfermarket__filters">
						<div className="tranfermarket__left_filters">
							<h5>Min:</h5>
							<div className="tranfermarket__left_bid">
								<button
									className="tranfermarket__filters_buttons_minus"
									onClick={() => handleMinusMinBid()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="white"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13H5v-2h14v2z" />
									</svg>
								</button>
								<input
									type="text"
									className="tranfermarket__filters_inputs"
									value={minBid}
									onChange={(e) => setMinBid(e.target.value)}
								/>
								<button
									className="tranfermarket__filters_buttons_plus"
									onClick={() => handlePlusMinBid()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="black"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
									</svg>
								</button>
							</div>
						</div>
						<div className="tranfermarket__right_filters">
							<h5>Max:</h5>
							<div className="tranfermarket__right_bid">
								<button
									className="tranfermarket__filters_buttons_minus"
									onClick={() => handleMinusMaxBid()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="white"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13H5v-2h14v2z" />
									</svg>
								</button>
								<input
									type="text"
									className="tranfermarket__filters_inputs"
									value={maxBid}
									onChange={(e) => setMaxBid(e.target.value)}
								/>
								<button
									className="tranfermarket__filters_buttons_plus"
									onClick={() => handlePlusMaxBid()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="black"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
					<h2>BUY PRICE :</h2>
					<div className="transfermarket__filters">
						<div className="tranfermarket__left_filters">
							<h5>Min:</h5>
							<div className="tranfermarket__left_bid">
								<button
									className="tranfermarket__filters_buttons_minus"
									onClick={() => handleMinusMinBuy()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="white"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13H5v-2h14v2z" />
									</svg>
								</button>
								<input
									type="text"
									className="tranfermarket__filters_inputs"
									value={minBuy}
									onChange={(e) => setMinBuy(e.target.value)}
								/>
								<button
									className="tranfermarket__filters_buttons_plus"
									onClick={() => handlePlusMinBuy()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="black"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
									</svg>
								</button>
							</div>
						</div>
						<div className="tranfermarket__right_filters">
							<h5>Max:</h5>
							<div className="tranfermarket__right_bid">
								<button
									className="tranfermarket__filters_buttons_minus"
									onClick={() => handleMinusMaxBuy()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="white"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13H5v-2h14v2z" />
									</svg>
								</button>
								<input
									type="text"
									value={maxBuy}
									className="tranfermarket__filters_inputs"
									onChange={(e) => setMaxBuy(e.target.value)}
								/>
								<button
									className="tranfermarket__filters_buttons_plus"
									onClick={() => handlePlusMaxBuy()}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 0 24 24"
										width="24px"
										fill="black"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div className="tranfermarket__main_buttons">
						<button
							className="tranfermarket__main_reset_button"
							onClick={() => handleResetButton()}
						>
							Reset
						</button>
						<button
							className="tranfermarket__main_search_button"
							onClick={() => handleSearchButton()}
						>
							Search
						</button>
					</div>
				</div>
			) : (
				<div className="tranfermarket__main_content">
					<div className="tranfermarket__partition">
						<div className="tranfermarket__title">
							<h3>All ITEMS</h3>
							<button
								className="tranfermarket__search_button"
								onClick={() => setSearchState(true)}
							>
								Search
							</button>
						</div>

						<div className="tranfermarket__items_list">
							{items.length === 0 ? (
								<div className="tranfermarket__items_list_null">
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
									<h4>Hello World</h4>
									<h5>Market items will appear here</h5>
								</div>
							) : (
								items.map(function (item) {
									if (item.item_owner_id !== user.id) {
										return (
											<ItemTransferMarket
												item={item}
												setTakeAction={setTakeAction}
											/>
										);
									}
								})
							)}
						</div>
					</div>
				</div>
			)}
			{takeAction !== null ? (
				<div className="tranfermarket__take_action_container">
					<div className="tranfermarket__take_action_popup">
						<div className="tranfermarket__take_action_popup_header">
							<h2> Take Action On Item</h2>
							<button
								className="tranfermarket__take_action_popup_close_button"
								onClick={() => setTakeAction(null)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="tranfermarket__take_action_popup_close_svg"
									height="45px"
									width="45px"
									fill="rgb(196, 247, 80)"
								>
									<path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
									<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
								</svg>
							</button>
						</div>
						<div className="tranfermarket__take_action_popup_form">
							<div className="tranfermarket__take_action_popup_bid">
								<input
									type="number"
									className="tranfermarket__take_action_popup_bid_input"
									onChange={(e) => setBidOnFor(e.target.value)}
								/>
								<button
									className="tranfermarket__take_action_popup_bid_button"
									onClick={() => handleBidOn()}
								>
									Bid On
								</button>
							</div>
							<div className="tranfermarket__take_action_popup_buy">
								<button
									className="tranfermarket__take_action_popup_buy_button"
									onClick={() => handleBuy()}
								>
									Buy Item
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}
export default TransferMarket;
