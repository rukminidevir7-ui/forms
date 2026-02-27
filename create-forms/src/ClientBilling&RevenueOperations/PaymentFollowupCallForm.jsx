// PaymentFollowupCallForm.jsx

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
	outstandingInvoiceReference: Yup.string().required('Required'),
	invoiceNumbers: Yup.string().required('Required'),
	invoiceDates: Yup.string().required('Required'),
	outstandingAmount: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	dueDate: Yup.string().required('Required'),

	// Follow-up Call Details
	callDate: Yup.string().required('Required'),
	callTime: Yup.string().required('Required'),
	contactPersonName: Yup.string().required('Required'),
	contactPersonRoleDepartment: Yup.string().required('Required'),
	modeOfContact: Yup.string().required('Required'),

	// Discussion & Outcome
	discussionSummary: Yup.string().required('Required'),
	reasonForDelay: Yup.string().required('Required'),
	commitmentReceived: Yup.string().required('Required'),
	committedPaymentDate: Yup.string().required('Required'),
	committedAmount: Yup.string().required('Required'),
	nextActionFollowupPlan: Yup.string().required('Required'),
	nextFollowupRequired: Yup.string().required('Required'),
	nextFollowupDate: Yup.string().required('Required'),
	responsibleOwner: Yup.string().required('Required'),

	// Attachments
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Call Log Control
	loggedBy: Yup.string().required('Required'),
	loggedDate: Yup.string().required('Required'),
	recordStatus: Yup.string().required('Required'),

	// Custom fields
	customFields: Yup.array().of(
		Yup.object({
			fieldName: Yup.string().required('Required'),
			fieldValue: Yup.string().required('Required')
		})
	),

	// Dynamic attachments
	attachments: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			fileName: Yup.string().required('File required'),
			fileType: Yup.string(),
			fileData: Yup.mixed()
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
	outstandingInvoiceReference: '',
	invoiceNumbers: '',
	invoiceDates: '',
	outstandingAmount: '',
	currency: '',
	dueDate: '',

	callDate: '',
	callTime: '',
	contactPersonName: '',
	contactPersonRoleDepartment: '',
	modeOfContact: '',

	discussionSummary: '',
	reasonForDelay: '',
	commitmentReceived: '',
	committedPaymentDate: '',
	committedAmount: '',
	nextActionFollowupPlan: '',
	nextFollowupRequired: '',
	nextFollowupDate: '',
	responsibleOwner: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	loggedBy: '',
	loggedDate: '',
	recordStatus: '',

	customFields: [],
	attachments: [],
	signatures: []
};

