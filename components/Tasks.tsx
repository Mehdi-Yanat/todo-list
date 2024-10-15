import { Button, Input, Layout, Radio, Spin, theme } from 'antd'
import {
    HomeOutlined,
    LoadingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MoonOutlined,
    SunOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { ColorModeContext } from '@/providers/ThemeProvider';
import { initialState, reducer } from '@/reducers/taskReducer';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { AddTask } from '@/reducers/taskActions';

const { Header, Content } = Layout;

const Tasks = ({ collapsed, handleCollapse }: { collapsed: boolean, handleCollapse: () => void }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { mode, toggleColorMode } = useContext(ColorModeContext);


    const fetchTasksFromLocalStorage = () => {
        const localTasks = localStorage.getItem('tasks');
        if (localTasks) {
            const parsedTasks: Task[] = JSON.parse(localTasks);
            dispatch({ type: 'SET_TASKS', payload: parsedTasks });
        }
    };

    useEffect(() => {
        fetchTasksFromLocalStorage();
    }, []);

    const handleAddTask = async () => {
        if (newTaskTitle) {
            const res = AddTask(newTaskTitle)(dispatch);
            if (res) {
                setNewTaskTitle('');
            }
        }
    };


    const filteredTasks = useMemo(() => {
        const tasks = [...state.tasks].reverse(); // Create a copy and reverse to avoid mutating state
        if (state.filter === 'completed') return tasks.filter(task => task.completed);
        if (state.filter === 'not_completed') return tasks.filter(task => !task.completed);
        return tasks; // 'all'
    }, [state.tasks, state.filter]);


    return (
        <>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <div className="flex items-center justify-end md:justify-between">
                    <div className='hidden md:flex' >
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
                    </div>
                    <div  >
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
                </div>
            </Header>
            {state.loading ? <div className='flex h-screen  items-center justify-center'>
                <Spin size="large" indicator={<LoadingOutlined spin />} />
            </div> : <Content
                style={{
                    position: "relative",
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    borderRadius: borderRadiusLG,
                }}
                className='overflow-y-scroll overflow-x-hidden'
            >
                <div className='flex items-center justify-between' >
                    <div className='flex items-center text-xl font-bold gap-1' >
                        <HomeOutlined />
                        <h2>TO-DO</h2>
                    </div>
                    <div  >
                        <Radio.Group
                            className='flex gap-2'
                            onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value as 'all' | 'completed' | 'not_completed' })}
                            value={state.filter}
                        >
                            <Radio value="all">All</Radio>
                            <Radio value="completed">Done</Radio>
                            <Radio value="not_completed">Not Done</Radio>
                        </Radio.Group>
                    </div>
                </div>
                {filteredTasks.map(el => (
                    <TaskItem
                        dispatch={dispatch}
                        key={el.id}
                        task={el}
                    />
                ))}
                <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    allowClear
                    style={{
                        position: 'sticky',
                        bottom: 0,
                        left: 0,
                        padding: '1em',
                        marginTop: '1em',
                        background: "white"
                    }}
                    size="large"
                    placeholder="Add a task"
                    suffix={<Button onClick={handleAddTask} disabled={!newTaskTitle} >Submit</Button>} />
            </Content>}
        </>
    )
}

export default Tasks