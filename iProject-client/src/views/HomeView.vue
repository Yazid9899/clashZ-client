<script>
import { mapActions, mapState } from "pinia";
import navBar from "../components/navBar.vue";
import troopCard from "../components/troopCard.vue";
import { useMainStore } from "../stores";
export default {
  name: "HomeView",
  components: { navBar,troopCard },
  created() {
    this.fetchTroop()
  },
  computed: {
    ...mapState(useMainStore, ['troops'])
  },
  methods: {
    ...mapActions(useMainStore, ['fetchTroop'])
  }
}
</script>

<template>
  <navBar />
  <div class="row row-cols-1 row-cols-md-5 g-6 cardsTroop">
    
    <troopCard v-for="troop in troops" :troop="troop" />

  </div>
</template>
<style>
.cardsTroop {
  margin-left: 16rem;
  margin-top: 3rem;
}</style>
