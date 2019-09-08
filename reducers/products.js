const initialState = {
    prodId: "",
    name: "",
    price: "",
    description: "",
    isFavorite: false,
    todos: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE':
            const {name, value} = action.payload;

            return {
                ...state,
                [name] : value
            };
        case 'ADD_TODO':
            const { todo } = action.payload;

            return {
                ...state,
                todos: [...state.todos, todo]
            };
        case 'TOGGLE_FAVORITE':
            const {idx} = action.payload;

            let todos = [...state.todos];
            todos[idx].isFavorite = !todos[idx].isFavorite;

            return {
                ...state,
                todos: todos
            };
        case 'DELETE_TODO':
            const index = action.payload.idx;

            let currentTodos = [...state.todos];
            currentTodos.splice(index, 1);

            return {
                ...state,
                todos: currentTodos
            };

        case 'SORT_BY_NAME':
            return {
                ...state,
                todos : [...state.todos,]
            };

        default:
            return state;
    }
};

export default reducer;