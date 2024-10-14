import { CustomToken } from "@/types";
import { ComponentTokenMap } from "antd/es/theme/interface";
import { AliasToken } from "antd/lib/theme/interface";

export type ExtendedToken = AliasToken & ComponentTokenMap & CustomToken;

export const getDesignTokens = (mode: string): { token: ExtendedToken } => {

    return {
        token: {
            colorBgContainer: mode === "light" ? 'white' : '#111827',
            Button: {
                defaultColor: mode !== "light" ? 'white' : '#111827',
                defaultBg: mode === "light" ? 'white' : '#111827',
            },
            colorBgElevated: mode === "light" ? 'white' : '#111827',
        } as ExtendedToken,
    };
};
