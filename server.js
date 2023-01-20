const app = require("./app");
const User = require('./models/UserModel');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
var cors = require('cors');
var cookieParser = require("cookie-parser");
var session = require("express-session");
const MongoDBSession = require('connect-mongodb-session')(session);
dotenv.config({ path: "config/config.env" })


connectDatabase();

const store = new MongoDBSession({
  uri: process.env.DATABASE,
  collection: "mySessions"
})

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,

}));
app.use(cookieParser());
app.use(
  session({
    secret: "thisisrandomstuff",
    resave: false,
    saveUninitialized: false,
    store: store
  })
)

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post("/api/v1/users/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  try {
    if (user && (await user.matchPassword(password))) {
      req.session.isAuth = true;
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    console.log(error)
  }

})



app.listen(4000, () => {
  console.log("Server working on http://localhost:", process.env.PORT)
})