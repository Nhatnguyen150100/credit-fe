import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import ProfilePaid from "./ProfilePaid";
import ProfileUnpaid from "./ProfileUnpaid";
import ProfileNoLoan from "./ProfileNoLoan";

export default function Profile() {
  const user = useSelector((state: IRootState) => {
    return state.user;
  });

  if (!user?._id) {
    return <ProfileNoLoan />;
  }

  const isPaid = user?.status === "PAYED";

  if (isPaid) {
    return <ProfilePaid />;
  }

  return <ProfileUnpaid />;
}
