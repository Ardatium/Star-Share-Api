import '#config/database.js';
import Koa from'koa';
import {API_V1_ROUTER} from '#routes/routes.js';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond'
import serve from 'koa-static';
import cors from '@koa/cors'

const app = new Koa();

app.use(cors('*'))
.use(serve('./public'))
.use(bodyParser())
.use(respond())
.use(API_V1_ROUTER.routes())
.use(API_V1_ROUTER.allowedMethods())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));