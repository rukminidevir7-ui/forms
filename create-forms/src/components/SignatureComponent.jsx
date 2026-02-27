import React, { useState, useEffect } from "react";
import { usePrintMode } from "../PrintModeContext";
import '../styles/SignatureComponent.css';

const SignatureComponent = ({ value = {}, onChange }) => {
  const { isPrintMode } = usePrintMode();
  const [typedSignature, setTypedSignature] = useState("");

  useEffect(() => {
    if (value?.signatureData && value?.signatureType === "typed") {
      setTypedSignature(value.signatureData);
    }
  }, [value]);

  const handleTypedChange = (e) => {
    const val = e.target.value;
    setTypedSignature(val);

    onChange({
      type: "typed",
      data: val
    });
  };

  if (isPrintMode) {
    return (
      <div className="auth-signature-print">
        {value?.signatureData || "______________________"}
      </div>
    );
  }

  return (
    <div className="auth-signature-wrapper">
      <label className="auth-signature-label">
        Signature
      </label>

      <input
        type="text"
        value={typedSignature}
        onChange={handleTypedChange}
        placeholder="Type Signature Here"
        className="auth-signature-input"
      />

      <div className="auth-signature-line"></div>

      <input
        type="date"
        className="auth-signature-date"
        onChange={(e) =>
          onChange({
            type: "typed",
            data: typedSignature,
            date: e.target.value
          })
        }
      />
    </div>
  );
};

export default SignatureComponent;