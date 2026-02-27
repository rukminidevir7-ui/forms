// WriteoffProposalRequestApprovalForm.jsx

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

	// Invoice & Outstanding Reference
	invoiceNumbers: Yup.string().required('Required'),
	invoiceDates: Yup.string().required('Required'),
	invoiceAmount: Yup.string().required('Required'),
	outstandingWriteoffAmount: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	overdueDaysAgingBucket: Yup.string().required('Required'),

	// Collection & Recovery History
	numberOfFollowupsCompleted: Yup.string().required('Required'),
	lastFollowupDate: Yup.string().required('Required'),
	escalationAttempted: Yup.string().required('Required'),
	legalRecoveryAttempted: Yup.string().required('Required'),

	// Write-off Proposal Details
	writeoffReason: Yup.string().required('Required'),
	rootCauseCategory: Yup.string().required('Required'),
	recoveryStillPossible: Yup.string().required('Required'),
	proposedWriteoffAmount: Yup.string().required('Required'),
	proposedWriteoffDate: Yup.string().required('Required'),
	detailedJustification: Yup.string().required('Required'),

	// Accounting & Control Impact
	provisionAlreadyCreated: Yup.string().required('Required'),
	glCostCenterReference: Yup.string().required('Required'),
	impactRemarks: Yup.string().required('Required'),

	// Attachment header
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Request
	proposedRequestedBy: Yup.string().required('Required'),
	requestDate: Yup.string().required('Required'),

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
	outstandingWriteoffAmount: '',
	currency: '',
	overdueDaysAgingBucket: '',

	numberOfFollowupsCompleted: '',
	lastFollowupDate: '',
	escalationAttempted: '',
	legalRecoveryAttempted: '',

	writeoffReason: '',
	rootCauseCategory: '',
	recoveryStillPossible: '',
	proposedWriteoffAmount: '',
	proposedWriteoffDate: '',

	detailedJustification: '',

	provisionAlreadyCreated: '',
	glCostCenterReference: '',
	impactRemarks: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	proposedRequestedBy: '',
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

const WriteoffProposalRequestApprovalForm = () => {

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
			formId="FRM-02573-02574"
			title="Write-off Proposal – Request & Approval"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Write-off proposal saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02573 / FRM-02574"
							title="Write-off Proposal – Combined Basic Form"
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
								<h3 className="form-section-title">Invoice & Outstanding Reference</h3>
								<div className="form-fields">
									{renderField(values,'invoiceNumbers','Invoice Number(s)')}
									{renderField(values,'invoiceDates','Invoice Date(s)')}
									{renderField(values,'invoiceAmount','Invoice Amount')}
									{renderField(values,'outstandingWriteoffAmount','Outstanding Amount Proposed for Write-off')}
									{renderField(values,'currency','Currency')}
									{renderField(values,'overdueDaysAgingBucket','Overdue Days / Aging Bucket')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Collection & Recovery History</h3>
								<div className="form-fields">
									{renderField(values,'numberOfFollowupsCompleted','Number of Follow-ups Completed')}
									{renderField(values,'lastFollowupDate','Last Follow-up Date','date')}

									{[
										['escalationAttempted','Escalation Attempted'],
										['legalRecoveryAttempted','Legal / External Recovery Attempted']
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
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Write-off Proposal Details</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Write-off Reason</label>
										{isPrintMode ? <div className="print-value">{values.writeoffReason || '___________________'}</div> :
											<>
												<Field name="writeoffReason" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Unrecoverable">Unrecoverable</option>
													<option value="Client closed">Client closed</option>
													<option value="Dispute lost">Dispute lost</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="writeoffReason" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'rootCauseCategory','Root Cause Category')}

									<div className="form-field">
										<label className="form-label required">Recovery Still Possible</label>
										{isPrintMode ? <div className="print-value">{values.recoveryStillPossible || '___________________'}</div> :
											<>
												<Field name="recoveryStillPossible" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="recoveryStillPossible" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'proposedWriteoffAmount','Proposed Write-off Amount')}
									{renderField(values,'proposedWriteoffDate','Proposed Write-off Date','date')}

									<div className="form-field full-width">
										<label className="form-label required">Detailed Justification</label>
										{isPrintMode ? <div className="print-value">{values.detailedJustification || '___________________'}</div> :
											<>
												<Field name="detailedJustification" as="textarea" className="form-textarea" rows="3" />
												<ErrorMessage name="detailedJustification" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Accounting & Control Impact</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Provision Already Created</label>
										{isPrintMode ? <div className="print-value">{values.provisionAlreadyCreated || '___________________'}</div> :
											<>
												<Field name="provisionAlreadyCreated" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="provisionAlreadyCreated" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'glCostCenterReference','GL / Cost Center Reference')}

									<div className="form-field full-width">
										<label className="form-label required">Impact Remarks</label>
										{isPrintMode ? <div className="print-value">{values.impactRemarks || '___________________'}</div> :
											<>
												<Field name="impactRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="impactRemarks" component="div" className="form-error" />
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
											<option value="Call logs">Call logs</option>
											<option value="Emails">Emails</option>
											<option value="Legal notice">Legal notice</option>
											<option value="Approval note">Approval note</option>
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
									{renderField(values,'proposedRequestedBy','Proposed / Requested By')}
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
										<label className="form-label required">Approval Remarks / Conditions</label>
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

export default WriteoffProposalRequestApprovalForm;
