import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Meals from './components/Meals';

function App({props, hideLoader}) {

	useEffect(() => {
		hideLoader();
	},[]);

	return (
		<>
			<Meals></Meals>
		</>
	);
}

export default App;
