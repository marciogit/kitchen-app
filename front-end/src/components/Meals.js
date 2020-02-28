import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import api from '../services/api';

function Meals(props) {

	// Date and Time
	const day = new Date().getDay();
	const hour = new Date().getHours();
	const minutes = new Date().getMinutes();

	const listDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	
	// Hooks
	const [ days, setDays ] = useState([]);
	const [ weekDay, setWeekDay ] = useState('');
	const [ activeIndex, setActive ] = useState(day-1);

	// function doNotify() {
	// 	Notification.requestPermission().then(function (result) {
	// 		const myNotification = new Notification("Dessert Day!!!", {
	// 			'body': 'Hi, get ready to grab your dessert at 2pm in the kitchen',
	// 			'icon': 'http://placekitten.com/g/50/50'
	// 		});
	// 	})
	// }
	
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

		async function loadMeals() {
			const response = await api.get('/list');
			setDays(response.data);
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
						className={classNames('', i === activeIndex ? "active" : "", list.week_day === weekDay ? "current_day": "", i+1 < day ? "past_day" : "")}>
						{list.week_day}
					</li>
				))}
			</ul>

			{days.map((day, i) => (
				<div key={day._id} className={classNames('day', listDays[activeIndex] === day.week_day ? "active" : "", day.holiday === true ? 'holiday' : "", {"dessert": day.meals.dessert === true})}>
					{/* Meat Lovers */}
					<div className={classNames("meat_lovers", {'none': day.holiday === true})}>
						<h4>Meat lovers</h4>
						<p>{day.meals.meat_lovers.m_ingredients}</p>
					</div>

					{/* Vegetarian */}
					<div className={classNames("vegetarian", {'none': day.holiday === true})}>
						<h4>Vegetarian</h4>
						<p>{day.meals.vegetarian.v_ingredients}</p>
					</div>

					{/* Salad */}
					<div className={classNames("salad", {'none': day.holiday === true})}>
						<h4>Salad</h4>
						<p>{day.meals.salad}</p>
					</div>

					{/* Dessert */}
					<div className={classNames("dessert", {"show": day.meals.dessert === true && listDays[activeIndex] === day.week_day})}>
						<h4>Dessert</h4>
						<p>Don't miss out at 2pm in the kitchen</p>
					</div>

					{/* Public Holiday */}
					<div className={classNames("holiday", {'show': day.holiday === true && listDays[activeIndex] === day.week_day})}>
						<h4>No work today!</h4>
					</div>
				</div>
			))}
		</div>
	)
}

export default Meals;