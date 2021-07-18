<template>
  <div class="canban">
    <div class="wrapper">
      <app-card
          v-for="({ id, title, color}) in getCardConfig"
          :key="id"
          :title="title"
          :color="color"
          :categoryId="id"
      ></app-card>
    </div>
  </div>
</template>

<script>
import AppCard from "@/components/AppCard";
import {mapGetters, mapActions, mapMutations} from "vuex"

export default {
  name: "App",
  data() {
    return {
      inputIsOpen: false,
    }
  },
  mounted() {
    this.requestCard()
    if (localStorage.getItem('items')) {
      this.getStorage(JSON.parse(localStorage.getItem('items')))
    }
  },
  methods: {
    ...mapMutations(['getStorage']),
    ...mapActions(['login', 'getCards']),

    async requestCard() {
      await this.login()
      await this.getCards()
    }
  },
  computed: {
    ...mapGetters(["getCardConfig"])
  },
  components: {
    AppCard
  }
};
</script>

<style lang="scss">
.canban {
  padding-top: 50px;

  display: flex;
  justify-content: center;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  align-items: flex-start;
  width: 90vw;
}
</style>
