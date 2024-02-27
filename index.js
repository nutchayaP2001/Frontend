import express from 'express';
import cors from 'cors';
// import mysql from "mysql2"
import session from 'express-session';
import FileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js'
import CustomerRoute from './routes/CustomerRoute.js'
import ProductRoute from './routes/ProductRoute.js'
// import StatusRoute from './routes/StatusRoute.js'
import LocationRoute from './routes/LocationRoute.js'
import CategoryRoute from './routes/CatagoryRoute.js'
import OrderRoute from './routes/OrderRoute.js'
import PaymentRoute from './routes/PaymentRoute.js'
import ProductDamageRoute from './routes/ProductDamageRoute.js'
import Promotion from './routes/PromotionRoute.js'
import CartRoute from './routes/CartRoute.js'
import SalesRoute from './routes/SaleRoute.js';
// import StockRoute from './routes/StockRoute.js'
import SequelizeStore from "connect-session-sequelize";
import db from './config/Database.js'

dotenv.config();

const app = express();

// const db = mysql.createConnection({
//     host: 'bestphotodb.cb0qk4w26ku7.ap-southeast-2.rds.amazonaws.com',
//     port: '3307',
//     user: 'admin',
//     password: 'sehun220244',
//     database: 'bestphotodb'
// })

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// db.Sequelize
// .sync()

// (async() => {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
}));
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));
app.use(UserRoute);
app.use(CustomerRoute);
app.use(ProductRoute);
app.use(CategoryRoute);
app.use(AuthRoute);
app.use(OrderRoute);
app.use(PaymentRoute);
app.use(LocationRoute);
app.use(ProductDamageRoute);
app.use(Promotion);
app.use(CartRoute)
app.use(SalesRoute)
// store.sync();

app.listen(process.env.APP_PORT, () => console.log('Server Up and Ruuning...'));