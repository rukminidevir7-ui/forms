// ClientGSTINTaxIDVerificationChecklistForm.jsx

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
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),

	// Tax Identification Details
	gstinTaxId: Yup.string().required('GSTIN / Tax ID is required'),
	registeredLegalName: Yup.string().required('Registered Legal Name is required'),
	registeredStateCountry: Yup.string().required('Registered State / Country is required'),

	// Verification Checklist
	formatVerified: Yup.string().required('Format verification is required'),
	registrationStatusValid: Yup.string().required('Registration status is required'),
	legalNameMatches: Yup.string().required('Legal name match is required'),
	stateMatchesBillingLocation: Yup.string().required('State / jurisdiction match is required'),
	documentScreenshotAvailable: Yup.string().required('Document / portal screenshot availability is required'),

	// Verification Result
	overallVerificationStatus: Yup.string().required('Overall verification status is required'),
	verificationRemarks: Yup.string().required('Verification remarks are required'),

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
	billingEntityLocation: '',

	gstinTaxId: '',
	registeredLegalName: '',
	registeredStateCountry: '',

	formatVerified: '',
	registrationStatusValid: '',
	legalNameMatches: '',
	stateMatchesBillingLocation: '',
	documentScreenshotAvailable: '',

	overallVerificationStatus: '',
	verificationRemarks: '',

	verifiedBy: '',
	verificationDate: '',
	recordStatus: '',

	customFields: [],
	signatures: []
};

const ClientGSTINTaxIDVerificationChecklistForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-02519"
			title="Client GSTIN / Tax ID Verification – Checklist"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Client GSTIN / Tax ID Verification submitted:', values);
					alert('Client GSTIN / Tax ID Verification saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02519"
							title="Client GSTIN / Tax ID Verification – Checklist"
							department="Client Billing & Revenue Operations"
						>

							{/* Client Information */}
							<div className="form-section">
								<h3 className="form-section-title">Client Information</h3>
								<div className="form-fields">
									{[
										['clientName', 'Client Name'],
										['clientCode', 'Client Code / ID'],
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

							{/* Tax Identification Details */}
							<div className="form-section">
								<h3 className="form-section-title">Tax Identification Details</h3>
								<div className="form-fields">
									{[
										['gstinTaxId', 'GSTIN / Tax ID'],
										['registeredLegalName', 'Registered Legal Name (as per registration)'],
										['registeredStateCountry', 'Registered State / Country']
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

							{/* Verification Checklist */}
							<div className="form-section">
								<h3 className="form-section-title">Verification Checklist</h3>
								<div className="form-fields">
									{[
										['formatVerified', 'GSTIN / Tax ID format verified'],
										['registrationStatusValid', 'Registration status active / valid'],
										['legalNameMatches', 'Legal name matches client master'],
										['stateMatchesBillingLocation', 'State / jurisdiction matches billing location'],
										['documentScreenshotAvailable', 'Document / portal screenshot available']
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

							{/* Verification Result */}
							<div className="form-section">
								<h3 className="form-section-title">Verification Result</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Overall Verification Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.overallVerificationStatus || '___________________'}</div>
										) : (
											<>
												<Field name="overallVerificationStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Verified">Verified</option>
													<option value="Rejected">Rejected</option>
													<option value="Pending">Pending</option>
												</Field>
												<ErrorMessage name="overallVerificationStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Verification Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.verificationRemarks || '___________________'}</div>
										) : (
											<>
												<Field
													name="verificationRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="verificationRemarks" component="div" className="form-error" />
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
													<option value="Active">Active</option>
													<option value="Inactive">Inactive</option>
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

export default ClientGSTINTaxIDVerificationChecklistForm;
