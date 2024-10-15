import { Button, Result } from 'antd'

const NotFound = () => {
    return (
        <Result
            className='h-screen '
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button href='/' >Back Home</Button>}
        />
    )
}

export default NotFound