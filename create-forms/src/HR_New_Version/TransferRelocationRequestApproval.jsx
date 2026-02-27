// TransferRelocationRequestApproval.jsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
	// SECTION 1 – REQUEST / INITIATION DETAILS
	requesterName: Yup.string().required('Requester Name is required'),
	department: Yup.string().required('Department is required'),
	employeeName: Yup.string().required('Employee Name is required'),
	employeeId: Yup.string().required('Employee ID is required'),
	currentDesignation: Yup.string().required('Current Designation is required'),
	currentDepartmentLocation: Yup.string().required('Current Department / Location is required'),
	proposedDepartmentLocation: Yup.string().required('Proposed Department / Location is required'),
	typeOfTransfer: Yup.string().required('Type of Transfer is required'),
	reasonForTransfer: Yup.string().required('Reason for Transfer / Relocation is required'),
	proposedEffectiveDate: Yup.string().required('Proposed Effective Date is required'),
	reportingManagerName: Yup.string().required('Reporting Manager Name is required'),

	// SECTION 2 – TRANSFER / RELOCATION DETAILS (BASIC)
	changeInRoleResponsibilities: Yup.string().required('Change in Role / Responsibilities is required'),
	changeInGradeLevel: Yup.string().required('Change in Grade / Level is required'),
	changeInCompensation: Yup.string().required('Change in Compensation is required'),
	relocationSupportRequired: Yup.string().required('Relocation Support Required status is required'),
	impactOnBusinessOperations: Yup.string().required('Impact on Business / Operations is required'),
	hrOperationsRemarks: Yup.string().required('Remarks by HR Operations Team are required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	transferRelocationReferenceNumber: Yup.string().required('Transfer / Relocation Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments are required'),
	effectiveDateOfTransfer: Yup.string().required('Effective Date of Transfer / Relocation is required'),
	approvalDate: Yup.string().required('Approval Date is required'),

	// Custom fields
	customFields: Yup.array().of(
		Yup.object({
			fieldName: Yup.string().required('Field Name is required'),
			fieldValue: Yup.string().required('Field Value is required')
		})
	),

	// Signatures
	signatures: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			signatureName: Yup.string().required('Signature Name is required'),
			signatureData: Yup.string(),
			signatureDate: Yup.string().required('Signature Date is required')
		})
	)
});

