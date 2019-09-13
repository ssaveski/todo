<template>
  <div class="navigation">
    <div class="banner">
      <img class="t-logo" id="logo" src="../assets/t-logo1.png" />

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn class id="add" color="primary" @click="dialog = true" v-on="on">
            <fa :icon="faPlusCircle" />&nbsp;
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add a new Todo Item</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                    label="Name"
                    v-model="TodoModel.name"
                    counter="10"
                    :rules="[v => (v.length < 10 ) || 'Името несмее да содржи повеќе од 10 карактери.']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-textarea label="Content" v-model="TodoModel.content" counter="450" required></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn
              color="blue darken-1"
              :disabled="!TodoModel.name && !TodoModel.content"
              text
              @click="add(TodoModel)"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import Fa from "vue-fa";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Router from "vue-router";

Vue.use(Router);

export default {
  name: "Header",
  components: {
    Fa
  },
  data() {
    return {
      faPlusCircle,
      dialog: false,
      TodoModel: {
        id: null,
        name: "",
        done: false,
        content: ""
      }
    };
  },
  methods: {
    add: function(d) {
      let length = Math.floor(Math.random() * 10000000000000001)
      d.id = length;
      this.$store.commit("todos/addTodo", d);
      this.dialog = false;
      this.clear();

       let path2 = "/todo/" + length;

      return this.$router.push({
          path: path2
        });
    },

    clear: function(d) {
      this.TodoModel = {
        id: null,
        name: "",
        done: false,
        content: ""
      };
    }
  },
  computed: {
    allTodos() {
      // return this.$store.state.todos.listTodos;
      return this.$store.state.todos.listTodos;
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  background-color: #e20074;
  min-width: 350px;
  margin: 0px;
}

.banner {
  background-color: #f5f5f5;
  color: #e20074;
  text-align: left;
  margin: 0;
  font-size: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: "Telegrotesk";
}

#logo {
  box-sizing: content-box;
  padding: 20px;
  height: 35px;
  margin-left: 0.5em;
}
#add {
  margin-right: 3em;
  color: white;
  background: white;

  &:hover {
    box-shadow: 0px 3px 5px 3px rgba(150, 150, 150, 0.4);
    background: white;
  }
}

@media screen and(min-width: 900px) {
  #logo {
    height: 35px;
    padding: 20px;
  }
}
</style>
