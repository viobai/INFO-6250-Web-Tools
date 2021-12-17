export const initialState = {
    newCompany: '',
    newTitle: '',
    newDate: '',
    newLink: '',
    newNote: '',
    inputError: '',
}

export function reducer( state, action ) {
    switch(action.type) {
        case 'clearInputFields':
            return {
                newCompany: '',
                newTitle: '',
                newDate: '',
                newLink: '',
                newNote: '',
                inputError: '',
            };
        case 'setNewCompany':
            return {
                ...state,
                newCompany: action.input
            };
        case 'setNewTitle':
            return {
                ...state,
                newTitle: action.input
            };
        case 'setNewDate':
            return {
                ...state,
                newDate: action.input
            };
        case 'setNewLink':
            return {
                ...state,
                newLink: action.input
            };
        case 'setNewNote':
            return {
                ...state,
                newNote: action.input
            };
        case 'setInputError':
            return {
                ...state,
                inputError: action.inputError
            };   
        default:
            return state;
    }
}
