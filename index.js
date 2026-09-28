let express=require("express");
let app = express();
let userroutes=require('./routes/userroutes');
let projectroutes=require('./routes/projectroutes');
let categoryroutes=require('./routes/categoryroutes');
let mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/project_collector").then(()=>{
    console.log("connected with mongodb database");
}).catch(()=>{
    console.log(err);
})
app.use(express.json());
app.use("/api/user",userroutes);
app.use("/api/project",projectroutes);
app.use("/api/category",categoryroutes);

app.listen(3000,()=>{
    console.log("server listening on port 3000")
})