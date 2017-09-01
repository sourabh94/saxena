var express=require("express"),path=require("path"),logger=require("morgan"),cookieParser=require("cookie-parser"),bodyParser=require("body-parser"),index=require("./routes/index"),users=require("./routes/users"),compression=require("compression"),app=express();app.set("public",path.join(__dirname,"public")),app.set("view engine","html"),app.use(logger("dev")),app.use(bodyParser.json()),app.use(bodyParser.urlencoded({extended:!1})),app.use(cookieParser()),app.use(express.static(path.join(__dirname,"public"))),app.use(compression()),app.use("/",index),app.use("/admin",users),app.use(prerender),app.use(function(e,r,s){r.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),r.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS"),r.setHeader("Content-Type","application/json"),s()}),app.use(function(e,r,s){var p=new Error("Not Found");p.status=404,s(p)}),app.use(function(e,r,s,p){s.locals.message=e.message,s.locals.error="development"===r.app.get("env")?e:{},s.status(e.status||500),s.render("error")}),module.exports=app;