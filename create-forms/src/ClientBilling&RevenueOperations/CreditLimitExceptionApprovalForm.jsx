// CreditLimitExceptionApprovalForm.jsx

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
	exceptionRequestReferenceNo: Yup.string().required('Required'),

	// Exception Header
	exceptionType: Yup.string().required('Required'),
	requestedBy: Yup.string().required('Required'),
	requestDate: Yup.string().required('Required'),

	// Current Credit Position
	currentCreditPosition: Yup.string().required('Required'),
	approvedCreditLimit: Yup.string().required('Required'),
	currentOutstandingBalance: Yup.string().required('Required'),
	utilizedCreditPercentage: Yup.string().required('Required'),
	overLimitAmount: Yup.string().required('Required'),

	// Exception Request Details
	requestedCreditLimitAmount: Yup.string().required('Required'),
	validityFrom: Yup.string().required('Required'),
	validityTo: Yup.string().required('Required'),
	reasonForException: Yup.string().required('Required'),

	// Risk & Control Assessment
	customerRiskCategory: Yup.string().required('Required'),
	paymentHistorySummary: Yup.string().required('Required'),
	openDisputes: Yup.string().required('Required'),
	overdueInvoices: Yup.string().required('Required'),

	// Impact & Mitigation
	potentialExposureImpact: Yup.string().required('Required'),
	mitigationActions: Yup.string().required('Required'),

	// Supporting Documents
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Approval
	approvalDecision: Yup.string().required('Required'),
	approvedCreditLimitAmount: Yup.string().required('Required'),
	approvedValidityPeriod: Yup.string().required('Required'),
	approvedBy: Yup.string().required('Required'),
	approvalDate: Yup.string().required('Required'),
	approvalRemarks: Yup.string().required('Required'),

	// Operational Control
	recordStatus: Yup.string().required('Required'),
	createdBy: Yup.string().required('Required'),
	createdDate: Yup.string().required('Required'),
	lastUpdatedBy: Yup.string().required('Required'),
	lastUpdatedDate: Yup.string().required('Required'),

	attachments: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			fileName: Yup.string().required('File required'),
			fileType: Yup.string(),
			fileData: Yup.mixed()
		})
	),

	customFields: Yup.array().of(
		Yup.object({
			fieldName: Yup.string().required('Required'),
			fieldValue: Yup.string().required('Required')
		})
	),

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
	exceptionRequestReferenceNo: '',

	exceptionType: '',
	requestedBy: '',
	requestDate: '',

	currentCreditPosition: '',
	approvedCreditLimit: '',
	currentOutstandingBalance: '',
	utilizedCreditPercentage: '',
	overLimitAmount: '',

	requestedCreditLimitAmount: '',
	validityFrom: '',
	validityTo: '',
	reasonForException: '',

	customerRiskCategory: '',
	paymentHistorySummary: '',
	openDisputes: '',
	overdueInvoices: '',

	potentialExposureImpact: '',
	mitigationActions: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	approvalDecision: '',
	approvedCreditLimitAmount: '',
	approvedValidityPeriod: '',
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

