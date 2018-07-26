<template>
        <div class="main-list" :class="{loading:loading,'loading-lg':loading}">
                <table class="table" v-if="articles.length">
                        <tbody is="transition-group">
                                <tr key="query" v-if="!!query">
                                        <td colspan="4">搜索：<mark>{{query}}</mark></td>
                                </tr>
                                <tr key="tag" v-else-if="!!tag">
                                        <td colspan="4">标签：<span class="label label-rounded">{{tag}}</span></td>
                                </tr>
                                <tr v-for="(article,i) in articles" :key="article.number">
                                        <td class="date">{{new Date(article.created_at).format('M/dd')}}</td>
                                        <td colspan="3">
                                                <router-link :to="'/post/'+article.number" :class="{badge:showcommentCount() && article.comments}" :data-badge="article.comments">{{article.title}}</router-link>
                                                <router-link v-for="label in labels(i)" :to="'/tag/'+label" :key="label" class="label d-inline-block mx-1">{{label}}</router-link>
                                        </td>
                                </tr>
                                <tr key="page" v-if="!loading && pageparam.last>1">
                                        <td class="pagebtn" colspan="2">
                                                <router-link class="btn btn-link tooltip mx-1" data-tooltip="首页" v-if="pageparam.curr > 1" :to="url(1)"><i class="icon icon-back"></i></router-link>
                                                <router-link class="btn btn-link tooltip mx-1" data-tooltip="上一页"  v-if="pageparam.prev>0" :to="url(pageparam.prev)"><i class="icon icon-arrow-left"></i></router-link>
                                        </td>
                                        <td class="pagebtn" align="right" colspan="2">
                                                <router-link class="btn btn-link tooltip mx-1" data-tooltip="下一页"  v-if="pageparam.next>0" :to="url(pageparam.next)"><i class="icon icon-arrow-right"></i></router-link>
                                                <router-link class="btn btn-link tooltip mx-1" data-tooltip="尾页"  v-if="pageparam.curr < pageparam.last" :to="url(pageparam.last)"><i class="icon icon-forward"></i></router-link>
                                        </td>
                                </tr>
                        </tbody>
                </table>

                <div class="empty" v-if="!loading && !articles.length && !!query">
                        <div class="empty-icon"><i class="icon icon-3x icon-search"></i></div>
                        <p class="empty-title h5">没有搜索到 <mark>{{query}}</mark> 相关结果</p>
                        <p class="empty-subtitle">您可以尝试搜索一下别的内容</p>
                </div>
        </div>
</template>

<script>
export default {
        name: 'List',
        props:['page','tag','query'],
        data(){
                return {
                        loading:true,
                        articles:[],
                        pageparam:{
                                curr:1,
                                prev:0,
                                next:0,
                                last:0,
                                first:0
                        }
                }
        },
        watch:{
                '$route'(to){
                        this.loading = true;
                        this.articles = [];
                        this.page = to.params.page;
                        this.loadList();
                }
        },
        created(){
                this.loadList()
        },
        methods:{
                api(){
                        var config   = this.$store.state.config;
                        var api = 'https://api.github.com';
                        if(this.query){
                                api += '/search/issues?q=repo:'+config.owner+'/'+config.repo+'+author:'+config.owner+'+state:open+in:title,body+' + this.query
                        } else if(this.tag){
                                api += '/search/issues?q=repo:'+config.owner+'/'+config.repo+'+author:'+config.owner+'+state:open+label:' + this.tag
                        } else {
                                 api += '/repos/'+config.owner+'/'+config.repo+'/issues?creator=' + config.owner;
                        }
                        this.pageparam.curr =  this.page||1;
                        api += '&per_page=' + config.per_page + '&page='+ this.pageparam.curr;
                        return api;
                },
                url(page){
                        if(this.query){
                                return '/search/'+this.query + (page>1?('/'+page):'')
                        } else if (this.tag) {
                                return '/tag/'+this.tag + (page>1?('/'+page):'')
                        } else {
                                return page ==1?'/':('/page/'+page)
                        }
                },
                loadList() {
                        var config   = this.$store.state.config;
                        this.pageparam.curr = this.page||1;
                        document.title = (this.pageparam.curr==1?'':('第'+this.pageparam.curr+'页 - '))+ (this.tag?'标签:'+tag+' - ':'')+ (this.query?'搜索:'+query+' - ':'') +config.title;
                        fetch(this.api())
                        .then(resp=>{
                                resp.status==200&& this.parsePageLink(resp.headers.get('Link'))
                                return resp.json();
                        })
                        .then(json=>{
                                if(this.query || this.tag){
                                        this.articles = json.items;
                                } else {
                                        this.articles = json;
                                }
                                this.loading = false
                        })
                },
                parsePageLink(link){
                        var rs,reg = /[^_]page=(\d+).*?rel="(\w+)"/g;
                        this.pageparam .prev=0;
                        this.pageparam .next=0;
                        this.pageparam .last=0;
                        this.pageparam .first=0;
                        while ((rs = reg.exec(link)) != null){
                                this.pageparam[rs[2]] = rs[1];
                        }
                },
                labels(i){
                        let artLabels = [];
                        let gitalk   = this.$store.state.config.gitalk;
                        this.articles[i].labels.forEach(label => {
                                if(!/^#\d+$/.test(label.name) && label.name !=gitalk.label && label.name !=gitalk.disable){
                                        artLabels.push(label.name)
                                }
                        });
                        return artLabels;
                },
                showcommentCount(){
                        return this.$store.state.config.gitalk.repo == this.$store.state.config.repo
                }
        }
}


</script>
<style scoped>
table tbody tr:last-child td{border-bottom:none}
.pagebtn{width:150px}
.date{width:2rem}
a.label{text-decoration:none;color:#5b657a}
</style>
