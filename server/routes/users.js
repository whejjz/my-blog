const router = require('koa-router')()
const UserController = require('../controllers/user')

router.prefix('/users')

router.post('/', UserController.detail)

router.get('/bar', function (ctx, next) {
  console.log(ctx.request.body)
  ctx.body = 'this is a users/bar response'
})

module.exports = router
