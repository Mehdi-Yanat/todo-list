export interface CustomToken {
    fontSizeIcons: number;
    fontSizeXS: number;
    fontSizeMD: number;
    fontSize2XL: number;
    fontSize4XL: number;
    fontSize6XL: number;
    fontSize8XL: number;
    fontWeightLight: string;
    fontWeightNormal: string;
    fontWeightMedium: string;
    fontWeightRegular: string;
    fontWeightSemiBold: string;
    fontWeightBold: string;
    borderRadiusFull: string;
    gapSM: string;
    colorBgFooter: string;
    paddingLayoutMobile: string;
    MenuItemBg: string;
    ColorHeading1: string;
    ColorHeading2: string;
    colorBorderHover: string;
}

export type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
};


export type LoginFormData = {
    email: string;
    password: string;
};

export type User = {
    email: string
    password: string
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export interface TaskItemProps {
    task: Task;
    dispatch: React.Dispatch<any>;
}

export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export interface State {
    tasks: Task[];
    filter: 'all' | 'completed' | 'not_completed';
    loading: boolean;
    error: string | null; // Optional: For error handling
}

export type Action =
    | { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: { id: number; completed: boolean; title: string } }
    | { type: 'DELETE_TASK'; payload: number }
    | { type: 'SET_STATUS'; payload: { id: number; completed: boolean } } // New action for setting status
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_FILTER'; payload: 'all' | 'completed' | 'not_completed' }
    | { type: 'SET_ERROR'; payload: string | null }; // Optional: For error handling
