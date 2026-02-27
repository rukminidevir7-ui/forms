// DebitNoteIssuanceRequestForm.jsx

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

	// Client & Invoice Context
	clientName: Yup.string().required('Client Name is required'),
	clientCode: Yup.string().required('Client Code / ID is required'),
	projectContractReference: Yup.string().required('Project / Contract Reference is required'),
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),

	// Original Invoice Reference
	originalInvoiceNumber: Yup.string().required('Original Invoice Number is required'),
	originalInvoiceDate: Yup.string().required('Original Invoice Date is required'),
	originalInvoiceAmount: Yup.string().required('Original Invoice Amount is required'),
	billingPeriod: Yup.string().required('Billing Period is required'),

	// Debit Note Request Details
	debitNoteReason: Yup.string().required('Debit Note Reason is required'),
	detailedDescriptionOfIssue: Yup.string().required('Detailed Description of Issue is required'),
	debitNoteAmountProposed: Yup.string().required('Debit Note Amount is required'),
	taxImpactApplicable: Yup.string().required('Tax Impact Applicable is required'),

	// Commercial & Tax Impact
	revisedTaxAmount: Yup.string().required('Revised Tax Amount is required'),
	placeOfSupply: Yup.string().required('Place of Supply is required'),
	taxType: Yup.string().required('Tax Type is required'),

	// Supporting Documents
	attachmentRequired: Yup.string().required('Attachment Required is required'),
	attachmentType: Yup.string().required('Attachment Type is required'),
	attachmentUploaded: Yup.string().required('Attachment Uploaded is required'),
	attachmentReferenceFileName: Yup.string().required('Attachment Reference / File Name is required'),

	// Request / Initiation Details
	requestedBy: Yup.string().required('Requested By is required'),
	requestDate: Yup.string().required('Request Date is required'),
	businessJustificationRemarks: Yup.string().required('Business Justification / Remarks are required'),

	// Operational Control
	recordStatus: Yup.string().required('Record Status is required'),
	createdBy: Yup.string().required('Created By is required'),
	createdDate: Yup.string().required('Created Date is required'),

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
	projectContractReference: '',
	billingEntityLocation: '',

	originalInvoiceNumber: '',
	originalInvoiceDate: '',
	originalInvoiceAmount: '',
	billingPeriod: '',

	debitNoteReason: '',
	detailedDescriptionOfIssue: '',
	debitNoteAmountProposed: '',
	taxImpactApplicable: '',

	revisedTaxAmount: '',
	placeOfSupply: '',
	taxType: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	requestedBy: '',
	requestDate: '',
	businessJustificationRemarks: '',

	recordStatus: '',
	createdBy: '',
	createdDate: '',

	customFields: [],
	signatures: []
};

