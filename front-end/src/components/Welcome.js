import React from 'react';

function Welcome() {
	return (
		<div className="App">
			<div className="top_bar">What's Cooking?</div>
			<div id="cooking">
				<h1>Cooking in progress...</h1>
				<div className="bubble"></div>
				<div className="bubble"></div>
				<div className="bubble"></div>
				<div className="bubble"></div>
				<div className="bubble"></div>
				<div id="area">
					<div id="sides">
						<div id="pan"></div>
						<div id="handle"></div>
					</div>
					<div id="pancake">
						<div id="pastry"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Welcome;