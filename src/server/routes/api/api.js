import mongoose from 'mongoose';
import User from '../../models/User.js';
import Router from 'koa-router';
import { getOrderStatus } from '../../controllers/order.js';
import { wechatAuth,wechatShare } from '../../controllers/wechat.js';
import { getTeam  } from '../../controllers/myTeam.js';
import {getProductSpec} from '../../controllers/productSpec.js';
import { getShopProducts, porudctsWarehouse, sellingProduct,getProductCard } from '../../controllers/product.js';
import { getBankcards } from '../../controllers/bankcard.js';
import { getWithdraw } from '../../controllers/balanceCharge.js';
import { deleteUserContact } from '../../controllers/deleteUserContact.js';
import { login } from '../../controllers/user.js';
import {myCart} from '../../controllers/cart.js';
const  ApiRoute = new Router();
ApiRoute.get('/api/info', wechatAuth)
ApiRoute.get('/api/shopCart',myCart)
ApiRoute.get('/api/wechatShare', wechatShare)
ApiRoute.get('/api/findAllSpecProductByProductId',getProductSpec)
ApiRoute.get('/api/buyCard',getProductCard)
ApiRoute.get('/api/order/status',getOrderStatus)
ApiRoute.get('/api/myteam',getTeam)
ApiRoute.get('/api/shop/products',getShopProducts)
ApiRoute.get('/api/my/bankcards',getBankcards)
ApiRoute.get('/api/new_add_products',porudctsWarehouse)
ApiRoute.get('/api/selling_product',sellingProduct)
ApiRoute.get('/api/withdraw',getWithdraw)
ApiRoute.get('/api/delete_user_contact',deleteUserContact)
ApiRoute.post('/api/user/login',login)
export default ApiRoute;
