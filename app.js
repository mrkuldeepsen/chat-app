const { express, path, bodyParser, cors } = require('./app/modules/module');
const app = express();

require('dotenv').config({ path: __dirname + '/.env' });

const { handleError } = require('./app/utils/errorhandler');
const { authJWT } = require('./app/middlewares/middleware');



app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(authJWT)




app.get('/api/', (req, res) => {
    res.status(400).send({
        message:'Hunn smart!',
        pId:process.pid
    })
})

require('./app/routes/user')(app)
require('./app/routes/auth')(app)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running port on ${PORT}`)
})