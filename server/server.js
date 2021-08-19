const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const logger = require('morgan');
    const mongoose = require("mongoose");
    const cors = require("cors");


    const indexRouter = require('./routes/index');
    const userRouter = require("./routes/user");
    const hubRouter = require("./routes/hub");
    const blogRouter = require("./routes/blog");
    
    const server = express();

    //Mongoose Connection
    let dev_db_url = "mongodb+srv://christianAdmin:mongopassword@cluster0.ubkpu.mongodb.net/thegamerstory?retryWrites=true&w=majority";
    let mongoDB = process.env.MONGODB_URI || dev_db_url;

    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;

    db.on("connected", () => console.log("connected to mongo (*_*)"));
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    server.use(logger('dev'));
    server.use(cookieParser());
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(express.static(path.join(__dirname, 'public')));
    server.use(cors());

    server.use("/api", indexRouter);
    server.use("/api/user", userRouter);
    server.use("/api/hub", hubRouter);
    server.use("/api/blog", blogRouter);

    server.get("/", (req, res, next) => {
        res.redirect("/auth/login");
    });

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})