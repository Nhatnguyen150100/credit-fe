export interface IBaseResponse<T> {
  data: T;
  message: string;
}

export interface IData {
  total: number;
  data: IInfo[];
}

export interface IInfo {
  _id: string;
  user_id: string;
  name: string;
  user_take_id_img: string;
  front_end_user_id_img: string;
  back_end_user_id_img: string;
  phone_number: string;
  loan_amount: number;
  loan_date: string;
  receiving_account_number: string;
  bank_name: string;
  date_payable: string;
  address: string;
  company: string;
  amount_payable: number;
  status: "NOT_PAY" | "PAYED";
  __v: number;
}
