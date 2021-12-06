export const initialState = {
    username: '',
    todos: {},
    isLoaded: false,
    error: ''
}

export function reducer( state, action ) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                error: '',
                isLoaded: true,
                username: action.username,
                todos: action.todos,
            };
        case 'logout':
            return {
                ...state,
                error: '',
                isLoaded: false,
                username: '',
                todos: {}
            };
        case 'addTask':
            return {
                ...state,
                error: '',
                todos: {
                    ...state.todos,
                    [action.newTask.id]: {
                        ...action.newTask,
                    }
                }
            };
        case 'removeTask':
            const newTodos = { ...state.todos };
            delete newTodos[action.id];
            return {
                ...state,
                error: '',
                todos: {
                    ...newTodos
                }
            };
        case 'toggleTaskDone':
            return {
                ...state,
                error: '',
                todos: {
                    ...state.todos,
                    [action.id]: {
                        ...state.todos[action.id],
                        done: action.doneStatus,
                    }
                }
            };
        case 'showError':
            return {
                ...state,
                error: action.error
            };    
        default:
            return state;
    }
}
