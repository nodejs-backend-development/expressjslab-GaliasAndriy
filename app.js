const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const requestDuration = require('./scripts/middleware/requestDuration');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const getDurationInMilliseconds = (start) => {
//     const NS_PER_SEC = 1e9
//     const NS_TO_MS = 1e6
//     const diff = process.hrtime(start)

//     return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
// }

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.originalUrl} [STARTED]`)
//     const start = process.hrtime()

//     res.on('finish', () => {            
//         const durationInMilliseconds = getDurationInMilliseconds (start)
//         console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
//     })

//     res.on('close', () => {
//         const durationInMilliseconds = getDurationInMilliseconds (start)
//         console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
//     })

//     next()
// });

app.use(requestDuration.duration);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(commentsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
