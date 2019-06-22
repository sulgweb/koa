const router = require('koa-router')();
const {sign} = require('jsonwebtoken');
const secret = 'demo';
const jwt = require('koa-jwt')({secret});
const database = require('../public/javascripts/mysql.js')

//添加统一的前缀
router.prefix('/users');


// users
router
  .get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
    console.log(database)
  })
  .post("/",async (ctx, next)=>{
    ctx.body = {
      type: "post",
      params: ctx.request.body
    }
    console.log(ctx.body)
  })
  .put("/:id",async (ctx, next)=>{
    ctx.body = {
      type:"put",
      params: ctx.request.body
    }
    console.log(ctx.body)
  })
  .delete("/:id",async (ctx, next)=>{
    ctx.body={
      type: "delete",
      params: ctx.request.body
    }
  })


// users/login
// JWT的简单验证模式（token）
router
  .get("/login",async (ctx,next)=>{
    await ctx.render('home/login',{
      btnName:"登录"
    })
  })
  .post('/login',async (ctx,next)=>{
    const user = ctx.request.body;
    if(user&&user.username){
      let {username} = user;
      const token = sign({username},secret,{expiresIn:'1h'});
      ctx.body = {
        message:'get token success',
        code:1,
        token
      };
    }else{
      ctx.body={
        message:"Param Error",
        code:-1
      }
    }
  })


// users/userInfo
router.get('/userInfo',jwt,async(ctx,next)=>{
  ctx.body={
    username:ctx.state.user.username
  }
})


// users/adminInfo
/* router.get('/adminInfo',jwt,admin,async(ctx,next)=>{
  ctx.body={
    username:ctx.state.user.username
  }
}) */



// user/bar
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


// user/redirect
router.get('/redirect',function(ctx,next){
  ctx.body="not"
  //路由重定向
  ctx.redirect(ctx.router.url('index'))
})

module.exports = router
