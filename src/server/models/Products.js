import WanModel from "../core/model.js";


class Products extends WanModel {
    constructor(props){
        super(props);
        this.collection = "products";
    }
}
Products.setScheme(
  {
      '_id': String,
      'name_zh': String,
  },
  'Products','products'
)

export default  Products;
