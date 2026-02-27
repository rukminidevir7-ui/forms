// BillingComplianceReport.jsx
// FRM-02589 – Billing Audit Checklist – Basic Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const yesNoNA = ['Yes', 'No', 'NA'];
const yesNo = ['Yes', 'No'];

const validationSchema = Yup.object({

	// Audit Context
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	contractReference: Yup.string().required('Required'),
	billingPeriodFrom: Yup.string().required('Required'),
	billingPeriodTo: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),

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
			fileName: Yup.string().required('File required')
		})
	),

	signatures: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			signatureName: Yup.string().required('Required'),
			signatureDate: Yup.string().required('Required'),
			signatureData: Yup.string()
		})
	)

});

const initialValues = {

	clientName: '',
	clientCode: '',
	contractReference: '',
	billingPeriodFrom: '',
	billingPeriodTo: '',
	billingEntityLocation: '',

	contractVerified: '',
	rateCardVerified: '',
	taxProfileVerified: '',
	poVerified: '',

	usageDataComplete: '',
	sourceDataReconciled: '',
	exceptionsResolved: '',

	correctRateApplied: '',
	correctQuantityApplied: '',
	discountsAppliedCorrectly: '',

	invoiceAccurate: '',
	taxCalculationCorrect: '',
	statutoryInfoPresent: '',

	billedVsSourceReconciled: '',
	billedVsRevenueReconciled: '',
	unbilledReviewed: '',

	revenueLeakageIdentified: '',
	duplicateBillingReviewed: '',

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
	signatures: []
};

