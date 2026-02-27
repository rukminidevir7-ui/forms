// CustomerSettlementAgreementChecklistForm.jsx

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

	// Customer & Account Context
	customerClientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	customerAccountReference: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),

	// Settlement Scope & Reference
	invoiceCaseDisputeReference: Yup.string().required('Required'),
	totalOutstandingBeforeSettlement: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	settlementType: Yup.string().required('Required'),

	// Settlement Commercial Terms Check
	agreedSettlementAmount: Yup.string().required('Required'),
	settlementStartDate: Yup.string().required('Required'),
	finalSettlementDate: Yup.string().required('Required'),
	installmentScheduleDefined: Yup.string().required('Required'),
	waiverConcessionIncluded: Yup.string().required('Required'),

	// Legal & Contract Checks
	settlementAgreementPrepared: Yup.string().required('Required'),
	authorizedSignatoriesIdentified: Yup.string().required('Required'),
	customerAcceptanceReceived: Yup.string().required('Required'),
	legalComplianceReviewCompleted: Yup.string().required('Required'),

	// Financial & Accounting Checks
	taxImpactAssessed: Yup.string().required('Required'),
	writeoffAdjustmentRequired: Yup.string().required('Required'),
	accountingTreatmentDefined: Yup.string().required('Required'),
	provisionImpactAssessed: Yup.string().required('Required'),

	// Risk & Control Checks
	creditRecoveryRiskReviewed: Yup.string().required('Required'),
	futureCreditRestrictionRequired: Yup.string().required('Required'),
	internalApprovalsObtained: Yup.string().required('Required'),

	// Supporting documents header
	settlementCopyAttached: Yup.string().required('Required'),
	supportingEmailsAttached: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Checklist result
	checklistStatus: Yup.string().required('Required'),
	checklistRemarks: Yup.string().required('Required'),

	// Checklist control
	checkedBy: Yup.string().required('Required'),
	checkedDate: Yup.string().required('Required'),
	readyToExecuteSettlement: Yup.string().required('Required'),
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

	customerClientName: '',
	clientCode: '',
	customerAccountReference: '',
	billingEntityLocation: '',

	invoiceCaseDisputeReference: '',
	totalOutstandingBeforeSettlement: '',
	currency: '',
	settlementType: '',

	agreedSettlementAmount: '',
	settlementStartDate: '',
	finalSettlementDate: '',
	installmentScheduleDefined: '',
	waiverConcessionIncluded: '',

	settlementAgreementPrepared: '',
	authorizedSignatoriesIdentified: '',
	customerAcceptanceReceived: '',
	legalComplianceReviewCompleted: '',

	taxImpactAssessed: '',
	writeoffAdjustmentRequired: '',
	accountingTreatmentDefined: '',
	provisionImpactAssessed: '',

	creditRecoveryRiskReviewed: '',
	futureCreditRestrictionRequired: '',
	internalApprovalsObtained: '',

	settlementCopyAttached: '',
	supportingEmailsAttached: '',
	attachmentReferenceFileName: '',

	checklistStatus: '',
	checklistRemarks: '',

	checkedBy: '',
	checkedDate: '',
	readyToExecuteSettlement: '',
	recordStatus: '',

	attachments: [],
	customFields: [],
	signatures: []

};

const CustomerSettlementAgreementChecklistForm = () => {

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
			formId="FRM-02576"
			title="Customer Settlement Agreement Checklist"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Customer settlement checklist saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02576"
							title="Customer Settlement Agreement Checklist – Basic Form"
							department="Client Billing & Revenue Operations"
						>

							<div className="form-section">
								<h3 className="form-section-title">Customer & Account Context</h3>
								<div className="form-fields">
									{renderField(values,'customerClientName','Customer / Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'customerAccountReference','Customer / Account Reference')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Settlement Scope & Reference</h3>
								<div className="form-fields">
									{renderField(values,'invoiceCaseDisputeReference','Invoice / Case / Dispute Reference')}
									{renderField(values,'totalOutstandingBeforeSettlement','Total Outstanding Before Settlement')}
									{renderField(values,'currency','Currency')}

									<div className="form-field">
										<label className="form-label required">Settlement Type</label>
										{isPrintMode ? <div className="print-value">{values.settlementType || '___________________'}</div> :
											<>
												<Field name="settlementType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Lump sum">Lump sum</option>
													<option value="Installments">Installments</option>
													<option value="Adjustment">Adjustment</option>
												</Field>
												<ErrorMessage name="settlementType" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Settlement Commercial Terms Check</h3>
								<div className="form-fields">
									{renderField(values,'agreedSettlementAmount','Agreed Settlement Amount')}
									{renderField(values,'settlementStartDate','Settlement Start Date','date')}
									{renderField(values,'finalSettlementDate','Final Settlement Date','date')}

									{[
										['installmentScheduleDefined','Installment Schedule Defined'],
										['waiverConcessionIncluded','Any Waiver / Concession Included']
									].map(([n,l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
														<option value="NA">NA</option>
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											}
										</div>
									))}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Legal & Contract Checks</h3>
								<div className="form-fields">

									{[
										['settlementAgreementPrepared','Settlement agreement document prepared'],
										['authorizedSignatoriesIdentified','Authorized signatories identified'],
										['customerAcceptanceReceived','Customer acceptance received'],
										['legalComplianceReviewCompleted','Legal / compliance review completed']
									].map(([n,l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
														<option value="NA">NA</option>
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											}
										</div>
									))}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Financial & Accounting Checks</h3>
								<div className="form-fields">

									{[
										['taxImpactAssessed','Tax impact assessed'],
										['writeoffAdjustmentRequired','Write-off / adjustment requirement identified'],
										['accountingTreatmentDefined','Accounting treatment defined'],
										['provisionImpactAssessed','Provision impact assessed']
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
								<h3 className="form-section-title">Risk & Control Checks</h3>
								<div className="form-fields">

									{[
										['creditRecoveryRiskReviewed','Credit / recovery risk reviewed'],
										['futureCreditRestrictionRequired','Future credit restriction required'],
										['internalApprovalsObtained','Internal approvals as per policy obtained']
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
								<h3 className="form-section-title">Supporting Documents</h3>
								<div className="form-fields">

									{[
										['settlementCopyAttached','Settlement agreement copy attached'],
										['supportingEmailsAttached','Supporting emails / approvals attached']
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
										<label className="form-label required">Checklist Status</label>
										{isPrintMode ? <div className="print-value">{values.checklistStatus || '___________________'}</div> :
											<>
												<Field name="checklistStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Pass">Pass</option>
													<option value="Hold">Hold</option>
													<option value="Fail">Fail</option>
												</Field>
												<ErrorMessage name="checklistStatus" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Checklist Remarks</label>
										{isPrintMode ? <div className="print-value">{values.checklistRemarks || '___________________'}</div> :
											<>
												<Field name="checklistRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="checklistRemarks" component="div" className="form-error" />
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
										<label className="form-label required">Ready to execute settlement</label>
										{isPrintMode ? <div className="print-value">{values.readyToExecuteSettlement || '___________________'}</div> :
											<>
												<Field name="readyToExecuteSettlement" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="readyToExecuteSettlement" component="div" className="form-error" />
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

export default CustomerSettlementAgreementChecklistForm;
