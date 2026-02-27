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
	// REQUEST SECTION
	requesterName: Yup.string().required('Requester Name is required'),
	department: Yup.string().required('Department is required'),
	positionJobTitle: Yup.string().required('Position / Job Title is required'),
	candidateName: Yup.string().required('Candidate Name is required'),
	candidateContactEmail: Yup.string().required('Candidate Contact Number / Email is required').email('Invalid email format'),
	purposeOfConsent: Yup.string().required('Purpose of Consent is required'),
	typeOfDataCollected: Yup.string().required('Type of Data to be Collected is required'),
	validityPeriod: Yup.string().required('Validity Period of Consent is required'),
	consentDeclaration: Yup.string().required('Consent Declaration is required'),
	candidateSignatureName: Yup.string().required('Candidate Signature Name is required'),
	candidateConsentDate: Yup.string().required('Candidate Consent Date is required'),

	// APPROVAL SECTION
	consentReferenceNumber: Yup.string().required('Consent Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments is required'),
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
	// REQUEST SECTION
	requesterName: '',
	department: '',
	positionJobTitle: '',
	candidateName: '',
	candidateContactEmail: '',
	purposeOfConsent: '',
	typeOfDataCollected: '',
	validityPeriod: '',
	consentDeclaration: '',
	candidateSignatureName: '',
	candidateConsentDate: '',

	// APPROVAL SECTION
	consentReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvalComments: '',
	approvalDate: '',

	// Custom fields
	customFields: [],

	// Signatures
	signatures: []
};

const CandidateConsentRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper formId="FRM-SPECIAL-CONSENT" title="Candidate Consent — Request & Approval">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Candidate Consent form submitted:', values);
					alert('✅ Candidate Consent form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template formId="FRM-SPECIAL-CONSENT" title="Candidate Consent — Request & Approval" department="HR & People Ops">
							{/* Section 1 - Request / Initiation Details */}
							<div className="form-section">
								<h3 className="form-section-title">📋 Section 1 — Request / Initiation Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Requester Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.requesterName || '___________________'}</div>
										) : (
											<>
												<Field name="requesterName" className="form-input" placeholder="Enter requester name" />
												<ErrorMessage name="requesterName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Department</label>
										{isPrintMode ? (
											<div className="print-value">{values.department || '___________________'}</div>
										) : (
											<>
												<Field name="department" className="form-input" placeholder="e.g., HR, IT, Finance" />
												<ErrorMessage name="department" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Position / Job Title</label>
										{isPrintMode ? (
											<div className="print-value">{values.positionJobTitle || '___________________'}</div>
										) : (
											<>
												<Field name="positionJobTitle" className="form-input" placeholder="e.g., HR Manager, Recruiter" />
												<ErrorMessage name="positionJobTitle" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Candidate Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.candidateName || '___________________'}</div>
										) : (
											<>
												<Field name="candidateName" className="form-input" placeholder="Enter candidate full name" />
												<ErrorMessage name="candidateName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Candidate Contact Number / Email</label>
										{isPrintMode ? (
											<div className="print-value">{values.candidateContactEmail || '___________________'}</div>
										) : (
											<>
												<Field name="candidateContactEmail" className="form-input" placeholder="e.g., candidate@example.com or +91 98765 43210" />
												<ErrorMessage name="candidateContactEmail" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Purpose of Consent</label>
										{isPrintMode ? (
											<div className="print-value">{values.purposeOfConsent || '___________________'}</div>
										) : (
											<>
												<Field name="purposeOfConsent" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Recruitment">Recruitment</option>
													<option value="Background Verification">Background Verification</option>
													<option value="Reference Check">Reference Check</option>
													<option value="Data Processing">Data Processing</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="purposeOfConsent" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Type of Data to be Collected</label>
										{isPrintMode ? (
											<div className="print-value">{values.typeOfDataCollected || '___________________'}</div>
										) : (
											<>
												<Field name="typeOfDataCollected" as="textarea" className="form-textarea" rows="2" placeholder="e.g., Personal details, Educational background, Work experience, etc." />
												<ErrorMessage name="typeOfDataCollected" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Validity Period of Consent</label>
										{isPrintMode ? (
											<div className="print-value">{values.validityPeriod || '___________________'}</div>
										) : (
											<>
												<Field name="validityPeriod" className="form-input" placeholder="e.g., 1 year, 6 months, 3 years" />
												<ErrorMessage name="validityPeriod" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Consent Declaration</label>
										{isPrintMode ? (
											<div className="print-value">{values.consentDeclaration || '___________________'}</div>
										) : (
											<>
												<Field name="consentDeclaration" as="textarea" className="form-textarea" rows="3" placeholder="Candidate agrees to share personal & professional information as per the purpose mentioned above." />
												<ErrorMessage name="consentDeclaration" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Candidate Signature Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.candidateSignatureName || '___________________'}</div>
										) : (
											<>
												<Field name="candidateSignatureName" className="form-input" placeholder="Enter candidate's signature name" />
												<ErrorMessage name="candidateSignatureName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Candidate Consent Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.candidateConsentDate || '___________________'}</div>
										) : (
											<>
												<Field name="candidateConsentDate" type="date" className="form-input" />
												<ErrorMessage name="candidateConsentDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Section 2 - Approval / Authorization Details */}
							<div className="form-section">
								<h3 className="form-section-title">✅ Section 2 — Approval / Authorization Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Consent Reference Number</label>
										{isPrintMode ? (
											<div className="print-value">{values.consentReferenceNumber || '___________________'}</div>
										) : (
											<>
												<Field name="consentReferenceNumber" className="form-input" placeholder="e.g., CON-2026-001" />
												<ErrorMessage name="consentReferenceNumber" component="div" className="form-error" />
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
										<label className="form-label required">Approval Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalStatus || '___________________'}</div>
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
										<label className="form-label required">Approval Decision / Comments</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalComments || '___________________'}</div>
										) : (
											<>
												<Field name="approvalComments" as="textarea" className="form-textarea" rows="3" placeholder="Enter approval decision and any additional comments" />
												<ErrorMessage name="approvalComments" component="div" className="form-error" />
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

							{/* Section 3 - Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Section 3 — Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(arrayHelpers) => (
											<div>
												{(values.customFields || []).length > 0 && (
													<div className="custom-fields-list">
														{(values.customFields || []).map((f, idx) => (
															<div key={f.id || idx} className="custom-field-row">
																<div className="form-field">
																	<Field name={`customFields.${idx}.fieldName`} className="form-input" placeholder="Field Name" />
																	<ErrorMessage name={`customFields.${idx}.fieldName`} component="div" className="form-error" />
																</div>
																<div className="form-field" style={{ flex: 2 }}>
																	<Field name={`customFields.${idx}.fieldValue`} className="form-input" placeholder="Field Value" />
																	<ErrorMessage name={`customFields.${idx}.fieldValue`} component="div" className="form-error" />
																</div>
																<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>Remove</button>
															</div>
														))}
													</div>
												)}
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
												{(values.signatures || []).length > 0 && (
													<div className="signatures-list">
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
													</div>
												)}

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

export default CandidateConsentRequestApprovalForm;
