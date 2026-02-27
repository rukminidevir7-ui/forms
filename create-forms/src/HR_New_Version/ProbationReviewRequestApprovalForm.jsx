// ProbationReviewRequestApprovalForm.jsx

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
	probationStartDate: Yup.string().required('Probation Start Date is required'),
	probationEndDate: Yup.string().required('Probation End Date is required'),
	reviewPeriod: Yup.string().required('Review Period is required'),
	reportingManagerName: Yup.string().required('Reporting Manager Name is required'),

	// SECTION 2 – PROBATION REVIEW DETAILS (BASIC)
	performanceSummary: Yup.string().required('Performance summary is required'),
	attendanceDisciplineRecord: Yup.string().required('Attendance / Discipline record is required'),
	skillCompetencyAssessment: Yup.string().required('Skill & competency assessment is required'),
	behaviourCultureFitAssessment: Yup.string().required('Behaviour / culture fit assessment is required'),
	overallReviewerRecommendation: Yup.string().required('Overall reviewer recommendation is required'),
	proposedNewEndDate: Yup.string().required('Proposed new end date is required'),
	reviewerRemarks: Yup.string().required('Reviewer remarks are required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	probationReviewReferenceNumber: Yup.string().required('Probation Review Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	finalDecision: Yup.string().required('Final decision is required'),
	approvalComments: Yup.string().required('Approval decision / comments are required'),
	effectiveDecisionDate: Yup.string().required('Effective date of decision is required'),
	approvalDate: Yup.string().required('Approval date is required'),

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
	probationStartDate: '',
	probationEndDate: '',
	reviewPeriod: '',
	reportingManagerName: '',

	// SECTION 2
	performanceSummary: '',
	attendanceDisciplineRecord: '',
	skillCompetencyAssessment: '',
	behaviourCultureFitAssessment: '',
	overallReviewerRecommendation: '',
	proposedNewEndDate: '',
	reviewerRemarks: '',

	// SECTION 3
	probationReviewReferenceNumber: '',
	approvingAuthorityName: '',
	finalDecision: '',
	approvalComments: '',
	effectiveDecisionDate: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const ProbationReviewRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-PROBATION-REVIEW"
			title="Probation Review — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Probation Review form submitted:', values);
					alert('✅ Probation Review form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-PROBATION-REVIEW"
							title="Probation Review — Request & Approval"
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
											Probation Start Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.probationStartDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="probationStartDate" type="date" className="form-input" />
												<ErrorMessage name="probationStartDate" component="div" className="form-error" />
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
											Review Period
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reviewPeriod || '___________________'}
											</div>
										) : (
											<>
												<Field name="reviewPeriod" className="form-input" placeholder="e.g., Jan 2025 – Mar 2025" />
												<ErrorMessage name="reviewPeriod" component="div" className="form-error" />
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

							{/* SECTION 2 – PROBATION REVIEW DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Probation Review Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field full-width">
										<label className="form-label required">
											Performance During Probation (Summary)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.performanceSummary || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="performanceSummary"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="performanceSummary" component="div" className="form-error" />
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

									<div className="form-field full-width">
										<label className="form-label required">
											Skill & Competency Assessment
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.skillCompetencyAssessment || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="skillCompetencyAssessment"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="skillCompetencyAssessment" component="div" className="form-error" />
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

									<div className="form-field">
										<label className="form-label required">
											Overall Reviewer Recommendation
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.overallReviewerRecommendation || '___________________'}
											</div>
										) : (
											<>
												<Field name="overallReviewerRecommendation" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Confirm">Confirm</option>
													<option value="Extend">Extend</option>
													<option value="Terminate">Terminate</option>
												</Field>
												<ErrorMessage name="overallReviewerRecommendation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											If Extension – Proposed New End Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedNewEndDate || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="proposedNewEndDate"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="proposedNewEndDate" component="div" className="form-error" />
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
											Probation Review Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.probationReviewReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="probationReviewReferenceNumber" className="form-input" />
												<ErrorMessage name="probationReviewReferenceNumber" component="div" className="form-error" />
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
													<option value="Terminated">Terminated</option>
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

export default ProbationReviewRequestApprovalForm;
