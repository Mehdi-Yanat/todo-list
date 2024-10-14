'use client';
import { AuthContextType, User } from '@/types';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        // Set loading to false after checking for the user
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated) {
                router.push('/'); // Change this to your dashboard route
            } else {
                router.push('/login');
            }
        }
    }, [isAuthenticated, loading, router]);

    const login = (userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        router.push('/login')
    };

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className='flex h-screen bg-gray-900 items-center justify-center'>
                <Spin size="large" indicator={<LoadingOutlined spin />} />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
