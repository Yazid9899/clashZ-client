<script>
import navBar from "../components/navBar.vue";
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores";
import Swal from "sweetalert2";
export default {
  name: "MyAccountView",
  components: { navBar },
  data() {
    return {
      playerTag: "",
      apiKey: ""
    }
  },
  created() {
    this.fetchAccount()
    
  },
  computed: {
    ...mapState(useMainStore, ["accounts","fiture"])
  },
  methods: {
    ...mapActions(useMainStore, ['fetchAccount', "addAccount","pageTrainTroop"]),
    trainTroop(id){
      if (this.fiture === "false"){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'buy this feature first!',
          showConfirmButton: false,
          timer: 1000
        })
      } else{
        this.pageTrainTroop(id)
      }
    }
  }
}
</script>

<template>
  <navBar />

  <div class="myACC">
    <div v-for="account in accounts">
      <div class="card my-4 myAccCard">
        <h3>{{ account.name }}</h3>
        <div class="card-body">
          <h5 class="card-title"><i class="bi bi-house myAccount-icon"></i>TownHall Level: {{ account.townHallLevel }}
          </h5>
          <p class="card-text"><i class="bi bi-gem myAccount-icon"></i>Throphies: {{ account.trophies }}</p>
          <div class="d-flex justify-content-between ">
            <div class="d-flex">
              <p class="card-text" style="margin-right: 30px;"><small class="text-muted">troop Space: {{ account.maxSpace
              }}</small></p>
              <p class="card-text"><small class="text-muted">Spell Space: {{ account.maxSpell }}</small></p>
            </div>
            <div><button @click.prevent="trainTroop(account.id)" type="button" class="btn  btn-outline-success btn-lg">Train Troop</button></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-3 mt-5">

        <form @submit.prevent="addAccount(playerTag, apiKey)">
          <h3>Add Account</h3>
          <div class="mb-3">
            <label for="1" class="form-label">playerTag</label>
            <input v-model="playerTag" type="text" class="form-control" id="1" placeholder="JJTY2EF">
            <label for="2" class="form-label">API key</label>
            <input v-model="apiKey" type="text" class="form-control" id="2" placeholder="your coc API key">
          </div>
          <button  type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>


<style>
.myACC {
  margin-left: 16rem;
}
.myAccCard{
  margin-right: 16rem;
}
.myAccount-icon {
  margin-right: 2rem;
}</style>