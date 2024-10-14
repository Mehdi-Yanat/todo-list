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
