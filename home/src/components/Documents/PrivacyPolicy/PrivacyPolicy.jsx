import React, { useEffect } from "react";
import "./privacyPolicy.scss";
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-policy-container">
      <iframe
        style={{ height: "100vh", width: "100%" }}
        src="https://docs.google.com/document/d/e/2PACX-1vQUwmq9WHD9-GLGLkZwFd0w1m4dfyoBOCbvEaBaCgB_CSU-JgoBZm9GUkHiUFbvvjfMS_IiinBfUj9M/pub?embedded=true"></iframe>
    </div>
  );
};

export default PrivacyPolicy;
