const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
app.use(express.json())

var cors = require('cors')
app.use(express.static("public"))
app.use(cors())

const db = {
  host: "54.173.126.116",
  port: 3306,
  user: "tet-simlab",
  password: "isef123",
  database: "tet-simlab",
};

const execSQLQuery = (sqlQry, id, res) => {
  const connection = mysql.createConnection(db);
  connection.query(sqlQry, id, (error, results, fields) => {
    if (error) res.json(error) 
    
    else res.json(results);
    connection.end();
    console.log("Executou: execSQLQuery" + " " + id);
  });
};

async function resultSQLQuery(sqlQry, id) 
{
  const connection = await mysql.createConnection(db);
  let [result] = await connection.promise().query(sqlQry, id);
  
  try 
  {
    return result;
  }   
    catch (error) 
    {
      console.log("Erro: "+error);
      throw error;
    }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/usuarios", (req, res) => {
  const id = [];
  execSQLQuery("Select * from usuario", id, res);
});

app.post("/usuario", (req, res) => {
  const id = [req.body.nome, req.body.usuario,req.body.email,req.body.senha ,req.body.escolaridade,req.body.formacao];
  execSQLQuery("insert into usuario values (null, ?, ?, ?, ?, ?, ?, 'padrao.png')", id, res);
});

app.listen(port, () => {
  console.log("App escutando a porta:" + port);
});

app.post('/login', async (req,res)=>
{
  const id = [req.body.email, req.body.senha];
  let [result] = await resultSQLQuery('SELECT * FROM usuario WHERE email=? and senha=?',id);
    
  if(result)
  {
     
     res.json({mensagem:"ok", "id":result.usu_id})   
  }
  else
  {
     res.json("nao achou")
  }
})

app.put("/usuarios/:id", (req, res) => {
  const id = [req.body.nome, req.body.email, req.body.senha,req.params.id];
  execSQLQuery("update usuario set nome=?,email=?,senha=? where id=?", id, res);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM usuario WHERE id=?", id, res);
});
app.get("/usuarios/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("Select nome, email, senha from usuario where id=?", id, res);
});
