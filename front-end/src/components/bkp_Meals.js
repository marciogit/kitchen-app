import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';

function Meals(props) {

	// Date and Time
	const day = new Date().getDay();
	const listDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	
	// Hooks
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(false);
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

		// Fetching Data with Fetch
		// async function loadMeals () {
		// 	setLoading(true);
		// 	const res = await fetch("http://192.168.24.139:3333/list");
		// 	res
		// 		.json()
		// 		.then(res => {
		// 			setDays(res);
		// 			setLoading(false);
		// 		})
		// }
		
		// Fetching Data with Axios
		async function loadMeals() {
			setLoading(true);
			const result = await axios
			.get("http://192.168.24.139:3333/list")
			.then((res) => {
				setDays(res.data);
				setLoading(false);
			}).catch(err => {
				setError(err);
				console.log("Hey dev!! have a look and good luck: " + err);
			});
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

			{loading ? 
				<div className="lds-ripple"><div></div><div></div></div> : 
				<>
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
				</>
			}
		</div>
	)
}

export default Meals;