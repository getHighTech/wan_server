import Router from 'koa-router';
import { getOrderStatus } from '../../controllers/order.js';
import { wechatAuth } from '../../controllers/wechat.js';
import { getTeam  } from '../../controllers/myTeam.js';
import { getShopProducts, porudctsWarehouse, sellingProduct } from '../../controllers/product.js';
import { getBankcards } from '../../controllers/bankcard.js';
import { getPeriodIncome } from '../../controllers/balanceIncome.js';
import { loadMoney } from '../../controllers/balance.js';
const  ApiRoute = new Router();
ApiRoute.get('/api/info', wechatAuth)

ApiRoute.get('/api/order/status',getOrderStatus)
ApiRoute.get('/api/myteam',getTeam)
ApiRoute.get('/api/products',getShopProducts)
ApiRoute.get('/api/my/bankcards',getBankcards)
ApiRoute.get('/api/new_add_products',porudctsWarehouse)
ApiRoute.get('/api/selling_product',sellingProduct)
ApiRoute.get('/api/shop',getPeriodIncome)
ApiRoute.get('/api/loadMoney',loadMoney)
export default ApiRoute;
