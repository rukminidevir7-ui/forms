// BillingControlsChecklistChecklist.jsx

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
	// Client / Process Context
	clientName: Yup.string().required('Client Name is required'),
	clientCode: Yup.string().required('Client Code / ID is required'),
	projectContractReference: Yup.string().required('Project / Contract Reference is required'),
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),

	// Billing Master & Setup Controls
	clientBillingProfileActive: Yup.string().required('Client billing profile status is required'),
	taxProfileConfiguredApproved: Yup.string().required('Tax profile status is required'),
	rateCardAvailableApproved: Yup.string().required('Rate card status is required'),
	poMappingCompletedValid: Yup.string().required('PO mapping status is required'),
	invoiceTemplateSelected: Yup.string().required('Invoice template selection status is required'),

	// Operational Billing Controls
	billingFrequencyConfigured: Yup.string().required('Billing frequency status is required'),
	billingCalendarUpdatedVerified: Yup.string().required('Billing calendar status is required'),
	billingContactVerified: Yup.string().required('Billing contact verification status is required'),
	creditCommercialTermsApproved: Yup.string().required('Credit / commercial terms status is required'),

	// Compliance & Validation Controls
	gstinVerifiedValid: Yup.string().required('GST / Tax ID verification status is required'),
	placeOfSupplyVerified: Yup.string().required('Place of supply verification status is required'),
	taxTypeVerified: Yup.string().required('Tax type verification status is required'),
	reverseChargeVerified: Yup.string().required('Reverse charge applicability status is required'),

	// Checklist Result
	overallControlStatus: Yup.string().required('Overall Control Status is required'),
	checklistRemarks: Yup.string().required('Checklist Remarks are required'),

	// Checklist Control
	checkedBy: Yup.string().required('Checked By is required'),
	checkedDate: Yup.string().required('Checked Date is required'),
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

	clientBillingProfileActive: '',
	taxProfileConfiguredApproved: '',
	rateCardAvailableApproved: '',
	poMappingCompletedValid: '',
	invoiceTemplateSelected: '',

	billingFrequencyConfigured: '',
	billingCalendarUpdatedVerified: '',
	billingContactVerified: '',
	creditCommercialTermsApproved: '',

	gstinVerifiedValid: '',
	placeOfSupplyVerified: '',
	taxTypeVerified: '',
	reverseChargeVerified: '',

	overallControlStatus: '',
	checklistRemarks: '',

	checkedBy: '',
	checkedDate: '',
	recordStatus: '',

	customFields: [],
	signatures: []
};

