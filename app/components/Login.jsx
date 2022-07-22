import { Form } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { kontenbase } from '~/lib/kontenbase.server';
import { kontenbaseToken } from '~/utils/cookie';

export const processLogin = async (formData) => {
  const username = formData.get('username');
  const password = formData.get('password');
  const { token, error } = await kontenbase.auth.login({
    username,
    password,
  });

  if (error) {
    return json({
      error,
    });
  }

  if (token) {
    return redirect('/profile', {
      headers: {
        'Set-Cookie': await kontenbaseToken.serialize(token),
      },
    });
  }
};

const Login = () => {
  return (
    <Form method="post">
      <input type="hidden" name="operation" value="login" />
      <div className="form-group">
        <label>Username</label>
        <input name="username" required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" required />
      </div>
      <div className="form-button">
        <button className="button button-primary">Submit</button>
      </div>
    </Form>
  );
};

export default Login;
