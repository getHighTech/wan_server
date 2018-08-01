import WanModel from "../core/model.js";

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
            console.log("================================"+count);
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
