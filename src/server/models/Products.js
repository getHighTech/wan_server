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
    'newSpecGroups':Array,
    'name_zh': String,
    'productClass':String,
  },
  'Products','products'
)

export default  Products;
