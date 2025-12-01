import { useState } from "react";
import PageHeader from "./PageHeader";
import LoanCalculator from "./LoanCalculator";
import PhoneNumberSection from "./PhoneNumberSection";
import HelpButton from "./HelpButton";
import ScamWarningSection from "./ScamWarningSection";
import FinancialSolutionSection from "./FinancialSolutionSection";
import LoanStepsSection from "./LoanStepsSection";
import LoanTermsSection from "./LoanTermsSection";
import RequirementsSection from "./RequirementsSection";
import IntroSection from "./IntroSection";

export default function LandingPage() {
  const [loanAmount, setLoanAmount] = useState(1500000);

  return (
    <main className="flex w-full flex-col p-[10px]">
      <PageHeader />
      <LoanCalculator
        loanAmount={loanAmount}
        onLoanAmountChange={setLoanAmount}
      />
      <PhoneNumberSection />
      <HelpButton />
      <ScamWarningSection />
      <FinancialSolutionSection />
      <LoanStepsSection />
      <LoanTermsSection />
      <RequirementsSection />
      <IntroSection />
    </main>
  );
}
