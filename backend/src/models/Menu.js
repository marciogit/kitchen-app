const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
	holiday: Boolean,
	week_day: String,
	meals: {
		meat_lovers: {
			m_title: String,
			m_ingredients: String,
		},
		vegetarian: {
			v_title: String,
			v_ingredients: String,
		},
		salad: String,
		desert: Boolean,
	}
}, { collection: 'days' });

module.exports = mongoose.model('Menu', MenuSchema);
