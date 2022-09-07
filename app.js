const express = require('express');
const app = express();
const taskRouter = require('./routers/task-router');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./public'));

app.use('/api', taskRouter);

app.listen(3000, () => 'Listening on 3000');