const PaymentFollowupCallForm = () => {

	const { isPrintMode } = usePrintMode();

	return (

		<ModernFormWrapper
			formId="FRM-02551"
			title="Payment Followup Call Log"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Payment followup call log saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02551"
							title="Payment Followup Call Log – Log / Register"
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
										['outstandingInvoiceReference', 'Outstanding / Invoice Reference'],
										['invoiceNumbers', 'Invoice Number(s)'],
										['invoiceDates', 'Invoice Date(s)'],
										['outstandingAmount', 'Outstanding Amount'],
										['currency', 'Currency']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<>
													<Field name={n} className="form-input" />
													<ErrorMessage name={n} component="div" className="form-error" />
												</>}
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">Due Date</label>
										{isPrintMode ? <div className="print-value">{values.dueDate || '___________________'}</div> :
											<Field name="dueDate" type="date" className="form-input" />}
										<ErrorMessage name="dueDate" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Follow-up Call Details */}
							<div className="form-section">
								<h3 className="form-section-title">Followup Call Details</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Call / Contact Date</label>
										{isPrintMode ? <div className="print-value">{values.callDate || '___________________'}</div> :
											<Field name="callDate" type="date" className="form-input" />}
										<ErrorMessage name="callDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Call / Contact Time</label>
										{isPrintMode ? <div className="print-value">{values.callTime || '___________________'}</div> :
											<Field name="callTime" type="time" className="form-input" />}
										<ErrorMessage name="callTime" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Contact Person Name</label>
										{isPrintMode ? <div className="print-value">{values.contactPersonName || '___________________'}</div> :
											<Field name="contactPersonName" className="form-input" />}
										<ErrorMessage name="contactPersonName" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Contact Person Role / Department</label>
										{isPrintMode ? <div className="print-value">{values.contactPersonRoleDepartment || '___________________'}</div> :
											<Field name="contactPersonRoleDepartment" className="form-input" />}
										<ErrorMessage name="contactPersonRoleDepartment" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Mode of Contact</label>
										{isPrintMode ? <div className="print-value">{values.modeOfContact || '___________________'}</div> :
											<Field name="modeOfContact" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Call">Call</option>
												<option value="Email">Email</option>
												<option value="Meeting">Meeting</option>
											</Field>}
										<ErrorMessage name="modeOfContact" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Discussion & Outcome */}
							<div className="form-section">
								<h3 className="form-section-title">Discussion & Outcome</h3>
								<div className="form-fields">

									<div className="form-field full-width">
										<label className="form-label required">Discussion Summary</label>
										{isPrintMode ? <div className="print-value">{values.discussionSummary || '___________________'}</div> :
											<Field name="discussionSummary" as="textarea" className="form-textarea" rows="2" />}
										<ErrorMessage name="discussionSummary" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Reason for Delay</label>
										{isPrintMode ? <div className="print-value">{values.reasonForDelay || '___________________'}</div> :
											<Field name="reasonForDelay" as="textarea" className="form-textarea" rows="2" />}
										<ErrorMessage name="reasonForDelay" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Commitment Received</label>
										{isPrintMode ? <div className="print-value">{values.commitmentReceived || '___________________'}</div> :
											<Field name="commitmentReceived" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="commitmentReceived" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Committed Payment Date</label>
										{isPrintMode ? <div className="print-value">{values.committedPaymentDate || '___________________'}</div> :
											<Field name="committedPaymentDate" type="date" className="form-input" />}
										<ErrorMessage name="committedPaymentDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Committed Amount (if partial)</label>
										{isPrintMode ? <div className="print-value">{values.committedAmount || '___________________'}</div> :
											<Field name="committedAmount" className="form-input" />}
										<ErrorMessage name="committedAmount" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Next Action / Followup Plan</label>
										{isPrintMode ? <div className="print-value">{values.nextActionFollowupPlan || '___________________'}</div> :
											<Field name="nextActionFollowupPlan" as="textarea" className="form-textarea" rows="2" />}
										<ErrorMessage name="nextActionFollowupPlan" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Next Followup Required</label>
										{isPrintMode ? <div className="print-value">{values.nextFollowupRequired || '___________________'}</div> :
											<Field name="nextFollowupRequired" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="nextFollowupRequired" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Next Followup Date</label>
										{isPrintMode ? <div className="print-value">{values.nextFollowupDate || '___________________'}</div> :
											<Field name="nextFollowupDate" type="date" className="form-input" />}
										<ErrorMessage name="nextFollowupDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Responsible Owner</label>
										{isPrintMode ? <div className="print-value">{values.responsibleOwner || '___________________'}</div> :
											<Field name="responsibleOwner" className="form-input" />}
										<ErrorMessage name="responsibleOwner" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Supporting Notes / Attachments */}
							<div className="form-section">
								<h3 className="form-section-title">Supporting Notes / Attachments</h3>
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
												<option value="Email confirmation">Email confirmation</option>
												<option value="Call record">Call record</option>
												<option value="Other">Other</option>
											</Field>}
										<ErrorMessage name="attachmentType" component="div" className="form-error" />
									</div>

									{/* Dynamic local attachments list */}
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
															<span className="file-name">
																{att.fileName}
															</span>
															<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>
																Remove
															</button>
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

							{/* Call Log Control */}
							<div className="form-section">
								<h3 className="form-section-title">Call Log Control</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Logged By</label>
										{isPrintMode ? <div className="print-value">{values.loggedBy || '___________________'}</div> :
											<Field name="loggedBy" className="form-input" />}
										<ErrorMessage name="loggedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Logged Date</label>
										{isPrintMode ? <div className="print-value">{values.loggedDate || '___________________'}</div> :
											<Field name="loggedDate" type="date" className="form-input" />}
										<ErrorMessage name="loggedDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Record Status</label>
										{isPrintMode ? <div className="print-value">{values.recordStatus || '___________________'}</div> :
											<Field name="recordStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Open">Open</option>
												<option value="Closed">Closed</option>
											</Field>}
										<ErrorMessage name="recordStatus" component="div" className="form-error" />
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

export default PaymentFollowupCallForm;
