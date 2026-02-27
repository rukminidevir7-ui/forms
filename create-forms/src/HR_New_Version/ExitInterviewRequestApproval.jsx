// ExitInterviewRequestApproval.jsx

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
	designation: Yup.string().required('Designation is required'),
	businessUnitLocation: Yup.string().required('Business Unit / Location is required'),
	lastWorkingDate: Yup.string().required('Last Working Date is required'),
	reasonForExitAsPerEmployee: Yup.string().required('Reason for Exit (as per employee) is required'),
	reportingManagerName: Yup.string().required('Reporting Manager Name is required'),
	employeeContactDetails: Yup.string().required('Employee Contact Details are required'),
	proposedExitInterviewDate: Yup.string().required('Proposed Exit Interview Date is required'),

	// SECTION 2 – EXIT INTERVIEW DETAILS (BASIC)
	overallExperience: Yup.string().required('Overall Experience with Company is required'),
	reasonForLeavingSummary: Yup.string().required('Reason for Leaving (Summary) is required'),
	roleWorkSatisfactionFeedback: Yup.string().required('Role / Work Satisfaction Feedback is required'),
	managerTeamFeedback: Yup.string().required('Manager / Team Feedback is required'),
	workEnvironmentCultureFeedback: Yup.string().required('Work Environment / Culture Feedback is required'),
	compensationBenefitsFeedback: Yup.string().required('Compensation / Benefits Feedback is required'),
	considerRejoining: Yup.string().required('Rejoining decision is required'),
	improvementSuggestions: Yup.string().required('Improvement Suggestions are required'),
	hrInterviewerRemarks: Yup.string().required('Remarks by HR / Interviewer are required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	exitInterviewReferenceNumber: Yup.string().required('Exit Interview Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments are required'),
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
	lastWorkingDate: '',
	reasonForExitAsPerEmployee: '',
	reportingManagerName: '',
	employeeContactDetails: '',
	proposedExitInterviewDate: '',

	// SECTION 2
	overallExperience: '',
	reasonForLeavingSummary: '',
	roleWorkSatisfactionFeedback: '',
	managerTeamFeedback: '',
	workEnvironmentCultureFeedback: '',
	compensationBenefitsFeedback: '',
	considerRejoining: '',
	improvementSuggestions: '',
	hrInterviewerRemarks: '',

	// SECTION 3
	exitInterviewReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvalComments: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const ExitInterviewRequestApproval = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-EXIT-INTERVIEW"
			title="Exit Interview — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Exit Interview form submitted:', values);
					alert('✅ Exit Interview form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-EXIT-INTERVIEW"
							title="Exit Interview — Request & Approval"
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
										{ name: 'designation', label: 'Designation' },
										{ name: 'businessUnitLocation', label: 'Business Unit / Location' }
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
											Last Working Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.lastWorkingDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="lastWorkingDate" type="date" className="form-input" />
												<ErrorMessage name="lastWorkingDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Reason for Exit (as per employee)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reasonForExitAsPerEmployee || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="reasonForExitAsPerEmployee"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="reasonForExitAsPerEmployee" component="div" className="form-error" />
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

									<div className="form-field full-width">
										<label className="form-label required">
											Employee Contact Details (Email / Mobile)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.employeeContactDetails || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="employeeContactDetails"
													className="form-input"
												/>
												<ErrorMessage name="employeeContactDetails" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Proposed Exit Interview Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedExitInterviewDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="proposedExitInterviewDate" type="date" className="form-input" />
												<ErrorMessage name="proposedExitInterviewDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – EXIT INTERVIEW DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Exit Interview Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field full-width">
										<label className="form-label required">
											Overall Experience with Company
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.overallExperience || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="overallExperience"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="overallExperience" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Reason for Leaving (Summary)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reasonForLeavingSummary || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="reasonForLeavingSummary"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="reasonForLeavingSummary" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Role / Work Satisfaction Feedback
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.roleWorkSatisfactionFeedback || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="roleWorkSatisfactionFeedback"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="roleWorkSatisfactionFeedback" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Manager / Team Feedback
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.managerTeamFeedback || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="managerTeamFeedback"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="managerTeamFeedback" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Work Environment / Culture Feedback
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.workEnvironmentCultureFeedback || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="workEnvironmentCultureFeedback"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="workEnvironmentCultureFeedback" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Compensation / Benefits Feedback
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.compensationBenefitsFeedback || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="compensationBenefitsFeedback"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="compensationBenefitsFeedback" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Would the employee consider rejoining in future?
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.considerRejoining || '___________________'}
											</div>
										) : (
											<>
												<Field name="considerRejoining" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="considerRejoining" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Any Improvement Suggestions
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.improvementSuggestions || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="improvementSuggestions"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="improvementSuggestions" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Remarks by HR / Interviewer
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hrInterviewerRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="hrInterviewerRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="hrInterviewerRemarks" component="div" className="form-error" />
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
											Exit Interview Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.exitInterviewReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="exitInterviewReferenceNumber" className="form-input" />
												<ErrorMessage name="exitInterviewReferenceNumber" component="div" className="form-error" />
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

export default ExitInterviewRequestApproval;
