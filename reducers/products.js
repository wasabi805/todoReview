const initialState = {
    prodId: "",
    name: "",
    price: "",
    description: "",
    isFavorite: false,
    todos: [],

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

        case 'MAKE_INPUT_EDITS':
            console.log(action.payload.inputEdit, 'reducer MAKE_INPUT_EDITS');
            //take todos array and splice in edited card
            const i = action.payload.index;

            let edits = [...state.todos];
            let updateObject = {};

            Object.keys(action.payload.inputEdit).forEach((key) => {
                let newKey = key.replace('edit_', '');
                updateObject[newKey] = action.payload.inputEdit[key];
            });

            let updatedObject = {...edits[i], ...updateObject};

            edits[i] = updatedObject;

            return {
                ...state,
                todos : edits
            };

        default:
            return state;
    }
};

export default reducer;