export const users = {
  valid: {
    username: process.env.TEST_USERNAME ?? 'testuser@alphabank.com',
    password: process.env.TEST_PASSWORD ?? 'SecureP@ssword1',
  },
  invalid: {
    username: 'invalid@alphabank.com',
    password: 'wrongpassword',
  },
  locked: {
    username: 'locked@alphabank.com',
    password: 'SecureP@ssword1',
  },
};
