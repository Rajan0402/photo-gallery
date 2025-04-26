export type CreateUserDto = {
  email: string;
  username: string;
  password: string;
  hashedRefreshToken?: string;
};
