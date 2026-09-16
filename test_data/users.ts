export interface UserCredentials {
  email: string;
  password: string;
}

export const testUsers = {
  defaultUser: {
    email: 'TestEvg@test.com',
    password: 'Pass123',
  },
} as const;
