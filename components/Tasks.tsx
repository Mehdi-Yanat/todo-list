import { Button, Dropdown, Input, Layout, theme } from 'antd'
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    FilterOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoonOutlined,
    PlusCircleOutlined,
    SunOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd/lib';
import { useContext } from 'react';
import { ColorModeContext } from '@/providers/ThemeProvider';

const { Header, Content } = Layout;


const Tasks = ({ collapsed, handleCollapse }: { collapsed: boolean, handleCollapse: () => void }) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { mode, toggleColorMode } = useContext(ColorModeContext);


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span className={`${mode === "dark" ? "text-white" : "text-gray-900"}`}  >
                    <CheckCircleOutlined className='mr-1' />
                    Done
                </span>
            ),
        },
        {
            key: '2',
            label: (
                <span className={`${mode === "dark" ? "text-white" : "text-gray-900"}`} >
                    <ClockCircleOutlined className='mr-1' />
                    Not Done
                </span>
            ),
        },
    ];


    return (
        <>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <div className="hidden md:flex items-center justify-between">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={handleCollapse}
                        style={{
                            width: 64,
                            height: 64,
                        }}
                        classNames={{
                            icon: `${mode === "dark" ? "text-white" : "text-gray-900"}`
                        }}
                    />

                    <Button
                        type="text"
                        icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
                        onClick={toggleColorMode}
                        style={{
                            width: 64,
                            height: 64,
                        }}
                        classNames={{
                            icon: `${mode === "dark" ? "text-white" : "text-gray-900"}`
                        }}
                    />
                </div>
            </Header>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    borderRadius: borderRadiusLG,
                }}
                className='overflow-y-auto'
            >
                <div className='flex items-center justify-between' >
                    <div className='flex items-center text-xl font-bold gap-1' >
                        <HomeOutlined />
                        <h2>TO-DO</h2>
                    </div>
                    <Dropdown menu={{ items }} placement="bottomCenter" arrow={{ pointAtCenter: true }}>
                        <Button><FilterOutlined /></Button>
                    </Dropdown>
                </div>
                {Array(30).fill('').map(el => <div key={el} className='border mt-4 rounded-lg p-4 flex flex-col text-center sm:flex-row sm:text-left gap-2 items-center justify-between' >
                    <p className='cursor-pointer' >3. Use Giphy’s API to recreate Giphy</p>
                    <div className='flex gap-2' >
                        <Button><CheckCircleOutlined /></Button>
                        <Button><ClockCircleOutlined /></Button>
                        <Button><CloseCircleOutlined /></Button>
                    </div>
                </div>)}
                <Input
                    style={{
                        padding: '1em',
                        marginTop: '1em',
                        background: "white"
                    }}
                    size="large"
                    placeholder="Add a task"
                    prefix={<PlusCircleOutlined />}
                    suffix={<Button>Submit</Button>} />
            </Content>
        </>
    )
}

export default Tasks