import { Form } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { kontenbase } from '~/lib/kontenbase.server';
import { kontenbaseToken } from '~/utils/cookie';

export const processRegister = async (formData) => {
  const firstName = formData.get('firstname');
  const lastName = formData.get('lastname');
  const email = formData.get('email');
  const username = formData.get('username');
  const password = formData.get('password');
  const {
    user,
    token,
    error: errorRegister,
  } = await kontenbase.auth.register({
    firstName,
    lastName,
    email,
    username,
    password,
  });
  const { error: ErrorProfile } = await kontenbase.service('profile').create({
    Users: [user?._id],
  });

  if (errorRegister || ErrorProfile) {
    return json({
      error: errorRegister || ErrorProfile,
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

const Register = () => {
  return (
    <Form method="post">
      <div className="form-group">
        <input type="hidden" name="operation" value="register" />
        <label>First Name</label>
        <input name="firstname" required />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input name="lastname" />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input name="username" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" required />
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

export default Register;
