// BillingRegisterUpdateLogRegister.jsx

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
	// Client & Context Information
	clientName: Yup.string().required('Client Name is required'),
	clientCode: Yup.string().required('Client Code / ID is required'),
	projectContractReference: Yup.string().required('Project / Contract Reference is required'),
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),

	// Billing Register Reference
	registerBatchReferenceNo: Yup.string().required('Register / Batch Reference No is required'),
	invoiceBillingDocumentNo: Yup.string().required('Invoice / Billing Document No is required'),
	billingPeriod: Yup.string().required('Billing Period is required'),
	serviceProjectName: Yup.string().required('Service / Project Name is required'),

	// Register Update Details
	fieldUpdated: Yup.string().required('Field / Attribute Updated is required'),
	oldValue: Yup.string().required('Old Value is required'),
	newValue: Yup.string().required('New Value is required'),
	updateReason: Yup.string().required('Update Reason is required'),

	// Impact Assessment
	financialImpact: Yup.string().required('Financial Impact is required'),
	operationalImpact: Yup.string().required('Operational Impact is required'),
	impactRemarks: Yup.string().required('Impact Remarks are required'),

	// Change Log Information
	changeTicketReferenceNo: Yup.string().required('Change / Ticket Reference No is required'),
	updatedBy: Yup.string().required('Updated By is required'),
	updatedDate: Yup.string().required('Updated Date is required'),

	// Verification & Control
	verifiedBy: Yup.string().required('Verified By is required'),
	verificationDate: Yup.string().required('Verification Date is required'),
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

	registerBatchReferenceNo: '',
	invoiceBillingDocumentNo: '',
	billingPeriod: '',
	serviceProjectName: '',

	fieldUpdated: '',
	oldValue: '',
	newValue: '',
	updateReason: '',

	financialImpact: '',
	operationalImpact: '',
	impactRemarks: '',

	changeTicketReferenceNo: '',
	updatedBy: '',
	updatedDate: '',

	verifiedBy: '',
	verificationDate: '',
	recordStatus: '',

	customFields: [],
	signatures: []
};

const BillingRegisterUpdateLogRegister = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-02525"
			title="Billing Register Update – Log / Register"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Billing Register Update submitted:', values);
					alert('Billing Register Update log saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02525"
							title="Billing Register Update – Log / Register"
							department="Client Billing & Revenue Operations"
						>

							{/* Client & Context Information */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Context Information</h3>
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

							{/* Billing Register Reference */}
							<div className="form-section">
								<h3 className="form-section-title">Billing Register Reference</h3>
								<div className="form-fields">
									{[
										['registerBatchReferenceNo', 'Register / Batch Reference No'],
										['invoiceBillingDocumentNo', 'Invoice / Billing Document No'],
										['billingPeriod', 'Billing Period'],
										['serviceProjectName', 'Service / Project Name']
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

							{/* Register Update Details */}
							<div className="form-section">
								<h3 className="form-section-title">Register Update Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Field / Attribute Updated</label>
										{isPrintMode ? (
											<div className="print-value">{values.fieldUpdated || '___________________'}</div>
										) : (
											<>
												<Field name="fieldUpdated" className="form-input" />
												<ErrorMessage name="fieldUpdated" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Old Value</label>
										{isPrintMode ? (
											<div className="print-value">{values.oldValue || '___________________'}</div>
										) : (
											<>
												<Field name="oldValue" className="form-input" />
												<ErrorMessage name="oldValue" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">New Value</label>
										{isPrintMode ? (
											<div className="print-value">{values.newValue || '___________________'}</div>
										) : (
											<>
												<Field name="newValue" className="form-input" />
												<ErrorMessage name="newValue" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Update Reason</label>
										{isPrintMode ? (
											<div className="print-value">{values.updateReason || '___________________'}</div>
										) : (
											<>
												<Field
													name="updateReason"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="updateReason" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Impact Assessment */}
							<div className="form-section">
								<h3 className="form-section-title">Impact Assessment</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Financial Impact</label>
										{isPrintMode ? (
											<div className="print-value">{values.financialImpact || '___________________'}</div>
										) : (
											<>
												<Field name="financialImpact" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="financialImpact" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Operational Impact</label>
										{isPrintMode ? (
											<div className="print-value">{values.operationalImpact || '___________________'}</div>
										) : (
											<>
												<Field name="operationalImpact" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="operationalImpact" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Impact Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.impactRemarks || '___________________'}</div>
										) : (
											<>
												<Field
													name="impactRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="impactRemarks" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Change Log Information */}
							<div className="form-section">
								<h3 className="form-section-title">Change Log Information</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Change / Ticket Reference No</label>
										{isPrintMode ? (
											<div className="print-value">{values.changeTicketReferenceNo || '___________________'}</div>
										) : (
											<>
												<Field name="changeTicketReferenceNo" className="form-input" />
												<ErrorMessage name="changeTicketReferenceNo" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Updated By</label>
										{isPrintMode ? (
											<div className="print-value">{values.updatedBy || '___________________'}</div>
										) : (
											<>
												<Field name="updatedBy" className="form-input" />
												<ErrorMessage name="updatedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Updated Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.updatedDate || '___________________'}</div>
										) : (
											<>
												<Field name="updatedDate" type="date" className="form-input" />
												<ErrorMessage name="updatedDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Verification & Control */}
							<div className="form-section">
								<h3 className="form-section-title">Verification & Control</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Verified By</label>
										{isPrintMode ? (
											<div className="print-value">{values.verifiedBy || '___________________'}</div>
										) : (
											<>
												<Field name="verifiedBy" className="form-input" />
												<ErrorMessage name="verifiedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Verification Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.verificationDate || '___________________'}</div>
										) : (
											<>
												<Field name="verificationDate" type="date" className="form-input" />
												<ErrorMessage name="verificationDate" component="div" className="form-error" />
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
																		<Field name={`signatures.${idx}.signatureName`} className="form-input" />
																		<ErrorMessage name={`signatures.${idx}.signatureName`} component="div" className="form-error" />
																	</div>

																	<div className="form-field">
																		<label className="form-label required">Date</label>
																		<Field name={`signatures.${idx}.signatureDate`} type="date" className="form-input" />
																		<ErrorMessage name={`signatures.${idx}.signatureDate`} component="div" className="form-error" />
																	</div>

																	<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>
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

												<button type="button" className="btn-add-signature" onClick={() => arrayHelpers.push({ id: uuidv4(), signatureName: '', signatureData: '', signatureDate: '' })}>
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
													{sig.signatureData && <img src={sig.signatureData} alt={`sig-${i}`} className="print-sig-image" />}
												</div>
												<div className="sig-line" />
												<div className="sig-date">{sig.signatureDate && `Date: ${sig.signatureDate}`}</div>
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

export default BillingRegisterUpdateLogRegister;
