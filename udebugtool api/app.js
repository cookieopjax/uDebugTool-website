const express = require('express')
const app = express()
//const port = 3000
const cors = require('cors')
var mysql = require("mysql");
app.use(cors({ origin: true }))
app.use(express.json())

let con = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b62aec15c3e802",
  password: "274d67b8",
  database: "heroku_730964ed1b8b018"
});

function disconnect_handler() {
  con = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b62aec15c3e802",
    password: "274d67b8",
    database: "heroku_730964ed1b8b018"
  });
  

  con.on('error', err => {
       if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.log("reconnet!");
           // db error 重新連線
           disconnect_handler();
       } else {
           throw err;
       }
   });
}

disconnect_handler();

// con.connect(function (err) {
//   if (err) {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       // db error 重新連線
//       con.connect();
//     }
//     else{
//       console.log('MYSQL connecting error');
//     }
//   }
//   console.log('MYSQL connecting success');
// });




// 將所有資料由後端傳至前端
app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'https://udebugtool.netlify.app');
  con.query('select * from `suggection` order by `publish_date` desc', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
})


//將資料由前端傳入後端並回傳
app.post('/add', (req, res) => {

  // console.log(req.body)
  console.log("準備插入進資料庫 : " + req.body.time + " / " + req.body.name + " / " + req.body.suggs)
  con.query('insert into `suggection` value(?, ?, ?);', [req.body.time, req.body.name, req.body.suggs], function (error, results, fields) {
    if (error) {
      res.send("sql insert fail");
      return
    }
    res.send("sql insert succes");
  });

})

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
  console.log("Server is running.");
});
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })