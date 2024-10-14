"use client";

import { getDesignTokens } from "@/utils/client/theme";
import { ConfigProvider, Layout } from "antd";
import {
    createContext,
    useState,
    useMemo,
    type FC,
    type ReactNode,
    useContext,
} from "react";

// Extend the context to also provide the current mode (light/dark)
export const ColorModeContext = createContext({
    mode: "light", // Default value
    toggleColorMode: () => { },
});

export const NextThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            mode, // Provide the current mode here
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        [mode] // Recompute the value whenever the mode changes
    );

    const theme = useMemo(() => getDesignTokens(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ConfigProvider theme={{ ...theme, cssVar: true }}>
                <Layout>{children}</Layout>
            </ConfigProvider>
        </ColorModeContext.Provider>
    );
};
