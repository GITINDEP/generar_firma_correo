require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/dbPostgre');

const routerPrincipal= require('./routes/principal.routes');

const {connectDB, closeDB} = require('./config/dbSQLServer');


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true},{limit: '50mb'}));
app.use(express.static('src/public'));
app.use(cookieParser())


app.use(session({
  secret: process.env.APP_COOKIE_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use('/',routerPrincipal);

db.sync({ force: false })
    .then(() => {

        console.log(`✅ Base de datos conectada(${process.env.PG_DB_NAME})`);
        app.listen(PORT, () => {
        console.log(`Servidor iniciado en puerto ${PORT}`);

    });
})
.catch(err => {
    console.error(`Error al conectar a la base de datos: ${err.message}`);
});

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Servidor conectado al puerto  http://localhost:${PORT}`);
});
 
