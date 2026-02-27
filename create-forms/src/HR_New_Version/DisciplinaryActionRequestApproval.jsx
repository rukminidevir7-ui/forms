// DisciplinaryActionRequestApproval.jsx

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
	// SECTION 1 – REQUEST / INITIATION
	requesterName: Yup.string().required('Requester Name is required'),
	department: Yup.string().required('Department is required'),
	employeeName: Yup.string().required('Employee Name is required'),
	employeeId: Yup.string().required('Employee ID is required'),
	designation: Yup.string().required('Designation is required'),
	businessUnitLocation: Yup.string().required('Business Unit / Location is required'),
	reportingManagerName: Yup.string().required('Reporting Manager Name is required'),
	typeOfMisconduct: Yup.string().required('Type of Misconduct / Policy Violation is required'),
	incidentDates: Yup.string().required('Date(s) of Incident is required'),
	incidentDescription: Yup.string().required('Brief Description of Incident is required'),
	immediateActionTaken: Yup.string().required('Immediate Action Taken is required'),

	// SECTION 2 – DISCIPLINARY ACTION DETAILS
	investigationRequired: Yup.string().required('Investigation Required is required'),
	investigationSummary: Yup.string().required('Investigation Summary is required'),
	employeeExplanationReceived: Yup.string().required('Employee Explanation Received is required'),
	recommendedDisciplinaryAction: Yup.string().required('Recommended Disciplinary Action is required'),
	proposedEffectiveDateOfAction: Yup.string().required('Proposed Effective Date of Action is required'),
	hrIrRemarks: Yup.string().required('Remarks by HR / IR Team are required'),

	// SECTION 3 – SUPPORTING DOCUMENTS
	attachmentType: Yup.string().required('Attachment Type is required'),
	documentDescription: Yup.string().required('Document Description is required'),
	uploadedFileName: Yup.string().required('Uploaded File Name is required'),
	uploadedDate: Yup.string().required('Uploaded Date is required'),

	// SECTION 4 – APPROVAL / AUTHORIZATION
	disciplinaryActionReferenceNumber: Yup.string().required('Disciplinary Action Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	finalDisciplinaryDecision: Yup.string().required('Final Disciplinary Decision is required'),
	approvalComments: Yup.string().required('Approval Comments are required'),
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
	designation: '',
	businessUnitLocation: '',
	reportingManagerName: '',
	typeOfMisconduct: '',
	incidentDates: '',
	incidentDescription: '',
	immediateActionTaken: '',

	// SECTION 2
	investigationRequired: '',
	investigationSummary: '',
	employeeExplanationReceived: '',
	recommendedDisciplinaryAction: '',
	proposedEffectiveDateOfAction: '',
	hrIrRemarks: '',

	// SECTION 3
	attachmentType: '',
	documentDescription: '',
	uploadedFileName: '',
	uploadedDate: '',

	// SECTION 4
	disciplinaryActionReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	finalDisciplinaryDecision: '',
	approvalComments: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const DisciplinaryActionRequestApproval = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-DISCIPLINARY-ACTION"
			title="Disciplinary Action — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Disciplinary Action form submitted:', values);
					alert('✅ Disciplinary Action form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-DISCIPLINARY-ACTION"
							title="Disciplinary Action — Request & Approval"
							department="HR & People Ops"
						>
							{/* SECTION 1 – REQUEST / INITIATION */}
							<div className="form-section">
								<h3 className="form-section-title">
									📋 Section 1 — Request / Initiation
								</h3>

								<div className="form-fields">
									{[
										{ name: 'requesterName', label: 'Requester Name' },
										{ name: 'department', label: 'Department' },
										{ name: 'employeeName', label: 'Employee Name' },
										{ name: 'employeeId', label: 'Employee ID' },
										{ name: 'designation', label: 'Designation' },
										{ name: 'businessUnitLocation', label: 'Business Unit / Location' },
										{ name: 'reportingManagerName', label: 'Reporting Manager Name' }
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

									<div className="form-field full-width">
										<label className="form-label required">
											Type of Misconduct / Policy Violation
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.typeOfMisconduct || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="typeOfMisconduct"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="typeOfMisconduct" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Date(s) of Incident
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.incidentDates || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="incidentDates"
													className="form-input"
													placeholder="e.g. 10 Jan 2026, 12 Jan 2026"
												/>
												<ErrorMessage name="incidentDates" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Brief Description of Incident
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.incidentDescription || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="incidentDescription"
													as="textarea"
													className="form-textarea"
													rows="3"
												/>
												<ErrorMessage name="incidentDescription" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Immediate Action Taken (if any)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.immediateActionTaken || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="immediateActionTaken"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="immediateActionTaken" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – DISCIPLINARY ACTION DETAILS */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Disciplinary Action Details
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">
											Investigation Required
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.investigationRequired || '___________________'}
											</div>
										) : (
											<>
												<Field name="investigationRequired" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="investigationRequired" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Investigation Summary
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.investigationSummary || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="investigationSummary"
													as="textarea"
													className="form-textarea"
													rows="3"
												/>
												<ErrorMessage name="investigationSummary" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Employee Explanation Received
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.employeeExplanationReceived || '___________________'}
											</div>
										) : (
											<>
												<Field name="employeeExplanationReceived" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="employeeExplanationReceived" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Recommended Disciplinary Action
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.recommendedDisciplinaryAction || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="recommendedDisciplinaryAction"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="recommendedDisciplinaryAction" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Proposed Effective Date of Action
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedEffectiveDateOfAction || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="proposedEffectiveDateOfAction"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="proposedEffectiveDateOfAction" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Remarks by HR / IR Team
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hrIrRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="hrIrRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="hrIrRemarks" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 3 – SUPPORTING DOCUMENTS */}
							<div className="form-section">
								<h3 className="form-section-title">
									📎 Section 3 — Supporting Documents
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">
											Attachment Type
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.attachmentType || '___________________'}
											</div>
										) : (
											<>
												<Field name="attachmentType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Warning Letter">Warning Letter</option>
													<option value="Complaint">Complaint</option>
													<option value="Evidence">Evidence</option>
													<option value="Report">Report</option>
													<option value="Others">Others</option>
												</Field>
												<ErrorMessage name="attachmentType" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Document Description
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.documentDescription || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="documentDescription"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="documentDescription" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Uploaded File Name
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.uploadedFileName || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="uploadedFileName"
													className="form-input"
													placeholder="Displayed after upload"
												/>
												<ErrorMessage name="uploadedFileName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Uploaded Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.uploadedDate || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="uploadedDate"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="uploadedDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 4 – APPROVAL / AUTHORIZATION */}
							<div className="form-section">
								<h3 className="form-section-title">
									✅ Section 4 — Approval / Authorization
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">
											Disciplinary Action Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.disciplinaryActionReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="disciplinaryActionReferenceNumber" className="form-input" />
												<ErrorMessage name="disciplinaryActionReferenceNumber" component="div" className="form-error" />
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
											Final Disciplinary Decision
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.finalDisciplinaryDecision || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="finalDisciplinaryDecision"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="finalDisciplinaryDecision" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Approval Comments
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
													rows="2"
												/>
												<ErrorMessage name="approvalComments" component="div" className="form-error" />
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
												<Field
													name="approvalDate"
													type="date"
													className="form-input"
												/>
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

export default DisciplinaryActionRequestApproval;
