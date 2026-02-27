// ReceiptAllocationSheetRequestApproval.jsx

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
	receiptReference: Yup.string().required('Required'),
	receiptBankReferenceNo: Yup.string().required('Required'),
	receiptDate: Yup.string().required('Required'),
	totalReceiptAmount: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	bankCollectionAccount: Yup.string().required('Required'),

	// Invoice Allocation Details
	invoiceNumber: Yup.string().required('Required'),
	invoiceDate: Yup.string().required('Required'),
	invoiceAmount: Yup.string().required('Required'),
	outstandingBeforeAllocation: Yup.string().required('Required'),
	amountAllocatedToInvoice: Yup.string().required('Required'),
	outstandingAfterAllocation: Yup.string().required('Required'),

	// Allocation Summary
	totalAllocatedAmount: Yup.string().required('Required'),
	unallocatedBalanceAmount: Yup.string().required('Required'),
	shortExcessAllocation: Yup.string().required('Required'),
	allocationRemarks: Yup.string().required('Required'),

	// Allocation Rules & Validation
	allocationAsPerClientInstruction: Yup.string().required('Required'),
	oldestInvoicePriorityFollowed: Yup.string().required('Required'),
	disputedInvoicesExcluded: Yup.string().required('Required'),
	validationRemarks: Yup.string().required('Required'),

	// Attachments header
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Request / Initiation
	preparedRequestedBy: Yup.string().required('Required'),
	requestDate: Yup.string().required('Required'),

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
	receiptReference: '',
	receiptBankReferenceNo: '',
	receiptDate: '',
	totalReceiptAmount: '',
	currency: '',
	bankCollectionAccount: '',

	invoiceNumber: '',
	invoiceDate: '',
	invoiceAmount: '',
	outstandingBeforeAllocation: '',
	amountAllocatedToInvoice: '',
	outstandingAfterAllocation: '',

	totalAllocatedAmount: '',
	unallocatedBalanceAmount: '',
	shortExcessAllocation: '',
	allocationRemarks: '',

	allocationAsPerClientInstruction: '',
	oldestInvoicePriorityFollowed: '',
	disputedInvoicesExcluded: '',
	validationRemarks: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	preparedRequestedBy: '',
	requestDate: '',

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

const ReceiptAllocationSheetRequestApproval = () => {

	const { isPrintMode } = usePrintMode();

	const renderField = (name, label, type = 'text', as) => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode ? (
				<div className="print-value">{initialValues[name] || '___________________'}</div>
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
			formId="FRM-02560-02561"
			title="Receipt Allocation Sheet – Request & Approval"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Receipt allocation sheet saved');
				}}
			>
				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02560 / FRM-02561"
							title="Receipt Allocation Sheet – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Client & Account Context */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Account Context</h3>
								<div className="form-fields">
									{renderField('clientName', 'Client Name')}
									{renderField('clientCode', 'Client Code / ID')}
									{renderField('customerAccountReference', 'Customer / Account Reference')}
									{renderField('billingEntityLocation', 'Billing Entity / Location')}
									{renderField('receiptReference', 'Receipt Reference')}
									{renderField('receiptBankReferenceNo', 'Receipt / Bank Reference No')}
									{renderField('receiptDate', 'Receipt Date', 'date')}
									{renderField('totalReceiptAmount', 'Total Receipt Amount')}
									{renderField('currency', 'Currency')}
									{renderField('bankCollectionAccount', 'Bank / Collection Account')}
								</div>
							</div>

							{/* Invoice Allocation Details */}
							<div className="form-section">
								<h3 className="form-section-title">Invoice Allocation Details</h3>
								<div className="form-fields">
									{renderField('invoiceNumber', 'Invoice Number')}
									{renderField('invoiceDate', 'Invoice Date', 'date')}
									{renderField('invoiceAmount', 'Invoice Amount')}
									{renderField('outstandingBeforeAllocation', 'Outstanding Before Allocation')}
									{renderField('amountAllocatedToInvoice', 'Amount Allocated to Invoice')}
									{renderField('outstandingAfterAllocation', 'Outstanding After Allocation')}
								</div>
							</div>

							{/* Allocation Summary */}
							<div className="form-section">
								<h3 className="form-section-title">Allocation Summary</h3>
								<div className="form-fields">
									{renderField('totalAllocatedAmount', 'Total Allocated Amount')}
									{renderField('unallocatedBalanceAmount', 'Unallocated / Balance Amount')}
									<div className="form-field">
										<label className="form-label required">Short / Excess Allocation</label>
										{isPrintMode ? (
											<div className="print-value">{values.shortExcessAllocation || '___________________'}</div>
										) : (
											<>
												<Field name="shortExcessAllocation" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="shortExcessAllocation" component="div" className="form-error" />
											</>
										)}
									</div>
									<div className="form-field full-width">
										<label className="form-label required">Allocation Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.allocationRemarks || '___________________'}</div>
										) : (
											<>
												<Field name="allocationRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="allocationRemarks" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Allocation Rules & Validation */}
							<div className="form-section">
								<h3 className="form-section-title">Allocation Rules & Validation</h3>
								<div className="form-fields">

									{[
										['allocationAsPerClientInstruction', 'Allocation as per client instructions'],
										['oldestInvoicePriorityFollowed', 'Oldest invoice priority followed'],
										['disputedInvoicesExcluded', 'Disputed invoices excluded']
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
														{n === 'disputedInvoicesExcluded' && <option value="NA">NA</option>}
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}

									<div className="form-field full-width">
										<label className="form-label required">Validation Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.validationRemarks || '___________________'}</div>
										) : (
											<>
												<Field name="validationRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="validationRemarks" component="div" className="form-error" />
											</>
										)}
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
											<option value="Remittance advice">Remittance advice</option>
											<option value="Email">Email</option>
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

									{renderField('attachmentUploaded', 'Attachment Uploaded')}
									{renderField('attachmentReferenceFileName', 'Attachment Reference / File Name')}

								</div>
							</div>

							{/* Request / Initiation */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Initiation</h3>
								<div className="form-fields">
									{renderField('preparedRequestedBy', 'Prepared / Requested By')}
									{renderField('requestDate', 'Request Date', 'date')}
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

									{renderField('approvedBy', 'Approved By')}
									{renderField('approvalDate', 'Approval Date', 'date')}

									<div className="form-field full-width">
										<label className="form-label required">Approval Remarks</label>
										<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />
									</div>

								</div>
							</div>

							{/* Operational Control */}
							<div className="form-section">
								<h3 className="form-section-title">Operational Control</h3>
								<div className="form-fields">
									{renderField('recordStatus', 'Record Status')}
									{renderField('createdBy', 'Created By')}
									{renderField('createdDate', 'Created Date', 'date')}
									{renderField('lastUpdatedBy', 'Last Updated By')}
									{renderField('lastUpdatedDate', 'Last Updated Date', 'date')}
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

export default ReceiptAllocationSheetRequestApproval;
