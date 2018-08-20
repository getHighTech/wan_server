import WanModel from "../core/model.js";


class BankCard extends WanModel {
    constructor(props){
        super(props);
        this.collection = "bankcards";
    }
}
BankCard.setScheme(
  {
    "_id":String,
  },
  'BankCard','bankcards'
)

export default  BankCard;
