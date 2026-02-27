// InvoiceIssuanceChecklistForm.jsx

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
	clientName: Yup.string().required('Client Name is required'),
	clientCode: Yup.string().required('Client Code / ID is required'),
	projectContractReference: Yup.string().required('Project / Contract Reference is required'),
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),
	invoiceType: Yup.string().required('Invoice Type is required'),
	billingPeriod: Yup.string().required('Billing Period is required'),

	// Master & Configuration Readiness
	clientBillingProfileActive: Yup.string().required('Required'),
	taxProfileVerifiedApproved: Yup.string().required('Required'),
	rateCardApproved: Yup.string().required('Required'),
	poMappingValidated: Yup.string().required('Required'),
	invoiceTemplateSelected: Yup.string().required('Required'),
	billingContactsVerified: Yup.string().required('Required'),

	// Operational Data Readiness
	timesheetUsageMilestoneApproved: Yup.string().required('Required'),
	usageDataValidationCompleted: Yup.string().required('Required'),
	allExceptionsResolved: Yup.string().required('Required'),
	manualAdjustmentsSupported: Yup.string().required('Required'),

	// Tax & Compliance Checks
	gstTaxIdVerified: Yup.string().required('Required'),
	placeOfSupplyVerified: Yup.string().required('Required'),
	taxTypeVerified: Yup.string().required('Required'),
	reverseChargeChecked: Yup.string().required('Required'),

	// Financial & Control Checks
	invoiceNumberingSeriesValidated: Yup.string().required('Required'),
	currencyRoundingRulesVerified: Yup.string().required('Required'),
	revenueRecognitionPostingReadiness: Yup.string().required('Required'),

	// Checklist Result
	overallChecklistStatus: Yup.string().required('Overall Checklist Status is required'),
	checklistRemarks: Yup.string().required('Checklist Remarks are required'),

	// Checklist Control
	checkedBy: Yup.string().required('Checked By is required'),
	checkedDate: Yup.string().required('Checked Date is required'),
	readyForInvoiceIssuance: Yup.string().required('Ready for Invoice Issuance is required'),
	recordStatus: Yup.string().required('Record Status is required'),

	// Custom fields
	customFields: Yup.array().of(
		Yup.object({
			fieldName: Yup.string().required('Field Name is required'),
			fieldValue: Yup.string().required('Field Value is required')
		})
	),

	// Signatures
	signatures: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			signatureName: Yup.string().required('Signature Name is required'),
			signatureData: Yup.string(),
			signatureDate: Yup.string().required('Signature Date is required')
		})
	)

});

const initialValues = {

	clientName: '',
	clientCode: '',
	projectContractReference: '',
	billingEntityLocation: '',
	invoiceType: '',
	billingPeriod: '',

	clientBillingProfileActive: '',
	taxProfileVerifiedApproved: '',
	rateCardApproved: '',
	poMappingValidated: '',
	invoiceTemplateSelected: '',
	billingContactsVerified: '',

	timesheetUsageMilestoneApproved: '',
	usageDataValidationCompleted: '',
	allExceptionsResolved: '',
	manualAdjustmentsSupported: '',

	gstTaxIdVerified: '',
	placeOfSupplyVerified: '',
	taxTypeVerified: '',
	reverseChargeChecked: '',

	invoiceNumberingSeriesValidated: '',
	currencyRoundingRulesVerified: '',
	revenueRecognitionPostingReadiness: '',

	overallChecklistStatus: '',
	checklistRemarks: '',

	checkedBy: '',
	checkedDate: '',
	readyForInvoiceIssuance: '',
	recordStatus: '',

	customFields: [],
	signatures: []
};

