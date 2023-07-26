const { express, path, bodyParser, cors } = require('./app/modules/module');
const socket = require('socket.io');

const app = express();

// const http = require('http').createServer(app)


require('dotenv').config({ path: __dirname + '/.env' });

const { handleError } = require('./app/utils/errorhandler');
const { authJWT } = require('./app/middlewares/middleware');



app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors({
    "origin": ["http://localhost:3000", "http://localhost:4000"],
    "methods": ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(authJWT)




app.get('/api/', (req, res) => {
    res.status(400).send({
        message: 'Hunn smart!',
        pId: process.pid
    })
})

require('./app/routes/user')(app)
require('./app/routes/auth')(app)
require('./app/routes/chat')(app)

const PORT = process.env.PORT || 4000;


const server = app.listen(PORT, () => console.log(`Server is running port on ${PORT}`)
)

const io = socket(server);

io.on("connection", function (socket) {
    console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm>>>>>>>>>', socket.id);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

    console.log("Made socket connection");


    socket.on('join_room', (data) => {
        socket.join(data)
    })
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('recieve_message', data)
    })

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    })

});