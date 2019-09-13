<template>
  <div>
    <v-card class="mx-auto card" color="#F9F9F9" max-width="400">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">Name of Task: {{todoDetails.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-5" cols="12">Content: {{todoDetails.content}}</v-col>

          <v-col cols="12">
            Status:
            <span v-if="!todoDetails.done">Not Done</span>
            <span v-if="todoDetails.done">Done</span>
          </v-col>

          <v-col cols="12">
            <v-btn
              size
              @click="changeStatus(todoDetails)"
              class="my-2"
              color="primary"
              :disabled="todoDetails.done"
            >
              <fa :icon="faCheck" />
            </v-btn>
            <v-btn
              size
              @click="changeStatus(todoDetails)"
              class="my-2"
              color="primary"
              :disabled="!todoDetails.done"
            >
              <fa :icon="faTimes" />
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row align="center"></v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions style="padding: 1.5em">
        <v-btn color="secondary" @click="dialog = true">Edit</v-btn>
        <v-btn color="danger" @click="deleteDialog()">Delete</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialogDelete" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Delete the task: {{todoDetails.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>Are you sure that you want to delete this task ?</v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialogDelete = false">Close</v-btn>
          <v-btn color="danger" dark @click="remove(todoDetails.id)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit the task: {{todoDetails.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <v-text-field
                  label="Name"
                  v-model="todoEdit.name"
                  counter="10"
                  :rules="[v => (v.length < 10 ) || 'Името несмее да содржи повеќе од 10 карактери.']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-textarea label="Content" v-model="todoEdit.content" counter="450" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="blue darken-1"
            :disabled="!todoEdit.name && !todoEdit.content"
            text
            @click="edit(todoEdit)"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";

import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

import Fa from "vue-fa";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import Router from "vue-router";

Vue.use(Router);

// TODO: get user data from either vuex or server
export default {
  components: { Fa },
  asyncData({ params }) {
    return {
      show: false,
      todoId: params.todo,
      todoModel: {},
      faTimes,
      faCheck,
      dialog: false,
      dialogDelete: false
    };
  },
  mounted: function() {
    this.todoDetails;
  },
  computed: {
    todoDetails() {
      this.todoModel = this.$store.getters["todos/getTodoById"](this.todoId);
      return this.todoModel;
    },
    todoEdit() {
      return JSON.parse(JSON.stringify(this.todoDetails));
    }
  },
  methods: {
    changeStatus(d) {
      this.$store.commit("todos/changeStatus", d);
    },
    deleteDialog: function() {
      this.dialog = false;
      this.dialogDelete = true;
    },
    remove: function(d) {
      this.$store.commit("todos/removeTodo", d);
      this.dialogDelete = false;
      return this.$router.push({
        path: "/"
      });
    },
    edit: function(d) {
      this.$store.commit("todos/editTodo", d);
      this.dialog = false;

      return (this.todoDetails = this.$store.getters["todos/getTodoById"](
        this.todoId
      ));
      // let path2 = "/todo/" + this.todoId;

      // return this.$router.push({
      //     path: path2
      //   });
    },
    clear: function(d) {
      this.todoEdit = {
        id: null,
        name: "",
        done: false,
        content: ""
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.add-user-card {
  width: 85%;
}

.panel-wrap {
  padding: 5px 20px;
}

.panel {
  max-height: 80vh;
  overflow: auto;
}
.card {
  margin-top: 2em;
}

.headline {
  color: #e20074;
}
</style>