const initialValues = {
	// SECTION 1
	requesterName: '',
	department: '',
	employeeName: '',
	employeeId: '',
	currentDesignation: '',
	currentDepartmentLocation: '',
	proposedDepartmentLocation: '',
	typeOfTransfer: '',
	reasonForTransfer: '',
	proposedEffectiveDate: '',
	reportingManagerName: '',

	// SECTION 2
	changeInRoleResponsibilities: '',
	changeInGradeLevel: '',
	changeInCompensation: '',
	relocationSupportRequired: '',
	impactOnBusinessOperations: '',
	hrOperationsRemarks: '',

	// SECTION 3
	transferRelocationReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvalComments: '',
	effectiveDateOfTransfer: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const TransferRelocationRequestApproval = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-TRANSFER-RELOCATION"
			title="Transfer / Relocation — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Transfer / Relocation form submitted:', values);
					alert('✅ Transfer / Relocation form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-TRANSFER-RELOCATION"
							title="Transfer / Relocation — Request & Approval"
							department="HR & People Ops"
						>
							{/* SECTION 1 – REQUEST / INITIATION DETAILS */}
							<div className="form-section">
								<h3 className="form-section-title">
									📋 Section 1 — Request / Initiation Details
								</h3>

								<div className="form-fields">
									{[
										{ name: 'requesterName', label: 'Requester Name' },
										{ name: 'department', label: 'Department' },
										{ name: 'employeeName', label: 'Employee Name' },
										{ name: 'employeeId', label: 'Employee ID' },
										{ name: 'currentDesignation', label: 'Current Designation' },
										{ name: 'currentDepartmentLocation', label: 'Current Department / Location' },
										{ name: 'proposedDepartmentLocation', label: 'Proposed Department / Location' }
									].map((f) => (
										<div key={f.name} className="form-field">
											<label className="form-label required">{f.label}</label>
											{isPrintMode ? (
												<div className="print-value">
													{values[f.name] || '___________________'}
												</div>
											) : (
												<>
													<Field name={f.name} className="form-input" />
													<ErrorMessage name={f.name} component="div" className="form-error" />
												</>
											)}
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">
											Type of Transfer
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.typeOfTransfer || '___________________'}
											</div>
										) : (
											<>
												<Field name="typeOfTransfer" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Internal">Internal</option>
													<option value="Relocation">Relocation</option>
													<option value="Project Based">Project Based</option>
												</Field>
												<ErrorMessage name="typeOfTransfer" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Reason for Transfer / Relocation
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reasonForTransfer || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="reasonForTransfer"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="reasonForTransfer" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Proposed Effective Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedEffectiveDate || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="proposedEffectiveDate"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="proposedEffectiveDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Reporting Manager Name
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reportingManagerName || '___________________'}
											</div>
										) : (
											<>
												<Field name="reportingManagerName" className="form-input" />
												<ErrorMessage name="reportingManagerName" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – TRANSFER / RELOCATION DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Transfer / Relocation Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field full-width">
										<label className="form-label required">
											Change in Role / Responsibilities (if any)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.changeInRoleResponsibilities || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="changeInRoleResponsibilities"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="changeInRoleResponsibilities" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Change in Grade / Level (if any)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.changeInGradeLevel || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="changeInGradeLevel"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="changeInGradeLevel" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Change in Compensation (if any)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.changeInCompensation || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="changeInCompensation"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="changeInCompensation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Relocation Support Required
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.relocationSupportRequired || '___________________'}
											</div>
										) : (
											<>
												<Field name="relocationSupportRequired" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="relocationSupportRequired" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Impact on Business / Operations
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.impactOnBusinessOperations || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="impactOnBusinessOperations"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="impactOnBusinessOperations" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Remarks by HR Operations Team
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hrOperationsRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="hrOperationsRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="hrOperationsRemarks" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 3 – APPROVAL / AUTHORIZATION DETAILS */}
							<div className="form-section">
								<h3 className="form-section-title">
									✅ Section 3 — Approval / Authorization Details
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">
											Transfer / Relocation Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.transferRelocationReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="transferRelocationReferenceNumber" className="form-input" />
												<ErrorMessage name="transferRelocationReferenceNumber" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Approving Authority Name
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvingAuthorityName || '___________________'}
											</div>
										) : (
											<>
												<Field name="approvingAuthorityName" className="form-input" />
												<ErrorMessage name="approvingAuthorityName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Approval Status
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvalStatus || '___________________'}
											</div>
										) : (
											<>
												<Field name="approvalStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Approved">Approved</option>
													<option value="Rejected">Rejected</option>
													<option value="On Hold">On Hold</option>
												</Field>
												<ErrorMessage name="approvalStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Approval Decision / Comments
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvalComments || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="approvalComments"
													as="textarea"
													className="form-textarea"
													rows="3"
												/>
												<ErrorMessage name="approvalComments" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Effective Date of Transfer / Relocation
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.effectiveDateOfTransfer || '___________________'}
											</div>
										) : (
											<>
												<Field name="effectiveDateOfTransfer" type="date" className="form-input" />
												<ErrorMessage name="effectiveDateOfTransfer" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Approval Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvalDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="approvalDate" type="date" className="form-input" />
												<ErrorMessage name="approvalDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(arrayHelpers) => (
											<div>
												{values.customFields.length > 0 && (
													<div className="custom-fields-list">
														{values.customFields.map((f, idx) => (
															<div key={f.id || idx} className="custom-field-row">
																<div className="form-field">
																	<Field
																		name={`customFields.${idx}.fieldName`}
																		className="form-input"
																		placeholder="Field Name"
																	/>
																	<ErrorMessage
																		name={`customFields.${idx}.fieldName`}
																		component="div"
																		className="form-error"
																	/>
																</div>
																<div className="form-field" style={{ flex: 2 }}>
																	<Field
																		name={`customFields.${idx}.fieldValue`}
																		className="form-input"
																		placeholder="Field Value"
																	/>
																	<ErrorMessage
																		name={`customFields.${idx}.fieldValue`}
																		component="div"
																		className="form-error"
																	/>
																</div>
																<button
																	type="button"
																	className="btn-remove"
																	onClick={() => arrayHelpers.remove(idx)}
																>
																	Remove
																</button>
															</div>
														))}
													</div>
												)}

												<button
													type="button"
													className="btn-add-field"
													onClick={() =>
														arrayHelpers.push({
															id: uuidv4(),
															fieldName: '',
															fieldValue: ''
														})
													}
												>
													+ Add Custom Field
												</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{isPrintMode && values.customFields.length > 0 && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Additional Custom Fields</h3>
									<div className="form-fields">
										{values.customFields.map((f, i) => (
											<div key={i} className="form-field full-width custom-field-print">
												<strong>{f.fieldName}:</strong> {f.fieldValue || '___________________'}
											</div>
										))}
									</div>
								</div>
							)}

							{/* Signatures */}
							<div className="form-section signatures-section">
								<h3 className="form-section-title">✍️ Digital Signatures</h3>

								{!isPrintMode && (
									<FieldArray name="signatures">
										{(arrayHelpers) => (
											<div>
												{values.signatures.length > 0 && (
													<div className="signatures-list">
														{values.signatures.map((sig, idx) => (
															<div key={sig.id || idx} className="signature-row-container">
																<div className="signature-row">
																	<div className="form-field">
																		<label className="form-label required">Signature Name</label>
																		<Field
																			name={`signatures.${idx}.signatureName`}
																			className="form-input"
																		/>
																		<ErrorMessage
																			name={`signatures.${idx}.signatureName`}
																			component="div"
																			className="form-error"
																		/>
																	</div>

																	<div className="form-field">
																		<label className="form-label required">Date</label>
																		<Field
																			name={`signatures.${idx}.signatureDate`}
																			type="date"
																			className="form-input"
																		/>
																		<ErrorMessage
																			name={`signatures.${idx}.signatureDate`}
																			component="div"
																			className="form-error"
																		/>
																	</div>

																	<button
																		type="button"
																		className="btn-remove"
																		onClick={() => arrayHelpers.remove(idx)}
																	>
																		Remove Signature
																	</button>
																</div>

																<div className="signature-pad-container">
																	<label className="form-label">Signature Pad / Upload</label>
																	<SignatureComponent
																		name={`Signature ${idx + 1}`}
																		onChange={(sigObj) =>
																			setFieldValue(
																				`signatures.${idx}.signatureData`,
																				sigObj.data || ''
																			)
																		}
																		value={sig}
																	/>
																</div>
															</div>
														))}
													</div>
												)}

												<button
													type="button"
													className="btn-add-signature"
													onClick={() =>
														arrayHelpers.push({
															id: uuidv4(),
															signatureName: '',
															signatureData: '',
															signatureDate: ''
														})
													}
												>
													+ Add Signature
												</button>
											</div>
										)}
									</FieldArray>
								)}

								{isPrintMode && values.signatures.length > 0 && (
									<div className="print-signatures">
										{values.signatures.map((sig, i) => (
											<div key={i} className="print-signature-box">
												<div className="sig-name">
													{sig.signatureName || `Signature ${i + 1}`}
												</div>
												<div className="sig-space">
													{sig.signatureData && (
														<img
															src={sig.signatureData}
															alt={`sig-${i}`}
															className="print-sig-image"
														/>
													)}
												</div>
												<div className="sig-line" />
												<div className="sig-date">
													{sig.signatureDate && `Date: ${sig.signatureDate}`}
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Submit */}
							{!isPrintMode && (
								<div className="form-actions">
									<button type="submit" className="btn-submit">
										Save Form
									</button>
								</div>
							)}
						</ModernA4Template>
					</Form>
				)}
			</Formik>
		</ModernFormWrapper>
	);
};

export default TransferRelocationRequestApproval;
