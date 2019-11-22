const UserModel = require('../models/user')
class userController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
       
        let req = ctx.request.body;
        if (req.firstname // 名
            && req.lastname // 姓
        ) {
            try {
                // 创建用户
                const ret = await UserModel.createUser(req);
                // 返回新创建的用户信息
                const data = await UserModel.getUserDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建失败',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
            }
        }
    }
    /**
     * 获取用户详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let req = ctx.request.body;
        console.log(req)
        const databaseUserName = req.userName;
        const databaseUserPasswd = req.password;

        if (databaseUserName && databaseUserPasswd) {
          if (!ctx.session.logged) {  // 如果登录属性为undefined或者false，对应未登录和登录失败
            // 设置登录属性为false
            ctx.session.logged = false;
            try {
              // 查询文章详情模型
              // 取请求url解析后的参数对象，方便比对
              // 如?nickname=post修改&passwd=123解析为{nickname:"post修改",passwd:"123"}
              let data = await UserModel.getUserDetail(databaseUserName, databaseUserPasswd);
              ctx.response.status = 200;
              ctx.body = {
                  code: 200,
                  msg: '查询成功',
                  data
              }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
          }else {
            ctx.body = "已登录";
          }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '用户参数必须传'
            }
        }
    }
}
module.exports = userController