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
                        title:'darren',
                        owner: 'ydq',
                        repo: 'gblog',
                        per_page: 8,
                        access_token:'your_access_token',
                        gitalk:{
                                clientid:'your_clientid',
                                clientsecret:'your_clientsecret',
                                label:'gitalk'
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
