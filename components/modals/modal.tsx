import React from 'react'
import { Input, Modal } from 'antd';
import { ModalProps } from '@/types';

const ModalUpdate: React.FC<ModalProps> = ({ open, confirmLoading, updateTask, handleCancel, updateTaskTitle, handleUpdateTaskTitle, error }) => {
    return (
        <Modal
            title="Update Task"
            open={open}
            onOk={updateTask}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Input
                value={updateTaskTitle}
                onChange={(e) => handleUpdateTaskTitle(e.target.value)}
                allowClear
                size="large"
                placeholder="Add a task"
                style={{
                    backgroundColor: "white"
                }}
            />
            {error && (
                <p className="text-red-600 text-sm mt-1">
                    {error}
                </p>
            )}
        </Modal>
    )
}

export default ModalUpdate