const BillingComplianceReport = () => {

	const { isPrintMode } = usePrintMode();

	const renderYesNo = (values, name, label, options = yesNo) => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode ? (
				<div className="print-value">{values[name] || '___________________'}</div>
			) : (
				<>
					<Field as="select" name={name} className="form-input">
						<option value="">-- Select --</option>
						{options.map(o => <option key={o} value={o}>{o}</option>)}
					</Field>
					<ErrorMessage name={name} component="div" className="form-error" />
				</>
			)}
		</div>
	);

	const renderField = (values, name, label, type = 'text') => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode ? (
				<div className="print-value">{values[name] || '___________________'}</div>
			) : (
				<>
					<Field name={name} type={type} className="form-input" />
					<ErrorMessage name={name} component="div" className="form-error" />
				</>
			)}
		</div>
	);

	return (

		<ModernFormWrapper
			formId="FRM-02589"
			title="Billing Audit Checklist – Basic Form"
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
							title="Billing Audit Checklist – Basic Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Audit Context */}
							<div className="form-section">
								<h3 className="form-section-title">Audit Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'contractReference','Contract / Project Reference')}
									{renderField(values,'billingPeriodFrom','Billing Period From','date')}
									{renderField(values,'billingPeriodTo','Billing Period To','date')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
								</div>
							</div>

							{/* Master Data Verification */}
							<div className="form-section">
								<h3 className="form-section-title">Source and Master Data Verification</h3>
								<div className="form-fields">
									{renderYesNo(values,'contractVerified','Contract / SOW verified')}
									{renderYesNo(values,'rateCardVerified','Approved rate card / pricing verified')}
									{renderYesNo(values,'taxProfileVerified','Tax profile and billing profile verified')}
									{renderYesNo(values,'poVerified','PO / commercial reference verified', yesNoNA)}
								</div>
							</div>

							{/* Usage Verification */}
							<div className="form-section">
								<h3 className="form-section-title">Usage and Delivery Data Verification</h3>
								<div className="form-fields">
									{renderYesNo(values,'usageDataComplete','Timesheet / usage / milestone data complete')}
									{renderYesNo(values,'sourceDataReconciled','Source system data reconciled')}
									{renderYesNo(values,'exceptionsResolved','Exceptions reviewed and resolved')}
								</div>
							</div>

							{/* Billing Checks */}
							<div className="form-section">
								<h3 className="form-section-title">Billing Calculation and Pricing Checks</h3>
								<div className="form-fields">
									{renderYesNo(values,'correctRateApplied','Correct rate applied')}
									{renderYesNo(values,'correctQuantityApplied','Correct quantity applied')}
									{renderYesNo(values,'discountsAppliedCorrectly','Discounts applied correctly', yesNoNA)}
								</div>
							</div>

							{/* Invoice Compliance */}
							<div className="form-section">
								<h3 className="form-section-title">Invoice and Tax Compliance Checks</h3>
								<div className="form-fields">
									{renderYesNo(values,'invoiceAccurate','Invoice details accurate')}
									{renderYesNo(values,'taxCalculationCorrect','Tax calculation correct')}
									{renderYesNo(values,'statutoryInfoPresent','Statutory information present')}
								</div>
							</div>

							{/* Reconciliation */}
							<div className="form-section">
								<h3 className="form-section-title">Revenue and Reconciliation Checks</h3>
								<div className="form-fields">
									{renderYesNo(values,'billedVsSourceReconciled','Billed vs source reconciled')}
									{renderYesNo(values,'billedVsRevenueReconciled','Billed vs revenue reconciled')}
									{renderYesNo(values,'unbilledReviewed','Unbilled / deferred revenue reviewed', yesNoNA)}
								</div>
							</div>

							{/* Leakage */}
							<div className="form-section">
								<h3 className="form-section-title">Leakage and Exception Review</h3>
								<div className="form-fields">
									{renderYesNo(values,'revenueLeakageIdentified','Revenue leakage identified')}
									{renderYesNo(values,'duplicateBillingReviewed','Duplicate / missed billing reviewed')}
								</div>
							</div>

							{/* Attachments */}
							<div className="form-section">
								<h3 className="form-section-title">Supporting Evidence</h3>

								{!isPrintMode && (
									<FieldArray name="attachments">
										{(helpers) => (
											<div>
												{values.attachments.map((a, i) => (
													<div key={i} className="custom-field-row">
														<input
															type="file"
															className="form-input"
															onChange={(e) => {
																const file = e.target.files[0];
																if (file) {
																	helpers.replace(i, { id: uuidv4(), fileName: file.name });
																	setFieldValue('attachmentReferenceFileName', file.name);
																}
															}}
														/>
														<span>{a.fileName}</span>
														<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
													</div>
												))}
												<button
													type="button"
													className="btn-add-field"
													onClick={() => helpers.push({ id: uuidv4(), fileName: '' })}
												>
													Add Attachment
												</button>
											</div>
										)}
									</FieldArray>
								)}

								{renderField(values,'attachmentReferenceFileName','Attachment reference / file name')}
							</div>

							{/* Audit Result */}
							<div className="form-section">
								<h3 className="form-section-title">Audit Result</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Overall audit result</label>
										{isPrintMode ? (
											<div className="print-value">{values.overallAuditResult || '___________________'}</div>
										) : (
											<>
												<Field as="select" name="overallAuditResult" className="form-input">
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
												<Field as="textarea" rows="3" name="auditObservations" className="form-textarea" />
												<ErrorMessage name="auditObservations" component="div" className="form-error" />
											</>
										)}
									</div>

								</div>
							</div>

							{/* Audit Control */}
							<div className="form-section">
								<h3 className="form-section-title">Audit Control</h3>
								<div className="form-fields">
									{renderField(values,'auditedBy','Audited By')}
									{renderField(values,'auditDate','Audit Date','date')}
									{renderYesNo(values,'correctiveActionsRequired','Corrective actions required')}
									{renderField(values,'recordStatus','Record Status')}
								</div>
							</div>

							{/* Signatures */}
							<div className="form-section">
								<h3 className="form-section-title">Digital Signatures</h3>

								{!isPrintMode && (
									<FieldArray name="signatures">
										{(helpers) => (
											<div>
												{values.signatures.map((s, i) => (
													<div key={i} className="signature-row-container">
														<div className="signature-row">
															<Field name={`signatures.${i}.signatureName`} className="form-input" placeholder="Signature Name" />
															<Field name={`signatures.${i}.signatureDate`} type="date" className="form-input" />
															<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
														</div>

														<SignatureComponent
															name={`Signature ${i + 1}`}
															value={s}
															onChange={(sig) => setFieldValue(`signatures.${i}.signatureData`, sig.data || '')}
														/>
													</div>
												))}

												<button
													type="button"
													className="btn-add-signature"
													onClick={() => helpers.push({ id: uuidv4(), signatureName: '', signatureDate: '', signatureData: '' })}
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
									<button type="submit" className="btn-submit">Save Checklist</button>
								</div>
							)}

						</ModernA4Template>

					</Form>

				)}

			</Formik>

		</ModernFormWrapper>

	);
};

export default BillingComplianceReport;
