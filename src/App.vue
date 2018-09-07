<template>
<div id="app" class="p-2">
    <header class="navbar my-2 py-2">
        <section class="navbar-section">
            <router-link to="/" class="navbar-brand mr-2 tooltip tooltip-right" :data-tooltip="title">{{title}}</router-link>
        </section>
        <section class="navbar-section">
            <form class="input-group input-inline" action="" @submit.prevent="search">
                <input class="form-input" type="search" placeholder="搜索" v-model="searchkw" @keyup.enter.prevent="search">
                <button class="btn btn-primary input-group-btn" @click.prevent="search" type="button"><i class="icon icon-search"></i></button>
            </form>
        </section>
    </header>
    <div class="body my-2">
        <transition>
            <router-view></router-view>
        </transition>
    </div>

    <div class="footer centered">
        <p>© 2018 invictus maneo. power by <a href="https://github.com/ydq/gblog" target="_blank">Gblog</a>.</p>
    </div>

    <a href="javascript:void(0)" class="gotop tooltip tooltip-left btn" data-tooltip="返回顶部" @click="gotop"><i class="icon icon-upward"></i></a>

    <div class="modal modal-sm" :class="{active:alert.active}">
        <a href="javascript:void(0)" class="modal-overlay" @click="alert.active=false"></a>
        <div class="modal-container">
            <div class="modal-header">
                <a href="javascript:void(0)" class="btn btn-clear float-right" @click="alert.active=false"></a>
                <div class="modal-title h5">{{alert.title||'提示'}}</div>
            </div>
            <div class="modal-body">
                <div class="content">{{alert.msg}}</div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            title: 'which name',
            searchkw: '',
            alert: {
                title: '',
                msg: '',
                active: false
            }
        }
    },
    created() {
        this.title = this.$store.state.config.title;
        document.title = this.title;
        document.querySelector('meta[name=apple-mobile-web-app-title]').content = this.title;
    },
    methods: {
        dialog(title, msg) {
            if (!msg) {
                msg = title;
                title = '';
            }
            this.alert.msg = msg;
            this.alert.title = title;
            this.alert.active = true;
        },
        search() {
            if (this.searchkw) {
                this.$router.push('/which-name/search/' + this.searchkw)
            } else {
                this.dialog('请输入关键词再进行搜索')
            }
        },
        gotop() {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
    }
}
</script>

<style lang="scss">
@import "gblog.scss";
::-webkit-scrollbar {
    width: 3px;
    height: 3px
}

::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0)
}

::-webkit-scrollbar-thumb {
    background: #ccc
}

::-webkit-scrollbar-thumb:vertical:hover,
::-webkit-scrollbar-thumb:horizontal:hover {
    background: #999
}

.v-move,
.v-enter-active,
.v-leave-active {
    transition: all .3s ease;
}

.v-leave-active,
.v-enter-active {
    position: absolute;
    width: 100%
}

.v-enter,
.v-leave-active {
    transform: translateY(50px);
    opacity: 0;
}

a:visited {
    color: $primary-color
}

#app {
    max-width: 800px;
    margin: auto
}

.navbar .navbar-brand {
    font-size: 1.6rem
}

.body {
    min-height: 70vh;
    position: relative;
}

.gotop {
    position: fixed;
    bottom: 3.5rem;
    right: 1rem;
    z-index: 9;
    background: transparent
}
</style>
