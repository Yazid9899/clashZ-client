<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'

export default {
    name: "RegisterView",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(useMainStore, ["doRegister"])
    }
}
</script>

<template>
    <div class="d-flex align-items-center">

        <main class="form-signin w-100 position-absolute top-50 start-50 translate-middle">
            <form @submit.prevent="doRegister(email, password)">
                <img class="mb-2" src="https://qph.cf2.quoracdn.net/main-qimg-e7c1ce1047dbf481dc45e3b9e276b6b7" alt=""
                    width="72" height="80">
                <h1 class="h3 mb-3 fw-normal">Please Register</h1>

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
                <div class="d-flex justify-content-between">

                    <p @click.prevent="this.$router.push('/login')"
                        class="mt-5 mb-3 text-body-secondary register-button">back to login?</p>
                    <p class="mt-5 mb-3 text-body-secondary">© 2023–2023</p>
                </div>
            </form>
        </main>
    </div>
</template>

<style>
.form-signin {
    max-width: 330px;
    padding: 1rem;
    border: 1px solid;
}

body {
    font-family: 'Ubuntu', sans-serif;
}
</style>