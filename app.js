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

app.set('trust proxy', true); // Trust X-Forwarded-For header when behind a proxy

const allowedIPs = ['162.210.196.223  ','175.107.225.100','192.168.0.100', '127.0.0.1', '::1',"104.196.24.122"]; // Add your IPs here

const ipFilter = (req, res, next) => {
  const getClientIP = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
      // If there are multiple IPs in x-forwarded-for (due to proxy chaining), take the first one
      const ips = xForwardedFor.split(',').map(ip => ip.trim());
      return ips[0]; // First IP in the list is the actual client IP
    }
    return req.ip || req.connection.remoteAddress; // Fallback to request IP if no x-forwarded-for
  };

  const clientIP = getClientIP(req);
  console.log(`Incoming request from IP: ${clientIP}`);


  // Your IP filtering logic here
  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Your IP is not allowed to access this API.' });
  }

// 
};




app.use(ipFilter)



app.use('/static/files/pdfs', express.static('./pdfs'));
app.use('/static/files/images', express.static('./images'));

const webookRoutes = require("./routes/webhook")
//   const receivePDFRoutes = require("./routes/receivePDF")
app.use("/saimShopify", webookRoutes)
// app.use(testingCode)



app.get('/', async (req, res) => {
  // const images = await Image.find();
  res.render('index', { images: [] });
});




const data = JSON.stringify({
  "apikey": "db0a143b5a2688d045e324eaa3274822",
  "reference": "1001",
  "email": "saimrafi2323@gmail.com",
  "addresses": [
    {
      "type": "delivery",
      "company": "dtecherz",
      "firstname": "saim",
      "lastname": "rafi",
      "street1": "bhzd",
      "zip": "75500",
      "city": "karachi",
      "country": "PK",
      "email": "saimrafi2323@gmail.com",
      "phone": "+923305654344"
    }
  ],
  "items": [
    {
      "reference": "1001-1",
      "product": "book_hardcover_21x30",
      "shipping_level": "cp_saver",
      "title": "Book Hardcover 21x30",
      "count": "5",
      "files": [
        {
          "type": "cover",
          "url": "https://6886-111-88-221-54.ngrok-free.app/static/files/pdfs/2e226de5-fa5a-4421-ba0c-9f487f652870.pdf",
          "md5sum": "8e9d024918df56000b30311f768d387e"
        }
      ],
      "options": [
        {
          "type": "total_pages",
          "count": "1"
        }
      ]
    }
  ]
}
);




const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.cloudprinter.com/cloudcore/1.0/orders/add,',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};




// axios.request(config)
// .then((response) => {
//   console.log(response.data);
// })
// .catch((error) => {
//   console.log("eee",error);
//   console.log("ddd",error.message);
// });






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

