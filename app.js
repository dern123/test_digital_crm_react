const express = require("express");
const session = require("express-session");
const config = require("config");
const path = require("path");

const cors = require("cors");
const fse = require("fs-extra");
const bodyParser = require("body-parser");
const corsConfig = require("./server/middlewares/cors");

const pgSession = require('connect-pg-simple')(session);

const PORT = process.env.PORT || config.get("PORT");
const dotenv = require("dotenv");
dotenv.config({
  override: true,
  path: path.join(__dirname, "development.env")
})


const pool = require("./server/db/pool");
// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.PORT,
//   database: process.env.DATABASE
// })
const app = express();
const server = require("http").Server(app);
app.use(bodyParser.json({limit: "100mb"}));
app.use(corsConfig);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({ extendet: true }));


// const sessionDBaccess = new sessionPool({
//     user: DB_USER,
//     password: DB_PASS,
//     host: DB_HOST,
//     port: DB_PORT,
//     database: DB_NAME})
    
// const sessionConfig = {
//     store: new pgSession({
//         pool: sessionDBaccess,
//         tableName: 'session'
//     }),
//     name: 'SID',
//     secret: randomString.generate({
//         length: 14,
//         charset: 'alphanumeric'
//     }),
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         sameSite: true,
//         secure: false, // ENABLE ONLY ON HTTPS
//         path:"/",
//         httpOnly:true,
//     }}

// app.use(session(sessionConfig));

dotenv.config();

const connectDb = async () => {
  const client = await pool.connect();
  
  try{
    const {rows} = await client.query("SELECT current_user");
    const currentUser = rows[0]["current_user"];
    console.log(currentUser);
  } catch (e) {
      console.log(e);
  } finally {
      client.release();
  }
}
 
//CRM
require("./server/routes/crm/index.routes").configure(app);


if(process.env.NODE_ENV === 'production'){  
  console.log("!!!!!!!!!!!");
    app.use('/', express.static(path.join(__dirname,'public')))
    app.get('*', (req,res) => {
        return res.sendFile(path.resolve(__dirname, 'public/index.html'));
    })
  }
  else{
  }

  async function start() {
    try {
      connectDb();
      const {initializeLeadProcessor} = require("./server/process/process")
      // const leadQueue = 
      for(let i = 0; i <2; i++){
        initializeLeadProcessor();
      }
      // Add 10 test leads to the queue
        //  leadQueue.add(testLead);
  
      server.listen(PORT, () => {
        console.info(`Server started on port: ${PORT}`);
      });
    } catch (e) {
      console.error('SERVER EXIT', e);
      process.exit(1);
    }
  }
  
  start();
  
  module.exports = app;