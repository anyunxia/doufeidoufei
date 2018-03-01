var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//创建文档定义
var Goods = new Schema({//          User可改
    goods_name     : String,//商品名字      
    artno          : String,//货号
    price      	   : String,//价格
    sales          : String,//销量
    img            : String,//图片
    create_date    : {type: Date, default: Date.now}//时间
});
//创建model对象，与数据库中的文档映射；
var GoodsModel = mongoose.model('goods', Goods);//UserModel可改
module.exports = GoodsModel;//将创建的对象暴露出去；  UserModel可改，和上面UserModel一致；