'use client'
import React, { useContext, useEffect, useState } from 'react';
import {
  HomeOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Spin } from 'antd';
import Tasks from '@/components/Tasks';
import { ColorModeContext } from '@/providers/ThemeProvider';
import { AuthContext } from '@/providers/AuthProvider';

const { Sider } = Layout;

const App: React.FC = () => {

  const authContext = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCollapse = () => {
    setCollapsed(value => !value)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Initial check for mobile screen
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { mode } = useContext(ColorModeContext);

  if (!authContext?.isAuthenticated) {
    return (
      <div className='flex h-screen bg-gray-900 items-center justify-center'>
        <Spin size="large" indicator={<LoadingOutlined spin />} />
      </div>
    );
  }


  return (
    <Layout className='h-screen' >
      <Sider theme='light' trigger={null} collapsible={!isMobile} collapsed={isMobile ? true : collapsed}>
        <div className='flex flex-col  items-center   justify-center gap-1 p-6' >
          {collapsed || isMobile ? "" : <Avatar size={64} icon={<UserOutlined />} />}
          <span className={`${mode === "dark" ? "text-white" : "text-gray-900"}   ${collapsed ? "text-[8px]" : "md:text-sm"} text-center`} >{isMobile || collapsed ? !authContext.user?.email ? "USER" : authContext.user?.email.split('@')[0] : authContext.user?.email}</span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Tasks',
            },
          ]}
        />
        <div className='flex justify-center absolute w-full bottom-4 left-0 items-center '>
          <Button onClick={() => authContext.logout()} className='w-[80%] p-6' >
            <LogoutOutlined />
          </Button>
        </div>
      </Sider>
      <Layout>
        <Tasks collapsed={collapsed} handleCollapse={handleCollapse} />
      </Layout>
    </Layout>
  );
};

export default App;