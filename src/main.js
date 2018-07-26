import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import List from "./components/List.vue";
import Article from "./components/Article.vue";
import Error404 from "./components/Error404.vue";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
        state:{
                config: {
                        title:'gblog',//博客的标题
                        owner: 'github_username',//你的github的用户名
                        repo: 'github_repo',//你要读取issues的仓库名称
                        per_page: 10,//列表页面每页分页条数
                        access_token: 'your_access_token',//你申请的access_token
                        gitalk:{
                                repo:'github_comment_repo',//你要作为评论的仓库名称，可以和文章仓库相同，当和文章仓库相同时，每次发布一篇文章，需要自己手动打标签才能开启评论
                                clientid:'your_clientid',//申请的app clientid
                                clientsecret: 'your_clientsecret',//申请的app clientsecret
                                label:'gitalk',//开启评论的标签名称
                                disable:'notalk'//文章禁止评论的标签
                        }
                }
        }
})

const router = new VueRouter({
        mode: 'history',
        routes: [
                { path: '/', component: List, props: true },
                { path: '/page', component: List, props: true },
                { path: '/page/:page(\\d+)', component: List, props: true },
                { path: '/tag/:tag', component: List, props: true },
                { path: '/tag/:tag/:page(\\d+)', component: List, props: true },
                { path: '/search/:query', component: List, props: true },
                { path: '/search/:query/:page(\\d+)', component: List, props: true },
                { path: '/post/:id(\\d+)', component: Article, props: true },
                { path: '/*', component: Error404}
        ]
});


new Vue({
        router,
        store,
        render: h => h(App)
}).$mount('#app')
