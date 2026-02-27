// CandidateRejectionCommunicationRequestApprovalForm.jsx

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
	positionJobTitle: Yup.string().required('Position / Job Title is required'),
	requisitionReferenceNumber: Yup.string().required('Requisition / Hiring Reference Number is required'),
	candidateName: Yup.string().required('Candidate Name is required'),
	candidateContactDetails: Yup.string().required('Candidate Email / Contact Number is required'),
	hiringStage: Yup.string().required('Stage of Hiring Process is required'),
	rejectionReasonInternal: Yup.string().required('Reason for Rejection is required'),
	proposedCommunicationSummary: Yup.string().required('Proposed Rejection Communication Summary is required'),
	communicationChannel: Yup.string().required('Communication Channel is required'),
	proposedCommunicationDate: Yup.string().required('Proposed Communication Date is required'),

	// SECTION 2 – COMMUNICATION DETAILS (BASIC)
	isStandardCommunication: Yup.string().required('This field is required'),
	legalComplianceReviewRequired: Yup.string().required('This field is required'),
	sensitiveContentInvolved: Yup.string().required('This field is required'),
	additionalInstructions: Yup.string().required('Additional instructions are required'),
	hrLeadRemarks: Yup.string().required('Remarks by HR / Talent Acquisition Lead are required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	communicationReferenceNumber: Yup.string().required('Communication Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvedCommunicationChannel: Yup.string().required('Approved Communication Channel is required'),
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
	positionJobTitle: '',
	requisitionReferenceNumber: '',
	candidateName: '',
	candidateContactDetails: '',
	hiringStage: '',
	rejectionReasonInternal: '',
	proposedCommunicationSummary: '',
	communicationChannel: '',
	proposedCommunicationDate: '',

	// SECTION 2
	isStandardCommunication: '',
	legalComplianceReviewRequired: '',
	sensitiveContentInvolved: '',
	additionalInstructions: '',
	hrLeadRemarks: '',

	// SECTION 3
	communicationReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvedCommunicationChannel: '',
	approvalComments: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const CandidateRejectionCommunicationRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-CANDIDATE-REJECTION-COMM"
			title="Candidate Rejection Communication — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Candidate Rejection Communication form submitted:', values);
					alert('✅ Candidate Rejection Communication form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-CANDIDATE-REJECTION-COMM"
							title="Candidate Rejection Communication — Request & Approval"
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
										{ name: 'positionJobTitle', label: 'Position / Job Title' },
										{ name: 'requisitionReferenceNumber', label: 'Requisition / Hiring Reference Number' },
										{ name: 'candidateName', label: 'Candidate Name' },
										{ name: 'candidateContactDetails', label: 'Candidate Email / Contact Number' },
										{ name: 'hiringStage', label: 'Stage of Hiring Process' }
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
											Reason for Rejection (Internal)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.rejectionReasonInternal || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="rejectionReasonInternal"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="rejectionReasonInternal" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Proposed Rejection Communication Template / Message Summary
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedCommunicationSummary || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="proposedCommunicationSummary"
													as="textarea"
													className="form-textarea"
													rows="3"
												/>
												<ErrorMessage name="proposedCommunicationSummary" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Communication Channel
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.communicationChannel || '___________________'}
											</div>
										) : (
											<>
												<Field name="communicationChannel" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Email">Email</option>
													<option value="Portal">Portal</option>
													<option value="Phone">Phone</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="communicationChannel" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Proposed Communication Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedCommunicationDate || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="proposedCommunicationDate"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="proposedCommunicationDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – COMMUNICATION DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Communication Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">
											Is this a standard rejection communication?
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.isStandardCommunication || '___________________'}
											</div>
										) : (
											<>
												<Field name="isStandardCommunication" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="isStandardCommunication" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Any legal / compliance review required?
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.legalComplianceReviewRequired || '___________________'}
											</div>
										) : (
											<>
												<Field name="legalComplianceReviewRequired" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="legalComplianceReviewRequired" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Sensitive content involved?
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.sensitiveContentInvolved || '___________________'}
											</div>
										) : (
											<>
												<Field name="sensitiveContentInvolved" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="sensitiveContentInvolved" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Additional instructions for recruiter / HR team
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.additionalInstructions || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="additionalInstructions"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="additionalInstructions" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Remarks by HR / Talent Acquisition Lead
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hrLeadRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="hrLeadRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="hrLeadRemarks" component="div" className="form-error" />
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
											Communication Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.communicationReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="communicationReferenceNumber" className="form-input" />
												<ErrorMessage name="communicationReferenceNumber" component="div" className="form-error" />
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

									<div className="form-field">
										<label className="form-label required">
											Approved Communication Channel
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvedCommunicationChannel || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="approvedCommunicationChannel"
													className="form-input"
												/>
												<ErrorMessage name="approvedCommunicationChannel" component="div" className="form-error" />
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

export default CandidateRejectionCommunicationRequestApprovalForm;
