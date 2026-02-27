// OverpaymentRefundRequestApprovalForm.jsx

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

	// Invoice & Receipt Reference
	invoiceNumbers: Yup.string().required('Required'),
	invoiceDates: Yup.string().required('Required'),
	invoiceAmount: Yup.string().required('Required'),
	receiptBankReferenceNo: Yup.string().required('Required'),
	receiptDate: Yup.string().required('Required'),
	receiptAmountReceived: Yup.string().required('Required'),

	// Overpayment Identification
	expectedAmount: Yup.string().required('Required'),
	overpaidAmount: Yup.string().required('Required'),
	overpaymentIdentifiedDate: Yup.string().required('Required'),

	// Refund Request Details
	refundReason: Yup.string().required('Required'),
	refundMode: Yup.string().required('Required'),
	refundAmountRequested: Yup.string().required('Required'),
	clientBankDetailsAvailable: Yup.string().required('Required'),

	// Validation & Adjustment Check
	overpaymentAlreadyAdjusted: Yup.string().required('Required'),
	openDisputeOnInvoices: Yup.string().required('Required'),
	validationRemarks: Yup.string().required('Required'),

	// Attachments header
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Request
	requestedPreparedBy: Yup.string().required('Required'),
	requestDate: Yup.string().required('Required'),
	businessJustification: Yup.string().required('Required'),

	// Approval
	approvalStatus: Yup.string().required('Required'),
	approvedBy: Yup.string().required('Required'),
	approvalDate: Yup.string().required('Required'),
	approvalRemarks: Yup.string().required('Required'),

	// Operational control
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

	invoiceNumbers: '',
	invoiceDates: '',
	invoiceAmount: '',
	receiptBankReferenceNo: '',
	receiptDate: '',
	receiptAmountReceived: '',

	expectedAmount: '',
	overpaidAmount: '',
	overpaymentIdentifiedDate: '',

	refundReason: '',
	refundMode: '',
	refundAmountRequested: '',
	clientBankDetailsAvailable: '',

	overpaymentAlreadyAdjusted: '',
	openDisputeOnInvoices: '',
	validationRemarks: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	requestedPreparedBy: '',
	requestDate: '',
	businessJustification: '',

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

