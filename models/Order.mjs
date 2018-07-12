import WanModel from "../core/model.mjs";

class Order extends WanModel {
    constructor(props){
        super(props);
        this.collection = "orders";
    }
}

Order.setScheme(
    {
       type: String,
    },
    "Order", "orders", {
        //OPTIONAL 提供不同版本的api, 标注哪些字段需要展开
        breif: ['username', 'profile', 'nickname', 'createdAt'],
        detail: ['score', 'username', 'profile', 'nickname', 'createdAt', 'logintimes', 'lastLoginTime', 'nickname'],
        expose: ['profile']
    }
)

export default Order;