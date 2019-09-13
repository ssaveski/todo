// activeUser indicates for who the trackingData is for. 

let listTodos = localStorage.getItem('listTodos');
export const state = () => ({

    listTodos: listTodos ? JSON.parse(listTodos) : [],
    error: null,
    activeUser: null,
    trackingData: [],
})
export const getters = {
    getTodoById: (state) => (id) => {
        localStorage.setItem('listTodos', JSON.stringify(state.listTodos));
        return state.listTodos.find(todo => todo.id == id)
    }  
}

export const mutations = {

    setTodos(state) {
        localStorage.setItem('listTodos', JSON.stringify(state.listTodos));

    },
    setError(state, error) {
        state.error = error
    },
    addTodo(state, todo) {
        var d = state.listTodos
        d.push(todo)
        state.listTodos = d
        localStorage.setItem('listTodos', JSON.stringify(state.listTodos));
    },
    editTodo(state, todo) {
        var d = state.listTodos
        let index = d.findIndex(el => el.id == todo.id)
        d[index].name = todo.name;
        d[index].content = todo.content;

        state.listTodos = d
        localStorage.setItem('listTodos', JSON.stringify(state.listTodos));
    },

    changeStatus(state, todo) {
        var d = state.listTodos
        let index = d.findIndex(el => el.id == todo.id)
        d[index].done = !d[index].done
        state.listTodos = d
        localStorage.setItem('listTodos', JSON.stringify(state.listTodos));
    },
    removeTodo(state, id) {
        var d = state.listTodos
        let index = d.findIndex(el => el.id == id)
        state.listTodos.splice(index, 1)
        localStorage.setItem('listTodos', JSON.stringify(state.listTodos));
    },

}

export const actions = {

    clear({ commit }) {
        commit('setTodos', [])
    },


}