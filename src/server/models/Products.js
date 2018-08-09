import WanModel from "../core/model.js";


class Products extends WanModel {
    constructor(props){
        super(props);
        this.collection = "products";
    }
}
Products.setScheme(
  {
  },
  'Products','products'
)

export default  Products;
