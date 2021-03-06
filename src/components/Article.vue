<template>
<div class="article p-2" :class="{loading:loading,'loading-lg':loading}">
    <h3>
        <router-link v-if="article.title" class="btn btn-link tooltip tooltip-right" data-tooltip="返回" :to="backurl"><i class="icon icon-back"></i></router-link>{{article.title}}</h3>
    <div class="authinfo my-2 text-right">
        <div class="chip" v-if="article.user"><img :src="article.user.avatar_url" class="avatar avatar-sm">{{article.user.login}}</div>
        <span class="label">{{fmtDate}}</span>
    </div>
    <div class="content" v-html="content"></div>
    <router-link v-if="article.title" class="btn tooltip tooltip-right" data-tooltip="返回" :to="backurl"><i class="icon icon-back"></i></router-link>
    <div id="gitalk" v-if="showGitalk"></div>
    <router-link v-if="article.title && showGitalk()" class="btn tooltip tooltip-right" data-tooltip="返回上一页" :to="backurl"><i class="icon icon-back"></i></router-link>
</div>
</template>

<script>
import "gitalk/dist/gitalk.css";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-gist.css";
import marked from "marked";
import Gitalk from "gitalk";
import hljs from "highlight.js";
export default {
    props: ["id"],
    data() {
        return {
            loading: true,
            backurl: "/",
            article: {}
        };
    },
    computed: {
        content() {
            return this.article.body ?
                marked(this.article.body, {
                    highlight: code => hljs.highlightAuto(code).value
                }).replaceAll("<pre>", '<pre class="code">') :
                "";
        },
        fmtDate() {
            return this.article.created_at ?
                new Date(this.article.created_at).format("yy/MM/dd HH:mm") :
                "";
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => vm.setBackUrl(from.path));
    },
    created() {
        this.loadArticle();
    },
    methods: {
        setBackUrl(backurl) {
            this.backurl = backurl;
        },
        loadArticle() {
            var _this = this;
            var config = _this.$store.state.config;
            var api =
                "https://api.github.com/repos/" +
                config.owner +
                "/" +
                config.repo +
                "/issues/" +
                _this.id;
            if (config.access_token) api += "?access_token=" + config.access_token;
            fetch(api)
                .then(resp => resp.json())
                .then(json => {
                    if (json.author_association != "OWNER") {
                        this.$router.replace("/404");
                        return;
                    }
                    this.article = json;
                    this.loading = false;
                    document.title = json.title;
                    if (this.showGitalk()) {
                        var gitalk = new Gitalk({
                            clientID: config.clientid,
                            clientSecret: config.clientsecret,
                            repo: config.repo,
                            owner: config.owner,
                            admin: [config.owner],
                            number: this.id * 1,
                            createIssueManually: false,
                            distractionFreeMode: false
                        });
                        gitalk.render("gitalk");
                    }
                });
        },
        showGitalk() {
            let talk = this.$store.state.config.talk;
            let notalk = this.$store.state.config.disable_talk;
            return (
                talk &&
                !this.article.labels.filter(label => label.name == notalk).length
            );
        },
        initPage() {
            this.pageparam.prev = 0;
            this.pageparam.next = 0;
            this.pageparam.last = 0;
            this.pageparam.first = 0;
        },
        parsePageLink(link) {
            var rs,
                reg = /page=(\d+).*?rel="(\w+)"/g;
            this.initPage();
            while ((rs = reg.exec(link)) != null) {
                this.pageparam[rs[2]] = rs[1];
            }
        }
    }
};
</script>

<style scoped>
.article {
    font-size: 14px;
}

.content>>>img {
    max-width: 100%;
}

.content>>>h1 {
    font-size: 1.3rem;
}

.content>>>h2 {
    font-size: 1.2rem;
}

.content>>>h3 {
    font-size: 1.1rem;
}

.content>>>h4 {
    font-size: 1rem;
}

.content>>>h5 {
    font-size: 0.9rem;
}

#gitalk>>>.gt-container .gt-header-textarea,
#gitalk>>>.gt-btn {
    border-radius: 0.1rem;
}
</style>
