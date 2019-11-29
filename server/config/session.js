const Koa_Session = require('koa-session');   // 导入koa-session     

const Redis = require("ioredis");
const { Store } = require("koa-session2");

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
          host : '127.0.0.1',//安装好的redis服务器地址
          port : 80,　//端口
          prefix : 'sam:',//存诸前缀
          ttl : 60 * 60 * 23,//过期时间
          db: 0
      });
    }

    async get(sid, ctx) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }

    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}, ctx) {
        console.log(session, 3)
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {}
        return sid;
    }

    async destroy(sid, ctx) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

// 配置
const session_signed_key = ['some secret hurr'];  // 这个是配合signed属性的签名key
const config = {
    key: 'SESSIONID', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 40000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: true, /** 是否签名。(默认是 true) */
    rolling: false, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
    store: new RedisStore()
};

module.exports =  {
  config,
  session_signed_key,
}