### 一个基于GitHub的issues的“动态”博客

---
~~~
  _____    __    __
 / ____\  / /_  / /   ____  ____
/ / /__ \/ __ \/ /   / __ \/ __ \
\ \___/ / /_/ / /___/ /_/ / /_/ /
 \_____/\____/\____/\____/\__  /
                         \____/
~~~

示例：https://darren.work

#### 准备工作：

1. 你需要有一个github账号（感觉是句废话，当看到这里你应该很大程度上已经拥有了一个Github账号）
2. 你需要申请一个Github Application，[点击这里申请](https://github.com/settings/applications/new)
3. 你需要申请一个Github Token（用于提高你的github仓库api的访问次数配额），[点击这里申请](https://github.com/settings/tokens)
4. 安装git （非必须），安装nodejs

#### 开始使用：

~~~bash
git clone git@github.com:ydq/gblog.git

cd gblog

# 修改src/main.js 中的config部分
vi src/main.js

npm install
#本地运行
npm run dev
#build打包(将生成的dist目录内的东西上传至你的静态访问空间即可，当然也可以github pages)
npm run build
~~~

#### 配置说明：

~~~javascript
//===> src/main.js 
const store = new Vuex.Store({
        state:{
                config: {
                        title:'gblog',//博客的标题
                        owner: 'github_username',//你的github的用户名
                        repo: 'github_repo',//你要读取issues的仓库名称
                        per_page: 10,//列表页面每页分页条数
                        access_token: 'your_access_token',//你申请的access_token
                        clientid:'your_clientid',//申请的app clientid
                        clientsecret: 'your_clientsecret',//申请的app clientsecret
                        talk : true,//全局是否开启评论功能
                        disable_talk: 'notalk'//文章禁止评论的标签
                }
        }
})
~~~

- title：博客的标题，建议不要太长，否则会印象手机界面下的显示
- owner：你的github的用户名
- repo：你存放文章的仓库
- per_page：列表每页数量
- access_token：申请的access_token
- clientid：申请的app的clientid
- clientsecret：申请的app的clientsecret
- talk：全局评论开关
- disable_talk：文章禁止评论打的标签



#### 说明：

- 文章发布后默认允许评论，若要单独关闭谋篇文章的评论，则需要打上disable_talk配置的标签，当然如果全局都不想开启评论，则需要设置talk属性为false


#### 友情提示： 

由于某些原因，**如果你要将构建打包后的文件上传到github，使用github的pages服务的话，建议将你打包好的文件中的三个key (`access_token`、`clientid`和`clientsecret`)用逗号之类的隔开**，否则github检测到你提交的代码中有你的key的话会导致key失效。

因为使用了vue-router的html5 push-state模式，所以为了让github等访问任意URL都能指向默认的html文件，因此你需要将`index.html`修改为`404.html`

操作如下：

- 用文本工具打开你的dist/js/app.xxxxx.js  和 app.xxxx.js.map 文件
- 分别搜索你的三个key，假设是 `abcdefg`，当搜索到了之后 改成`abc"+"defg`
- 将 dist/index.html 修改为 dist/404.html，如果你的项目下面有README.md文件的话，则需要同时保留index.html和404.html
