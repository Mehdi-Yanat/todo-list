import { User } from "@/types";

// Retrieve all users from Local Storage
export const getUsers = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

// Save a new user to Local Storage
export const saveUser = (user: User): void => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

// Find a user by email
export const findUserByEmail = (email: string): User | undefined => {
    const users = getUsers();
    return users.find(user => user.email === email);
};