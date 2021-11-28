export interface UserData {
  id: number;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
}
export interface User {
  id: number;
  email: string;
}
export interface ResponseUser {
  status: string;
  message: string;
  data: User;
}

export interface ResponseError {
  status: string;
  message: string;
}
export type FormValues = {
  password: string;
  emailAddress: string;
};

export interface NewUserResponse {
  id: number;
  email: string;
}
export type NewUser<T = NewUserResponse> = {
  email: string;
  hashedPassword: string;
};

export interface SignInResponse {
  error: string | undefined;
  status: number;
  ok: boolean;
  url: string | null;
}
export type SetStateAction<S> = S | (() => S);
