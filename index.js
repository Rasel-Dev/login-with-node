const express = require('express');
const app = express();
const userRoute = require('./api/Routes/user.route');
require('dotenv').config();

app.use(express.json());
app.use('/api/user', userRoute);

app.listen(process.env.PORT, () =>
	console.log(`Server start on http://localhost:${process.env.PORT}`),
);
