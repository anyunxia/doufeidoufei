var express = require('express');
var router = express.Router();
var md5 = require("md5");
var LogModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
var multiparty = require("multiparty");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录画面' });
});



//后台页面
router.get("/houtai",function(req,res){
	if(req.session && req.session.username !=null){
		res.render("houtai",{});
	}else{
		res.redirect("/");
	}
	
	
})

//商品列表
router.get("/goods_list",function(req,res){
	GoodsModel.find({},function(err,docs){
		res.render("goods_list",{list:docs});
	})
})

router.post("/api/add_goods",function(req,res){
	var form = new multiparty.Form({
		uploadDir:"./public/images"
	});
	form.parse(req,function(err,body,files){
		var good_name = body.goods_name[0];
		var artno  = body.artno[0];
		var price = body.price[0];
		var sales = body.sales[0];
		var imgName = files.img[0].path;
		imgName = imgName.substr(imgName.lastIndexOf("\\")+1)
		console.log(good_name,artno,price,sales,imgName);
		var gm = new GoodsModel();
		gm.goods_name=good_name;
		gm.artno=artno;
		gm.price=price;
		gm.sales=sales;
		gm.img=imgName;
		gm.save(function(err){
			if(!err){
				res.send("文件上传成功");
			}else{
				res.send("文件上传失败");
			}
		});
		
	})
	
})


//登录
router.post("/api/login",function(req,res){
	var username = req.body.username;
	var psw = md5(req.body.psw);//md5 对密码进行加密；
	var um = new LogModel();
	um.username = username;
	um.psw = psw;
	var result = {
		status:1,
		message:"登录成功"
	}
	LogModel.find({username:username,psw:psw},function(err,docs){
	if(!err&&docs.length>0){
		req.session.username = username;
			console.log("登录成功");
			res.send(result);
	}else{
		console.log("登录失败，请检查您的用户名和密码");
		result.status = -109;
		result.message = "登录失败，请检查您的用户名和密码";
		res.send(result);
	}
})
	})
module.exports = router;
