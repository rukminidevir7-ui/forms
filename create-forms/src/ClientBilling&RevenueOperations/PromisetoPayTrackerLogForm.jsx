// PromisetoPayTrackerLogForm.jsx

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
	outstandingAmountAtPromiseDate: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	dueDate: Yup.string().required('Required'),

	// Promise-to-Pay Details
	promiseReferenceId: Yup.string().required('Required'),
	promiseReceivedDate: Yup.string().required('Required'),
	committedPaymentDate: Yup.string().required('Required'),
	committedAmount: Yup.string().required('Required'),
	paymentMode: Yup.string().required('Required'),
	commitmentGivenBy: Yup.string().required('Required'),

	// Follow-up & Status Tracking
	followupRequired: Yup.string().required('Required'),
	nextFollowupDate: Yup.string().required('Required'),
	currentPtpStatus: Yup.string().required('Required'),
	actualPaymentReceived: Yup.string().required('Required'),
	actualPaymentDate: Yup.string().required('Required'),
	actualAmountReceived: Yup.string().required('Required'),

	// Exception / Deviation Handling
	ptpBroken: Yup.string().required('Required'),
	reasonForNonPaymentDelay: Yup.string().required('Required'),
	revisedPromiseDate: Yup.string().required('Required'),
	revisedAmount: Yup.string().required('Required'),

	// Attachments (header)
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Tracker Control
	loggedUpdatedBy: Yup.string().required('Required'),
	lastUpdatedDate: Yup.string().required('Required'),
	recordStatus: Yup.string().required('Required'),

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
	outstandingAmountAtPromiseDate: '',
	currency: '',
	dueDate: '',

	promiseReferenceId: '',
	promiseReceivedDate: '',
	committedPaymentDate: '',
	committedAmount: '',
	paymentMode: '',
	commitmentGivenBy: '',

	followupRequired: '',
	nextFollowupDate: '',
	currentPtpStatus: '',
	actualPaymentReceived: '',
	actualPaymentDate: '',
	actualAmountReceived: '',

	ptpBroken: '',
	reasonForNonPaymentDelay: '',
	revisedPromiseDate: '',
	revisedAmount: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	loggedUpdatedBy: '',
	lastUpdatedDate: '',
	recordStatus: '',

	attachments: [],
	customFields: [],
	signatures: []
};

