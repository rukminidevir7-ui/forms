// ConfirmationRequestApproval.jsx

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
	dateOfJoining: Yup.string().required('Date of Joining is required'),
	probationEndDate: Yup.string().required('Probation End Date is required'),
	reportingManagerName: Yup.string().required('Reporting Manager Name is required'),
	confirmationEffectiveDate: Yup.string().required('Confirmation Effective Date is required'),

	// SECTION 2 – CONFIRMATION DETAILS (BASIC)
	probationReviewOutcomeSummary: Yup.string().required('Probation Review Outcome Summary is required'),
	performanceAssessmentSummary: Yup.string().required('Performance Assessment Summary is required'),
	behaviourCultureFitAssessment: Yup.string().required('Behaviour / Culture Fit Assessment is required'),
	attendanceDisciplineRecord: Yup.string().required('Attendance / Discipline Record is required'),
	reviewerRecommendation: Yup.string().required('Reviewer Recommendation is required'),
	proposedNewProbationEndDate: Yup.string().required('Proposed New Probation End Date is required'),
	reviewerRemarks: Yup.string().required('Reviewer Remarks are required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	employeeConfirmationReferenceNumber: Yup.string().required('Employee Confirmation Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	finalDecision: Yup.string().required('Final Decision is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments are required'),
	effectiveDecisionDate: Yup.string().required('Effective Date of Decision is required'),
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
	dateOfJoining: '',
	probationEndDate: '',
	reportingManagerName: '',
	confirmationEffectiveDate: '',

	// SECTION 2
	probationReviewOutcomeSummary: '',
	performanceAssessmentSummary: '',
	behaviourCultureFitAssessment: '',
	attendanceDisciplineRecord: '',
	reviewerRecommendation: '',
	proposedNewProbationEndDate: '',
	reviewerRemarks: '',

	// SECTION 3
	employeeConfirmationReferenceNumber: '',
	approvingAuthorityName: '',
	finalDecision: '',
	approvalComments: '',
	effectiveDecisionDate: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const ConfirmationRequestApproval = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-EMPLOYEE-CONFIRMATION"
			title="Employee Confirmation — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Employee Confirmation form submitted:', values);
					alert('✅ Employee Confirmation form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-EMPLOYEE-CONFIRMATION"
							title="Employee Confirmation — Request & Approval"
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
											Date of Joining
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.dateOfJoining || '___________________'}
											</div>
										) : (
											<>
												<Field name="dateOfJoining" type="date" className="form-input" />
												<ErrorMessage name="dateOfJoining" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Probation End Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.probationEndDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="probationEndDate" type="date" className="form-input" />
												<ErrorMessage name="probationEndDate" component="div" className="form-error" />
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

									<div className="form-field">
										<label className="form-label required">
											Confirmation Effective Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.confirmationEffectiveDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="confirmationEffectiveDate" type="date" className="form-input" />
												<ErrorMessage name="confirmationEffectiveDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – CONFIRMATION DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Confirmation Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field full-width">
										<label className="form-label required">
											Probation Review Outcome Summary
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.probationReviewOutcomeSummary || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="probationReviewOutcomeSummary"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="probationReviewOutcomeSummary" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Performance Assessment Summary
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.performanceAssessmentSummary || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="performanceAssessmentSummary"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="performanceAssessmentSummary" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Behaviour / Culture Fit Assessment
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.behaviourCultureFitAssessment || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="behaviourCultureFitAssessment"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="behaviourCultureFitAssessment" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Attendance / Discipline Record
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.attendanceDisciplineRecord || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="attendanceDisciplineRecord"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="attendanceDisciplineRecord" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Reviewer Recommendation
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reviewerRecommendation || '___________________'}
											</div>
										) : (
											<>
												<Field name="reviewerRecommendation" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Confirm">Confirm</option>
													<option value="Extend">Extend</option>
												</Field>
												<ErrorMessage name="reviewerRecommendation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											If Extension – Proposed New Probation End Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedNewProbationEndDate || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="proposedNewProbationEndDate"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="proposedNewProbationEndDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Reviewer Remarks
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reviewerRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="reviewerRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="reviewerRemarks" component="div" className="form-error" />
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
											Employee Confirmation Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.employeeConfirmationReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="employeeConfirmationReferenceNumber" className="form-input" />
												<ErrorMessage name="employeeConfirmationReferenceNumber" component="div" className="form-error" />
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
											Final Decision
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.finalDecision || '___________________'}
											</div>
										) : (
											<>
												<Field name="finalDecision" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Confirmed">Confirmed</option>
													<option value="Extended">Extended</option>
												</Field>
												<ErrorMessage name="finalDecision" component="div" className="form-error" />
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
											Effective Date of Decision
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.effectiveDecisionDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="effectiveDecisionDate" type="date" className="form-input" />
												<ErrorMessage name="effectiveDecisionDate" component="div" className="form-error" />
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

export default ConfirmationRequestApproval;
