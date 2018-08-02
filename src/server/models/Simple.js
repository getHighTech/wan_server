import WanModel from "../core/model.js";
//此乃构造模型的代码模板
class Simple extends WanModel {
    constructor(props){
        super(props);
        this.collection = "simples";
    }
   
}

Simple.setScheme(
    {
       "_id": String,
      "test1": String,
      "test2": String,

    },
    "Simple", "simples"

)

export default  Simple;