const BillingControlsChecklistChecklist = () => {
	const { isPrintMode } = usePrintMode();

	const yesNoOptions = ['Yes', 'No'];

	return (
		<ModernFormWrapper
			formId="FRM-02524"
			title="Billing Controls Checklist"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Billing Controls Checklist submitted:', values);
					alert('Billing Controls Checklist saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02524"
							title="Billing Controls Checklist (Basic Form)"
							department="Client Billing & Revenue Operations"
						>

							{/* Client / Process Context */}
							<div className="form-section">
								<h3 className="form-section-title">Client / Process Context</h3>
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
								</div>
							</div>

							{/* Billing Master & Setup Controls */}
							<div className="form-section">
								<h3 className="form-section-title">Billing Master & Setup Controls</h3>
								<div className="form-fields">
									{[
										['clientBillingProfileActive', 'Client billing profile available and active'],
										['taxProfileConfiguredApproved', 'Tax profile configured and approved'],
										['rateCardAvailableApproved', 'Rate card available and approved'],
										['poMappingCompletedValid', 'PO mapping completed and valid'],
										['invoiceTemplateSelected', 'Invoice template selected']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														{yesNoOptions.map((o) => (
															<option key={o} value={o}>{o}</option>
														))}
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Operational Billing Controls */}
							<div className="form-section">
								<h3 className="form-section-title">Operational Billing Controls</h3>
								<div className="form-fields">
									{[
										['billingFrequencyConfigured', 'Billing frequency configured correctly'],
										['billingCalendarUpdatedVerified', 'Billing calendar updated and verified'],
										['billingContactVerified', 'Billing contact details verified'],
										['creditCommercialTermsApproved', 'Credit / commercial terms approved']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														{yesNoOptions.map((o) => (
															<option key={o} value={o}>{o}</option>
														))}
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Compliance & Validation Controls */}
							<div className="form-section">
								<h3 className="form-section-title">Compliance & Validation Controls</h3>
								<div className="form-fields">
									{[
										['gstinVerifiedValid', 'GST / Tax ID verified and valid'],
										['placeOfSupplyVerified', 'Place of supply verified'],
										['taxTypeVerified', 'Tax type (IGST / CGST+SGST) verified'],
										['reverseChargeVerified', 'Reverse charge applicability verified']
									].map(([n, l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														{yesNoOptions.map((o) => (
															<option key={o} value={o}>{o}</option>
														))}
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
										<label className="form-label required">Overall Control Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.overallControlStatus || '___________________'}</div>
										) : (
											<>
												<Field name="overallControlStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Pass">Pass</option>
													<option value="Fail">Fail</option>
													<option value="Pending">Pending</option>
												</Field>
												<ErrorMessage name="overallControlStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Checklist Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.checklistRemarks || '___________________'}</div>
										) : (
											<>
												<Field
													name="checklistRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="checklistRemarks" component="div" className="form-error" />
											</>
										)}
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
											<>
												<Field name="checkedBy" className="form-input" />
												<ErrorMessage name="checkedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Checked Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.checkedDate || '___________________'}</div>
										) : (
											<>
												<Field name="checkedDate" type="date" className="form-input" />
												<ErrorMessage name="checkedDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Record Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.recordStatus || '___________________'}</div>
										) : (
											<>
												<Field name="recordStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Open">Open</option>
													<option value="Closed">Closed</option>
												</Field>
												<ErrorMessage name="recordStatus" component="div" className="form-error" />
											</>
										)}
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
																	<Field
																		name={`customFields.${idx}.fieldName`}
																		className="form-input"
																		placeholder="Field Name"
																	/>
																	<ErrorMessage
																		name={`customFields.${idx}.fieldName`}
																		component="div"
																		className="form-error"
																	/>
																</div>
																<div className="form-field" style={{ flex: 2 }}>
																	<Field
																		name={`customFields.${idx}.fieldValue`}
																		className="form-input"
																		placeholder="Field Value"
																	/>
																	<ErrorMessage
																		name={`customFields.${idx}.fieldValue`}
																		component="div"
																		className="form-error"
																	/>
																</div>
																<button
																	type="button"
																	className="btn-remove"
																	onClick={() => arrayHelpers.remove(idx)}
																>
																	Remove
																</button>
															</div>
														))}
													</div>
												)}
												<button
													type="button"
													className="btn-add-field"
													onClick={() =>
														arrayHelpers.push({
															id: uuidv4(),
															fieldName: '',
															fieldValue: ''
														})
													}
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
																		<Field
																			name={`signatures.${idx}.signatureName`}
																			className="form-input"
																		/>
																		<ErrorMessage
																			name={`signatures.${idx}.signatureName`}
																			component="div"
																			className="form-error"
																		/>
																	</div>

																	<div className="form-field">
																		<label className="form-label required">Date</label>
																		<Field
																			name={`signatures.${idx}.signatureDate`}
																			type="date"
																			className="form-input"
																		/>
																		<ErrorMessage
																			name={`signatures.${idx}.signatureDate`}
																			component="div"
																			className="form-error"
																		/>
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
																			setFieldValue(
																				`signatures.${idx}.signatureData`,
																				sigObj.data || ''
																			)
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
												<div className="sig-name">
													{sig.signatureName || `Signature ${i + 1}`}
												</div>
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

export default BillingControlsChecklistChecklist;
