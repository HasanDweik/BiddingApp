import React from 'react';
import './ItemTransferMarket.css';

function ItemTransferMarket(props) {
	return (
		<div className="itemtransfermarket__container">
			<div className="itemtransfermarket__container_left">
				<div className="itemtransfermarket__image">
					<img
						className="itemtransfermarket__image_img"
						src={'http://localhost:8000/storage/' + props.item.item_thumbnail}
						alt="ItemImage"
					/>
				</div>
				<div className="itemtransfermarket__details">
					<h1>{props.item.item_title}</h1>
					<h5>{props.item.item_description}</h5>
					<div className="itemtransfermarket__details_bidding">
						<div className="itemtransfermarket__details_left">
							<div className="itemtransfermarket__details_minor">
								<h4>Starting Bid: </h4>
								{props.item.starting_bid}
							</div>
							<div className="itemtransfermarket__details_minor">
								<h4>Buyout Price:</h4> {props.item.buyout_price}
							</div>
						</div>
						<div className="itemtransfermarket__details_right">
							<div className="itemtransfermarket__details_minor">
								<h4>Current Bid:</h4> {props.item.current_bid}
							</div>
							<div className="itemtransfermarket__details_minor">
								<h4>Ending Date:</h4> {props.item.ending_date_time} UTC
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="itemtransfermarket__button_div">
				<button
					className="itemtransfermarket__button"
					onClick={() =>
						props.setTakeAction([props.item.item_id, props.item.id])
					}
				>
					Take Action
				</button>
			</div>
		</div>
	);
}

export default ItemTransferMarket;
