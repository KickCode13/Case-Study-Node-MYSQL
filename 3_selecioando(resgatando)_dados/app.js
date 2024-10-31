import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/post', (req, res)=>{
    res.render('post');
});

app.post('/post', (req, res) =>{
    const {title, pageqty} = req.body;
    const insertNewBook = `INSERT INTO books (title,pageqty) VALUES ('${title}', '${pageqty}')`;
    dbConnection.query(insertNewBook, (err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('Operação sem Erros!')
            res.redirect('/books');
        }
    });
})

app.get('/books', (req, res)=>{
    const selectBooks = `SELECT * FROM books`;
    dbConnection.query(selectBooks,(err, data) =>{
        if(err){
            console.log("Erro na operação", err)
        }
        else{
            const books = data;
            res.render('books', {books});
            console.log(books)
        }
    });
    
})
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