const OverpaymentRefundRequestApprovalForm = () => {

	const { isPrintMode } = usePrintMode();

	const renderField = (values, name, label, type = 'text', as) => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode ? (
				<div className="print-value">{values[name] || '___________________'}</div>
			) : (
				<>
					<Field name={name} type={type} as={as} className="form-input" />
					<ErrorMessage name={name} component="div" className="form-error" />
				</>
			)}
		</div>
	);

	return (

		<ModernFormWrapper
			formId="FRM-02566-02567"
			title="Overpayment Refund – Request & Approval"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Overpayment refund form saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02566 / FRM-02567"
							title="Overpayment Refund – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Client & Account Context */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Account Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'customerAccountReference','Customer / Account Reference')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
								</div>
							</div>

							{/* Invoice & Receipt Reference */}
							<div className="form-section">
								<h3 className="form-section-title">Invoice & Receipt Reference</h3>
								<div className="form-fields">
									{renderField(values,'invoiceNumbers','Invoice Number(s)')}
									{renderField(values,'invoiceDates','Invoice Date(s)')}
									{renderField(values,'invoiceAmount','Invoice Amount')}
									{renderField(values,'receiptBankReferenceNo','Receipt / Bank Reference No')}
									{renderField(values,'receiptDate','Receipt Date','date')}
									{renderField(values,'receiptAmountReceived','Receipt Amount Received')}
								</div>
							</div>

							{/* Overpayment Identification */}
							<div className="form-section">
								<h3 className="form-section-title">Overpayment Identification</h3>
								<div className="form-fields">
									{renderField(values,'expectedAmount','Expected Amount (as per invoices)')}
									{renderField(values,'overpaidAmount','Overpaid Amount')}
									{renderField(values,'overpaymentIdentifiedDate','Overpayment Identified Date','date')}
								</div>
							</div>

							{/* Refund Request Details */}
							<div className="form-section">
								<h3 className="form-section-title">Refund Request Details</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Refund Reason</label>
										{isPrintMode ? <div className="print-value">{values.refundReason || '___________________'}</div> :
											<>
												<Field name="refundReason" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Duplicate payment">Duplicate payment</option>
													<option value="Excess payment">Excess payment</option>
													<option value="Wrong allocation">Wrong allocation</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="refundReason" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">Refund Mode</label>
										{isPrintMode ? <div className="print-value">{values.refundMode || '___________________'}</div> :
											<>
												<Field name="refundMode" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Bank transfer">Bank transfer</option>
													<option value="Adjustment">Adjustment</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="refundMode" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'refundAmountRequested','Refund Amount Requested')}

									<div className="form-field">
										<label className="form-label required">Client Bank Details Available</label>
										{isPrintMode ? <div className="print-value">{values.clientBankDetailsAvailable || '___________________'}</div> :
											<>
												<Field name="clientBankDetailsAvailable" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="clientBankDetailsAvailable" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							{/* Validation & Adjustment Check */}
							<div className="form-section">
								<h3 className="form-section-title">Validation & Adjustment Check</h3>
								<div className="form-fields">

									{[
										['overpaymentAlreadyAdjusted','Overpayment already adjusted'],
										['openDisputeOnInvoices','Any open dispute on invoices']
									].map(([n,l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											}
										</div>
									))}

									<div className="form-field full-width">
										<label className="form-label required">Validation Remarks</label>
										{isPrintMode ? <div className="print-value">{values.validationRemarks || '___________________'}</div> :
											<>
												<Field name="validationRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="validationRemarks" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							{/* Supporting Documents / Evidence */}
							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents / Evidence</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Attachment Required</label>
										<Field name="attachmentRequired" as="select" className="form-input">
											<option value="">-- Select --</option>
											<option value="Yes">Yes</option>
											<option value="No">No</option>
										</Field>
									</div>

									<div className="form-field">
										<label className="form-label required">Attachment Type</label>
										<Field name="attachmentType" as="select" className="form-input">
											<option value="">-- Select --</option>
											<option value="Bank statement">Bank statement</option>
											<option value="Client mail">Client mail</option>
											<option value="Remittance advice">Remittance advice</option>
											<option value="Other">Other</option>
										</Field>
									</div>

									{!isPrintMode && (
										<FieldArray name="attachments">
											{(helpers) => (
												<div className="full-width">

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

									{renderField(values,'attachmentUploaded','Attachment Uploaded')}
									{renderField(values,'attachmentReferenceFileName','Attachment Reference / File Name')}

								</div>
							</div>

							{/* Request / Initiation */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Initiation</h3>
								<div className="form-fields">
									{renderField(values,'requestedPreparedBy','Requested / Prepared By')}
									{renderField(values,'requestDate','Request Date','date')}

									<div className="form-field full-width">
										<label className="form-label required">Business Justification / Remarks</label>
										{isPrintMode ? <div className="print-value">{values.businessJustification || '___________________'}</div> :
											<>
												<Field name="businessJustification" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="businessJustification" component="div" className="form-error" />
											</>
										}
									</div>
								</div>
							</div>

							{/* Approval */}
							<div className="form-section">
								<h3 className="form-section-title">Approval / Authorization</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Approval Status</label>
										<Field name="approvalStatus" as="select" className="form-input">
											<option value="">-- Select --</option>
											<option value="Approved">Approved</option>
											<option value="Rejected">Rejected</option>
										</Field>
									</div>

									{renderField(values,'approvedBy','Approved By')}
									{renderField(values,'approvalDate','Approval Date','date')}

									<div className="form-field full-width">
										<label className="form-label required">Approval Remarks / Conditions</label>
										<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />
									</div>

								</div>
							</div>

							{/* Operational Control */}
							<div className="form-section">
								<h3 className="form-section-title">Operational Control</h3>
								<div className="form-fields">
									{renderField(values,'recordStatus','Record Status')}
									{renderField(values,'createdBy','Created By')}
									{renderField(values,'createdDate','Created Date','date')}
									{renderField(values,'lastUpdatedBy','Last Updated By')}
									{renderField(values,'lastUpdatedDate','Last Updated Date','date')}
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
												<button
													type="button"
													className="btn-add-field"
													onClick={() => helpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}
												>
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

												<button
													type="button"
													className="btn-add-signature"
													onClick={() => helpers.push({ id: uuidv4(), signatureName: '', signatureData: '', signatureDate: '' })}
												>
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

export default OverpaymentRefundRequestApprovalForm;
