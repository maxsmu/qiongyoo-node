/**
 * @Author: maxsmu
 * @Date: 2016-11-11 10:49:20
 * @Last Modified by: maxsmu
 * @Last Modified time: 2016-11-14 17:07:11
 * @GitHub: https://github.com/maxsmu
*/
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.argv[2] === 'dev') {
	app.use(morgan('dev'));
}

app.use(express.static(__dirname));

app.set('views', './views');
app.set('view engine', 'jade');


app.get('/', (request, response) => {
	response.render('pages/index', {
		title: '首页',
		movies: [
			{
				_id: 12,
				title: '111'
			}
		]
	});
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.send(err.message);
	});
}

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
	console.log(`前端服务器已启动.\n访问地址: http://127.0.0.1:${server.address().port}\n`);
});
