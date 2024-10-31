import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');



app.get('/', (req, res) => {
    res.render('home');
});

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'msql_node'
});

dbConnection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Banco conectado');
        app.listen(3000);
    }
})
