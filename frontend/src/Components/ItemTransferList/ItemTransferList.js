import React from 'react';
import './ItemTransferList.css';

function ItemTransferList(props) {
	return (
		<div className="item__container">
			<div className="item__container_left">
				<div className="item__image">
					<img
						className="item__image_img"
						src={'http://localhost:8000/storage/' + props.item.thumbnail}
						alt="ItemImage"
					/>
				</div>
				<div className="item__details">
					<h1>{props.item.title}</h1>
					<h5>{props.item.description}</h5>
				</div>
			</div>
			{props.section === 4 || props.section === 1 ? (
				<div className="item__button_div">
					<button
						className="item__button"
						onClick={() => props.moveToInventory(props.item.id)}
					>
						Send To Inventory
					</button>
					<button
						className="item__button"
						onClick={() => props.listOnTransferMarket(props.item.list_id)}
					>
						List On Transfer Market
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default ItemTransferList;
