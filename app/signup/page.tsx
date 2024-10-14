'use client';
import { ColorModeContext } from '@/providers/ThemeProvider';
import { Input } from 'antd';
import Link from 'next/link';
import React, { useContext } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormData } from '@/types';

const Signup: React.FC = () => {
    // 2. Type Your `useForm` Hook
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        mode: 'onTouched', // Validate fields as they are touched
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Form Data:', data);
        // TODO: Handle form submission (e.g., send data to an API)
    };

    const { mode } = useContext(ColorModeContext);

    // Watching password value for confirmation validation
    const password = watch('password', '');

    return (
        <section className={`${mode !== 'dark' ? 'bg-white' : 'bg-gray-900'}`}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className={`w-full ${mode === 'dark' ? 'bg-white' : 'bg-gray-900'} rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0`}>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className={`text-xl font-bold leading-tight tracking-tight ${mode === 'dark' ? 'text-gray-900' : 'text-white'} md:text-2xl`}>
                            Create new account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${mode === 'dark' ? 'text-gray-900' : 'text-white'}`}>
                                    Your email
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Please enter a valid email',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="email"
                                            id="email"
                                            placeholder="name@company.com"
                                            style={{
                                                background: 'white',
                                            }}
                                            className={`w-full ${errors.email ? 'border-red-500' : ''
                                                }`}
                                        />
                                    )}
                                />
                                {/* 3. Safely Render Error Messages */}
                                {errors.email?.message && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className={`block mb-2 text-sm font-medium ${mode === 'dark' ? 'text-gray-900' : 'text-white'}`}>
                                    Password
                                </label>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters long',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            id="password"
                                            placeholder="Password"
                                            iconRender={(visible) =>
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                            }
                                            style={{
                                                background: 'white',
                                            }}
                                            className={`w-full ${errors.password ? 'border-red-500' : ''
                                                }`}
                                        />
                                    )}
                                />
                                {errors.password?.message && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className={`block mb-2 text-sm font-medium ${mode === 'dark' ? 'text-gray-900' : 'text-white'}`}>
                                    Confirm Password
                                </label>
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Please confirm your password',
                                        validate: (value) =>
                                            value === password || 'Passwords do not match',
                                    }}
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                            iconRender={(visible) =>
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                            }
                                            style={{
                                                background: 'white',
                                            }}
                                            className={`w-full ${errors.confirmPassword ? 'border-red-500' : ''
                                                }`}
                                        />
                                    )}
                                />
                                {errors.confirmPassword?.message && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <button type='submit' className={`w-full ${mode === 'dark' ? 'text-gray-900' : 'text-white'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                                Sign up
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
