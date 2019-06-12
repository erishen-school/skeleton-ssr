# 开发 
1. webpack --config webpack.vendor.config.js  生成 manifest.json, ./public/js/vendor.*.js
2. npm start => webpack.config
3. npm run production => webpack.production.config


# 发布顺序 (需在 release* 分支发布)
1. 修改 app.js => process.env.RELEASEDATE 
2. npm start
3. 另起一个 console, 在相同路径输入命令 npm run html
4. npm run release => 
     发布前压缩打包 HTML/CSS/JS, 生成 dest/public (client), dest/views (server) 文件夹
     服务端 babel 转换 ES6 代码发布，生成 server.release 文件夹
5. node app.js => 发布前测试
   

# https
1. cd server
2. openssl genrsa -out privatekey.pem 1024
3. openssl req -new -key privatekey.pem -out certrequest.csr 
4. openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certrequest.pem

# LESS
1. 代码写在 client/less 目录下

# React/Redux 组件
1. 代码写在 components/wrapper/redux 目录下, 其中 common 目录是通用组件目录

# 配置
1. 代码写在 components/wrapper/config 目录下, index.js 是入口
2. { githubZeit: { action: 'github/zeit', component: null, apiFunc: function(fetch, req, res){} } }
3. obj.key => action 内容一致，按驼峰规则拼接

# Node API
1. 代码写在 server/routes/api 目录下，index.js 是入口

# URL 说明 http://localhost:8080/webapp/skeleton/github/zeit
1. PORT: 8080 => package.json - config - port
2. webapp/skeleton => server - config - project.js - serverPrefix
3. github => 
    client/config/github.js
    client/less/github_all.less
    client/less/github
    client/page/github
    components/wrapper/redux/github
    server/config/controller.js
    server/routes/util/bundleConfig.js
    server/routes/util/config.js
    





    
