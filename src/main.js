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
    state: {
        config: {
            title: 'which name',//博客的标题
            owner: 'which-name',//你的github的用户名
            repo: 'which-name',//你要读取issues的仓库名称
            per_page: 10,//列表页面每页分页条数
            access_token: 'your_access_token',//你申请的access_token
            clientid: 'your_clientid',//申请的app clientid
            clientsecret: 'your_clientsecret',//申请的app clientsecret
            talk: false,//全局是否开启评论功能
            disable_talk: 'notalk'//文章禁止评论的标签
        }
    }
})

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/which-name', component: List, props: true },
        { path: '/which-name/page', component: List, props: true },
        { path: '/which-name/page/:page(\\d+)', component: List, props: true },
        { path: '/which-name/tag/:tag', component: List, props: true },
        { path: '/which-name/tag/:tag/:page(\\d+)', component: List, props: true },
        { path: '/which-name/search/:query', component: List, props: true },
        { path: '/which-name/search/:query/:page(\\d+)', component: List, props: true },
        { path: '/which-name/post/:id(\\d+)', component: Article, props: true },
        { path: '/*', component: Error404 }
    ]
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
