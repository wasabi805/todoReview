//export actions from here
export const updateField = (name, value) => {
    return {
        type: 'UPDATE',
        payload: {
            name: name,
            value: value
        }
    }
};

export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        payload: {
            todo: todo
        }
    }
};

export const addTodoAndClear = (todo) => (dispatch) => {
    // add todo
    dispatch(addTodo(todo));

    // clear fields
    dispatch(updateField('name', ''));
    dispatch(updateField('color', ''));
};

export const toggleFavorite = (idx) => {
    return {
        type: 'TOGGLE_FAVORITE',
        payload: {
            idx: idx
        }
    }
};

export const deleteTodo = (idx) => {
    return {
        type: 'DELETE_TODO',
        payload: {
            idx: idx
        }
    }
};

const sortThings = (result) => {
    return{
        type : 'SORT_BY_NAME',
        payload : result
    }
};

export const sortByName = (items)=> (dispatch) => {

    if(items){
        const compare = (a, b)=>{
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if(nameA < nameB){
                return -1
            }
            if(nameA > nameB){
                return 1
            }
            return 0
        };

        const result = items.sort(compare);
        dispatch(sortThings(result));
    }
};