const PromisetoPayTrackerLogForm = () => {

	const { isPrintMode } = usePrintMode();

	return (

		<ModernFormWrapper
			formId="FRM-02556"
			title="Promise-to-Pay Tracker – Log / Register"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Promise-to-pay tracker saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02556"
							title="Promise-to-Pay Tracker – Log / Register"
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
										['outstandingAmountAtPromiseDate', 'Outstanding Amount at Promise Date'],
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

									<div className="form-field">
										<label className="form-label required">Due Date</label>
										{isPrintMode ? <div className="print-value">{values.dueDate || '___________________'}</div> :
											<Field name="dueDate" type="date" className="form-input" />}
										<ErrorMessage name="dueDate" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Promise-to-Pay Details */}
							<div className="form-section">
								<h3 className="form-section-title">Promise-to-Pay Details</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Promise Reference / PTP ID</label>
										{isPrintMode ? <div className="print-value">{values.promiseReferenceId || '___________________'}</div> :
											<Field name="promiseReferenceId" className="form-input" />}
										<ErrorMessage name="promiseReferenceId" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Promise Received Date</label>
										{isPrintMode ? <div className="print-value">{values.promiseReceivedDate || '___________________'}</div> :
											<Field name="promiseReceivedDate" type="date" className="form-input" />}
										<ErrorMessage name="promiseReceivedDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Committed Payment Date</label>
										{isPrintMode ? <div className="print-value">{values.committedPaymentDate || '___________________'}</div> :
											<Field name="committedPaymentDate" type="date" className="form-input" />}
										<ErrorMessage name="committedPaymentDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Committed Amount</label>
										{isPrintMode ? <div className="print-value">{values.committedAmount || '___________________'}</div> :
											<Field name="committedAmount" className="form-input" />}
										<ErrorMessage name="committedAmount" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Payment Mode</label>
										{isPrintMode ? <div className="print-value">{values.paymentMode || '___________________'}</div> :
											<Field name="paymentMode" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="NEFT">NEFT</option>
												<option value="RTGS">RTGS</option>
												<option value="Cheque">Cheque</option>
												<option value="Other">Other</option>
											</Field>}
										<ErrorMessage name="paymentMode" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Commitment Given By</label>
										{isPrintMode ? <div className="print-value">{values.commitmentGivenBy || '___________________'}</div> :
											<Field name="commitmentGivenBy" className="form-input" />}
										<ErrorMessage name="commitmentGivenBy" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Follow-up & Status Tracking */}
							<div className="form-section">
								<h3 className="form-section-title">Follow-up & Status Tracking</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Follow-up Required</label>
										{isPrintMode ? <div className="print-value">{values.followupRequired || '___________________'}</div> :
											<Field name="followupRequired" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="followupRequired" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Next Follow-up Date</label>
										{isPrintMode ? <div className="print-value">{values.nextFollowupDate || '___________________'}</div> :
											<Field name="nextFollowupDate" type="date" className="form-input" />}
										<ErrorMessage name="nextFollowupDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Current PTP Status</label>
										{isPrintMode ? <div className="print-value">{values.currentPtpStatus || '___________________'}</div> :
											<Field name="currentPtpStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Open">Open</option>
												<option value="Kept">Kept</option>
												<option value="Broken">Broken</option>
												<option value="Revised">Revised</option>
											</Field>}
										<ErrorMessage name="currentPtpStatus" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Actual Payment Received</label>
										{isPrintMode ? <div className="print-value">{values.actualPaymentReceived || '___________________'}</div> :
											<Field name="actualPaymentReceived" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="actualPaymentReceived" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Actual Payment Date</label>
										{isPrintMode ? <div className="print-value">{values.actualPaymentDate || '___________________'}</div> :
											<Field name="actualPaymentDate" type="date" className="form-input" />}
										<ErrorMessage name="actualPaymentDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Actual Amount Received</label>
										{isPrintMode ? <div className="print-value">{values.actualAmountReceived || '___________________'}</div> :
											<Field name="actualAmountReceived" className="form-input" />}
										<ErrorMessage name="actualAmountReceived" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Exception / Deviation Handling */}
							<div className="form-section">
								<h3 className="form-section-title">Exception / Deviation Handling</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">PTP Broken</label>
										{isPrintMode ? <div className="print-value">{values.ptpBroken || '___________________'}</div> :
											<Field name="ptpBroken" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>}
										<ErrorMessage name="ptpBroken" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Reason for Non-payment / Delay</label>
										{isPrintMode ? <div className="print-value">{values.reasonForNonPaymentDelay || '___________________'}</div> :
											<Field name="reasonForNonPaymentDelay" as="textarea" className="form-textarea" rows="2" />}
										<ErrorMessage name="reasonForNonPaymentDelay" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Revised Promise Date</label>
										{isPrintMode ? <div className="print-value">{values.revisedPromiseDate || '___________________'}</div> :
											<Field name="revisedPromiseDate" type="date" className="form-input" />}
										<ErrorMessage name="revisedPromiseDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Revised Amount</label>
										{isPrintMode ? <div className="print-value">{values.revisedAmount || '___________________'}</div> :
											<Field name="revisedAmount" className="form-input" />}
										<ErrorMessage name="revisedAmount" component="div" className="form-error" />
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
												<option value="Message">Message</option>
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

							{/* Tracker Control */}
							<div className="form-section">
								<h3 className="form-section-title">Tracker Control</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Logged / Updated By</label>
										{isPrintMode ? <div className="print-value">{values.loggedUpdatedBy || '___________________'}</div> :
											<Field name="loggedUpdatedBy" className="form-input" />}
										<ErrorMessage name="loggedUpdatedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Last Updated Date</label>
										{isPrintMode ? <div className="print-value">{values.lastUpdatedDate || '___________________'}</div> :
											<Field name="lastUpdatedDate" type="date" className="form-input" />}
										<ErrorMessage name="lastUpdatedDate" component="div" className="form-error" />
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

export default PromisetoPayTrackerLogForm;
