import * as React from "react";
import axiosRequest from "../../../plugins/request";
import { toast } from "react-toast";
import { IBank } from "../../../types/bank";
import BankForm from "./BankForm";
import Visibility from "../../../components/visibility";

export default function BankSetting() {
  const [bank, setBank] = React.useState<IBank>();

  const handleGetBank = async () => {
    try {
      const rs = await axiosRequest.get("/v1/bank");
      if (rs.data.data[0]) {
        setBank(rs.data.data[0]);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    handleGetBank();
  }, []);

  return (
    <>
      <Visibility visibility={Boolean(bank)}>
        <BankForm bankProps={bank} />
      </Visibility>
      {!bank && <BankForm />}
    </>
  );
}
