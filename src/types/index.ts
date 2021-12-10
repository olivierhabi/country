export interface UserData {
  id: number;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  firstName: string | null,
  lastName: string | null
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
  firstName: string;
  lastName: string;
  birthdate: string;
  country: string;
};
export type FormSearch = {
  searchInput: string | null;
};

export interface NewUserResponse {
  id: number;
  email: string;
}
export type NewUser<T = NewUserResponse> = {
  email: string;
  hashedPassword: string;
  country: string;
  firstName: string;
  lastName: string;
  birthdate: string;
};

export interface SignInResponse {
  error: string | undefined;
  status: number;
  ok: boolean;
  url: string | null;
}
export type SetStateAction<S> = S | (() => S);


export interface Sessions {
  session: Session;
}

export interface Session {
  user:    User;
  expires: Date;
}

export interface User {
  name:  string;
  email: string;
  image: string | null;
}