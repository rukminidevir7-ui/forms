// BillingAuditChecklistaForm.jsx

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

	// Audit Context
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	contractProjectReference: Yup.string().required('Required'),
	billingPeriodFrom: Yup.string().required('Required'),
	billingPeriodTo: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),

	// Source & Master Data Verification
	contractSowVerified: Yup.string().required('Required'),
	rateCardVerified: Yup.string().required('Required'),
	taxBillingProfileVerified: Yup.string().required('Required'),
	poCommercialVerified: Yup.string().required('Required'),

	// Usage / Delivery Data Verification
	dataComplete: Yup.string().required('Required'),
	sourceReconciled: Yup.string().required('Required'),
	exceptionsResolved: Yup.string().required('Required'),

	// Billing Calculation & Pricing Checks
	correctRateApplied: Yup.string().required('Required'),
	correctQuantityApplied: Yup.string().required('Required'),
	discountsAppliedCorrectly: Yup.string().required('Required'),

	// Invoice & Tax Compliance Checks
	invoiceDetailsAccurate: Yup.string().required('Required'),
	taxCalculationCorrect: Yup.string().required('Required'),
	statutoryInfoPresent: Yup.string().required('Required'),

	// Revenue & Reconciliation Checks
	billedVsSourceReconciled: Yup.string().required('Required'),
	billedVsRevenueReconciled: Yup.string().required('Required'),
	unbilledDeferredReviewed: Yup.string().required('Required'),

	// Leakage & Exception Review
	revenueLeakageIdentified: Yup.string().required('Required'),
	duplicateMissedBillingReviewed: Yup.string().required('Required'),

	// Supporting Evidence
	auditWorkingFilesAttached: Yup.string().required('Required'),
	dataExtractsAttached: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Audit Result
	overallAuditResult: Yup.string().required('Required'),
	auditObservations: Yup.string().required('Required'),

	// Audit Control
	auditedBy: Yup.string().required('Required'),
	auditDate: Yup.string().required('Required'),
	correctiveActionsRequired: Yup.string().required('Required'),
	recordStatus: Yup.string().required('Required'),

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
	contractProjectReference: '',
	billingPeriodFrom: '',
	billingPeriodTo: '',
	billingEntityLocation: '',

	contractSowVerified: '',
	rateCardVerified: '',
	taxBillingProfileVerified: '',
	poCommercialVerified: '',

	dataComplete: '',
	sourceReconciled: '',
	exceptionsResolved: '',

	correctRateApplied: '',
	correctQuantityApplied: '',
	discountsAppliedCorrectly: '',

	invoiceDetailsAccurate: '',
	taxCalculationCorrect: '',
	statutoryInfoPresent: '',

	billedVsSourceReconciled: '',
	billedVsRevenueReconciled: '',
	unbilledDeferredReviewed: '',

	revenueLeakageIdentified: '',
	duplicateMissedBillingReviewed: '',

	auditWorkingFilesAttached: '',
	dataExtractsAttached: '',
	attachmentReferenceFileName: '',

	overallAuditResult: '',
	auditObservations: '',

	auditedBy: '',
	auditDate: '',
	correctiveActionsRequired: '',
	recordStatus: '',

	attachments: [],
	customFields: [],
	signatures: []
};

const BillingAuditChecklistaForm = () => {

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

	const yesNoNAField = (values, name, label, allowNA = false) => (
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
						{allowNA && <option value="NA">NA</option>}
					</Field>
					<ErrorMessage name={name} component="div" className="form-error" />
				</>
			)}
		</div>
	);

	return (

		<ModernFormWrapper
			formId="FRM-02589"
			title="Billing Audit Checklist"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Billing audit checklist saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02589"
							title="Billing Audit Checklist - Basic Form"
							department="Client Billing & Revenue Operations"
						>

							<div className="form-section">
								<h3 className="form-section-title">Audit Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'contractProjectReference','Contract / Project Reference')}
									{renderField(values,'billingPeriodFrom','Billing Period From','date')}
									{renderField(values,'billingPeriodTo','Billing Period To','date')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Source and Master Data Verification</h3>
								<div className="form-fields">
									{yesNoNAField(values,'contractSowVerified','Contract / SOW verified')}
									{yesNoNAField(values,'rateCardVerified','Approved rate card / pricing verified')}
									{yesNoNAField(values,'taxBillingProfileVerified','Tax profile and billing profile verified')}
									{yesNoNAField(values,'poCommercialVerified','PO / commercial reference verified', true)}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Usage / Delivery Data Verification</h3>
								<div className="form-fields">
									{yesNoNAField(values,'dataComplete','Timesheet / usage / milestone data complete')}
									{yesNoNAField(values,'sourceReconciled','Source system data reconciled with billing data')}
									{yesNoNAField(values,'exceptionsResolved','Exceptions reviewed and resolved')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Billing Calculation and Pricing Checks</h3>
								<div className="form-fields">
									{yesNoNAField(values,'correctRateApplied','Correct rate applied')}
									{yesNoNAField(values,'correctQuantityApplied','Correct quantity / units applied')}
									{yesNoNAField(values,'discountsAppliedCorrectly','Discounts / waivers applied correctly', true)}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Invoice and Tax Compliance Checks</h3>
								<div className="form-fields">
									{yesNoNAField(values,'invoiceDetailsAccurate','Invoice details accurate')}
									{yesNoNAField(values,'taxCalculationCorrect','Tax calculation and tax codes correct')}
									{yesNoNAField(values,'statutoryInfoPresent','Statutory information present on invoice')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Revenue and Reconciliation Checks</h3>
								<div className="form-fields">
									{yesNoNAField(values,'billedVsSourceReconciled','Billed vs source data reconciled')}
									{yesNoNAField(values,'billedVsRevenueReconciled','Billed vs revenue recognised reconciled')}
									{yesNoNAField(values,'unbilledDeferredReviewed','Unbilled / deferred revenue reviewed', true)}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Leakage and Exception Review</h3>
								<div className="form-fields">
									{yesNoNAField(values,'revenueLeakageIdentified','Potential revenue leakage identified')}
									{yesNoNAField(values,'duplicateMissedBillingReviewed','Duplicate / missed billing reviewed')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Supporting Evidence</h3>
								<div className="form-fields">

									{yesNoNAField(values,'auditWorkingFilesAttached','Audit working files attached')}
									{yesNoNAField(values,'dataExtractsAttached','Data extracts / reports attached')}

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
								<h3 className="form-section-title">Audit Result</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Overall audit result</label>
										{isPrintMode ? (
											<div className="print-value">{values.overallAuditResult || '___________________'}</div>
										) : (
											<>
												<Field name="overallAuditResult" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Pass">Pass</option>
													<option value="Qualified">Qualified</option>
													<option value="Fail">Fail</option>
												</Field>
												<ErrorMessage name="overallAuditResult" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Audit observations / findings</label>
										{isPrintMode ? (
											<div className="print-value">{values.auditObservations || '___________________'}</div>
										) : (
											<>
												<Field name="auditObservations" as="textarea" className="form-textarea" rows="3" />
												<ErrorMessage name="auditObservations" component="div" className="form-error" />
											</>
										)}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Audit Control</h3>
								<div className="form-fields">
									{renderField(values,'auditedBy','Audited By')}
									{renderField(values,'auditDate','Audit Date','date')}
									{yesNoNAField(values,'correctiveActionsRequired','Corrective actions required')}
									{renderField(values,'recordStatus','Record Status')}
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

export default BillingAuditChecklistaForm;
