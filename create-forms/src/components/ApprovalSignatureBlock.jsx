import React from "react";
import SignatureComponent from "./SignatureComponent";
import "../styles/ApprovalSignatureBlock.css";

const ApprovalSignatureBlock = ({
  label,
  roleName,
  onRoleNameChange,
  allowRoleEdit = false,
  value = {},
  onChange
}) => {

  const displayRole = roleName || label || "";

  const handleFieldChange = (field, val) => {
    if (!onChange) return;
    onChange({
      ...value,
      [field]: val
    });
  };

  const handleSignatureChange = (sig) => {
    if (!onChange) return;
    onChange({
      ...value,
      signature: sig
    });
  };

  return (
    <div className="approval-block">

      {/* ROLE HEADER */}
      <div className="approval-role-header">
        {allowRoleEdit && onRoleNameChange ? (
          <input
            type="text"
            className="approval-role-input"
            value={displayRole}
            onChange={(e)=>onRoleNameChange(e.target.value)}
          />
        ) : (
          <h4 className="approval-title">{displayRole}</h4>
        )}
      </div>

      {/* DETAILS */}
      <div className="approval-fields">

        <div className="field-group">
          <label>Name:</label>
          <input
            type="text"
            value={value?.name || ""}
            onChange={(e)=>handleFieldChange("name", e.target.value)}
          />
        </div>

        <div className="field-group">
          <label>Designation:</label>
          <input
            type="text"
            value={value?.designation || ""}
            onChange={(e)=>handleFieldChange("designation", e.target.value)}
          />
        </div>

        <div className="field-group">
          <label>Date:</label>
          <input
            type="date"
            value={value?.date || ""}
            onChange={(e)=>handleFieldChange("date", e.target.value)}
          />
        </div>

      </div>

      {/* SIGNATURE (untouched component) */}
      <div className="signature-area">
        <SignatureComponent
          value={value?.signature || {}}
          onChange={handleSignatureChange}
        />
      </div>

    </div>
  );
};

export default ApprovalSignatureBlock;