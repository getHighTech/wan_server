import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import  { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {isWeChat, logWechat} from '../actions/wechat.js';
import {getStore} from '../actions/localStore.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 2,
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


const wechatAppIds = [
  {
    value: '12354253245',
    label: '万人车汇',
  },

];


class WeChatCharge extends React.Component {
  state = {
    money: "0",
    appid: wechatAppIds[0].value,
    moneyError: false,
    moneyErrorText: "",
    requireApi: false,
  };
  componentDidMount(){

    if(isWeChat()){
      if(!getStore("openid")){
        logWechat(this.props.history);
      }
    }
  }
  handleChange = name => event => {
   this.setState({
     [name]: event.target.value,
   });
 };
 handleChargeClick = () => {

   if(this.state.money === "" || this.state.money === "0"){
     this.setState({
       moneyError: true,
       moneyErrorText: "此乃必填项且金额不得为零"
     })
     return false;
   }
   this.setState({
     moneyError: false,
     moenyErrorText: "",
     requireApi: true
   })
   window.location.assign(`/api/v1/wechat/payback/show?openid=${getStore('openid')}&fee=${this.state.money}`);

 }



  render(){
    const { classes } = this.props;
    console.log(this.state);
    return (
        <div className={classes.root}>
         <Typography variant="headline" gutterBottom>微信公众号充值</Typography>
            <Divider light />

        <TextField
         select
         label="公众号"
         className={classes.textField}
         onChange={this.handleChange('appid')}
         required
         SelectProps={{
           native: true,
           MenuProps: {
             className: classes.menu,
           },
         }}
         helperText="请选择您要充值的公众平台"
         margin="normal"
       >
         {wechatAppIds.map(option => (
           <option key={option.value} value={option.value}>
             {option.label}
           </option>
         ))}
       </TextField>
        <Divider light />
        <TextField
          error={this.state.moneyError}
          label="金额"
          className={classes.textField}
          onChange={this.handleChange('money')}
          type="number"
          margin="normal"
          helperText={!this.state.moneyError? "请输入要充值的金额" : this.state.moneyErrorText}
        />
        <Divider light />

        <Button onClick={this.handleChargeClick} variant="contained" color="secondary" className={classes.button}>
          确认充值
        </Button>


        </div>
      );

  }


}

WeChatCharge.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
    return {
        tag: state.MoviesReducer.tag
      }
}

export default connect(mapToState)(withStyles(styles)(WeChatCharge));
