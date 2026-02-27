// UsageDataCaptureRequestApprovalForm.jsx

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

	// Usage Period & Source
	usagePeriod: Yup.string().required('Usage Period is required'),
	usageSourceSystemMeterName: Yup.string().required('Usage Source / System / Meter Name is required'),
	usageReferenceBatchId: Yup.string().required('Usage Reference / Batch ID is required'),

	// Usage Measurement Details
	usageItemServiceName: Yup.string().required('Usage Item / Service Name is required'),
	usageQuantity: Yup.string().required('Usage Quantity is required'),
	unitOfMeasure: Yup.string().required('Unit of Measure is required'),
	measurementMethod: Yup.string().required('Measurement Method is required'),

	// Commercial Mapping
	applicableRateCardReference: Yup.string().required('Applicable Rate Card / Price Plan Reference is required'),
	billingCategory: Yup.string().required('Billing Category is required'),
	exceptionAdjustment: Yup.string(),

	// Manual Adjustment
	manualAdjustmentApplied: Yup.string().required('Manual Adjustment Applied is required'),
	adjustmentQuantityValue: Yup.string().required('Adjustment Quantity / Value is required'),
	reasonForAdjustment: Yup.string().required('Reason for Adjustment is required'),

	// Supporting Documents
	attachmentRequired: Yup.string().required('Attachment Required is required'),
	attachmentType: Yup.string().required('Attachment Type is required'),
	attachmentUploaded: Yup.string().required('Attachment Uploaded is required'),
	attachmentReferenceFileName: Yup.string().required('Attachment Reference / File Name is required'),

	// Request / Submission Details
	capturedSubmittedBy: Yup.string().required('Captured / Submitted By is required'),
	submissionDate: Yup.string().required('Submission Date is required'),
	submittedForBilling: Yup.string().required('Submitted for Billing is required'),

	// Approval / Authorization Details
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvedBy: Yup.string().required('Approved By is required'),
	approvalDate: Yup.string().required('Approval Date is required'),
	approvalRemarks: Yup.string().required('Approval Remarks are required'),

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

	usagePeriod: '',
	usageSourceSystemMeterName: '',
	usageReferenceBatchId: '',

	usageItemServiceName: '',
	usageQuantity: '',
	unitOfMeasure: '',
	measurementMethod: '',

	applicableRateCardReference: '',
	billingCategory: '',
	exceptionAdjustment: '',

	manualAdjustmentApplied: '',
	adjustmentQuantityValue: '',
	reasonForAdjustment: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	capturedSubmittedBy: '',
	submissionDate: '',
	submittedForBilling: '',

	approvalStatus: '',
	approvedBy: '',
	approvalDate: '',
	approvalRemarks: '',

	recordStatus: '',
	createdBy: '',
	createdDate: '',
	lastUpdatedBy: '',
	lastUpdatedDate: '',

	customFields: [],
	signatures: []
};

const UsageDataCaptureRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-02534-02535"
			title="Usage Data Capture"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Usage data capture submitted:', values);
					alert('Usage data capture saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02534-02535"
							title="Usage Data Capture – Combined Basic Form"
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

							{/* Usage Period & Source */}
							<div className="form-section">
								<h3 className="form-section-title">Usage Period & Source</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Usage Period (From – To)</label>
										{isPrintMode ? (
											<div className="print-value">{values.usagePeriod || '___________________'}</div>
										) : (
											<Field name="usagePeriod" className="form-input" placeholder="e.g. 01-Jan-2026 to 31-Jan-2026" />
										)}
										<ErrorMessage name="usagePeriod" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Usage Source / System / Meter Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.usageSourceSystemMeterName || '___________________'}</div>
										) : (
											<Field name="usageSourceSystemMeterName" className="form-input" />
										)}
										<ErrorMessage name="usageSourceSystemMeterName" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Usage Reference / Batch ID</label>
										{isPrintMode ? (
											<div className="print-value">{values.usageReferenceBatchId || '___________________'}</div>
										) : (
											<Field name="usageReferenceBatchId" className="form-input" />
										)}
										<ErrorMessage name="usageReferenceBatchId" component="div" className="form-error" />
									</div>
								</div>
							</div>

							{/* Usage Measurement Details */}
							<div className="form-section">
								<h3 className="form-section-title">Usage Measurement Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Usage Item / Service Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.usageItemServiceName || '___________________'}</div>
										) : (
											<Field name="usageItemServiceName" className="form-input" />
										)}
										<ErrorMessage name="usageItemServiceName" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Usage Quantity</label>
										{isPrintMode ? (
											<div className="print-value">{values.usageQuantity || '___________________'}</div>
										) : (
											<Field name="usageQuantity" className="form-input" />
										)}
										<ErrorMessage name="usageQuantity" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Unit of Measure</label>
										{isPrintMode ? (
											<div className="print-value">{values.unitOfMeasure || '___________________'}</div>
										) : (
											<Field name="unitOfMeasure" className="form-input" />
										)}
										<ErrorMessage name="unitOfMeasure" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Measurement Method</label>
										{isPrintMode ? (
											<div className="print-value">{values.measurementMethod || '___________________'}</div>
										) : (
											<Field name="measurementMethod" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="System">System</option>
												<option value="Manual">Manual</option>
												<option value="API">API</option>
											</Field>
										)}
										<ErrorMessage name="measurementMethod" component="div" className="form-error" />
									</div>
								</div>
							</div>

							{/* Commercial Mapping */}
							<div className="form-section">
								<h3 className="form-section-title">Commercial Mapping</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Applicable Rate Card / Price Plan Reference</label>
										{isPrintMode ? (
											<div className="print-value">{values.applicableRateCardReference || '___________________'}</div>
										) : (
											<Field name="applicableRateCardReference" className="form-input" />
										)}
										<ErrorMessage name="applicableRateCardReference" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Billing Category</label>
										{isPrintMode ? (
											<div className="print-value">{values.billingCategory || '___________________'}</div>
										) : (
											<Field name="billingCategory" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="T&M">T&M</option>
												<option value="Usage">Usage</option>
												<option value="Milestone">Milestone</option>
											</Field>
										)}
										<ErrorMessage name="billingCategory" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label">Exception / Adjustment (if any)</label>
										{isPrintMode ? (
											<div className="print-value">{values.exceptionAdjustment || '___________________'}</div>
										) : (
											<Field name="exceptionAdjustment" as="textarea" className="form-textarea" rows="2" />
										)}
									</div>
								</div>
							</div>

							{/* Manual Adjustment */}
							<div className="form-section">
								<h3 className="form-section-title">Manual Adjustment</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Manual Adjustment Applied</label>
										{isPrintMode ? (
											<div className="print-value">{values.manualAdjustmentApplied || '___________________'}</div>
										) : (
											<Field name="manualAdjustmentApplied" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="manualAdjustmentApplied" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Adjustment Quantity / Value</label>
										{isPrintMode ? (
											<div className="print-value">{values.adjustmentQuantityValue || '___________________'}</div>
										) : (
											<Field name="adjustmentQuantityValue" className="form-input" />
										)}
										<ErrorMessage name="adjustmentQuantityValue" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Reason for Adjustment</label>
										{isPrintMode ? (
											<div className="print-value">{values.reasonForAdjustment || '___________________'}</div>
										) : (
											<Field name="reasonForAdjustment" as="textarea" className="form-textarea" rows="2" />
										)}
										<ErrorMessage name="reasonForAdjustment" component="div" className="form-error" />
									</div>
								</div>
							</div>

							{/* Supporting Documents */}
							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents / Attachments</h3>
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
												<option value="Client confirmation">Client confirmation</option>
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

							{/* Request / Submission Details */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Submission Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Captured / Submitted By</label>
										{isPrintMode ? (
											<div className="print-value">{values.capturedSubmittedBy || '___________________'}</div>
										) : (
											<Field name="capturedSubmittedBy" className="form-input" />
										)}
										<ErrorMessage name="capturedSubmittedBy" component="div" className="form-error" />
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
										<label className="form-label required">Submitted for Billing</label>
										{isPrintMode ? (
											<div className="print-value">{values.submittedForBilling || '___________________'}</div>
										) : (
											<Field name="submittedForBilling" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="submittedForBilling" component="div" className="form-error" />
									</div>
								</div>
							</div>

							{/* Approval / Authorization Details */}
							<div className="form-section">
								<h3 className="form-section-title">Approval / Authorization Details</h3>
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
										<label className="form-label required">Approval Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalRemarks || '___________________'}</div>
										) : (
											<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />
										)}
										<ErrorMessage name="approvalRemarks" component="div" className="form-error" />
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
												<button type="button" className="btn-add-field" onClick={() => arrayHelpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>
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

																	<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>
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

												<button type="button" className="btn-add-signature" onClick={() => arrayHelpers.push({ id: uuidv4(), signatureName: '', signatureData: '', signatureDate: '' })}>
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
													{sig.signatureData && <img src={sig.signatureData} alt={`sig-${i}`} className="print-sig-image" />}
												</div>
												<div className="sig-line" />
												<div className="sig-date">{sig.signatureDate && `Date: ${sig.signatureDate}`}</div>
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

export default UsageDataCaptureRequestApprovalForm;
