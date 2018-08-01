import WanModel from "../core/model.js";
import Order from "./Order.js";
import ShopOrder from "./ShopOrder.js";
import AgencyRelation from "./AgencyRelation.js";
import User from "./User.js";
import Shop from "./Shop.js";
import BalanceIncome from "./BalanceIncome.js";

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
            this.deal();
        }else{
            this.deal();
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
            

            console.log("获取店铺的每个商品的佣金");
            let productsTamp = [];
            shopOrders.forEach(async shopOrder => {
                shopOrder.products.forEach(product => {
                    productsTamp.push(product);
                })
            })
            console.log({productsTamp})
            productsTamp.forEach(async product => {
                if (product.isTool) {
                    console.log("如果商品是道具类别, 记录商品的拥有");
                    
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
                let shop = null;

                let giveMoneyToShopOwner = async shop => {
                    console.log("获取产品的店铺");
                    let userId = await shop.acl.own.users;
                    let shopOwner = await User.model.findOne({_id: userId});
                    console.log("================================");
                    console.log("给店铺拥有者佣金");
                    let balance  = await   Balance.model.findOne({userId: shopOwner._id});
                    await BalanceIncome.create({
                        "amount": agencyProfit*shopOrder.productCounts[product._id],
                        "userId": shopOrder.userId,
                        "reasonType": "agencyGive",
                        "agency": shopOwner._id,
                        "text": "店铺代理营收",
                        "productId": product._id,
                        "productCounts": shopOrder.productCounts[product._id],
                        "balanceId": balance._id,
                        "updatedAt": new Date()
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
                                "name_zh": "buyer.username的"+"店铺",
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
                                $set: {updatedAt: new Date(), shopId: newShop._Id}
                            })
                            shop = await Shop.model.findOne({_id: agency.shopId});
                            await giveMoneyToShopOwner(shop);
                            return 0;
                        }else{
                            shop = await Shop.model.findOne({appName: Order.app});
                            console.log({buyer})
                            await giveMoneyToShopOwner(shop);
                            return 0;

                        }
                    }
                }else{
                    shop = await Shop.model.findOne({_id: agency.shopId});
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
                await BalanceIncome.create({
                    "amount": superAgencyProfit*shopOrder.productCounts[product._id],
                    "userId": shopOrder.userId,
                    "reasonType": "agencyGive",
                    "agency": SshopOwner._id,
                    "text": "店铺代理营收",
                    "productId": product._id,
                    "productCounts": shopOrder.productCounts[product._id],
                    "balanceId": Sbalance._id,
                    "updatedAt": new Date()
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
            
            console.log("================================");
            console.log("================================");
            console.log("================================");
            console.log("================================");
            console.log("================================");
            console.log("================================");
            



            console.log("================================");
            await this.model.update({_id: deal._id},{
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
