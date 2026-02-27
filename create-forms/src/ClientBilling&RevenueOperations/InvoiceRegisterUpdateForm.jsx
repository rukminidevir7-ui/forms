// InvoiceRegisterUpdateForm.jsx

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
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	projectContractReference: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),

	invoiceRegisterReference: Yup.string().required('Required'),
	invoiceNumber: Yup.string().required('Required'),
	invoiceDate: Yup.string().required('Required'),
	invoiceType: Yup.string().required('Required'),
	invoiceAmount: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	billingPeriod: Yup.string().required('Required'),

	// Register Update Details
	fieldUpdated: Yup.string().required('Required'),
	oldValue: Yup.string().required('Required'),
	newValue: Yup.string().required('Required'),
	reasonForUpdate: Yup.string().required('Required'),

	// Impact Assessment
	financialImpact: Yup.string().required('Required'),
	taxImpact: Yup.string().required('Required'),
	accountingPostingImpact: Yup.string().required('Required'),
	impactRemarks: Yup.string().required('Required'),

	// Attachments
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Change Log Information
	changeTicketReference: Yup.string().required('Required'),
	updatedBy: Yup.string().required('Required'),
	updatedDate: Yup.string().required('Required'),

	// Verification & Control
	verifiedBy: Yup.string().required('Required'),
	verificationDate: Yup.string().required('Required'),
	recordStatus: Yup.string().required('Required'),

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
	projectContractReference: '',
	billingEntityLocation: '',

	invoiceRegisterReference: '',
	invoiceNumber: '',
	invoiceDate: '',
	invoiceType: '',
	invoiceAmount: '',
	currency: '',
	billingPeriod: '',

	fieldUpdated: '',
	oldValue: '',
	newValue: '',
	reasonForUpdate: '',

	financialImpact: '',
	taxImpact: '',
	accountingPostingImpact: '',
	impactRemarks: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	changeTicketReference: '',
	updatedBy: '',
	updatedDate: '',

	verifiedBy: '',
	verificationDate: '',
	recordStatus: '',

	customFields: [],
	signatures: []
};

