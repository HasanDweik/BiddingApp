import React from 'react';
import './Store.css';
import Background from '../../Images/Background.jpg';

function Store() {
	return (
		<div
			className="store__container"
			style={{ backgroundImage: `url(${Background})` }}
		>
			<div className="store__main_content">
				<div className="store__title">
					<h1>Credit & Debit Cards</h1>
				</div>
				<div className="store__cardholder_name">
					<label>Cardholder Name</label>
					<input
						type="text"
						placeholder="Cradholder Name"
						className="store__cardholder_name_input"
					/>
				</div>
				<div className="store__card_number">
					<label>Card Number</label>
					<input
						type="text"
						placeholder="Crad Number"
						className="store__card_number_input"
					/>
				</div>
				<div className="store__date_cvv">
					<div className="store__date">
						``
						<label>End Date</label>
						<div className="store__date_inputs">
							<input className="store__date_input" placeholder="MM" />
							<input className="store__date_input" placeholder="YY" />
						</div>
					</div>
					<div className="store__cvv">
						<label>CVV</label>
						<input className="store__cvv_input" placeholder="CVV" />
					</div>
				</div>
				<button className="store__button">Save</button>
			</div>
		</div>
	);
}

export default Store;
