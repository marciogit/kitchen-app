
const Menu = require('../models/Menu');

module.exports = {

	async index(req, res) {
		const menu = await Menu.find();

		return res.json(menu)
	},

	async store(req, res) {
		const {
			holiday,
			week_day,
			meals: {
				meat_lovers: {
					m_title,
					m_ingredients
				},
				vegetarian: {
					v_title,
					v_ingredients
				},
				salad,
				desert
			}
		} = req.body;
	
		const menu = await Menu.create({
			holiday,
			week_day,
			meals: {
				meat_lovers: {
					m_title,
					m_ingredients
				},
				vegetarian: {
					v_title,
					v_ingredients
				},
				salad,
				desert
			}
		});
	
		return res.json(menu);
	}
}