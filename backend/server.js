import express, {json} from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';


//routers:
import { sideBarItemsRouter } from './routes/sideBarItemsRouter.js';
import { todoListRouter } from './routes/todoListRouter.js';
import { blogEntysRouter } from './routes/blogsEntrysRouter.js';
import { authRouter } from './routes/authRouter.js';

const app = express();
app.disable('x-powered-by');
app.use(json())
app.use(cookieParser())

//evitar cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.get('/', (req,res) => {
    res.json({name:"santi"})
})

app.use('/items',sideBarItemsRouter)
app.use('/tasks',todoListRouter)
app.use('/blog',blogEntysRouter)
app.use('/auth',authRouter)

const PORT = 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});
