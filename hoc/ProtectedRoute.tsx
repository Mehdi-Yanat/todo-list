'use client'
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthProvider';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!authContext?.isAuthenticated) {
                router.push('/login'); // Redirect to login if not authenticated
            }
        }
    }, [authContext?.isAuthenticated, router]);

    return <>{authContext?.isAuthenticated ? children : <div className='flex h-screen bg-gray-900 items-center justify-center'>
        <Spin size="large" indicator={<LoadingOutlined spin />} />
    </div>}</>;
};

export default ProtectedRoute;
