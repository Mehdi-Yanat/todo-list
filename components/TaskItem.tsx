import React, { useState } from 'react';
import { Button, Switch } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TaskItemProps } from '@/types';
import { RemoveTask, SetStatus, UpdateTask } from '@/reducers/taskActions';
import ModalUpdate from './modals/modal';



const TaskItem: React.FC<TaskItemProps> = (({ task, dispatch }) => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState('');
    const [error, setError] = useState('');
    const [taskId, setTaskId] = useState<number>();

    const showModal = (text: string, taskId: number) => {
        setOpen(true);
        setUpdateTaskTitle(text)
        setTaskId(taskId)
    };

    const updateTask = async () => {
        if (taskId && updateTaskTitle) {
            setConfirmLoading(true);
            UpdateTask(taskId, updateTaskTitle)(dispatch); // Call update task action
            setOpen(false);
            setConfirmLoading(false);
        }

        if (!updateTaskTitle) {
            setError('Please enter you task title');
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const deleteTask = async (taskId: number) => {
        if (taskId) {
            RemoveTask(taskId)(dispatch); // Call update task action
        }
    }

    const updateStatus = (taskId: number, completed: boolean) => {
        if (taskId) {
            SetStatus(taskId, completed)(dispatch); // Call update task action
        }
    };

    const handleUpdateTaskTitle = (text: string) => {
        setUpdateTaskTitle(text)
    }

    return (
        <>
            <ModalUpdate
                updateTask={updateTask}
                open={open}
                confirmLoading={confirmLoading}
                handleCancel={handleCancel}
                updateTaskTitle={updateTaskTitle}
                handleUpdateTaskTitle={handleUpdateTaskTitle}
                error={error}
            />
            <div key={task.id} className='border mt-4 rounded-lg p-4  flex flex-row  gap-2 overflow-hidden text-ellipsis items-center justify-between'>
                <div onClick={() => showModal(task.title, task.id)} className='cursor-pointer line-clamp-3 overflow-hidden   flex gap-2 items-center' >
                    <p className='overflow-x-scroll lg:overflow-hidden text-left text-sm md:text-lg' >{task.title}</p>
                    {task.completed ? <CheckCircleOutlined style={{ color: 'green' }} className='mt-1' /> : <ClockCircleOutlined style={{ color: 'orange' }} className='mt-1' />}
                </div>
                <div className='flex items-center gap-2'>
                    <Switch value={task.completed} onChange={(value) => updateStatus(task.id, value)} />
                    <Button onClick={() => deleteTask(task.id)} ><CloseCircleOutlined /></Button>
                </div>
            </div>
        </>
    );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
