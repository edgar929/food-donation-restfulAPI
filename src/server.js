import express from "express";
import bodyParser from "body-parser";
import connectDb from './database/dbconnection';
import cors from "cors";
import routes from './routes/index';

const app = express();
connectDb(); 
let corsOptions ={
  origin:'*', 
  credentials:true,     
  optionSuccessStatus:200
}
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', routes);
app.get("/",(req, res) => {
  res.send("Hello World");
});  
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log("server up and running on " + PORT);
});