<template>
  <v-app class="app">
    <Header class="header" />
    <Sidebar />
    <nuxt class="main" />
  </v-app>
</template>

<script>
import Vue from "vue";

import Header from "~/components/Header.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  head() {
    return {
      title: "ToDo App"
    };
  },
  data() {
    return {};
  },
  components: {
    Header,
    Sidebar
  },
  
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100vw;
}
#app > .v-application--wrap {
  height: 100%;
  overflow-x: hidden;
  width: 100vw;

  margin: auto;
  text-align: center;
  font-family: TeleIconSolid;
  src: url(/assets/fonts/telegrotesknext-solid.ttf);
  margin: auto;
  display: grid;
  grid-template-areas:
    "header header header header header header"
    "menu main main main right right"
    "menu main main main right right";
  align-items: start;
  align-content: start;
}
.v-application .mx-auto {
  margin: 0px;
  grid-area: menu;
}

.header {
  grid-area: header;
}

.main {
  grid-area: main;
}
</style>