const DebitNoteIssuanceRequestForm = () => {

	const { isPrintMode } = usePrintMode();

	return (

		<ModernFormWrapper
			formId="FRM-02545"
			title="Debit Note Issuance Request"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Debit note request submitted:', values);
					alert('Debit note request saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02545"
							title="Debit Note Issuance Request – Request / Initiation Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Client & Invoice Context */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Invoice Context</h3>
								<div className="form-fields">

									{[
										['clientName', 'Client Name'],
										['clientCode', 'Client Code / ID'],
										['projectContractReference', 'Project / Contract Reference'],
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

							{/* Original Invoice Reference */}
							<div className="form-section">
								<h3 className="form-section-title">Original Invoice Reference</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Original Invoice Number</label>
										{isPrintMode ? (
											<div className="print-value">{values.originalInvoiceNumber || '___________________'}</div>
										) : (
											<Field name="originalInvoiceNumber" className="form-input" />
										)}
										<ErrorMessage name="originalInvoiceNumber" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Original Invoice Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.originalInvoiceDate || '___________________'}</div>
										) : (
											<Field name="originalInvoiceDate" type="date" className="form-input" />
										)}
										<ErrorMessage name="originalInvoiceDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Original Invoice Amount</label>
										{isPrintMode ? (
											<div className="print-value">{values.originalInvoiceAmount || '___________________'}</div>
										) : (
											<Field name="originalInvoiceAmount" className="form-input" />
										)}
										<ErrorMessage name="originalInvoiceAmount" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Billing Period</label>
										{isPrintMode ? (
											<div className="print-value">{values.billingPeriod || '___________________'}</div>
										) : (
											<Field name="billingPeriod" className="form-input" />
										)}
										<ErrorMessage name="billingPeriod" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Debit Note Request Details */}
							<div className="form-section">
								<h3 className="form-section-title">Debit Note Request Details</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Debit Note Reason</label>
										{isPrintMode ? (
											<div className="print-value">{values.debitNoteReason || '___________________'}</div>
										) : (
											<Field name="debitNoteReason" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Price difference">Price difference</option>
												<option value="Short billing">Short billing</option>
												<option value="Tax difference">Tax difference</option>
												<option value="Other">Other</option>
											</Field>
										)}
										<ErrorMessage name="debitNoteReason" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Detailed Description of Issue</label>
										{isPrintMode ? (
											<div className="print-value">{values.detailedDescriptionOfIssue || '___________________'}</div>
										) : (
											<Field
												name="detailedDescriptionOfIssue"
												as="textarea"
												className="form-textarea"
												rows="3"
											/>
										)}
										<ErrorMessage name="detailedDescriptionOfIssue" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Debit Note Amount (Proposed)</label>
										{isPrintMode ? (
											<div className="print-value">{values.debitNoteAmountProposed || '___________________'}</div>
										) : (
											<Field name="debitNoteAmountProposed" className="form-input" />
										)}
										<ErrorMessage name="debitNoteAmountProposed" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Tax Impact Applicable</label>
										{isPrintMode ? (
											<div className="print-value">{values.taxImpactApplicable || '___________________'}</div>
										) : (
											<Field name="taxImpactApplicable" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="taxImpactApplicable" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Commercial & Tax Impact */}
							<div className="form-section">
								<h3 className="form-section-title">Commercial & Tax Impact</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Revised Tax Amount</label>
										{isPrintMode ? (
											<div className="print-value">{values.revisedTaxAmount || '___________________'}</div>
										) : (
											<Field name="revisedTaxAmount" className="form-input" />
										)}
										<ErrorMessage name="revisedTaxAmount" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Place of Supply</label>
										{isPrintMode ? (
											<div className="print-value">{values.placeOfSupply || '___________________'}</div>
										) : (
											<Field name="placeOfSupply" className="form-input" />
										)}
										<ErrorMessage name="placeOfSupply" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Tax Type</label>
										{isPrintMode ? (
											<div className="print-value">{values.taxType || '___________________'}</div>
										) : (
											<Field name="taxType" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="IGST">IGST</option>
												<option value="CGST+SGST">CGST+SGST</option>
											</Field>
										)}
										<ErrorMessage name="taxType" component="div" className="form-error" />
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
												<option value="Client mail">Client mail</option>
												<option value="Contract">Contract</option>
												<option value="Calculation">Calculation</option>
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

							{/* Request / Initiation Details */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Initiation Details</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Requested By</label>
										{isPrintMode ? (
											<div className="print-value">{values.requestedBy || '___________________'}</div>
										) : (
											<Field name="requestedBy" className="form-input" />
										)}
										<ErrorMessage name="requestedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Request Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.requestDate || '___________________'}</div>
										) : (
											<Field name="requestDate" type="date" className="form-input" />
										)}
										<ErrorMessage name="requestDate" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Business Justification / Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.businessJustificationRemarks || '___________________'}</div>
										) : (
											<Field
												name="businessJustificationRemarks"
												as="textarea"
												className="form-textarea"
												rows="2"
											/>
										)}
										<ErrorMessage name="businessJustificationRemarks" component="div" className="form-error" />
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
												<option value="Submitted">Submitted</option>
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
																<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>
																	Remove
																</button>
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
																		onChange={(sigObj) => setFieldValue(`signatures.${idx}.signatureData`, sigObj.data || '')}
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

export default DebitNoteIssuanceRequestForm;
