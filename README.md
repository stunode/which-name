### 一个基于GitHub的issues的“动态”博客

---

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
mv src/main.js

npm install
#本地运行
npm run dev
#build打包(将生成的dist目录内的东西上传至你的静态访问空间即可，当然也可以github pages)
npm run build
~~~

#### 配置说明：

~~~json
//===> src/main.js 
config: {
    title:'gblog',//博客的标题
    owner: 'github_username',//你的github的用户名
    repo: 'github_repo',//你要读取issues的仓库名称
    per_page: 8,
    access_token:'your_access_token',
    gitalk:{
        repo:'github_comment_repo',//你要作为评论的仓库名称，可以和文章仓库相同，当和文章仓库相同时，每次发布一篇文章，需要自己手动打标签才能开启评论
        clientid:'your_clientid',//申请的app clientid
        clientsecret: 'your_clientsecret',//申请的app clientsecret
        label:'gitalk'//开启评论的标签名称
    }
}
~~~

- title：博客的标题，建议不要太长，否则会印象手机界面下的显示
- owner：你的github的用户名
- repo：你存放文章的仓库
- per_page：列表每页数量
- access_token：申请的access_token
- gitalk.repo：评论用的仓库名称
- gitalk.clientid：申请的app的clientid
- gitalk.clientsecret：申请的app的clientsecret
- gitalk.label：评论issues打的标签
- gitalk.notalk：文章禁止评论打的标签（这个标签要打在文章的issues上才生效）



#### 说明：

- 当repo和gitalk.repo相同时

  - 优点：你只需要一个仓库，其次在文章列表页面可以显示当前的评论数

  - 缺点：发布文章后需要手动开启评论，需要在文章的issues手动打上两个标签才能开启评论

    > 第一个标签是#号加上当前issues的id，例如当前id是88，那么请先打上 "#88" 的标签
    >
    > 第二个标签是配置文件中gitalk.label的标签

- 当repo和gitalk.repo不同时

  - 优点：当管理员访问文章页面后可以自动开启评论，无需手动打标签，当然必须要是作者亲自访问一次
  - 缺点：首先你需要两个仓库，其次博客在列表页面无法显示当前评论数

#### 友情提示： 

由于某些原因，**如果你要将构建打包后的文件上传到github，使用github的pages服务的话，建议将你打包好的文件中的三个key (`access_token`、`clientid`和`clientsecret`)用逗号之类的隔开**，否则github检测到你提交的代码中有你的key的话会导致key失效。

操作如下：

- 用文本工具打开你的dist/js/app.xxxxx.js  和 app.xxxx.js.map 文件
- 分别搜索你的三个key，假设是 `abcdefg`，当搜索到了之后 改成`abc"+"defg`