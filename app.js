if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = express.Router()
const cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
const logger = require('morgan');
const mongoose = require('mongoose');
const {decodeUser} = require("./middlewares/decodeUser")


const corsOptions = {
  origin: true, // Allow all origins
  methods: ['PUT', 'POST', 'PATCH', 'DELETE', 'GET'], // Allow only specific methods
  // allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Accept', 'Authorization', 'pk2'], // Allow only specific headers
  allowedHeaders: true, // Allow only specific headers
  credentials: true, // Allow credentials (cookies, etc.) to be included
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '70mb', extended: true }));



app.use('/static/files/pdfs', express.static('./pdfs'));
app.use('/static/files/images', express.static('./images'));

const webookRoutes = require("./routes/webhook")
const userRoutes = require("./routes/user")
app.use("/saimShopify", webookRoutes)
app.use("/user", userRoutes)





app.get('/dashboard',decodeUser, async (req, res) => {
  res.render('index');
});


app.get('/', async (req, res) => {
  // const images = await Image.find();
  res.render('login');
});

app.get('/signUp', async (req, res) => {
  // const images = await Image.find();
  res.render('signUp');
});








/* *********************************** */
/*            M O N G O D B            */
/* *********************************** */
mongoose
  .connect(process.env.DatabaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("eeeeeee--------->", error);
    process.exit();
  }
};

start(process.env.PORT || 4005);