const CreditLimitExceptionApprovalForm = () => {

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

	const yesNo = (values, name, label) => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode ? (
				<div className="print-value">{values[name] || '___________________'}</div>
			) : (
				<>
					<Field name={name} as="select" className="form-input">
						<option value="">-- Select --</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</Field>
					<ErrorMessage name={name} component="div" className="form-error" />
				</>
			)}
		</div>
	);

	return (

		<ModernFormWrapper
			formId="FRM-02592"
			title="Credit Limit Exception Approval – Basic Form"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Credit limit exception approval saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02592"
							title="Credit Limit Exception Approval – Basic Form"
							department="Client Billing & Revenue Operations"
						>

							<div className="form-section">
								<h3 className="form-section-title">Client and Account Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'customerAccountReference','Customer / Account Reference')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
									{renderField(values,'exceptionRequestReferenceNo','Exception Request ID / Reference No')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Exception Header</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Exception Type</label>
										{isPrintMode ? <div className="print-value">{values.exceptionType || '___________________'}</div> :
											<>
												<Field name="exceptionType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Temporary override">Temporary override</option>
													<option value="Permanent increase">Permanent increase</option>
													<option value="Special case">Special case</option>
												</Field>
												<ErrorMessage name="exceptionType" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'requestedBy','Requested By')}
									{renderField(values,'requestDate','Request Date','date')}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Current Credit Position</h3>
								<div className="form-fields">
									{renderField(values,'currentCreditPosition','Current Credit Position')}
									{renderField(values,'approvedCreditLimit','Approved Credit Limit')}
									{renderField(values,'currentOutstandingBalance','Current Outstanding Balance')}
									{renderField(values,'utilizedCreditPercentage','Utilized Credit Percentage')}
									{renderField(values,'overLimitAmount','Over-limit Amount')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Exception Request Details</h3>
								<div className="form-fields">

									{renderField(values,'requestedCreditLimitAmount','Requested Credit Limit / Override Amount')}
									{renderField(values,'validityFrom','Validity Period From','date')}
									{renderField(values,'validityTo','Validity Period To','date')}

									<div className="form-field full-width">
										<label className="form-label required">Reason for Credit Limit Exception</label>
										{isPrintMode ? <div className="print-value">{values.reasonForException || '___________________'}</div> :
											<>
												<Field name="reasonForException" as="textarea" className="form-textarea" rows="3" />
												<ErrorMessage name="reasonForException" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Risk and Control Assessment</h3>
								<div className="form-fields">

									{renderField(values,'customerRiskCategory','Customer Risk Category')}

									<div className="form-field full-width">
										<label className="form-label required">Payment Behaviour / History Summary</label>
										{isPrintMode ? <div className="print-value">{values.paymentHistorySummary || '___________________'}</div> :
											<>
												<Field name="paymentHistorySummary" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="paymentHistorySummary" component="div" className="form-error" />
											</>
										}
									</div>

									{yesNo(values,'openDisputes','Any Open Disputes')}
									{yesNo(values,'overdueInvoices','Any Overdue Invoices')}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Impact and Mitigation</h3>
								<div className="form-fields">

									{renderField(values,'potentialExposureImpact','Potential Revenue / Exposure Impact')}

									<div className="form-field full-width">
										<label className="form-label required">Mitigation Actions</label>
										{isPrintMode ? <div className="print-value">{values.mitigationActions || '___________________'}</div> :
											<>
												<Field name="mitigationActions" as="textarea" className="form-textarea" rows="2" placeholder="Advance payment / PDC / Guarantee / Others" />
												<ErrorMessage name="mitigationActions" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents / Evidence</h3>
								<div className="form-fields">

									{yesNo(values,'attachmentRequired','Attachment Required')}

									<div className="form-field">
										<label className="form-label required">Attachment Type</label>
										{isPrintMode ? <div className="print-value">{values.attachmentType || '___________________'}</div> :
											<>
												<Field name="attachmentType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="AR aging">AR aging</option>
													<option value="Payment history">Payment history</option>
													<option value="Approvals">Approvals</option>
													<option value="Emails">Emails</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="attachmentType" component="div" className="form-error" />
											</>
										}
									</div>

									{yesNo(values,'attachmentUploaded','Attachment Uploaded')}

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

									{renderField(values,'attachmentReferenceFileName','Attachment Reference / File Name')}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Approval and Authorization</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Approval Decision</label>
										{isPrintMode ? <div className="print-value">{values.approvalDecision || '___________________'}</div> :
											<>
												<Field name="approvalDecision" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Approved">Approved</option>
													<option value="Rejected">Rejected</option>
													<option value="Returned">Returned</option>
												</Field>
												<ErrorMessage name="approvalDecision" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'approvedCreditLimitAmount','Approved Credit Limit / Override Amount')}
									{renderField(values,'approvedValidityPeriod','Approved Validity Period')}
									{renderField(values,'approvedBy','Approved By')}
									{renderField(values,'approvalDate','Approval Date','date')}

									<div className="form-field full-width">
										<label className="form-label required">Approval Remarks / Conditions</label>
										{isPrintMode ? <div className="print-value">{values.approvalRemarks || '___________________'}</div> :
											<>
												<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="approvalRemarks" component="div" className="form-error" />
											</>
										}
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

export default CreditLimitExceptionApprovalForm;
