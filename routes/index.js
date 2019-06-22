const router = require('koa-router')()

//默认页面
router
  .get('/', async (ctx, next) => {
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  })
  



//string页面
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})


//json页面
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2',
    type: 'json',
    request: ctx.request,
    query: ctx.request.query  
  }
})

module.exports = router
