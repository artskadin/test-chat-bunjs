import { Button, Input, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useSignUp } from '@/widgets/sign-up/model';

export function SignUp({ className }: { className?: string }) {
  const { pending, submit, fields, isFormValid, hasError } = useSignUp();

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Typography.Title level={3}>Please, register!</Typography.Title>

      <div>
        <Typography.Text>
          Username <Typography.Text type="secondary">(min 5, max 20 symbols)</Typography.Text>
        </Typography.Text>
        <Input
          value={fields.username?.value}
          onChange={(e) => fields.username?.onChange(e.target.value)}
          onBlur={() => fields.username?.onBlur()}
          disabled={pending}
          status={hasError('username') ? 'error' : ''}
          size="small"
          placeholder="Enter your username"
        />
      </div>

      <div>
        <Typography.Text>
          Password <Typography.Text type="secondary">(min 6 symbols)</Typography.Text>
        </Typography.Text>
        <Input.Password
          value={fields.password?.value}
          onChange={(e) => fields.password?.onChange(e.target.value)}
          disabled={pending}
          status={hasError('password') ? 'error' : ''}
          size="small"
          placeholder="Enter your password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>

      <div>
        <Typography.Text>Repeat password</Typography.Text>
        <Input.Password
          value={fields.repeatedPassword?.value}
          onChange={(e) => fields.repeatedPassword?.onChange(e.target.value)}
          disabled={pending}
          status={hasError('repeatedPassword') ? 'error' : ''}
          size="small"
          placeholder="Enter your password again"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </div>

      <Button htmlType="submit" type="primary" size="small" disabled={pending || !isFormValid}>
        Register
      </Button>
    </form>
  );
}
