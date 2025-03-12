export interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  _id: string;
  firebaseConfigSelected: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type TFirebaseLogin = Pick<
  IFirebaseConfig,
  | "apiKey"
  | "authDomain"
  | "projectId"
  | "messagingSenderId"
  | "storageBucket"
  | "measurementId"
  | "appId"
>;
