// BillingContactSetupForm.jsx

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
	// Client Information
	clientName: Yup.string().required('Client Name is required'),
	clientCode: Yup.string().required('Client Code / ID is required'),

	// Billing Contact Details
	contactPersonName: Yup.string().required('Contact Person Name is required'),
	designationRole: Yup.string().required('Designation / Role is required'),
	department: Yup.string().required('Department is required'),

	// Communication Details
	emailId: Yup.string().email('Invalid email').required('Email ID is required'),
	mobileNumber: Yup.string().required('Mobile Number is required'),
	alternateContactNumber: Yup.string().required('Alternate Contact Number is required'),

	// Billing Communication Preferences
	sendInvoiceBy: Yup.string().required('Send Invoice By is required'),
	ccEmailIds: Yup.string().required('CC Email IDs is required'),

	// Control
	activeStatus: Yup.string().required('Active status is required'),
	remarks: Yup.string().required('Remarks is required'),

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

	contactPersonName: '',
	designationRole: '',
	department: '',

	emailId: '',
	mobileNumber: '',
	alternateContactNumber: '',

	sendInvoiceBy: '',
	ccEmailIds: '',

	activeStatus: '',
	remarks: '',

	customFields: [],
	signatures: []
};

const BillingContactSetupForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-02501"
			title="Billing Contact Setup"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Billing Contact Setup submitted:', values);
					alert('Billing Contact Setup form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02501"
							title="Billing Contact Setup (Basic Form)"
							department="Client Billing & Revenue Operations"
						>

							{/* Client Information */}
							<div className="form-section">
								<h3 className="form-section-title">Client Information</h3>
								<div className="form-fields">
									{[
										['clientName', 'Client Name'],
										['clientCode', 'Client Code / ID']
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

							{/* Billing Contact Details */}
							<div className="form-section">
								<h3 className="form-section-title">Billing Contact Details</h3>
								<div className="form-fields">
									{[
										['contactPersonName', 'Contact Person Name'],
										['designationRole', 'Designation / Role'],
										['department', 'Department']
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

							{/* Communication Details */}
							<div className="form-section">
								<h3 className="form-section-title">Communication Details</h3>
								<div className="form-fields">
									{[
										['emailId', 'Email ID'],
										['mobileNumber', 'Mobile Number'],
										['alternateContactNumber', 'Alternate Contact Number']
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

							{/* Billing Communication Preferences */}
							<div className="form-section">
								<h3 className="form-section-title">Billing Communication Preferences</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Send Invoice By</label>
										{isPrintMode ? (
											<div className="print-value">{values.sendInvoiceBy || '___________________'}</div>
										) : (
											<>
												<Field name="sendInvoiceBy" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Email">Email</option>
													<option value="Portal">Portal</option>
													<option value="Both">Both</option>
												</Field>
												<ErrorMessage name="sendInvoiceBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">CC Email IDs</label>
										{isPrintMode ? (
											<div className="print-value">{values.ccEmailIds || '___________________'}</div>
										) : (
											<>
												<Field
													name="ccEmailIds"
													as="textarea"
													className="form-textarea"
													rows="2"
													placeholder="Comma separated email IDs"
												/>
												<ErrorMessage name="ccEmailIds" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Control */}
							<div className="form-section">
								<h3 className="form-section-title">Control</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Active</label>
										{isPrintMode ? (
											<div className="print-value">{values.activeStatus || '___________________'}</div>
										) : (
											<>
												<Field name="activeStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="activeStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.remarks || '___________________'}</div>
										) : (
											<>
												<Field
													name="remarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="remarks" component="div" className="form-error" />
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

export default BillingContactSetupForm;
