import express from "express";
import { engine } from "express-handlebars";
import mysql from "mysql";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.post("/post", (req, res) => {
  const { title, pageqty } = req.body;
  const insertNewBook = `INSERT INTO books (title,pageqty) VALUES ('${title}', '${pageqty}')`;
  dbConnection.query(insertNewBook, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Operação sem Erros!");
      res.redirect("/books");
    }
  });
});

app.get("/books", (req, res) => {
  const selectBooks = `SELECT * FROM books`;
  dbConnection.query(selectBooks, (err, data) => {
    if (err) {
      console.log("Erro na operação", err);
    } else {
      const books = data;
      res.render("books", { books });
      console.log(books);
    }
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const selectWhere = `SELECT * FROM books WHERE idbooks = ${id}`;
  const book = dbConnection.query(selectWhere, (err, data) => {
    const book = data[0];//data é uma lista, ai pra pegar o primeiro objeto usamos 0
    
    res.render("book", { book });
  });
});

app.get('/book/edit/:id', (req, res) =>{
  const id = req.params.id;
  const selectWhere = `SELECT * FROM books WHERE idbooks = ${id}`;
  dbConnection.query(selectWhere, (err, data)=>{
    if(err){
      return `Ouve um erro: ${err}`
    }
    const book = data[0];
    res.render('editBook', {book});
  })
  
})

app.put('/book/edit/:id', (req, res)=>{
  const id = req.params.id;
  const {title, pageqty} = req.body;
  console.log(typeof(title))
  const update = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE idbooks = '${id}'`;
  console.log(update)
  dbConnection.query(update, (err, data) =>{
    if (err) {
      console.error('Erro ao atualizar o livro:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o livro' }); // Enviar resposta de erro
    }
    else{
      res.status(200).json({ message: 'Livro atualizado com sucesso!' });
    }
  })
})

app.delete('/book/del/:id', (req, res)=>{
  const id = req.params.id;
  const del = `DELETE FROM books WHERE idbooks = '${id}'`;
  dbConnection.query(del, (err, data) =>{
    if(err){
      console.error('Erro ao deletar o livro:', err);
      return res.status(500).json({ error: 'Erro ao deletar o livro' });
    }
    else{
    res.status(200).json({message : 'Livro deletado com sucesso'});
    }
  })
})
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "msql_node",
});

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Banco conectado");
    app.listen(3000);
  }
});
