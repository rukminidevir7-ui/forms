// ReceiptConfirmationRequestApprovalForm.jsx

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

	// Client & Account Context
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	customerAccountReference: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),
	invoiceOutstandingReference: Yup.string().required('Required'),
	invoiceNumbers: Yup.string().required('Required'),
	invoiceDates: Yup.string().required('Required'),
	outstandingAmountBeforeReceipt: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),

	// Receipt Details
	receiptBankReferenceNo: Yup.string().required('Required'),
	receiptAmount: Yup.string().required('Required'),
	receiptDate: Yup.string().required('Required'),
	paymentMode: Yup.string().required('Required'),
	bankCollectionAccount: Yup.string().required('Required'),
	payerName: Yup.string().required('Required'),

	// Receipt Mapping & Validation
	mappedInvoices: Yup.string().required('Required'),
	shortExcessExactReceipt: Yup.string().required('Required'),
	unappliedAdvanceReceipt: Yup.string().required('Required'),
	validationRemarks: Yup.string().required('Required'),

	// Attachments (header)
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Request / Initiation
	requestedCapturedBy: Yup.string().required('Required'),
	requestCaptureDate: Yup.string().required('Required'),

	// Approval
	approvalStatus: Yup.string().required('Required'),
	approvedBy: Yup.string().required('Required'),
	approvalDate: Yup.string().required('Required'),
	approvalRemarks: Yup.string().required('Required'),

	// Operational Control
	recordStatus: Yup.string().required('Required'),
	createdBy: Yup.string().required('Required'),
	createdDate: Yup.string().required('Required'),
	lastUpdatedBy: Yup.string().required('Required'),
	lastUpdatedDate: Yup.string().required('Required'),

	// Dynamic attachments
	attachments: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			fileName: Yup.string().required('File required'),
			fileType: Yup.string(),
			fileData: Yup.mixed()
		})
	),

	// Custom fields
	customFields: Yup.array().of(
		Yup.object({
			fieldName: Yup.string().required('Required'),
			fieldValue: Yup.string().required('Required')
		})
	),

	// Signatures
	signatures: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			signatureName: Yup.string().required('Required'),
			signatureData: Yup.string(),
			signatureDate: Yup.string().required('Required')
		})
	)

});

const initialValues = {

	clientName: '',
	clientCode: '',
	customerAccountReference: '',
	billingEntityLocation: '',
	invoiceOutstandingReference: '',
	invoiceNumbers: '',
	invoiceDates: '',
	outstandingAmountBeforeReceipt: '',
	currency: '',

	receiptBankReferenceNo: '',
	receiptAmount: '',
	receiptDate: '',
	paymentMode: '',
	bankCollectionAccount: '',
	payerName: '',

	mappedInvoices: '',
	shortExcessExactReceipt: '',
	unappliedAdvanceReceipt: '',
	validationRemarks: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	requestedCapturedBy: '',
	requestCaptureDate: '',

	approvalStatus: '',
	approvedBy: '',
	approvalDate: '',
	approvalRemarks: '',

	recordStatus: '',
	createdBy: '',
	createdDate: '',
	lastUpdatedBy: '',
	lastUpdatedDate: '',

	attachments: [],
	customFields: [],
	signatures: []
};

