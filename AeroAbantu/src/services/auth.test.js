import { signUp, signIn, signOut } from './auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('./firebase', () => ({
  auth: {},
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signUp calls createUserWithEmailAndPassword', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: { email: 'test@test.com' } });
    const user = await signUp('test@test.com', 'password');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@test.com', 'password');
    expect(user.email).toBe('test@test.com');
  });

  test('signIn calls signInWithEmailAndPassword', async () => {
    signInWithEmailAndPassword.mockResolvedValue({ user: { email: 'test@test.com' } });
    const user = await signIn('test@test.com', 'password');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@test.com', 'password');
    expect(user.email).toBe('test@test.com');
  });

  test('signOut calls firebaseSignOut', async () => {
    firebaseSignOut.mockResolvedValue();
    await signOut();
    expect(firebaseSignOut).toHaveBeenCalled();
  });
});
