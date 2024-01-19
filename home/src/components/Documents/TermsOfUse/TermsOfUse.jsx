import React, { useEffect } from "react";

import "./termsOfUse.scss";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="terms-and-conditions">
      <iframe
        style={{ height: "100vh", width: "100%" }}
        src="https://docs.google.com/document/d/e/2PACX-1vSlRN023u9DQyFHoT2wF9CpSrzZr_g6BdhCViYdawHPw-FQGr9l9q7wmXMOz8_EHjVU8Xa6DHk2bSEd/pub?embedded=true"></iframe>
    </div>
  );
};

export default TermsOfUse;
