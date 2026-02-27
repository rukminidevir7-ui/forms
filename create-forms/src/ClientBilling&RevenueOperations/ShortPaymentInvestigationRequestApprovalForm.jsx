// ShortPaymentInvestigationRequestApprovalForm.jsx

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
	receiptReferenceNo: Yup.string().required('Required'),
	receiptDate: Yup.string().required('Required'),
	receiptAmountReceived: Yup.string().required('Required'),

	// Short Payment Identification
	expectedAmount: Yup.string().required('Required'),
	shortPaidAmount: Yup.string().required('Required'),
	shortPaymentIdentifiedDate: Yup.string().required('Required'),

	// Initial Assessment
	shortPaymentReason: Yup.string().required('Required'),
	clientExplanationAvailable: Yup.string().required('Required'),
	initialRemarks: Yup.string().required('Required'),

	// Investigation Details
	rootCauseCategory: Yup.string().required('Required'),
	isValidShortPayment: Yup.string().required('Required'),
	recoveryRequired: Yup.string().required('Required'),
	recoveryMethod: Yup.string().required('Required'),
	investigationSummary: Yup.string().required('Required'),

	// Attachment header fields
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Request
	investigatedRequestedBy: Yup.string().required('Required'),
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

	invoiceNumbers: '',
	invoiceDates: '',
	invoiceAmount: '',
	receiptReferenceNo: '',
	receiptDate: '',
	receiptAmountReceived: '',

	expectedAmount: '',
	shortPaidAmount: '',
	shortPaymentIdentifiedDate: '',

	shortPaymentReason: '',
	clientExplanationAvailable: '',
	initialRemarks: '',

	rootCauseCategory: '',
	isValidShortPayment: '',
	recoveryRequired: '',
	recoveryMethod: '',
	investigationSummary: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	investigatedRequestedBy: '',
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

const ShortPaymentInvestigationRequestApprovalForm = () => {

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
			formId="FRM-02563-02564"
			title="Short Payment Investigation – Request & Approval"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Short payment investigation saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02563 / FRM-02564"
							title="Short Payment Investigation – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							<div className="form-section">
								<h3 className="form-section-title">Client & Account Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'customerAccountReference','Customer / Account Reference')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Invoice & Receipt Reference</h3>
								<div className="form-fields">
									{renderField(values,'invoiceNumbers','Invoice Number(s)')}
									{renderField(values,'invoiceDates','Invoice Date(s)')}
									{renderField(values,'invoiceAmount','Invoice Amount')}
									{renderField(values,'receiptReferenceNo','Receipt Reference No')}
									{renderField(values,'receiptDate','Receipt Date','date')}
									{renderField(values,'receiptAmountReceived','Receipt Amount Received')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Short Payment Identification</h3>
								<div className="form-fields">
									{renderField(values,'expectedAmount','Expected Amount')}
									{renderField(values,'shortPaidAmount','Short Paid Amount')}
									{renderField(values,'shortPaymentIdentifiedDate','Short Payment Identified Date','date')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Initial Assessment</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Short Payment Reason</label>
										{isPrintMode ? <div className="print-value">{values.shortPaymentReason || '___________________'}</div> :
											<>
												<Field name="shortPaymentReason" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Dispute">Dispute</option>
													<option value="Deduction">Deduction</option>
													<option value="Tax">Tax</option>
													<option value="TDS">TDS</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="shortPaymentReason" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">Client Explanation Available</label>
										{isPrintMode ? <div className="print-value">{values.clientExplanationAvailable || '___________________'}</div> :
											<>
												<Field name="clientExplanationAvailable" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="clientExplanationAvailable" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Initial Remarks</label>
										{isPrintMode ? <div className="print-value">{values.initialRemarks || '___________________'}</div> :
											<>
												<Field name="initialRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="initialRemarks" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Investigation Details</h3>
								<div className="form-fields">

									{renderField(values,'rootCauseCategory','Root Cause Category')}

									{[
										['isValidShortPayment','Is Valid Short Payment'],
										['recoveryRequired','Recovery Required']
									].map(([n,l]) => (
										<div className="form-field" key={n}>
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

									<div className="form-field">
										<label className="form-label required">Recovery Method</label>
										{isPrintMode ? <div className="print-value">{values.recoveryMethod || '___________________'}</div> :
											<>
												<Field name="recoveryMethod" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Debit Note">Debit Note</option>
													<option value="Follow-up">Follow-up</option>
													<option value="Adjustment">Adjustment</option>
												</Field>
												<ErrorMessage name="recoveryMethod" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Investigation Summary</label>
										{isPrintMode ? <div className="print-value">{values.investigationSummary || '___________________'}</div> :
											<>
												<Field name="investigationSummary" as="textarea" className="form-textarea" rows="3" />
												<ErrorMessage name="investigationSummary" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

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
											<option value="Client mail">Client mail</option>
											<option value="Remittance">Remittance</option>
											<option value="Calculation">Calculation</option>
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

							<div className="form-section">
								<h3 className="form-section-title">Request / Initiation</h3>
								<div className="form-fields">
									{renderField(values,'investigatedRequestedBy','Investigated / Requested By')}
									{renderField(values,'requestDate','Request Date','date')}
								</div>
							</div>

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
										<label className="form-label required">Approval Remarks / Directions</label>
										<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />
									</div>

								</div>
							</div>

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

export default ShortPaymentInvestigationRequestApprovalForm;
