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
	// Approval Section
	interviewRefNo: Yup.string().required('Interview Reference No. is required'),
	candidateName: Yup.string().required('Candidate Name is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	finalDecision: Yup.string().required('Final Decision is required'),
	decisionComments: Yup.string().required('Decision Comments are required'),
	nextAction: Yup.string().required('Next Action is required'),
	approvalDate: Yup.string().required('Approval Date is required'),

	// Record Section
	positionJobTitle: Yup.string().required('Position / Job Title is required'),
	interviewRoundsCompleted: Yup.string().required('Interview Rounds Completed is required'),
	overallRating: Yup.number().required('Overall Rating is required').min(1).max(5),
	recordFinalDecision: Yup.string().required('Final Decision is required'),
	approvedBy: Yup.string().required('Approved By is required'),
	decisionDate: Yup.string().required('Decision Date is required'),
	recruitmentStatus: Yup.string().required('Recruitment Status is required'),

	// Custom fields
	customFields: Yup.array().of(
		Yup.object({
			fieldName: Yup.string(),
			fieldValue: Yup.string()
		})
	),

	// Signatures
	signatures: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			signatureName: Yup.string().when('signatureData', {
				is: (val) => !!val,
				then: (schema) => schema.required('Signature Name is required'),
				otherwise: (schema) => schema
			}),
			signatureData: Yup.string(),
			signatureDate: Yup.string().when('signatureData', {
				is: (val) => !!val,
				then: (schema) => schema.required('Signature Date is required'),
				otherwise: (schema) => schema
			})
		})
	)
});

const initialValues = {
	interviewRefNo: '',
	candidateName: '',
	approvingAuthorityName: '',
	finalDecision: '',
	decisionComments: '',
	nextAction: '',
	approvalDate: '',

	positionJobTitle: '',
	interviewRoundsCompleted: '',
	overallRating: '',
	recordFinalDecision: '',
	approvedBy: '',
	decisionDate: '',
	recruitmentStatus: '',
	hrRemarks: '',

	customFields: [],
	signatures: []
};

const InterviewFeedbackRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper formId="FRM-SPECIAL-INTERVIEW-FEEDBACK" title="Interview Feedback — Request & Approval">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Interview Feedback form submitted:', values);
					alert('✅ Interview Feedback form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template formId="FRM-SPECIAL-INTERVIEW-FEEDBACK" title="Interview Feedback — Request & Approval" department="HR & People Ops">
							{/* Section 1 - Approval Information */}
							<div className="form-section">
								<h3 className="form-section-title">📋 Section 1 — Approval Information</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Interview Reference No.</label>
										{isPrintMode ? (
											<div className="print-value">{values.interviewRefNo || '___________________'}</div>
										) : (
											<>
												<Field name="interviewRefNo" className="form-input" placeholder="e.g., INT-2026-001" />
												<ErrorMessage name="interviewRefNo" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Candidate Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.candidateName || '___________________'}</div>
										) : (
											<>
												<Field name="candidateName" className="form-input" placeholder="Enter candidate name" />
												<ErrorMessage name="candidateName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approving Authority Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvingAuthorityName || '___________________'}</div>
										) : (
											<>
												<Field name="approvingAuthorityName" className="form-input" placeholder="Name of approving authority" />
												<ErrorMessage name="approvingAuthorityName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Final Decision</label>
										{isPrintMode ? (
											<div className="print-value">{values.finalDecision || '___________________'}</div>
										) : (
											<>
												<Field name="finalDecision" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Approved">Approved</option>
													<option value="Rejected">Rejected</option>
													<option value="On Hold">On Hold</option>
												</Field>
												<ErrorMessage name="finalDecision" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Decision Comments</label>
										{isPrintMode ? (
											<div className="print-value">{values.decisionComments || '___________________'}</div>
										) : (
											<>
												<Field name="decisionComments" as="textarea" className="form-textarea" rows="3" placeholder="Enter detailed feedback and comments" />
												<ErrorMessage name="decisionComments" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Next Action</label>
										{isPrintMode ? (
											<div className="print-value">{values.nextAction || '___________________'}</div>
										) : (
											<>
												<Field name="nextAction" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Offer">Offer</option>
													<option value="Next Round">Next Round</option>
													<option value="Reject">Reject</option>
												</Field>
												<ErrorMessage name="nextAction" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approval Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalDate || '___________________'}</div>
										) : (
											<>
												<Field name="approvalDate" type="date" className="form-input" />
												<ErrorMessage name="approvalDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Section 2 - Final Record */}
							<div className="form-section">
								<h3 className="form-section-title">✅ Section 2 — Final Record Information</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Position / Job Title</label>
										{isPrintMode ? (
											<div className="print-value">{values.positionJobTitle || '___________________'}</div>
										) : (
											<>
												<Field name="positionJobTitle" className="form-input" placeholder="e.g., Software Engineer, Project Manager" />
												<ErrorMessage name="positionJobTitle" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Interview Rounds Completed</label>
										{isPrintMode ? (
											<div className="print-value">{values.interviewRoundsCompleted || '___________________'}</div>
										) : (
											<>
												<Field name="interviewRoundsCompleted" className="form-input" placeholder="e.g., Round 1 + Round 2" />
												<ErrorMessage name="interviewRoundsCompleted" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Overall Rating (1–5)</label>
										{isPrintMode ? (
											<div className="print-value">{values.overallRating || '___________________'}</div>
										) : (
											<>
												<Field name="overallRating" type="number" min="1" max="5" className="form-input" placeholder="Rate 1-5" />
												<ErrorMessage name="overallRating" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Final Decision</label>
										{isPrintMode ? (
											<div className="print-value">{values.recordFinalDecision || '___________________'}</div>
										) : (
											<>
												<Field name="recordFinalDecision" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Offer Released">Offer Released</option>
													<option value="In Process">In Process</option>
													<option value="Closed">Closed</option>
												</Field>
												<ErrorMessage name="recordFinalDecision" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approved By</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvedBy || '___________________'}</div>
										) : (
											<>
												<Field name="approvedBy" className="form-input" placeholder="Name of approver" />
												<ErrorMessage name="approvedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Decision Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.decisionDate || '___________________'}</div>
										) : (
											<>
												<Field name="decisionDate" type="date" className="form-input" />
												<ErrorMessage name="decisionDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Recruitment Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.recruitmentStatus || '___________________'}</div>
										) : (
											<>
												<Field name="recruitmentStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Offer Released">Offer Released</option>
													<option value="In Process">In Process</option>
													<option value="Closed">Closed</option>
												</Field>
												<ErrorMessage name="recruitmentStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label">HR Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.hrRemarks || '___________________'}</div>
										) : (
											<Field name="hrRemarks" as="textarea" className="form-textarea" rows="2" placeholder="Any additional remarks" />
										)}
									</div>
								</div>
							</div>

							{/* Section 3 - Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Section 3 — Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(arrayHelpers) => (
											<div>
												{(values.customFields || []).map((f, idx) => (
													<div key={f.id || idx} className="custom-field-row">
														<div className="form-field">
															<Field name={`customFields.${idx}.fieldName`} className="form-input" placeholder="Field Name" />
														</div>
														<div className="form-field" style={{ flex: 2 }}>
															<Field name={`customFields.${idx}.fieldValue`} className="form-input" placeholder="Field Value" />
														</div>
														<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>Remove</button>
													</div>
												))}
												<button type="button" className="btn-add-field" onClick={() => arrayHelpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>+ Add Custom Field</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{isPrintMode && values.customFields && values.customFields.length > 0 && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Section 3 — Additional Custom Fields</h3>
									<div className="form-fields">
										{values.customFields.map((f, i) => (
											<div key={i} className="form-field full-width custom-field-print"><strong>{f.fieldName}:</strong> {f.fieldValue || '___________________'}</div>
										))}
									</div>
								</div>
							)}

							{/* Section 4 - Signatures */}
							<div className="form-section signatures-section">
								<h3 className="form-section-title">✍️ Section 4 — Digital Signatures</h3>

								{!isPrintMode && (
									<FieldArray name="signatures">
										{(arrayHelpers) => (
											<div>
												{(values.signatures || []).map((sig, idx) => (
													<div key={sig.id || idx} className="signature-row-container">
														<div className="signature-row">
															<div className="form-field">
																<label className="form-label required">Signature Name</label>
																<Field name={`signatures.${idx}.signatureName`} className="form-input" placeholder="e.g., Manager, Director, HOD" />
																<ErrorMessage name={`signatures.${idx}.signatureName`} component="div" className="form-error" />
															</div>

															<div className="form-field">
																<label className="form-label required">Date</label>
																<Field name={`signatures.${idx}.signatureDate`} type="date" className="form-input" />
																<ErrorMessage name={`signatures.${idx}.signatureDate`} component="div" className="form-error" />
															</div>

															<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>Remove Signature</button>
														</div>

														<div className="signature-pad-container">
															<label className="form-label">Signature Pad / Upload</label>
															<SignatureComponent
																name={`Signature ${idx + 1}`}
																onChange={(sig) => setFieldValue(`signatures.${idx}.signatureData`, sig.data || '')}
																value={sig}
															/>
														</div>
													</div>
												))}

												<button type="button" className="btn-add-signature" onClick={() => arrayHelpers.push({ id: uuidv4(), signatureName: '', signatureData: '', signatureDate: '' })}>+ Add Signature</button>
											</div>
										)}
									</FieldArray>
								)}

								{isPrintMode && values.signatures && values.signatures.length > 0 && (
									<div className="print-signatures">
										{values.signatures.map((sig, i) => (
											<div key={i} className="print-signature-box">
												<div className="sig-name">{sig.signatureName || `Signature ${i + 1}`}</div>
												<div className="sig-space">{sig.signatureData && <img src={sig.signatureData} alt={`sig-${i}`} className="print-sig-image" />}</div>
												<div className="sig-line"></div>
												<div className="sig-date">{sig.signatureDate && `Date: ${sig.signatureDate}`}</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Submit */}
							{!isPrintMode && (
								<div className="form-actions">
									<button type="submit" className="btn-submit">Save Form</button>
								</div>
							)}
						</ModernA4Template>
					</Form>
				)}
			</Formik>
		</ModernFormWrapper>
	);
};

export default InterviewFeedbackRequestApprovalForm;
