import { createCookie } from '@remix-run/node';

const cookieOptions = {
  path: '/',
  httpOnly: true,
  secure: true,
  maxAge: 604_800, //one week
};
export const kontenbaseToken = createCookie('token', {
  ...cookieOptions,
});

export const getToken = async (request: any) : Promise<string> => {
    const cookieHeader = request.headers.get('Cookie');
    const token =  await kontenbaseToken.parse(cookieHeader);
    return token;
}