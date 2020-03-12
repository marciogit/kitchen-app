import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { DB_CONFIG } from '../config/db';
import * as firebase from 'firebase';
firebase.initializeApp(DB_CONFIG);

function Meals(props) {

	// Date and Time
	const day = new Date().getDay();
	const listDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	
	// Hooks
	const [ loading, setLoading ] = useState(false);
	const [ days, setDays ] = useState([]);
	const [ weekDay, setWeekDay ] = useState('');
	const [ activeIndex, setActive ] = useState(day-1);

	useEffect(() => {
		switch (day) {
			case 1:
				setWeekDay('Mon');
				break;
			case 2: 
				setWeekDay('Tue')
				break;
			case 3:
				setWeekDay('Wed');
				break;
			case 4:
				setWeekDay('Thu');
				break;
			case 5:
				setWeekDay('Fri');
				break;
			default:
				return null;
		}

		setLoading(true);

		async function loadMeals() {
			const data = await firebase
			.firestore()
			.collection('current_week')
			.get()

			setDays(data.docs.map(doc => doc.data()));
			setLoading(false);
		}

		loadMeals();
	}, []);

	return (
		<div className="App">
			<div className="top_bar">What's Cooking?</div>
			<ul className="nav">
				{days.map((list, i)=> (
					<li
						key={i}
						onClick={e => setActive(i)}
						className={classNames('', i === activeIndex ? "active" : "", list.day === weekDay ? "current_day": "", i+1 < day ? "past_day" : "")}>
						{list.day}
					</li>
				))}
			</ul>

			{loading ? 
				<div className="lds-ripple"><div></div><div></div></div> : 
				<>
					{days.map((menu, i) => (
						<div key={i} className={classNames('day', listDays[activeIndex] === menu.day ? "active" : "", menu.holiday === true ? 'holiday' : "", {"dessert": menu.dessert === true})}>
							{/* Meat Lovers */}
							<div className={classNames("meat_lovers", {'none': menu.holiday === true})}>
								<h4>Meat lovers</h4>
								<p>{menu.regular}</p>
							</div>

							{/* Vegetarian */}
							<div className={classNames("vegetarian", {'none': menu.holiday === true})}>
								<h4>Vegetarian</h4>
								<p>{menu.vegetarian}</p>
							</div>

							{/* Salad */}
							<div className={classNames("salad", {'none': menu.holiday === true})}>
								<h4>Salad</h4>
								<p>{menu.salad}</p>
							</div>

							{/* Dessert */}
							<div className={classNames("dessert", {"show": menu.dessert === true && listDays[activeIndex] === menu.day})}>
								<h4>Dessert</h4>
								<p>Don't miss out at 2pm in the kitchen</p>
							</div>

							{/* Public Holiday */}
							<div className={classNames("holiday", {'show': menu.holiday === true && listDays[activeIndex] === menu.day})}>
								<h4>No work today!</h4>
							</div>
						</div>
					))}
				</>
			}
		</div>
	)
}

export default Meals;