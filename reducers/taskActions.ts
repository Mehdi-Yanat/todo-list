import { Action, Task } from "@/types";
import { Dispatch } from 'react';


// AddTask Action
export const AddTask = (newTaskTitle: string) => {
    return (dispatch: Dispatch<Action>) => {
        const newTask: Omit<Task, 'id'> = {
            title: newTaskTitle,
            completed: false,
        };

        const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = [...localTasks, { ...newTask, id: Date.now() }];

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        dispatch({ type: 'ADD_TASK', payload: { ...newTask, id: Date.now() } });
        return updatedTasks
    };
};


// UpdateTask Action
export const UpdateTask = (taskId: number, newTitle: string) => {
    return (dispatch: Dispatch<Action>) => {
        const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = localTasks.map((task: Task) =>
            task.id === taskId ? { ...task, title: newTitle } : task
        );

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, title: newTitle, completed: false } });
    };
};

export const SetStatus = (taskId: number, completed: boolean) => {
    return (dispatch: Dispatch<Action>) => {
        const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = localTasks.map((task: Task) =>
            task.id === taskId ? { ...task, completed } : task
        );

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        dispatch({
            type: 'SET_STATUS',
            payload: { id: taskId, completed } // Updated to match the new action type
        });
    };
};


// RemoveTask Action
export const RemoveTask = (taskId: number) => {
    return (dispatch: Dispatch<Action>) => {
        const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = localTasks.filter((task: Task) => task.id !== taskId);

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        dispatch({ type: 'DELETE_TASK', payload: taskId });
        console.log(updatedTasks);
    };
};