const ReceiptConfirmationRequestApprovalForm = () => {

	const { isPrintMode } = usePrintMode();

	return (

		<ModernFormWrapper
			formId="FRM-02557-02558"
			title="Receipt Confirmation – Request & Approval"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Receipt confirmation saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02557 / FRM-02558"
							title="Receipt Confirmation – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Client & Account Context */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Account Context</h3>
								<div className="form-fields">

									{[
										['clientName', 'Client Name'],
										['clientCode', 'Client Code / ID'],
										['customerAccountReference', 'Customer / Account Reference'],
										['billingEntityLocation', 'Billing Entity / Location'],
										['invoiceOutstandingReference', 'Invoice / Outstanding Reference'],
										['invoiceNumbers', 'Invoice Number(s)'],
										['invoiceDates', 'Invoice Date(s)'],
										['outstandingAmountBeforeReceipt', 'Outstanding Amount (Before Receipt)'],
										['currency', 'Currency']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode
												? <div className="print-value">{values[n] || '___________________'}</div>
												: <>
													<Field name={n} className="form-input" />
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											}
										</div>
									))}

								</div>
							</div>

							{/* Receipt Details */}
							<div className="form-section">
								<h3 className="form-section-title">Receipt Details</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Receipt / Bank Reference No</label>
										{isPrintMode ? <div className="print-value">{values.receiptBankReferenceNo || '___________________'}</div> :
											<Field name="receiptBankReferenceNo" className="form-input" />}
										<ErrorMessage name="receiptBankReferenceNo" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Receipt Amount</label>
										{isPrintMode ? <div className="print-value">{values.receiptAmount || '___________________'}</div> :
											<Field name="receiptAmount" className="form-input" />}
										<ErrorMessage name="receiptAmount" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Receipt Date</label>
										{isPrintMode ? <div className="print-value">{values.receiptDate || '___________________'}</div> :
											<Field name="receiptDate" type="date" className="form-input" />}
										<ErrorMessage name="receiptDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Payment Mode</label>
										{isPrintMode ? <div className="print-value">{values.paymentMode || '___________________'}</div> :
											<Field name="paymentMode" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="NEFT">NEFT</option>
												<option value="RTGS">RTGS</option>
												<option value="Cheque">Cheque</option>
												<option value="UPI">UPI</option>
												<option value="Other">Other</option>
											</Field>}
										<ErrorMessage name="paymentMode" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Bank / Collection Account</label>
										{isPrintMode ? <div className="print-value">{values.bankCollectionAccount || '___________________'}</div> :
											<Field name="bankCollectionAccount" className="form-input" />}
										<ErrorMessage name="bankCollectionAccount" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Payer Name</label>
										{isPrintMode ? <div className="print-value">{values.payerName || '___________________'}</div> :
											<Field name="payerName" className="form-input" />}
										<ErrorMessage name="payerName" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Receipt Mapping & Validation */}
							<div className="form-section">
								<h3 className="form-section-title">Receipt Mapping & Validation</h3>
								<div className="form-fields">

									<div className="form-field full-width">
										<label className="form-label required">Mapped Invoice(s)</label>
										{isPrintMode ? <div className="print-value">{values.mappedInvoices || '___________________'}</div> :
											<Field name="mappedInvoices" className="form-input" />}
										<ErrorMessage name="mappedInvoices" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Short / Excess / Exact Receipt</label>
										{isPrintMode ? <div className="print-value">{values.shortExcessExactReceipt || '___________________'}</div> :
											<Field name="shortExcessExactReceipt" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Short">Short</option>
												<option value="Excess">Excess</option>
												<option value="Exact">Exact</option>
											</Field>}
										<ErrorMessage name="shortExcessExactReceipt" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Unapplied / Advance Receipt</label>
										{isPrintMode ? <div className="print-value">{values.unappliedAdvanceReceipt || '___________________'}</div> :
											<Field name="unappliedAdvanceReceipt" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="unappliedAdvanceReceipt" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Validation Remarks</label>
										{isPrintMode ? <div className="print-value">{values.validationRemarks || '___________________'}</div> :
											<Field name="validationRemarks" as="textarea" className="form-textarea" rows="2" />}
										<ErrorMessage name="validationRemarks" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Supporting Documents / Evidence */}
							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents / Evidence</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Attachment Required</label>
										{isPrintMode ? <div className="print-value">{values.attachmentRequired || '___________________'}</div> :
											<Field name="attachmentRequired" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="attachmentRequired" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Attachment Type</label>
										{isPrintMode ? <div className="print-value">{values.attachmentType || '___________________'}</div> :
											<Field name="attachmentType" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Bank statement">Bank statement</option>
												<option value="Remittance advice">Remittance advice</option>
												<option value="Mail">Mail</option>
												<option value="Other">Other</option>
											</Field>}
										<ErrorMessage name="attachmentType" component="div" className="form-error" />
									</div>

									{!isPrintMode && (
										<FieldArray name="attachments">
											{(helpers) => (
												<div className="full-width">
													<h4 className="form-sub-title">Attachments</h4>

													{values.attachments.map((att, i) => (
														<div key={att.id || i} className="custom-field-row">
															<input
																type="file"
																className="form-input"
																onChange={(e) => {
																	const file = e.currentTarget.files[0];
																	if (file) {
																		helpers.replace(i, {
																			...att,
																			fileName: file.name,
																			fileType: file.type,
																			fileData: file
																		});
																		setFieldValue('attachmentUploaded', 'Yes');
																		setFieldValue('attachmentReferenceFileName', file.name);
																	}
																}}
															/>
															<span className="file-name">{att.fileName}</span>
															<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
														</div>
													))}

													<button
														type="button"
														className="btn-add-field"
														onClick={() => helpers.push({ id: uuidv4(), fileName: '', fileType: '', fileData: null })}
													>
														Add Attachment
													</button>
												</div>
											)}
										</FieldArray>
									)}

									<div className="form-field">
										<label className="form-label required">Attachment Uploaded</label>
										{isPrintMode ? <div className="print-value">{values.attachmentUploaded || '___________________'}</div> :
											<Field name="attachmentUploaded" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="attachmentUploaded" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Attachment Reference / File Name</label>
										{isPrintMode ? <div className="print-value">{values.attachmentReferenceFileName || '___________________'}</div> :
											<Field name="attachmentReferenceFileName" className="form-input" />}
										<ErrorMessage name="attachmentReferenceFileName" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Request / Initiation */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Initiation</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Requested / Captured By</label>
										{isPrintMode ? <div className="print-value">{values.requestedCapturedBy || '___________________'}</div> :
											<Field name="requestedCapturedBy" className="form-input" />}
										<ErrorMessage name="requestedCapturedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Request / Capture Date</label>
										{isPrintMode ? <div className="print-value">{values.requestCaptureDate || '___________________'}</div> :
											<Field name="requestCaptureDate" type="date" className="form-input" />}
										<ErrorMessage name="requestCaptureDate" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Approval / Authorization */}
							<div className="form-section">
								<h3 className="form-section-title">Approval / Authorization</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Approval Status</label>
										{isPrintMode ? <div className="print-value">{values.approvalStatus || '___________________'}</div> :
											<Field name="approvalStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Approved">Approved</option>
												<option value="Rejected">Rejected</option>
											</Field>}
										<ErrorMessage name="approvalStatus" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Approved By</label>
										{isPrintMode ? <div className="print-value">{values.approvedBy || '___________________'}</div> :
											<Field name="approvedBy" className="form-input" />}
										<ErrorMessage name="approvedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Approval Date</label>
										{isPrintMode ? <div className="print-value">{values.approvalDate || '___________________'}</div> :
											<Field name="approvalDate" type="date" className="form-input" />}
										<ErrorMessage name="approvalDate" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Approval Remarks</label>
										{isPrintMode ? <div className="print-value">{values.approvalRemarks || '___________________'}</div> :
											<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />}
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
										{isPrintMode ? <div className="print-value">{values.recordStatus || '___________________'}</div> :
											<Field name="recordStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Open">Open</option>
												<option value="Approved">Approved</option>
												<option value="Closed">Closed</option>
											</Field>}
										<ErrorMessage name="recordStatus" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Created By</label>
										{isPrintMode ? <div className="print-value">{values.createdBy || '___________________'}</div> :
											<Field name="createdBy" className="form-input" />}
										<ErrorMessage name="createdBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Created Date</label>
										{isPrintMode ? <div className="print-value">{values.createdDate || '___________________'}</div> :
											<Field name="createdDate" type="date" className="form-input" />}
										<ErrorMessage name="createdDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Last Updated By</label>
										{isPrintMode ? <div className="print-value">{values.lastUpdatedBy || '___________________'}</div> :
											<Field name="lastUpdatedBy" className="form-input" />}
										<ErrorMessage name="lastUpdatedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Last Updated Date</label>
										{isPrintMode ? <div className="print-value">{values.lastUpdatedDate || '___________________'}</div> :
											<Field name="lastUpdatedDate" type="date" className="form-input" />}
										<ErrorMessage name="lastUpdatedDate" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(helpers) => (
											<div>
												{values.customFields.map((f, i) => (
													<div key={i} className="custom-field-row">
														<Field name={`customFields.${i}.fieldName`} className="form-input" placeholder="Field Name" />
														<Field name={`customFields.${i}.fieldValue`} className="form-input" placeholder="Field Value" />
														<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
													</div>
												))}
												<button type="button" className="btn-add-field" onClick={() => helpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>
													Add Custom Field
												</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{/* Signatures */}
							<div className="form-section signatures-section">
								<h3 className="form-section-title">Digital Signatures</h3>

								{!isPrintMode && (
									<FieldArray name="signatures">
										{(helpers) => (
											<div>
												{values.signatures.map((sig, i) => (
													<div key={i} className="signature-row-container">
														<div className="signature-row">
															<Field name={`signatures.${i}.signatureName`} className="form-input" placeholder="Signature Name" />
															<Field name={`signatures.${i}.signatureDate`} type="date" className="form-input" />
															<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
														</div>

														<SignatureComponent
															name={`Signature ${i + 1}`}
															value={sig}
															onChange={(o) => setFieldValue(`signatures.${i}.signatureData`, o.data || '')}
														/>
													</div>
												))}

												<button type="button" className="btn-add-signature" onClick={() => helpers.push({ id: uuidv4(), signatureName: '', signatureData: '', signatureDate: '' })}>
													Add Signature
												</button>
											</div>
										)}
									</FieldArray>
								)}

							</div>

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

export default ReceiptConfirmationRequestApprovalForm;
