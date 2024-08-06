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
  user: "00000000000",
  password: "00000000000",
  database: "00000000000",
};

const execSQLQuery = (sqlQry, id, res) => {
  const connection = mysql.createConnection(db);
  connection.query(sqlQry, id, (error, results, fields) => {
    if (error) res.json(error);
    else res.json(results);
    connection.end();
    console.log("Executou: execSQLQuery");
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
  const id = [req.body.nome, req.body.email, req.body.senha];
  execSQLQuery("insert into usuario values (null, ?, ?, ?)", id, res);
});

app.listen(port, () => {
  console.log("App escutando a porta:" + port);
});

app.post('/login', async (req,res)=>
{
  const id = [req.body.email, req.body.senha];
  let [result] = await resultSQLQuery('SELECT * FROM usuario WHERE usu_email=? and usu_senha=?',id);
    
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
  execSQLQuery("update usuario set usu_nome=?,usu_email=?,usu_senha=? where usu_id=?", id, res);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("DELETE FROM usuario WHERE usu_id=?", id, res);
});
app.get("/usuarios/:id", (req, res) => {
  const id = [req.params.id];
  execSQLQuery("Select usu_nome, usu_email, usu_senha from usuario where usu_id=?", id, res);
});
