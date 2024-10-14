'use client'
import React, { useContext, useEffect, useState } from 'react';
import {
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import Tasks from '@/components/Tasks';
import { ColorModeContext } from '@/providers/ThemeProvider';

const { Sider } = Layout;

const App: React.FC = () => {
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

  return (
    <Layout className='h-screen' >
      <Sider theme='light' trigger={null} collapsible={!isMobile} collapsed={isMobile ? true : collapsed}>
        <div className='flex items-center gap-1 p-4' >
          {collapsed || isMobile ? "" : <Avatar size={64} icon={<UserOutlined />} />}
          <span className={`${mode === "dark" ? "text-white" : "text-gray-900"}`} >USER 1</span>
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
      </Sider>
      <Layout>
        <Tasks collapsed={collapsed} handleCollapse={handleCollapse} />
      </Layout>
    </Layout>
  );
};

export default App;