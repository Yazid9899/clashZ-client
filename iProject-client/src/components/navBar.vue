<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";

export default {
    name: "navBar",
  methods: {
    ...mapActions(useMainStore, ['logout', 'buy']),
    changePage(page){
            this.$router.push(page)
        }
  }
}
</script>

<template>
    <nav class="side-bar">
        <div  class="side-bar-header d-flex justify-content-center">
            <i class="bi bi-fingerprint"></i>
            <div class="head-title">
                Clashz
            </div>
        </div>
        <div  class="d-flex flex-column justify-content-evenly side-bar-body">
            <div @click.prevent="changePage('/')" class="d-flex side-bar-content" >
                <i class="bi bi-house-gear"></i>
                Troops
            </div>
            <div @click.prevent="changePage('/myAccounts')" class="d-flex side-bar-content" >
                <i class="bi bi-box-seam"></i>
                myAccount
            </div>
            <div @click.prevent="buy()" class="d-flex side-bar-content" >
                <i class="bi bi-collection"></i>
                buy Feature
            </div>


        </div>
        <div  id="side-bar-footer">
            <div @click.prevent="logout()" class="bi bi-box-arrow-right">logout</div>
        </div>
    </nav>
</template>

<style>
.account {
    padding-left: 25%;
    border-bottom: #000000 solid;
}

.head-title {
    color: rgb(255, 255, 255);
}

.side-bar {
    position: fixed;
    top: 0;
    background-color: #5e5a5a;
    height: 100vh;
    width: 34vh;
    z-index: 1;
    top: 0;
    left: 0;
    box-shadow: 0 20px 20px black;
}

.side-bar-header {
    height: 13%;
    font-weight: 600;
    font-size: 50px;
    color: #000000;

}

.side-bar-body {

    height: 40%;
}

.side-bar-body i {
    padding-right: 9px;
}

.side-bar-footer {
    background-color: #B799FF;
    height: 10%;
}

.side-bar-content {
    padding-left: 25px;
    font-size: 25px;
    color: #fffcfc;
}

#side-bar-footer {
    font-size: 25px;
    color: #4b4b4b;
    margin-left: 10px;
    margin-top: 50%;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.side-bar-content:hover {
    cursor: pointer;
    background-color: #b3afaf;
    font-size: 28px;
}

#side-bar-footer:hover {
    cursor: pointer;
    background-color: #b3afaf;
    margin-left: 0;
}

.dash-board {
    position: absolute;

}
</style>