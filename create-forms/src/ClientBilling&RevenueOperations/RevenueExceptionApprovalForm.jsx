// RevenueExceptionApprovalForm.jsx

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

	// Client & Business Context
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	projectContractReference: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),
	exceptionReferenceNo: Yup.string().required('Required'),

	// Exception Details
	exceptionType: Yup.string().required('Required'),
	exceptionDetectedDate: Yup.string().required('Required'),
	exceptionDetectedBy: Yup.string().required('Required'),
	exceptionDescription: Yup.string().required('Required'),
	periodFrom: Yup.string().required('Required'),
	periodTo: Yup.string().required('Required'),
	invoicesTransactionsAffected: Yup.string().required('Required'),

	// Financial Impact
	estimatedImpactAmount: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	impactType: Yup.string().required('Required'),

	// Root Cause & Control Failure
	rootCauseCategory: Yup.string().required('Required'),
	controlFailureIdentified: Yup.string().required('Required'),
	controlFailureDescription: Yup.string().required('Required'),

	// Corrective & Preventive Action
	immediateCorrectionRequired: Yup.string().required('Required'),
	correctionDescription: Yup.string().required('Required'),
	preventiveControlImprovement: Yup.string().required('Required'),
	responsibleOwner: Yup.string().required('Required'),
	targetClosureDate: Yup.string().required('Required'),

	// Supporting Documents
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Approval
	approvalDecision: Yup.string().required('Required'),
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
	projectContractReference: '',
	billingEntityLocation: '',
	exceptionReferenceNo: '',

	exceptionType: '',
	exceptionDetectedDate: '',
	exceptionDetectedBy: '',
	exceptionDescription: '',
	periodFrom: '',
	periodTo: '',
	invoicesTransactionsAffected: '',

	estimatedImpactAmount: '',
	currency: '',
	impactType: '',

	rootCauseCategory: '',
	controlFailureIdentified: '',
	controlFailureDescription: '',

	immediateCorrectionRequired: '',
	correctionDescription: '',
	preventiveControlImprovement: '',
	responsibleOwner: '',
	targetClosureDate: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	approvalDecision: '',
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

const RevenueExceptionApprovalForm = () => {

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
			formId="FRM-02591"
			title="Revenue Exception Approval – Basic Form"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Revenue exception approval saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02591"
							title="Revenue Exception Approval – Basic Form"
							department="Client Billing & Revenue Operations"
						>

							<div className="form-section">
								<h3 className="form-section-title">Client & Business Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'projectContractReference','Project / Contract Reference')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
									{renderField(values,'exceptionReferenceNo','Exception ID / Reference No')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Exception Description & Scope</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Exception Type</label>
										{isPrintMode ? <div className="print-value">{values.exceptionType || '___________________'}</div> :
											<>
												<Field name="exceptionType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Billing">Billing</option>
													<option value="Revenue">Revenue</option>
													<option value="Tax">Tax</option>
													<option value="Pricing">Pricing</option>
													<option value="Data">Data</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="exceptionType" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'exceptionDetectedDate','Exception Detected Date','date')}
									{renderField(values,'exceptionDetectedBy','Exception Detected By')}

									<div className="form-field full-width">
										<label className="form-label required">Detailed Description of Exception</label>
										{isPrintMode ? <div className="print-value">{values.exceptionDescription || '___________________'}</div> :
											<>
												<Field name="exceptionDescription" as="textarea" className="form-textarea" rows="3" />
												<ErrorMessage name="exceptionDescription" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'periodFrom','Period Affected From','date')}
									{renderField(values,'periodTo','Period Affected To','date')}
									{renderField(values,'invoicesTransactionsAffected','Invoices / Transactions Affected')}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Financial Impact Assessment</h3>
								<div className="form-fields">

									{renderField(values,'estimatedImpactAmount','Estimated Revenue Impact Amount')}
									{renderField(values,'currency','Currency')}

									<div className="form-field">
										<label className="form-label required">Impact Type</label>
										{isPrintMode ? <div className="print-value">{values.impactType || '___________________'}</div> :
											<>
												<Field name="impactType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Understatement">Understatement</option>
													<option value="Overstatement">Overstatement</option>
													<option value="Timing">Timing</option>
												</Field>
												<ErrorMessage name="impactType" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Root Cause & Control Failure</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Root Cause Category</label>
										{isPrintMode ? <div className="print-value">{values.rootCauseCategory || '___________________'}</div> :
											<>
												<Field name="rootCauseCategory" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Process">Process</option>
													<option value="System">System</option>
													<option value="Master data">Master data</option>
													<option value="Human error">Human error</option>
												</Field>
												<ErrorMessage name="rootCauseCategory" component="div" className="form-error" />
											</>
										}
									</div>

									{yesNo(values,'controlFailureIdentified','Control Failure Identified')}

									<div className="form-field full-width">
										<label className="form-label required">Control Failure Description</label>
										{isPrintMode ? <div className="print-value">{values.controlFailureDescription || '___________________'}</div> :
											<>
												<Field name="controlFailureDescription" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="controlFailureDescription" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Corrective & Preventive Action Plan</h3>
								<div className="form-fields">

									{yesNo(values,'immediateCorrectionRequired','Immediate Correction Required')}

									<div className="form-field full-width">
										<label className="form-label required">Correction / Adjustment Description</label>
										{isPrintMode ? <div className="print-value">{values.correctionDescription || '___________________'}</div> :
											<>
												<Field name="correctionDescription" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="correctionDescription" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Preventive Control Improvement</label>
										{isPrintMode ? <div className="print-value">{values.preventiveControlImprovement || '___________________'}</div> :
											<>
												<Field name="preventiveControlImprovement" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="preventiveControlImprovement" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'responsibleOwner','Responsible Owner')}
									{renderField(values,'targetClosureDate','Target Closure Date','date')}

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
													<option value="Reports">Reports</option>
													<option value="Extracts">Extracts</option>
													<option value="Calculations">Calculations</option>
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
								<h3 className="form-section-title">Approval / Authorization</h3>
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

export default RevenueExceptionApprovalForm;
