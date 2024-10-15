import { Action, State, Task } from "@/types";

export const initialState: State = {
    tasks: [],
    filter: 'all',
    loading: false,
    error: null
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: action.payload, loading: false, error: null };
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload], loading: false, error: null };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? { ...task, title: action.payload.title } : task
                ),
                error: null,
            };
        case 'SET_STATUS':
            const updatedTasks = state.tasks.map(task =>
                task.id === action.payload.id
                    ? { ...task, completed: action.payload.completed }
                    : task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update local storage
            return { ...state, tasks: updatedTasks, error: null };
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload), error: null };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        default:
            return state;
    }
};

