// ContracttoCashControlsChecklistForm.jsx

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

	// Contract & Client Context
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	contractAgreementReference: Yup.string().required('Required'),
	projectEngagementName: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),

	// Contract Setup & Master Data Controls
	contractApprovedSigned: Yup.string().required('Required'),
	rateCardApproved: Yup.string().required('Required'),
	taxBillingProfileVerified: Yup.string().required('Required'),
	billingFrequencyTemplateConfigured: Yup.string().required('Required'),
	poCommercialMapped: Yup.string().required('Required'),

	// Delivery & Usage Capture Controls
	captureProcessDefined: Yup.string().required('Required'),
	sourceSystemsAvailable: Yup.string().required('Required'),
	dataValidationRulesDefined: Yup.string().required('Required'),
	exceptionHandlingDefined: Yup.string().required('Required'),

	// Billing & Invoicing Controls
	rateQuantityValidationPerformed: Yup.string().required('Required'),
	invoiceChecklistCompleted: Yup.string().required('Required'),
	taxComplianceChecksCompleted: Yup.string().required('Required'),
	invoiceWorkflowConfigured: Yup.string().required('Required'),

	// Collections & Receipts Controls
	receiptConfirmationProcessDefined: Yup.string().required('Required'),
	receiptAllocationRulesDefined: Yup.string().required('Required'),
	shortExcessInvestigationProcessDefined: Yup.string().required('Required'),
	followupEscalationProcessDefined: Yup.string().required('Required'),

	// Revenue Recognition & Accounting Controls
	revenueRecognitionModelDefined: Yup.string().required('Required'),
	performanceObligationsIdentified: Yup.string().required('Required'),
	revenueReconciliationDefined: Yup.string().required('Required'),
	revenueHandoverPackProcessDefined: Yup.string().required('Required'),

	// Change, Exception & Leakage Controls
	revenueLeakageChecksPlanned: Yup.string().required('Required'),
	contractPricingChangeControlDefined: Yup.string().required('Required'),
	creditDebitControlsDefined: Yup.string().required('Required'),
	writeoffSettlementControlsDefined: Yup.string().required('Required'),

	// Supporting Documents
	sopsAttached: Yup.string().required('Required'),
	processFlowAttached: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Checklist Result
	overallControlStatus: Yup.string().required('Required'),
	controlGapsRemarks: Yup.string().required('Required'),

	// Checklist Control
	checkedBy: Yup.string().required('Required'),
	checkedDate: Yup.string().required('Required'),
	readyForGoLive: Yup.string().required('Required'),
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
	contractAgreementReference: '',
	projectEngagementName: '',
	billingEntityLocation: '',

	contractApprovedSigned: '',
	rateCardApproved: '',
	taxBillingProfileVerified: '',
	billingFrequencyTemplateConfigured: '',
	poCommercialMapped: '',

	captureProcessDefined: '',
	sourceSystemsAvailable: '',
	dataValidationRulesDefined: '',
	exceptionHandlingDefined: '',

	rateQuantityValidationPerformed: '',
	invoiceChecklistCompleted: '',
	taxComplianceChecksCompleted: '',
	invoiceWorkflowConfigured: '',

	receiptConfirmationProcessDefined: '',
	receiptAllocationRulesDefined: '',
	shortExcessInvestigationProcessDefined: '',
	followupEscalationProcessDefined: '',

	revenueRecognitionModelDefined: '',
	performanceObligationsIdentified: '',
	revenueReconciliationDefined: '',
	revenueHandoverPackProcessDefined: '',

	revenueLeakageChecksPlanned: '',
	contractPricingChangeControlDefined: '',
	creditDebitControlsDefined: '',
	writeoffSettlementControlsDefined: '',

	sopsAttached: '',
	processFlowAttached: '',
	attachmentReferenceFileName: '',

	overallControlStatus: '',
	controlGapsRemarks: '',

	checkedBy: '',
	checkedDate: '',
	readyForGoLive: '',
	recordStatus: '',

	attachments: [],
	customFields: [],
	signatures: []

};

