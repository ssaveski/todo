<template>
  <v-card class="navi" height="90vh" width="280">
    <v-navigation-drawer width="280" absolute permanent right>
      <v-list>
        <nuxt-link class="item" v-for="item in allTodos" :key="item.name" :to="'/todo/' + item.id">
          <fa v-if="item.done" :icon="faCheck" />
          <fa v-if="!item.done" :icon="faMinusCircle" />&nbsp;
          &nbsp;
          <span style = "color: rgba(0, 0, 0, 0.54);">{{ item.name }}</span>
        </nuxt-link>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-radio-group v-model="radioGroup" row>
            &nbsp;
            <v-radio value="1" color="#1976d2" label="All"></v-radio>
            <v-radio value="2" color="#1976d2" label="Done"></v-radio>
            <v-radio value="3" color="#1976d2" label="Not done"></v-radio>
          </v-radio-group>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import Fa from "vue-fa";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    Fa
  },
  data() {
    return {
      drawer: true,
      faCheck,
      faMinusCircle,
      radioGroup: 1
    };
  },
  mounted() {},
  computed: {
    allTodos() {
      let d = this.$store.state.todos.listTodos;

      if (this.radioGroup == 2) {
        d = d.filter(x => x.done === true);
      } else if (this.radioGroup == 3) {
        d = d.filter(x => x.done === false);
      }

      return d;
    }
  }
};
</script>


<style lang="scss" scoped>
.navi {
  margin: 0px !important;
  display: inline;
}

.item {
  height: 100%;
  width: 100%;
  display: flex;
  padding: 8px;
  margin: 10px 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 1px rgba(150, 150, 150, 0.2);
  transition: 400ms;
  & svg {
    display: inline-block;
    background: white;
    color: #e20074;
    width: 26px;
    height: 26px !important;
    padding: 7px;
    border-radius: 1000px;
    vertical-align: -11px !important;
    margin-left: 3em;
  }
  &,
  &:visited {
    color: rgba(0, 0, 0, 0.5);
    text-decoration: none;
    font-weight: bold;
  }

  &:hover {
    box-shadow: 0px 3px 5px 3px rgba(150, 150, 150, 0.4);
  }

  &:active {
    background: darken($color: white, $amount: 10);
  }
}

.content {
  width: 100%;
  height: 100%;
}
</style>