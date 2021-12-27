import React from 'react';
import './ItemInventory.css';

function ItemInventory(props) {
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
			<div className="item__button_div">
				<button
					className="item__button"
					onClick={() => props.moveToTransferList(props.item.id)}
				>
					Send To Transfer List
				</button>
				<button
					className="item__button"
					onClick={() => props.moveToTransferList(props.item.id)}
				>
					Retrieve Item
				</button>
			</div>
		</div>
	);
}

export default ItemInventory;
