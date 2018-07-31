import WanModel from "../core/model.js";
import Order from "./Order.js";
import ShopOrder from "./ShopOrder.js";
import AgencyRelation from "./AgencyRelation.js";

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
            
            await this.model.create({



                orderCode,
                status: "ready"
            })
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

            let order = Order.model.findOne({orderCode: deal.orderCode});
            console.log("改变订单状态");
            await Order.update({_id: order._id}, {
                status: "paid"
            });
            console.log("================================");
            console.log("改变店铺订单状态");
            let shopOrders = await ShopOrder.find({orderId: order._id}).update({orderId: order._id}, {
                status: "paid"
            });
            console.log("获取店铺的每个商品的佣金");
            let superAgencyProfits = [];//一层佣金
            let superAgencyProfits = [];//二层佣金
            let productsTamp = [];
            shopOrders.forEach(async shopOrder => {
                shopOrder.products.forEach(product => {
                    productsTamp.push(product);
                })
            })
            productsTamp.forEach(product => {
                if(product.agencyLevelPrices[0]){
                    agencyProfits.push(product.agencyLevelPrices[0])
                }
                if(product.agencyLevelPrices[1]){
                    superAgencyProfits.push(product.agencyLevelPrices[1]);
                }
                console.log("更改代理关系");
                let rel = AgencyRelation.find({userId: order.userId}).populate({
                    path: 'shopId',
                    select: '_id userId',
                    model: 'shops',
                    }).update({userId: order.userId}, {
                        shopId
                    });
                
                console.log("================================");

            });
            
            console.log("================================");
            console.log("================================");
            console.log("================================");
            console.log("================================");
            console.log("================================");
            console.log("================================");



            
            console.log("处理每一个订单");



            console.log("================================");
            await this.model.update({_id: deal._id},{
                status: "done"
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
