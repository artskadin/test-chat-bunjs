import { Button, Input, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export function SignIn({ className }: { className?: string }) {
  return (
    <form className={className}>
      <Typography.Title level={3}>Please, login!</Typography.Title>

      <div>
        <Typography.Text>Username</Typography.Text>
        <Input size="small" placeholder="Enter your username" />
      </div>

      <div>
        <Typography.Text>Password</Typography.Text>
        <Input.Password
          size="small"
          placeholder="Enter your password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>

      <Button type="primary" size="small" disabled={true}>
        Login
      </Button>
    </form>
  );
}
