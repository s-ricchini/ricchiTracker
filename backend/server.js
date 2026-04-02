import express, {json} from 'express'
import cors from "cors"


//routers:
import { sideBarItemsRouter } from './routes/sideBarItemsRouter.js';

const app = express();
app.disable('x-powered-by');
app.use(json())

//evitar cors
app.use(cors())


app.get('/', (req,res) => {
    res.json({name:"santi"})
})

app.use('/items',sideBarItemsRouter)


const PORT = 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});