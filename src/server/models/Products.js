import WanModel from "../core/model.js";


class Products extends WanModel {
    constructor(props){
        super(props);
        this.collection = "products";
    }
}
Products.setScheme(
  {
    '_id':String,
    'shopId':String,
    'name':String,
    'isSale':Boolean,
    'price':Number,
    'endPrice':Number,
    // 'newSpecGroups':{
    //   'spec_value':String
    // }
    'newSpecGroups':Array,
  },
  'Products','products'
)

export default  Products;
