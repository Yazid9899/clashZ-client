import { defineStore, mapActions, mapState } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
import firebaseConfig from "../firebaseConfig"
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider, OAuthProvider } from "firebase/auth";

firebaseConfig
const provider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider(); //harus bayar
const gitHubProvider = new GithubAuthProvider();
const yahooProvider = new OAuthProvider('yahoo.com');

const auth = getAuth();
const baseUrl = "http://localhost:3000"
export const useMainStore = defineStore('useMainStore', {
  state: () => ({
    login: localStorage.getItem("access_token") ? true : false,
    troops: null,
    accounts: null,
    accountId: null,
    trainedTroop: null,
    fiture: null
  }),
  actions: {
    async gitHubLogin() {
      try {
        const result = await signInWithPopup(auth, gitHubProvider)
        const user = result.user;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/logInGoogle`,
          data: { email: user.email }
        })
        localStorage.setItem("access_token", data.access_token)
        this.fiture = data.fiture
        this.login = true
        this.router.push("/")
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async yahooLogin() {
      try {
        const { _tokenResponse } = await signInWithPopup(auth, yahooProvider)
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/logInGoogle`,
          data: { email: _tokenResponse.email }
        })
        localStorage.setItem("access_token", data.access_token)
        this.fiture = data.fiture
        this.login = true
        this.router.push("/")
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async googleLogin() {
      try {
        const { _tokenResponse } = await signInWithPopup(auth, provider)
        console.log(_tokenResponse);
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/logInGoogle`,
          data: { email: _tokenResponse.email }
        })
        localStorage.setItem("access_token", data.access_token)
        this.login = true
        this.router.push("/")
        this.fiture = data.fiture
      } catch (err) {
        console.log(err);
      }

    },
    async doRegister(email, password) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/register`,
          data: {
            email, password
          }
        })
        this.router.push("/login")
        Swal.fire({
          icon: 'success',
          title: 'Register Success',
        })
      } catch (err) {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }
    },
    async doLogin(email, password) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/login`,
          data: { email, password }
        })
        localStorage.setItem("access_token", data.access_token)
        this.fiture = data.fiture
        this.login = true
        this.router.push("/")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Welcome to ClashZ!",
          showConfirmButton: false,
          timer: 900
        })
      } catch (err) {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }
    },
    async fetchTroop() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/troops`,
        })
        this.troops = data.troop
      } catch (err) {
        console.log(err);
      }
    },
    async fetchAccount() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/accounts`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(data);
        this.fiture = data.fiture
        this.accounts = data.account
      } catch (err) {
        console.log(err);
      }
    },
    async logout() {
      try {
        localStorage.clear()
        this.login = false
        this.router.push('/login')
      } catch (err) {
        console.log(err);
      }
    },
    async addAccount(playerTag, apiKey) {
      try {
        console.log(playerTag, apiKey);
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/accounts/add`,
          headers: { access_token: localStorage.getItem("access_token") },
          data: {
            playerTag: playerTag, token: apiKey
          }
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Account added!",
          showConfirmButton: false,
          timer: 900
        })
        this.fetchAccount()
      } catch (err) {
        Swal.fire({
          position: 'bottom-start',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1000
        })
      }
    },
    async pageTrainTroop(accountId) {
      try {
        this.accountId = accountId
        this.router.push('/trainsTroops')
      } catch (err) {
        console.log(err);
      }
    },
    async trainTroop(accId, troopId) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/traintoops/${troopId}/${accId}`,
          headers: { access_token: localStorage.getItem("access_token") },
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 900
        })
        this,this.fetchTrainTroop(accId)
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTrainTroop(accId) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/traintoops/${accId}`,
          headers: { access_token: localStorage.getItem("access_token") },
        })
        console.log(data.data);
        this.trainedTroop = data.data
      } catch (err) {
        console.log(err);
      }
    },
    async buyFeature() {
      try {
        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrl}/buyFeature`,
          headers: { access_token: localStorage.getItem("access_token") },
        })

        console.log(data);
      } catch (err) {
      }
    },
    async buy() {
      try {

        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/midTrans-Token`,
          headers: { access_token: localStorage.getItem("access_token") },
        })
        const cb = this.buyFeature
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "payment success!",
              showConfirmButton: false,
              timer: 500
            })
            cb()
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "wating your payment!",
              showConfirmButton: false,
              timer: 500
            })
          },
          onError: function (result) {
            /* You may add your own implementation here */
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "payment failed!",
              showConfirmButton: false,
              timer: 900
            })
          },
          onClose: function () {
            /* You may add your own implementation here */
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: "you closed the popup without finishing the payment",
              showConfirmButton: false,
              timer: 1000
            })
          }
        })
      } catch (err) {
        console.log(err.response.status);
        if (err.response.status === 403) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "you already bought this feature",
            showConfirmButton: false,
            timer: 1000
          })
        }
      }
    }

  }
})
