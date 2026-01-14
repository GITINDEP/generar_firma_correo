require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const app = express();
const PORT = process.env.APP_PORT || 3000;
const db = require('./config/dbPostgre');

const routerPrincipal= require('./routes/principal.routes');

const {connectDB, closeDB} = require('./config/dbSQLServer');


app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}));

app.disable('x-powered-by');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true},{limit: '50mb'}));
app.use(express.static(path.join(__dirname,'public'),{
    dotfiles:'deny',
    index:false,
    setHeaders: (res, path) =>{
        res.set('X-Content-Type-Options','nosniff');
    }
}));


app.use(cookieParser());

 app.use(['/login'],(req, res, next) => {
    res.setHeader(
        'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
}); 

app.use(session({
  secret: process.env.APP_COOKIE_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'PROD',
    httpOnly: true, // previene acceso desde JavaScript
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 
    } // 24 horas
}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/',routerPrincipal);



/* app.get('*', (req, res) => {
  res.status(404).render('404', { 
    message: 'Página no encontrada' 
  });
}); */

app.use((req, res) => {
  res.status(404).render('404', { 
    message: 'Página no encontrada' 
  });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: process.env.NODE_ENV === 'PROD' 
            ? 'Error interno del servidor' 
            : err.message 
    });
});


db.sync({ force: false })
    .then(() => {

        console.log(`✅ Base de datos conectada(${process.env.PG_DB_NAME})`);
        app.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
        connectDB();
    });
})
.catch(err => {
    console.error(`Error al conectar a la base de datos: ${err.message}`);
});

