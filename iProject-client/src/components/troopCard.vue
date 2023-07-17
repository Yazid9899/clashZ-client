<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores';
export default {
    name: "troopCard",
    props: ["troop", "type"],
    components: {
        ...mapState(useMainStore, [])
    },
    methods: {
        ...mapActions(useMainStore, []),

    }
}
</script>


<template>
    <div class="col">
        <div class="card">
            <img :src="troop.imageUrl" class="card-img-top product-pict" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ troop.name }}</h5>
                <div class="d-flex justify-content-between">
                    <p class="card-text">{{ troop.type }}</p>
                    <p class="card-text">space: {{ troop.space }}</p>
                </div>
                    
            </div>
        </div>
    </div>
</template>

<style>
.product-pict {
  max-width: 100%;
  max-height: 100%;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>