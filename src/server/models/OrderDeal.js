import WanModel from "../core/model.js";
import Order from "./Order.js";
import ShopOrder from "./ShopOrder.js";
import AgencyRelation from "./AgencyRelation.js";
import User from "./User.js";
import Shop from "./Shop.js";
import BalanceIncome from "./BalanceIncome.js";
import Balance from "./Balance.js";
import Role from "./Role.js";
import ProductOwner from "./ProductOwners.js";
import UserRole from "./UserRoles.js";

class OrderDeal extends WanModel {
    constructor(props){
        super(props);
        this.collection = "order_deals";
    }
    static async join(orderCode){
        let orderDeal = await this.model.findOne({orderCode});
        console.log("加入队列的订单", orderDeal);
        
        if(!orderDeal){
            //若是没有订单号，开始处理订单
            console.log("这是一个新的订单");
            
            let newOrderDeal = await this.model.create({
                orderCode,
                status: "ready"
            });
            console.log("新的队列", newOrderDeal);
            try{
              await this.deal();
            }catch(err){
              console.log(err);
            }
        }else{
          try{
            await this.deal();
          }catch(err){
            console.log(err);
          }
        }
        
        
    }

    static async deal(){
        let orderDeals = await this.model.find({status: "ready"});
        let count = 0;
        orderDeals.forEach(async deal=>{
            count++;
            console.log("处理每一个订单"+count);
            console.log(deal)

            let order = await Order.model.findOne({orderCode: deal.orderCode});
            console.log("改变订单状态", order);
            if(!order){return 0}
            let orderUpdate = await Order.model.update({_id: order._id}, {
               $set: { status: "paid", "updatedAt": new Date()}
            });
            
            console.log({orderUpdate})
            console.log("================================");
            console.log("改变店铺订单状态");
            let shopOrders = await ShopOrder.model.find({orderId: order._id})
            let shopOrdersUpdate = await ShopOrder.model.update({orderId: order._id}, {
                
                $set: {status: "paid", "updatedAt": new Date()}
            });

            console.log(shopOrdersUpdate);
            console.log({shopOrders});
            

            console.log("获取店铺的每个商品的佣金");
            let productsTamp = [];
            shopOrders.forEach(async shopOrder => {
                shopOrder.products.forEach(product => {
                    productsTamp.push(product);
                })
            
            console.log({productsTamp})
            productsTamp.forEach(async product => {
              console.log('购买的商品是', product);
                try {
                    let owner = await ProductOwner.model.findOne({productId: product._id});
                    if(owner){
                        console.log("此用户已经拥有此商品");
                        
                    }else{
                       let ownerCreateRlt =  ProductOwner.create({
                           productId: product._id,
                           userId: order.userId,
                       })
                       console.log(ownerCreateRlt);
                       
                    }

                    
                } catch (error) {
                    console.log(error);
                    
                }
                if (product.isTool) {
                    console.log("如果商品是道具类别, 则记录商品拥有的角色");
                    try {
                        let roleName = product.name + '_holder';
                        let role = await Role.model.findOne({name: roleName});
                       
                        if(!role){
                            let roleCreateResult = await Role.model.create({
                                name: roleName,
                            })
                            role = await Role.model.findOne({name: roleCreateResult.name});
                            
                            
                        }
                        let addRoleToUser = async (roleId, userId) => {
                            let userRole = await UserRole.model.findOne({roleId, userId});
                            if(userRole){
                                console.log("不再重复授权");
                                
                            }else{
                                let userRoleCreateRlt = await UserRole.model.create({
                                    roleId,
                                    roleName,
                                    roleId,
                                    userId
                                })

                                console.log({userRoleCreateRlt});
                                
                            }
    
                        }

                        addRoleToUser(role._id, order.userId);


                       


                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                   
                    
                    
                }
                
                let agencyProfit = 0;
                let superAgencyProfit = 0;
                if(product.agencyLevelPrices[0]){
                    agencyProfit = product.agencyLevelPrices[0];
                }
                if(product.agencyLevelPrices[1]){
                    superAgencyProfit = product.agencyLevelPrices[1];
                }
                console.log("更改代理关系");
                let agency = await AgencyRelation.model.findOne({shopId: product.shopId});

                let giveMoneyToShopOwner = async shop => {
                    console.log("获取产品的店铺", shop.name);
                    console.log("获取产品的店铺的店长", shop.acl.own.users);
                    let userId = await shop.acl.own.users;
                    let shopOwner = await User.model.findOne({_id: userId});
                    console.log("================================");
                    console.log("给店铺拥有者佣金");
                    let balance  = await   Balance.model.findOne({userId: shopOwner._id}, ["_id", "amount", "userId"]);
                    if(!balance){
                        let newB = new Balance.model();
                        balance = await Balance.create({
                            _id: newB._id,
                            amount: 0,
                            userId: shopOwner._id,
                        })
                    }
                    console.log(shopOrder);
                    console.log({agencyProfit});
                    console.log("Ta获得了佣金", shopOwner.username);
                    await BalanceIncome.create({
                        "amount": agencyProfit*shopOrder.productCounts[product._id],
                        "userId": userId,
                        "reasonType": "agencyGive",
                        "agency": shopOrder.userId,
                        "text": "店铺代理营收",
                        "productId": product._id,
                        "productCounts": shopOrder.productCounts[product._id],
                        "balanceId": balance._id,
                        "updatedAt": new Date(),
                        "appName": order.appName,
                    });
                    let balanceAmount = balance.amount + parseInt(agencyProfit)*shopOrder.productCounts[product._id];
                    let balance_update = await Balance.model.update({_id: balance._id}, {
                       $set: { amount: balanceAmount}
                    })
                    console.log(balance_update);
                }


                let buyer = await User.model.findById(order.userId);
                console.log({buyer})
                console.log({agency})
                if(!agency){
                    if(product.productClass){
                        if (product.productClass === "common_card") {
                            console.log("如果商品是普通会员卡，则开店，并且记录这个店的上级店铺是什么");
                            agency = await AgencyRelation.model.findOne({SshopId: product.shopId});
                            let newShop = await Shop.model.create({
                                "name": buyer.username+"_shop",
                                "name_zh": "buyer.username"+"的店铺",
                                "description": '欢迎光临' + buyer.username + "的店铺",
                                "acl": {
                                    own: {
                                        users: buyer._id
                                    }
                                },
                                "status": true,
                                "phone": buyer.profile.mobile,
                                "lanAndLat": shop.lanAndLat,
                            })
                            
                            await AgencyRelation.model.update({SshopId: product.shopId}, {
                                $set: {updatedAt: new Date(), shopId: newShop._Id, status: true}
                            })
                            let shop = await Shop.model.findOne({_id: product.shopId});
                            await giveMoneyToShopOwner(shop);
                            return 0;
                        }else{
                            shop = await Shop.model.findOne({_id: product.shopId});
                            console.log({buyer})
                            await giveMoneyToShopOwner(shop);
                            return 0;

                        }
                    }
                }else{
                    shop = await Shop.model.findOne({_id: product.shopId});
                    await giveMoneyToShopOwner(shop);
                    return 0;
                }
                
              

               
                
                console.log("================================");
                console.log("给平台拥有者佣金");
                let SshopId = agency.SshopId;
                if(!SshopId){
                    return false;
                }
                let Sshop = await Shop.model.findOne({_id: agency.SshopId});
                let SuserId = await Sshop.acl.own.users;
                let SshopOwner = await User.model.findById(SuserId);
                let Sbalance = await Balance.model.findOne({userId: SshopOwner._id});
                if(!Sbalance){
                    Sbalance = await Balance.create({
                        amount: 0,
                        userId: SshopOwner._id,
                    })
                }
                console.log("Ta获得了佣金", SshopOwner.username);
                
                await BalanceIncome.create({
                    "amount": superAgencyProfit*shopOrder.productCounts[product._id],
                    "userId": SuserId,
                    "reasonType": "agencyGive",
                    "agency": shopOrder.userId,
                    "text": "店铺代理营收",
                    "productId": product._id,
                    "productCounts": shopOrder.productCounts[product._id],
                    "balanceId": Sbalance._id,
                    "updatedAt": new Date(),
                    "appName": order.appName,
                      
                });
                let SbalanceAmount = Sbalance.amount + parseInt(agencyProfit)*shopOrder.productCounts[product._id];
                let Sbalance_update = await Balance.model.update({_id: balance._id}, {
                  $set:{
                    amount: SbalanceAmount
                  }
                })
                console.log(Sbalance_update);
                console.log("================================");





               });
            });
            

            console.log("================================");
            await this.model.update(deal,{
                status: "done",
            })
            console.log("================================"+count);
            
        })
    }
}

OrderDeal.setScheme(
    {
      "orderCode": String,
      "createdAt" : { type: Date, default: Date.now },
      "status": String,

    },
    "OrderDeal", "order_deals"

)

export default  OrderDeal;
