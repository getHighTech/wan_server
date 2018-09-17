import mongoose from 'mongoose';
import BalanceIncome from '../models/BalanceIncome.js';

export function getCurrentMonthFirst(){
    var date=new Date();
    date.setDate(1);
    return date;
 }

 export function getCurrentMonthLast(){
    var date=new Date();
    var currentMonth=date.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
    var oneDay=1000*60*60*24;
    return new Date(nextMonthFirstDay-oneDay);
 }

Date.prototype.Format = function(format){

    var o = {

    "M+" : this.getMonth()+1, //month

    "d+" : this.getDate(), //day

    "h+" : this.getHours(), //hour

    "m+" : this.getMinutes(), //minute

    "s+" : this.getSeconds(), //second

    "q+" : Math.floor((this.getMonth()+3)/3), //quarter

    "S" : this.getMilliseconds() //millisecond

    }

    if(/(y+)/.test(format)) {

    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));

    }

    for(var k in o) {

      if(new RegExp("("+ k +")").test(format)) {

        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));

      }

    }

    return format;

  }

export const  getStat = async(ctx) => {
    // try{
        const { userId,appName } = ctx.query;
        let date = new Date();
        let nextdate = (new Date((date/1000+86400)*1000))
        const currentDate = date.Format("yyyy/MM/dd");
        const  nextDate = nextdate.Format("yyyy/MM/dd");
        var day_of_week = new Date().getDay()
        if( day_of_week == 0){
           day_of_week = 7
        }
        let exdate = (new Date((date/1000-day_of_week*86400)*1000))
        var currentMondayDate =  (new Date((exdate/1000+86400*7
          )*1000)).Format("yyyy/MM/dd");
        var exDate = exdate.Format("yyyy/MM/dd");
        var getCurrentMonthFirstDay = getCurrentMonthFirst().Format("yyyy/MM/dd");
        var getCurrentMonthLastDay = getCurrentMonthLast().Format("yyyy/MM/dd");
        let  yestodayTotalAmount = await BalanceIncome.model.aggregate([
            { $match: {userId: userId, createdAt: {'$gte':new Date(currentDate),'$lt':new Date(nextDate)}}},
            { $group: {_id: '$userId',total: {$sum: "$amount"}}}
        ])
        let weekTotalAmount= await BalanceIncome.model.aggregate([
            { $match: {userId: userId,createdAt: {'$gt':new Date(exDate),'$lte':new Date(currentMondayDate)}}},
            { $group: {_id: '$userId',total: {$sum: "$amount"}}}
        ])
        let monthsTotalAmount = await BalanceIncome.model.aggregate([
            { $match: {userId: userId,createdAt: {'$gte':new Date(getCurrentMonthFirstDay),'$lte':new Date(getCurrentMonthLastDay)}}},
            { $group: {_id: '$userId',total: {$sum: "$amount"}}}
        ])
        ctx.body = {
            yestodayTotalAmount,
            weekTotalAmount,
            monthsTotalAmount,
        }
    // }
    // catch (err) {
    //     ctx.body = {
    //       msg: 'fail'
    //     }
    //  }
}
