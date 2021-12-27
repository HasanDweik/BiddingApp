import React, { useState, useEffect } from 'react';
import './Inventory.css';
import Background from '../../Images/Background.jpg';
import ItemInventory from '../ItemInventory/ItemInventory';
import { useSelector } from 'react-redux';
import axios from '../../Utils/axios';

function Inventory() {
	const [addItem, setAddItem] = useState(false);
	const [description, setDescription] = useState(false);
	const [title, setTitle] = useState(false);
	const [image, setImage] = useState(null);
	const [fileImage, setFileImage] = useState(null);

	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
			setFileImage(event.target.files[0]);
		}
		// console.log(event.target.files[0]);
	};
	const [items, setItems] = useState([]);
	const user = useSelector((state) => state.user);
	const fetchItems = async () => {
		axios
			.get('/api/inventory')
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
	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('thumbnail', fileImage);
		formData.append('title', title);
		formData.append('description', description);
		formData.append('user_id', user.id);
		if (title !== '' && description !== '') {
			axios({
				// Endpoint to send files
				url: 'api/item/create',
				method: 'POST',
				headers: {
					// Add any auth token here
					'Content-Type': 'application/json; charset=UTF-8',
					withCredentials: true,
				},
				// Attaching the form data
				data: formData,
			})
				.then((response) => {
					console.log('response', response.status);
					setAddItem(false);
					fetchItems();
				}) // Handle the response from backend here
				.catch((err) => {
					console.log(err);
				}); // Catch errors if any
			// .post(
			// 	'api/item/create',
			// 	JSON.stringify({
			// 		title: title,
			// 		description: description,
			// 		thumbnail: 'picture/path/test',
			// 		user_id: user.id,
			// 	}),
			// 	{
			// 		headers: {
			// 			'Content-Type': 'application/json; charset=UTF-8',
			// 			withCredentials: true,
			// 		},
			// 	}
			// )
			// .then((response) => {
			// 	console.log('repsonse', response.status);
			// 	setAddItem(false);
			// 	fetchItems();
			// });
		}
	};
	const moveToTransferList = (id) => {
		axios
			.post(
				'api/inventory/move_to_transfer_list',
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
	return (
		<div
			className="inventory__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<div className="inventory__main_content">
				<div className="inventory__partition">
					<div className="inventory__title">
						<h3>All ITEMS</h3>
						<button
							className="inventory__add_button"
							onClick={() => setAddItem(true)}
						>
							Add New
						</button>
					</div>

					<div className="inventory__items_list">
						{items.length === 0 ? (
							<div className="inventory__items_list_null">
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
								<h5>Your items will appear here</h5>
							</div>
						) : (
							items.map(function (item) {
								return (
									<ItemInventory
										item={item}
										moveToTransferList={moveToTransferList}
									/>
								);
							})
						)}
					</div>
				</div>
			</div>
			{addItem === true ? (
				<div className="inventory__add_item_container">
					<div className="inventory__add_item_popup">
						<div className="inventory__add_item_popup_header">
							<h2> Add New Item</h2>
							<button
								className="inventory__add_item_popup_close_button"
								onClick={() => setAddItem(false)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="inventory__add_item_popup_close_svg"
									height="45px"
									width="45px"
									fill="rgb(196, 247, 80)"
								>
									<path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
									<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
								</svg>
							</button>
						</div>
						<div className="inventory__add_item_popup_form">
							<div className="inventory__add_item_popup_form_title">
								<labal>Title</labal>
								<input
									type="text"
									className="inventory__add_item_popup_form_title_input"
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div className="inventory__add_item_popup_form_description">
								<labal>Description</labal>
								<textarea
									type="text"
									cols={40}
									rows={8}
									style={{ resize: 'none' }}
									className="inventory__add_item_popup_form_description_input"
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							<input
								type="file"
								onChange={onImageChange}
								className="inventory__add_item_popup_form_file"
							/>
							<img
								src={image}
								alt="PreviewImage"
								className="inventory__add_item_popup_form_file_img"
							/>
							<button
								className="inventory__add_item_popup_form_button"
								onClick={(e) => handleSubmit(e)}
							>
								Add
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

export default Inventory;
