import Koa from 'koa';
import {connectDB} from '../bootstrap/connectdb.js';
import  views from  'koa-views'
import  koaStatic  from  'koa-static'
import  bodyParser  from 'koa-bodyparser'
import  koaLogger  from 'koa-logger'
import xmlParser  from 'koa-xml-body';
import cors from 'koa-cors';
import path from 'path';

const   __dirname = path.resolve();

connectDB();2

const  App = new Koa();
//跨域
App.use(cors())
// 配置控制台日志中间件
App.use(koaLogger({
  enableTypes: ['json', 'form', 'text'],
  extendTypes: {
    text: ['text/xml', 'application/xml']
  }
}))
App.use(xmlParser())
// 配置ctx.body解析中间件
App.use(bodyParser())


// 配置静态资源加载中间件
App.use(koaStatic(
  path.join(__dirname , './public')
))

// 配置服务端模板渲染引擎中间件
App.use(views(path.join(__dirname, './public'), {
  extension: 'ejs'
}));




export default App;
