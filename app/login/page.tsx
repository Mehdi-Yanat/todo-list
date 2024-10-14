
'use client'
import { ColorModeContext } from '@/providers/ThemeProvider';
import { LoginFormData } from '@/types';
import { Input, Spin } from 'antd'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthProvider';
import { getUsers } from '@/utils/client/localStorage';


const Login: React.FC = () => {


    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        mode: 'onTouched', // Validate fields as they are touched
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        setLoading(true);
        setError(null);

        const email = data.email;
        const password = data.password;

        // Simulate an API call
        setTimeout(() => {
            const storedUser = getUsers()

            if (storedUser.length > 0) {
                const user = storedUser.find(user => user.email === email && user.password === password);

                if (user?.email) {
                    // Successful login
                    authContext?.login(user);
                    router.push('/'); // Redirect to dashboard or any other page
                } else {
                    setError('Invalid email or password');
                    setLoading(false)
                }
            } else {
                // Failed login
                setError('Invalid email or password');
                setLoading(false)
            }
        }, 500); // Simulate a delay for the API call

    };

    const { mode } = useContext(ColorModeContext);

    useEffect(() => {
        if (authContext?.isAuthenticated) {
            router.push('/')
        }
    }, [authContext?.isAuthenticated, router])

    if (authContext?.isAuthenticated) {
        return (
            <div className='flex h-screen bg-gray-900 items-center justify-center'>
                <Spin size="large" indicator={<LoadingOutlined spin />} />
            </div>
        );
    }

    return (
        <section className={`${mode !== "dark" ? "bg-white" : "bg-gray-900"} h-screen flex items-center`}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen lg:py-0">
                <div className={`w-full  ${mode === "dark" ? "bg-white" : "bg-gray-900"} min-h-[372px] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 `}>
                    {loading ? <div className='flex h-[372px] items-center justify-center' >
                        <Spin size="large" indicator={<LoadingOutlined spin />} />
                    </div> : <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className={`text-xl font-bold leading-tight tracking-tight ${mode === "dark" ? "text-gray-900" : "text-white"} md:text-2xl `}>
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${mode === "dark" ? "text-gray-900" : "text-white"}`}>Your email</label>
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
                            <div>
                                <label htmlFor="password" className={`block mb-2 text-sm font-medium ${mode === "dark" ? "text-gray-900" : "text-white"}`}>Password</label>
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
                                            placeholder="••••••••"
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
                            <button type='submit' className={`w-full ${mode === "dark" ? "text-gray-900" : "text-white"}  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Sign in</button>
                            {error && (
                                <p className="text-red-600 text-sm mt-1">
                                    {error}
                                </p>
                            )}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default Login