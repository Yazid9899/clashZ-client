<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'
import firebaseConfig from "../firebaseConfig"
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";

firebaseConfig;


const provider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider(); //harus bayar
const yahooProvider = new OAuthProvider('yahoo.com');
const gitHubProvider = new GithubAuthProvider();
const auth = getAuth();
 export default {
    name: "LoginView",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(useMainStore, ["doLogin", "googleLogin", 'yahooLogin', 'gitHubLogin']),
        
    }
}
</script>

<template>
    <div class="d-flex align-items-center">
        <main class="form-signin w-100 position-absolute top-50 start-50 translate-middle">
            <form @submit.prevent="doLogin(email, password)">
                <img class="mb-2" src="https://qph.cf2.quoracdn.net/main-qimg-e7c1ce1047dbf481dc45e3b9e276b6b7" alt=""
                    width="72" height="80">
                <h1 class="h3 mb-3 fw-normal">Please Login</h1>

                <div class="form-floating mb-2">
                    <input v-model="email" type="email" class="form-control" id="floatingInput"
                        placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-5">
                    <input v-model="password" type="password" class="form-control" id="floatingPassword"
                        placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <div class="d-flex mt-3 ">
                    <button @click.prevent="gitHubLogin()" class="btn btn-outline-secondary w-100 py-2 mx-1" type="submit">GitHub</button>
                    <button @click.prevent="googleLogin()" class="btn btn-outline-success w-100 py-2 mx-1"
                        type="submit">google</button>
                    <button @click.prevent="yahooLogin()"  class="btn btn-outline-info w-100 py-2 mx-1" type="submit">Yahoo</button>
                </div>
                <div class="d-flex justify-content-between">

                    <p @click.prevent="this.$router.push('/register')" class="mt-5 mb-3 text-body-secondary register-button">register?</p>
                    <p class="mt-5 mb-3 text-body-secondary">© 2023–2023</p>
                </div>
            </form>
        </main>
    </div>
</template>


<style>
.register-button:hover{
    cursor: pointer;
    font-weight: 600;
}
</style>