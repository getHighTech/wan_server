import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class Simple extends WanModel {
    constructor(props){
        super(props);
        this.collection = "simples";
    }
    static async getMobileSMS(mobile){

        
    }

    static async validSMS(mobile){
        
    }
}

Simple.setScheme(
    {
      "test1": String,
      "test1": String,

    },
    "Simple", "simples"

)

export default  Simple;
