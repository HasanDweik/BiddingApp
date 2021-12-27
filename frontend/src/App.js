import './App.css';
import React from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PagesSwitch from './Pages/PagesSwitch';

function App() {
	return (
		<div className="app__container">
			<Router basename="/">
				<div className="app">
					<PagesSwitch />
				</div>
			</Router>
		</div>
	);
}

export default App;
