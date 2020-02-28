
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://marcio:marcio@cluster0-mle9z.mongodb.net/kitchen?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
