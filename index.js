import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';


const app=express();
const port=3200;
// const port = process.env.PORT || 3200;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// const mongoURI = process.env.MONGODB_URI;

mongoose.connect('mongodb+srv://yashgodwal:porsche911@cluster0.k7ybm4v.mongodb.net/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('error', () => console.log("error in connection"));
db.once('open', ()=> console.log("CONNECTED TO DATABASE"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

app.post("/submit", (req, res) => {
    // console.log(req.body);
    const emailid=req.body["Email"];
    const password1=req.body["Password"];
    const date= new Date();
    let time = date.getTime();
    // console.log(emailid);
    // console.log(password1);
  
    var data= {
        "emailid":emailid,
        "password1":password1,
        "date":date,
        "time":time,
    }

    db.collection('users').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record inserted success");
    });
    // return res.redirect("index.ejs");


    res.render("index.ejs", {
        Email:emailid,
        Password:password1,
    });
  });

  
  app.get("/contact", (req, res) => {
      res.render("contact.ejs");
    });
    
    app.post("/submit1", (req, res) => {
        // console.log(req.body);
        const emailid=req.body["Emailid"];
        const password1=req.body["Password"];
        const address1=req.body["Add1"];
        const address2=req.body["Add2"];
        const cityp=req.body["City"];
        const State=req.body["State"];
        const zipc=req.body["zip"];
        const chckb=req.body["Checkbox"];
        const date= new Date();
        let time = date.getTime();

        var data1={
            "emailid":emailid,
            "password1":password1,
            "address1":address1,
            "address2":address2,
            "cityp":cityp,
            "State":State,
            "zipc":zipc,
            "chckb":chckb,
            "date":date,
            "time":time,
        };

        db.collection('personaldb').insertOne(data1,(err,collection)=> {
            if(err){
                throw err;
            }
            console.log("Record inserted success personal info");
        });
        // return res.redirect("contact.ejs");
    
        
        // console.log(`Emailid: ${emailid}`);
        // console.log(`password: ${password1}`);
        // console.log(`address: ${address1}`);
        // console.log(`address2: ${address2}`);
        // console.log(`city: ${cityp}`);
        // console.log(`zip code: ${zipc}`);
        // console.log(`checkbox: ${chckb}`);
        
        res.render("contact.ejs", {
            email:emailid,
            password:password1,
            addre1:address1,
            addre2:address2,
            citypl:cityp,
            zipcd:zipc,
            checkb:chckb,
        });
    });
    

    app.listen(port, (req, res) => {
    console.log(`SERVER ON ${port} IS LISTENING RIGHT NOW...`);
})