const ContracttoCashControlsChecklistForm = () => {

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

	const yesNoNA = (name, label) => (
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
						<option value="NA">NA</option>
					</Field>
					<ErrorMessage name={name} component="div" className="form-error" />
				</>
			)}
		</div>
	);

	return (

		<ModernFormWrapper
			formId="FRM-02586"
			title="Contract to Cash Controls Checklist"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Contract to cash checklist saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02586"
							title="Contract to Cash Controls Checklist – Basic Form"
							department="Client Billing & Revenue Operations"
						>

							<div className="form-section">
								<h3 className="form-section-title">Contract & Client Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'contractAgreementReference','Contract / Agreement Reference')}
									{renderField(values,'projectEngagementName','Project / Engagement Name')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Contract Setup & Master Data Controls</h3>
								<div className="form-fields">
									{yesNoNA('contractApprovedSigned','Contract approved and signed')}
									{yesNoNA('rateCardApproved','Rate card / price plan approved')}
									{yesNoNA('taxBillingProfileVerified','Tax profile and billing profile verified')}
									{yesNoNA('billingFrequencyTemplateConfigured','Billing frequency and invoice template configured')}
									{yesNoNA('poCommercialMapped','PO / commercial references mapped')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Delivery & Usage Capture Controls</h3>
								<div className="form-fields">
									{yesNoNA('captureProcessDefined','Timesheet / usage / milestone capture process defined')}
									{yesNoNA('sourceSystemsAvailable','Source systems integrated / available')}
									{yesNoNA('dataValidationRulesDefined','Data validation rules defined')}
									{yesNoNA('exceptionHandlingDefined','Exception handling process defined')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Billing & Invoicing Controls</h3>
								<div className="form-fields">
									{yesNoNA('rateQuantityValidationPerformed','Rate and quantity validation performed')}
									{yesNoNA('invoiceChecklistCompleted','Invoice issuance checklist completed')}
									{yesNoNA('taxComplianceChecksCompleted','Tax and compliance checks completed')}
									{yesNoNA('invoiceWorkflowConfigured','Invoice approval workflow configured')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Collections & Receipts Controls</h3>
								<div className="form-fields">
									{yesNoNA('receiptConfirmationProcessDefined','Receipt confirmation process defined')}
									{yesNoNA('receiptAllocationRulesDefined','Receipt allocation rules defined')}
									{yesNoNA('shortExcessInvestigationProcessDefined','Short / excess payment investigation process defined')}
									{yesNoNA('followupEscalationProcessDefined','Follow-up and escalation process defined')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Revenue Recognition & Accounting Controls</h3>
								<div className="form-fields">
									{yesNoNA('revenueRecognitionModelDefined','Revenue recognition model defined')}
									{yesNoNA('performanceObligationsIdentified','Performance obligations identified')}
									{yesNoNA('revenueReconciliationDefined','Billing and revenue reconciliation defined')}
									{yesNoNA('revenueHandoverPackProcessDefined','Revenue handover pack process defined')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Change, Exception & Leakage Controls</h3>
								<div className="form-fields">
									{yesNoNA('revenueLeakageChecksPlanned','Revenue leakage checks planned')}
									{yesNoNA('contractPricingChangeControlDefined','Contract / pricing change control defined')}
									{yesNoNA('creditDebitControlsDefined','Credit / debit note controls defined')}
									{yesNoNA('writeoffSettlementControlsDefined','Write-off and settlement controls defined')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents</h3>
								<div className="form-fields">

									{yesNoNA('sopsAttached','Key SOPs / policies attached')}
									{yesNoNA('processFlowAttached','Process flow / control matrix attached')}

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

									{renderField(values,'attachmentReferenceFileName','Attachment reference / file name')}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Checklist Result</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Overall control status</label>
										{isPrintMode ? <div className="print-value">{values.overallControlStatus || '___________________'}</div> :
											<>
												<Field name="overallControlStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Pass">Pass</option>
													<option value="Partial">Partial</option>
													<option value="Fail">Fail</option>
												</Field>
												<ErrorMessage name="overallControlStatus" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Control gaps / remarks</label>
										{isPrintMode ? <div className="print-value">{values.controlGapsRemarks || '___________________'}</div> :
											<>
												<Field name="controlGapsRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="controlGapsRemarks" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Checklist Control</h3>
								<div className="form-fields">

									{renderField(values,'checkedBy','Checked By')}
									{renderField(values,'checkedDate','Checked Date','date')}

									<div className="form-field">
										<label className="form-label required">Ready for operational go-live</label>
										{isPrintMode ? <div className="print-value">{values.readyForGoLive || '___________________'}</div> :
											<>
												<Field name="readyForGoLive" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="readyForGoLive" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'recordStatus','Record Status')}

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

export default ContracttoCashControlsChecklistForm;