const InvoiceRegisterUpdateForm = () => {

	const { isPrintMode } = usePrintMode();

	return (

		<ModernFormWrapper
			formId="FRM-02550"
			title="Invoice Register Update – Log / Register"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Invoice register update saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02550"
							title="Invoice Register Update – Log / Register"
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
										['billingEntityLocation', 'Billing Entity / Location'],
										['invoiceRegisterReference', 'Invoice Register Reference'],
										['invoiceNumber', 'Invoice Number']
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
										<label className="form-label required">Invoice Date</label>
										{isPrintMode ? <div className="print-value">{values.invoiceDate || '___________________'}</div> :
											<Field name="invoiceDate" type="date" className="form-input" />}
										<ErrorMessage name="invoiceDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Invoice Type</label>
										{isPrintMode ? <div className="print-value">{values.invoiceType || '___________________'}</div> :
											<Field name="invoiceType" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="T&M">T&M</option>
												<option value="Milestone">Milestone</option>
												<option value="Usage">Usage</option>
											</Field>}
										<ErrorMessage name="invoiceType" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Invoice Amount</label>
										{isPrintMode ? <div className="print-value">{values.invoiceAmount || '___________________'}</div> :
											<Field name="invoiceAmount" className="form-input" />}
										<ErrorMessage name="invoiceAmount" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Currency</label>
										{isPrintMode ? <div className="print-value">{values.currency || '___________________'}</div> :
											<Field name="currency" className="form-input" />}
										<ErrorMessage name="currency" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Billing Period</label>
										{isPrintMode ? <div className="print-value">{values.billingPeriod || '___________________'}</div> :
											<Field name="billingPeriod" className="form-input" />}
										<ErrorMessage name="billingPeriod" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Register Update Details */}
							<div className="form-section">
								<h3 className="form-section-title">Register Update Details</h3>
								<div className="form-fields">

									{[
										['fieldUpdated', 'Field / Attribute Updated'],
										['oldValue', 'Old Value'],
										['newValue', 'New Value']
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

									<div className="form-field full-width">
										<label className="form-label required">Reason for Update</label>
										{isPrintMode ? <div className="print-value">{values.reasonForUpdate || '___________________'}</div> :
											<Field name="reasonForUpdate" as="textarea" rows="2" className="form-textarea" />}
										<ErrorMessage name="reasonForUpdate" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Impact Assessment */}
							<div className="form-section">
								<h3 className="form-section-title">Impact Assessment</h3>
								<div className="form-fields">

									{[
										['financialImpact', 'Financial Impact'],
										['taxImpact', 'Tax Impact'],
										['accountingPostingImpact', 'Accounting / Posting Impact']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<Field name={n} as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>}
											<ErrorMessage name={n} component="div" className="form-error" />
										</div>
									))}

									<div className="form-field full-width">
										<label className="form-label required">Impact Remarks</label>
										{isPrintMode ? <div className="print-value">{values.impactRemarks || '___________________'}</div> :
											<Field name="impactRemarks" as="textarea" rows="2" className="form-textarea" />}
										<ErrorMessage name="impactRemarks" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Attachments */}
							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents / Attachments</h3>
								<div className="form-fields">

									{[
										['attachmentRequired', 'Attachment Required'],
										['attachmentUploaded', 'Attachment Uploaded']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<Field name={n} as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>}
											<ErrorMessage name={n} component="div" className="form-error" />
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">Attachment Type</label>
										{isPrintMode ? <div className="print-value">{values.attachmentType || '___________________'}</div> :
											<Field name="attachmentType" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Approval mail">Approval mail</option>
												<option value="Correction note">Correction note</option>
												<option value="System report">System report</option>
												<option value="Other">Other</option>
											</Field>}
										<ErrorMessage name="attachmentType" component="div" className="form-error" />
									</div>

									{/* Local file upload */}
									<div className="form-field">
										<label className="form-label">Upload Attachment</label>
										{isPrintMode ? (
											<div className="print-value">{values.attachmentReferenceFileName || '___________________'}</div>
										) : (
											<input
												type="file"
												className="form-input"
												onChange={(e) => {
													const file = e.currentTarget.files[0];
													if (file) {
														setFieldValue('attachmentUploaded', 'Yes');
														setFieldValue('attachmentReferenceFileName', file.name);
													}
												}}
											/>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Attachment Reference / File Name</label>
										{isPrintMode ? <div className="print-value">{values.attachmentReferenceFileName || '___________________'}</div> :
											<Field name="attachmentReferenceFileName" className="form-input" />}
										<ErrorMessage name="attachmentReferenceFileName" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Change Log Information */}
							<div className="form-section">
								<h3 className="form-section-title">Change Log Information</h3>
								<div className="form-fields">

									{[
										['changeTicketReference', 'Change / Ticket Reference No'],
										['updatedBy', 'Updated By']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<Field name={n} className="form-input" />}
											<ErrorMessage name={n} component="div" className="form-error" />
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">Updated Date</label>
										{isPrintMode ? <div className="print-value">{values.updatedDate || '___________________'}</div> :
											<Field name="updatedDate" type="date" className="form-input" />}
										<ErrorMessage name="updatedDate" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Verification & Control */}
							<div className="form-section">
								<h3 className="form-section-title">Verification & Control</h3>
								<div className="form-fields">

									{[
										['verifiedBy', 'Verified By']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<Field name={n} className="form-input" />}
											<ErrorMessage name={n} component="div" className="form-error" />
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">Verification Date</label>
										{isPrintMode ? <div className="print-value">{values.verificationDate || '___________________'}</div> :
											<Field name="verificationDate" type="date" className="form-input" />}
										<ErrorMessage name="verificationDate" component="div" className="form-error" />
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

export default InvoiceRegisterUpdateForm;
