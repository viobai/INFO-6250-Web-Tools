export const initialState = {
    username: '',
    jobs: {},
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
                jobs: action.jobs,
            };
        case 'logout':
            return {
                ...state,
                error: '',
                isLoaded: false,
                username: '',
                jobs: {}
            };
        case 'addJob':
            return {
                ...state,
                error: '',
                jobs: {
                    ...state.jobs,
                    [action.newJob.id]: {
                        ...action.newJob,
                    }
                }
            };
        case 'removeJob':
            const newJobs = { ...state.jobs };
            delete newJobs[action.id];
            return {
                ...state,
                error: '',
                jobs: {
                    ...newJobs
                }
            };
        case 'updateJobStatus':
            return {
                ...state,
                error: '',
                jobs: {
                    ...state.jobs,
                    [action.id]: {
                        ...state.jobs[action.id],
                        status: action.status,
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
