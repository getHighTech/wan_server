import Koa from 'koa';
import {connectDB} from '../bootstrap/connectdb.mjs';
import  views from  'koa-views'
import  koaStatic  from  'koa-static'
import  bodyParser  from 'koa-bodyparser'
import  koaLogger  from 'koa-logger'
import path from 'path';

const   __dirname = path.resolve();

connectDB();

const  App = new Koa();
// 配置控制台日志中间件
App.use(koaLogger())

// 配置ctx.body解析中间件
App.use(bodyParser())

// 配置静态资源加载中间件
App.use(koaStatic(
  path.join(__dirname , './../static')
))

// 配置服务端模板渲染引擎中间件
App.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}));




export default App;


