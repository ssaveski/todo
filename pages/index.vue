<template>
  <div>
    <v-card class="mx-auto card" color="#F9F9F9" max-width="400">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">Welcome to the ToDo App</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-img :src="require('../assets/picture.png')" height="300"></v-img>

      <v-card-text>Welcome to the ToDo App, where you can add, edit, delete and check your tasks :).</v-card-text>
    </v-card>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import TCard from "~/components/TCard.vue";

import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
    TCard
  }
};
</script>

<style scoped>

.card {
  margin-top: 1.5em;
}
</style>