const InvoiceIssuanceChecklistForm = () => {

	const { isPrintMode } = usePrintMode();

	return (

		<ModernFormWrapper
			formId="FRM-02543"
			title="Invoice Issuance Checklist"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Invoice issuance checklist submitted:', values);
					alert('Invoice issuance checklist saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02543"
							title="Invoice Issuance Checklist"
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
										['billingEntityLocation', 'Billing Entity / Location']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} className="form-input" />
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">Invoice Type</label>
										{isPrintMode ? (
											<div className="print-value">{values.invoiceType || '___________________'}</div>
										) : (
											<Field name="invoiceType" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="T&M">T&M</option>
												<option value="Milestone">Milestone</option>
												<option value="Usage">Usage</option>
											</Field>
										)}
										<ErrorMessage name="invoiceType" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Billing Period</label>
										{isPrintMode ? (
											<div className="print-value">{values.billingPeriod || '___________________'}</div>
										) : (
											<Field name="billingPeriod" className="form-input" />
										)}
										<ErrorMessage name="billingPeriod" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Master & Configuration Readiness */}
							<div className="form-section">
								<h3 className="form-section-title">Master & Configuration Readiness</h3>
								<div className="form-fields">
									{[
										['clientBillingProfileActive', 'Client billing profile active'],
										['taxProfileVerifiedApproved', 'Tax profile verified and approved'],
										['rateCardApproved', 'Rate card / price plan approved'],
										['poMappingValidated', 'PO mapping validated'],
										['invoiceTemplateSelected', 'Invoice template selected'],
										['billingContactsVerified', 'Billing contacts verified']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
														{n === 'poMappingValidated' && <option value="NA">NA</option>}
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Operational Data Readiness */}
							<div className="form-section">
								<h3 className="form-section-title">Operational Data Readiness</h3>
								<div className="form-fields">
									{[
										['timesheetUsageMilestoneApproved', 'Timesheet / usage / milestone data approved'],
										['usageDataValidationCompleted', 'Usage data validation completed'],
										['allExceptionsResolved', 'All exceptions resolved'],
										['manualAdjustmentsSupported', 'Manual adjustments supported by documents']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
														{(n === 'usageDataValidationCompleted' || n === 'allExceptionsResolved' || n === 'manualAdjustmentsSupported') && (
															<option value="NA">NA</option>
														)}
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Tax & Compliance Checks */}
							<div className="form-section">
								<h3 className="form-section-title">Tax & Compliance Checks</h3>
								<div className="form-fields">
									{[
										['gstTaxIdVerified', 'GST / Tax ID verified'],
										['placeOfSupplyVerified', 'Place of supply verified'],
										['taxTypeVerified', 'Tax type (IGST / CGST+SGST) verified'],
										['reverseChargeChecked', 'Reverse charge applicability checked']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
														{n === 'reverseChargeChecked' && <option value="NA">NA</option>}
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Financial & Control Checks */}
							<div className="form-section">
								<h3 className="form-section-title">Financial & Control Checks</h3>
								<div className="form-fields">
									{[
										['invoiceNumberingSeriesValidated', 'Invoice numbering series validated'],
										['currencyRoundingRulesVerified', 'Currency and rounding rules verified'],
										['revenueRecognitionPostingReadiness', 'Revenue recognition / posting readiness confirmed']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Checklist Result */}
							<div className="form-section">
								<h3 className="form-section-title">Checklist Result</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Overall Checklist Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.overallChecklistStatus || '___________________'}</div>
										) : (
											<Field name="overallChecklistStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Pass">Pass</option>
												<option value="Fail">Fail</option>
												<option value="Hold">Hold</option>
											</Field>
										)}
										<ErrorMessage name="overallChecklistStatus" component="div" className="form-error" />
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Checklist Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.checklistRemarks || '___________________'}</div>
										) : (
											<Field name="checklistRemarks" as="textarea" className="form-textarea" rows="2" />
										)}
										<ErrorMessage name="checklistRemarks" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Checklist Control */}
							<div className="form-section">
								<h3 className="form-section-title">Checklist Control</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Checked By</label>
										{isPrintMode ? (
											<div className="print-value">{values.checkedBy || '___________________'}</div>
										) : (
											<Field name="checkedBy" className="form-input" />
										)}
										<ErrorMessage name="checkedBy" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Checked Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.checkedDate || '___________________'}</div>
										) : (
											<Field name="checkedDate" type="date" className="form-input" />
										)}
										<ErrorMessage name="checkedDate" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Ready for Invoice Issuance</label>
										{isPrintMode ? (
											<div className="print-value">{values.readyForInvoiceIssuance || '___________________'}</div>
										) : (
											<Field name="readyForInvoiceIssuance" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
										)}
										<ErrorMessage name="readyForInvoiceIssuance" component="div" className="form-error" />
									</div>

									<div className="form-field">
										<label className="form-label required">Record Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.recordStatus || '___________________'}</div>
										) : (
											<Field name="recordStatus" as="select" className="form-input">
												<option value="">-- Select --</option>
												<option value="Open">Open</option>
												<option value="Closed">Closed</option>
											</Field>
										)}
										<ErrorMessage name="recordStatus" component="div" className="form-error" />
									</div>

								</div>
							</div>

							{/* Additional Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(arrayHelpers) => (
											<div>
												{values.customFields.length > 0 && (
													<div className="custom-fields-list">
														{values.customFields.map((f, idx) => (
															<div key={f.id || idx} className="custom-field-row">
																<div className="form-field">
																	<Field name={`customFields.${idx}.fieldName`} className="form-input" placeholder="Field Name" />
																	<ErrorMessage name={`customFields.${idx}.fieldName`} component="div" className="form-error" />
																</div>
																<div className="form-field" style={{ flex: 2 }}>
																	<Field name={`customFields.${idx}.fieldValue`} className="form-input" placeholder="Field Value" />
																	<ErrorMessage name={`customFields.${idx}.fieldValue`} component="div" className="form-error" />
																</div>
																<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>
																	Remove
																</button>
															</div>
														))}
													</div>
												)}
												<button
													type="button"
													className="btn-add-field"
													onClick={() => arrayHelpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}
												>
													Add Custom Field
												</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{isPrintMode && values.customFields.length > 0 && (
								<div className="form-section">
									<h3 className="form-section-title">Additional Custom Fields</h3>
									<div className="form-fields">
										{values.customFields.map((f, i) => (
											<div key={i} className="form-field full-width custom-field-print">
												<strong>{f.fieldName}:</strong> {f.fieldValue || '___________________'}
											</div>
										))}
									</div>
								</div>
							)}

							{/* Signatures */}
							<div className="form-section signatures-section">
								<h3 className="form-section-title">Digital Signatures</h3>

								{!isPrintMode && (
									<FieldArray name="signatures">
										{(arrayHelpers) => (
											<div>

												{values.signatures.length > 0 && (
													<div className="signatures-list">
														{values.signatures.map((sig, idx) => (
															<div key={sig.id || idx} className="signature-row-container">

																<div className="signature-row">
																	<div className="form-field">
																		<label className="form-label required">Signature Name</label>
																		<Field name={`signatures.${idx}.signatureName`} className="form-input" />
																		<ErrorMessage name={`signatures.${idx}.signatureName`} component="div" className="form-error" />
																	</div>

																	<div className="form-field">
																		<label className="form-label required">Date</label>
																		<Field name={`signatures.${idx}.signatureDate`} type="date" className="form-input" />
																		<ErrorMessage name={`signatures.${idx}.signatureDate`} component="div" className="form-error" />
																	</div>

																	<button
																		type="button"
																		className="btn-remove"
																		onClick={() => arrayHelpers.remove(idx)}
																	>
																		Remove Signature
																	</button>
																</div>

																<div className="signature-pad-container">
																	<label className="form-label">Signature Pad / Upload</label>
																	<SignatureComponent
																		name={`Signature ${idx + 1}`}
																		onChange={(sigObj) =>
																			setFieldValue(`signatures.${idx}.signatureData`, sigObj.data || '')
																		}
																		value={sig}
																	/>
																</div>

															</div>
														))}
													</div>
												)}

												<button
													type="button"
													className="btn-add-signature"
													onClick={() =>
														arrayHelpers.push({
															id: uuidv4(),
															signatureName: '',
															signatureData: '',
															signatureDate: ''
														})
													}
												>
													Add Signature
												</button>

											</div>
										)}
									</FieldArray>
								)}

								{isPrintMode && values.signatures.length > 0 && (
									<div className="print-signatures">
										{values.signatures.map((sig, i) => (
											<div key={i} className="print-signature-box">
												<div className="sig-name">{sig.signatureName || `Signature ${i + 1}`}</div>
												<div className="sig-space">
													{sig.signatureData && (
														<img
															src={sig.signatureData}
															alt={`sig-${i}`}
															className="print-sig-image"
														/>
													)}
												</div>
												<div className="sig-line" />
												<div className="sig-date">
													{sig.signatureDate && `Date: ${sig.signatureDate}`}
												</div>
											</div>
										))}
									</div>
								)}

							</div>

							{!isPrintMode && (
								<div className="form-actions">
									<button type="submit" className="btn-submit">
										Save Form
									</button>
								</div>
							)}

						</ModernA4Template>

					</Form>

				)}

			</Formik>

		</ModernFormWrapper>

	);

};

export default InvoiceIssuanceChecklistForm;
