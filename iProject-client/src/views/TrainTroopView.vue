<script>
import { mapActions, mapState } from "pinia";
import navBar from "../components/navBar.vue";
import troopCard from "../components/troopCard.vue";
import { useMainStore } from "../stores";
export default {
    name: "TrainTroopView",
    components: { navBar },
    props: ['AccountId'],
    created() {
        this.fetchTroop()
        this.fetchTrainTroop(this.accountId)
        this.fetchAccount()
    },
    computed: {
        ...mapState(useMainStore, ['troops', 'accountId', 'trainedTroop'])
    },
    methods: {
        ...mapActions(useMainStore, ['fetchTroop', 'trainTroop', 'fetchTrainTroop', 'fetchAccount']),
        calculateTotalSpace() {
            let totalSpace = 0;
            for (let i = 0; i < this.trainedTroop.length; i++) {
                totalSpace += this.trainedTroop[i].Troop.space;
            }
            return totalSpace;
        },
    }
}
</script>

<template>
    <navBar />

    <div class="row row-cols-1 row-cols-md-5 g-6 cardsTroop">
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">space</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(trained, i) in trainedTroop">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ trained.Troop.name }}</td>
                    <td>{{ trained.Troop.space }}</td>
                    <td></td>
                </tr>
                <tr>
                    <th colspan="2" scope="row">Total Space</th>
                    <td>{{ calculateTotalSpace() }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">type</th>
                    <th scope="col">space</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="( troop, i) in troops">
                    <td>{{ i + 1 }}</td>
                    <td>{{ troop.name }}</td>
                    <td><img :src="troop.imageUrl" class="train-pict"></td>
                    <td>{{ troop.type }}</td>
                    <td>{{ troop.space }}</td>
                    <td @click.prevent="trainTroop(this.accountId, troop.id)" class="btn btn-outline-secondary">train</td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<style>
.train-pict {
    max-width: 50px;
    max-height: 50px;
}
</style>
