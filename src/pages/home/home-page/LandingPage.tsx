import { useState } from "react";
import PageHeader from "./PageHeader";
import LoanCalculator from "./LoanCalculator";
import PhoneNumberSection from "./PhoneNumberSection";
import ScamWarningSection from "./ScamWarningSection";
import FinancialSolutionSection from "./FinancialSolutionSection";
import LoanStepsSection from "./LoanStepsSection";
import LoanTermsSection from "./LoanTermsSection";
import RequirementsSection from "./RequirementsSection";
import IntroSection from "./IntroSection";
import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import LoanRegistrationSection from "./LoanRegistrationSection";

export default function LandingPage() {
  const [loanAmount, setLoanAmount] = useState(1500000);

  const user = useSelector((state: IRootState) => state.user);
  const isLoggedIn = Boolean(user?._id || user?.phone_number);

  return (
    <main className="flex w-full flex-col p-[10px]">
      <PageHeader />
      <LoanCalculator
        loanAmount={loanAmount}
        onLoanAmountChange={setLoanAmount}
      />
      {isLoggedIn ? (
        <LoanRegistrationSection loanAmount={loanAmount} />
      ) : (
        <PhoneNumberSection />
      )}
      <ScamWarningSection />
    </main>
  );
}
