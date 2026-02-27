// UsageDataValidationRequestApprovalForm.jsx

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

	// Client & Project Context
	clientName: Yup.string().required('Client Name is required'),
	clientCode: Yup.string().required('Client Code / ID is required'),
	projectContractName: Yup.string().required('Project / Contract Name is required'),
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),

	// Usage Batch / Source Reference
	usageCaptureBatchReferenceId: Yup.string().required('Usage Capture Batch / Reference ID is required'),
	usagePeriod: Yup.string().required('Usage Period is required'),
	usageSourceSystemName: Yup.string().required('Usage Source / System Name is required'),

	// Validation Scope
	validationType: Yup.string().required('Validation Type is required'),
	validationMethod: Yup.string().required('Validation Method is required'),

	// Validation Checks
	sourceDataCompletenessVerified: Yup.string().required('Required'),
	duplicateOverlapCheckCompleted: Yup.string().required('Required'),
	quantityUnitConsistencyVerified: Yup.string().required('Required'),
	ratePlanMappingVerified: Yup.string().required('Required'),
	exceptionAnomalyIdentified: Yup.string().required('Required'),

	// Validation Result & Corrections
	validationResult: Yup.string().required('Validation Result is required'),
	correctionReworkRequired: Yup.string().required('Correction / Rework Required is required'),
	summaryOfIssuesFindings: Yup.string().required('Summary of Issues / Findings is required'),

	// Supporting Documents
	attachmentRequired: Yup.string().required('Attachment Required is required'),
	attachmentType: Yup.string().required('Attachment Type is required'),
	attachmentUploaded: Yup.string().required('Attachment Uploaded is required'),
	attachmentReferenceFileName: Yup.string().required('Attachment Reference / File Name is required'),

	// Request / Validation Submission
	validatedSubmittedBy: Yup.string().required('Validated / Submitted By is required'),
	submissionDate: Yup.string().required('Submission Date is required'),
	readyForBilling: Yup.string().required('Ready for Billing is required'),

	// Approval / Authorization
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvedBy: Yup.string().required('Approved By is required'),
	approvalDate: Yup.string().required('Approval Date is required'),
	approvalRemarksConditions: Yup.string().required('Approval Remarks / Conditions are required'),

	// Operational Control
	recordStatus: Yup.string().required('Record Status is required'),
	createdBy: Yup.string().required('Created By is required'),
	createdDate: Yup.string().required('Created Date is required'),
	lastUpdatedBy: Yup.string().required('Last Updated By is required'),
	lastUpdatedDate: Yup.string().required('Last Updated Date is required'),

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

	clientName: '',
	clientCode: '',
	projectContractName: '',
	billingEntityLocation: '',

	usageCaptureBatchReferenceId: '',
	usagePeriod: '',
	usageSourceSystemName: '',

	validationType: '',
	validationMethod: '',

	sourceDataCompletenessVerified: '',
	duplicateOverlapCheckCompleted: '',
	quantityUnitConsistencyVerified: '',
	ratePlanMappingVerified: '',
	exceptionAnomalyIdentified: '',

	validationResult: '',
	correctionReworkRequired: '',
	summaryOfIssuesFindings: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	validatedSubmittedBy: '',
	submissionDate: '',
	readyForBilling: '',

	approvalStatus: '',
	approvedBy: '',
	approvalDate: '',
	approvalRemarksConditions: '',

	recordStatus: '',
	createdBy: '',
	createdDate: '',
	lastUpdatedBy: '',
	lastUpdatedDate: '',

	customFields: [],
	signatures: []
};

const UsageDataValidationRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-02537-02538"
			title="Usage Data Validation"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Usage data validation submitted:', values);
					alert('Usage data validation saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02537-02538"
							title="Usage Data Validation – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Client & Project Context */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Project Context</h3>
								<div className="form-fields">
									{[
										['clientName', 'Client Name'],
										['clientCode', 'Client Code / ID'],
										['projectContractName', 'Project / Contract Name'],
										['billingEntityLocation', 'Billing Entity / Location']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} className="form-input" />
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Usage Batch / Source Reference */}
							<div className="form-section">
								<h3 className="form-section-title">Usage Batch / Source Reference</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Usage Capture Batch / Reference ID</label>
										{isPrintMode ? (
											<div className="print-value">{values.usageCaptureBatchReferenceId || '___________________'}</div>
										) : (
											<Field name="usageCaptureBatchReferenceId" className="form-input" />
										)}
										<ErrorMessage name="usageCaptureBatchReferenceId" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Usage Period (From – To)</label>
										{isPrintMode ? (
											<div className="print-value">{values.usagePeriod || '___________________'}</div>
										) : (
											<Field name="usagePeriod" className="form-input" placeholder="From – To" />
										)}
										<ErrorMessage name="usagePeriod" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Usage Source / System Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.usageSourceSystemName || '___________________'}</div>
										) : (
											<Field name="usageSourceSystemName" className="form-input" />
										)}
										<ErrorMessage name="usageSourceSystemName" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Validation Scope */}
							<div className="form-section">
								<h3 className="form-section-title">Validation Scope</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Validation Type</label>
										{isPrintMode ? (
											<div className="print-value">{values.validationType || '___________________'}</div>
										) : (
											<Field name="validationType" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Full">Full</option>
												<option value="Sample">Sample</option>
												<option value="Exception Only">Exception Only</option>
											</Field>
										)}
										<ErrorMessage name="validationType" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Validation Method</label>
										{isPrintMode ? (
											<div className="print-value">{values.validationMethod || '___________________'}</div>
										) : (
											<Field name="validationMethod" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="System">System</option>
												<option value="Manual">Manual</option>
												<option value="Reconciliation">Reconciliation</option>
											</Field>
										)}
										<ErrorMessage name="validationMethod" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Validation Checks */}
							<div className="form-section">
								<h3 className="form-section-title">Validation Checks</h3>
								<div className="form-fields">

									{[
										['sourceDataCompletenessVerified', 'Source data completeness verified'],
										['duplicateOverlapCheckCompleted', 'Duplicate / overlap check completed'],
										['quantityUnitConsistencyVerified', 'Quantity / unit consistency verified'],
										['ratePlanMappingVerified', 'Rate / plan mapping verified'],
										['exceptionAnomalyIdentified', 'Exception / anomaly identified']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}

								</div>
							</div>

							{/* Validation Result & Corrections */}
							<div className="form-section">
								<h3 className="form-section-title">Validation Result & Corrections</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Validation Result</label>
										{isPrintMode ? (
											<div className="print-value">{values.validationResult || '___________________'}</div>
										) : (
											<Field name="validationResult" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Pass">Pass</option>
												<option value="Fail">Fail</option>
												<option value="Conditional">Conditional</option>
											</Field>
										)}
										<ErrorMessage name="validationResult" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Correction / Rework Required</label>
										{isPrintMode ? (
											<div className="print-value">{values.correctionReworkRequired || '___________________'}</div>
										) : (
											<Field name="correctionReworkRequired" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="correctionReworkRequired" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Summary of Issues / Findings</label>
										{isPrintMode ? (
											<div className="print-value">{values.summaryOfIssuesFindings || '___________________'}</div>
										) : (
											<Field name="summaryOfIssuesFindings" as="textarea" className="form-textarea" rows="2" />
										)}
										<ErrorMessage name="summaryOfIssuesFindings" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Supporting Documents */}
							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents / Evidence</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Attachment Required</label>
										{isPrintMode ? (
											<div className="print-value">{values.attachmentRequired || '___________________'}</div>
										) : (
											<Field name="attachmentRequired" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="attachmentRequired" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Attachment Type</label>
										{isPrintMode ? (
											<div className="print-value">{values.attachmentType || '___________________'}</div>
										) : (
											<Field name="attachmentType" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="System report">System report</option>
												<option value="Reconciliation">Reconciliation</option>
												<option value="Other">Other</option>
											</Field>
										)}
										<ErrorMessage name="attachmentType" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Attachment Uploaded</label>
										{isPrintMode ? (
											<div className="print-value">{values.attachmentUploaded || '___________________'}</div>
										) : (
											<Field name="attachmentUploaded" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="attachmentUploaded" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Attachment Reference / File Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.attachmentReferenceFileName || '___________________'}</div>
										) : (
											<Field name="attachmentReferenceFileName" className="form-input" />
										)}
										<ErrorMessage name="attachmentReferenceFileName" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Request / Validation Submission */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Validation Submission</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Validated / Submitted By</label>
										{isPrintMode ? (
											<div className="print-value">{values.validatedSubmittedBy || '___________________'}</div>
										) : (
											<Field name="validatedSubmittedBy" className="form-input" />
										)}
										<ErrorMessage name="validatedSubmittedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Submission Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.submissionDate || '___________________'}</div>
										) : (
											<Field name="submissionDate" type="date" className="form-input" />
										)}
										<ErrorMessage name="submissionDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Ready for Billing</label>
										{isPrintMode ? (
											<div className="print-value">{values.readyForBilling || '___________________'}</div>
										) : (
											<Field name="readyForBilling" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="readyForBilling" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Approval / Authorization */}
							<div className="form-section">
								<h3 className="form-section-title">Approval / Authorization</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Approval Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalStatus || '___________________'}</div>
										) : (
											<Field name="approvalStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Approved">Approved</option>
												<option value="Rejected">Rejected</option>
											</Field>
										)}
										<ErrorMessage name="approvalStatus" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Approved By</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvedBy || '___________________'}</div>
										) : (
											<Field name="approvedBy" className="form-input" />
										)}
										<ErrorMessage name="approvedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Approval Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalDate || '___________________'}</div>
										) : (
											<Field name="approvalDate" type="date" className="form-input" />
										)}
										<ErrorMessage name="approvalDate" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Approval Remarks / Conditions</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalRemarksConditions || '___________________'}</div>
										) : (
											<Field name="approvalRemarksConditions" as="textarea" className="form-textarea" rows="2" />
										)}
										<ErrorMessage name="approvalRemarksConditions" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Operational Control */}
							<div className="form-section">
								<h3 className="form-section-title">Operational Control</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Record Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.recordStatus || '___________________'}</div>
										) : (
											<Field name="recordStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Open">Open</option>
												<option value="Approved">Approved</option>
												<option value="Rejected">Rejected</option>
												<option value="Closed">Closed</option>
											</Field>
										)}
										<ErrorMessage name="recordStatus" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Created By</label>
										{isPrintMode ? (
											<div className="print-value">{values.createdBy || '___________________'}</div>
										) : (
											<Field name="createdBy" className="form-input" />
										)}
										<ErrorMessage name="createdBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Created Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.createdDate || '___________________'}</div>
										) : (
											<Field name="createdDate" type="date" className="form-input" />
										)}
										<ErrorMessage name="createdDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Last Updated By</label>
										{isPrintMode ? (
											<div className="print-value">{values.lastUpdatedBy || '___________________'}</div>
										) : (
											<Field name="lastUpdatedBy" className="form-input" />
										)}
										<ErrorMessage name="lastUpdatedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Last Updated Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.lastUpdatedDate || '___________________'}</div>
										) : (
											<Field name="lastUpdatedDate" type="date" className="form-input" />
										)}
										<ErrorMessage name="lastUpdatedDate" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Additional Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(arrayHelpers) => (
											<div>
												{values.customFields.length > 0 && (
													<div className="custom-fields-list">
														{values.customFields.map((f, idx) => (
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
												<button
													type="button"
													className="btn-add-field"
													onClick={() => arrayHelpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}
												>
													Add Custom Field
												</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{isPrintMode && values.customFields.length > 0 && (
								<div className="form-section">
									<h3 className="form-section-title">Additional Custom Fields</h3>
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
								<h3 className="form-section-title">Digital Signatures</h3>

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
																		<Field name={`signatures.${idx}.signatureName`} className="form-input" />
																		<ErrorMessage name={`signatures.${idx}.signatureName`} component="div" className="form-error" />
																	</div>

																	<div className="form-field">
																		<label className="form-label required">Date</label>
																		<Field name={`signatures.${idx}.signatureDate`} type="date" className="form-input" />
																		<ErrorMessage name={`signatures.${idx}.signatureDate`} component="div" className="form-error" />
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
																			setFieldValue(`signatures.${idx}.signatureData`, sigObj.data || '')
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
													onClick={() => arrayHelpers.push({
														id: uuidv4(),
														signatureName: '',
														signatureData: '',
														signatureDate: ''
													})}
												>
													Add Signature
												</button>

											</div>
										)}
									</FieldArray>
								)}

								{isPrintMode && values.signatures.length > 0 && (
									<div className="print-signatures">
										{values.signatures.map((sig, i) => (
											<div key={i} className="print-signature-box">
												<div className="sig-name">{sig.signatureName || `Signature ${i + 1}`}</div>
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

export default UsageDataValidationRequestApprovalForm;
