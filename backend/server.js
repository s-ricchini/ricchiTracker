import express, {json} from 'express'

//routers:
import { sideBarItemsRouter } from './routes/sideBarItemsRouter.js';

const app = express();
app.disable('x-powered-by');
app.use(json())


app.get('/', (req,res) => {
    res.json({name:"santi"})
})

app.use('/items',sideBarItemsRouter)


const PORT = 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
});