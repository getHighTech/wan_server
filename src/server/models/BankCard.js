import WanModel from "../core/model.js";


class BankCard extends WanModel {
    constructor(props){
        super(props);
        this.collection = "bankcards";
    }
}
BankCard.setScheme(
  {
  },
  'BankCard','bankcards'
)

export default  BankCard;
