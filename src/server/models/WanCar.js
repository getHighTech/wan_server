import WanModel from "../core/model.js";

class WanCar extends WanModel {
    constructor(props){
        super(props);
        this.collection = "wan_cars";
    }
}

WanCar.setScheme(
    {
      "title": String,


    },
    "WanCar", "wan_cars"

)

export default  WanCar;
