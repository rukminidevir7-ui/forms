// POMappingValidationRequestApprovalForm.jsx

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
	clientName: Yup.string().required('Client Name is required'),
	clientCode: Yup.string().required('Client Code / ID is required'),
	projectReference: Yup.string().required('Project / Contract Reference is required'),
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),

	// PO Details
	poNumber: Yup.string().required('PO Number is required'),
	poDate: Yup.string().required('PO Date is required'),
	poValueAmount: Yup.string().required('PO Value / Amount is required'),
	poCurrency: Yup.string().required('PO Currency is required'),
	poValidFromDate: Yup.string().required('PO Valid From Date is required'),
	poValidToDate: Yup.string().required('PO Valid To Date is required'),

	// PO Mapping Details
	mappedServiceItem: Yup.string().required('Mapped Service / Item is required'),
	mappedProjectCostCenter: Yup.string().required('Mapped Project / Cost Center is required'),
	mappedBillingEntity: Yup.string().required('Mapped Billing Entity is required'),

	// Validation Details
	poValidAsPerContract: Yup.string().required('PO valid as per contract is required'),
	poBalanceAvailable: Yup.string().required('PO balance availability is required'),
	poMandatoryFieldsVerified: Yup.string().required('PO mandatory fields verification is required'),
	validationRemarks: Yup.string().required('Remarks on validation are required'),

	// Request
	requestedBy: Yup.string().required('Requested By is required'),
	requestedDate: Yup.string().required('Requested Date is required'),
	businessJustification: Yup.string().required('Business Justification is required'),

	// Approval
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvedBy: Yup.string().required('Approved By is required'),
	approvalDate: Yup.string().required('Approval Date is required'),
	approvalRemarks: Yup.string().required('Approval Remarks are required'),

	// Record Control
	recordStatus: Yup.string().required('Record Status is required'),
	createdBy: Yup.string().required('Created By is required'),
	createdDate: Yup.string().required('Created Date is required'),
	lastUpdatedBy: Yup.string().required('Last Updated By is required'),
	lastUpdatedDate: Yup.string().required('Last Updated Date is required'),

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
	projectReference: '',
	billingEntityLocation: '',

	poNumber: '',
	poDate: '',
	poValueAmount: '',
	poCurrency: '',
	poValidFromDate: '',
	poValidToDate: '',

	mappedServiceItem: '',
	mappedProjectCostCenter: '',
	mappedBillingEntity: '',

	poValidAsPerContract: '',
	poBalanceAvailable: '',
	poMandatoryFieldsVerified: '',
	validationRemarks: '',

	requestedBy: '',
	requestedDate: '',
	businessJustification: '',

	approvalStatus: '',
	approvedBy: '',
	approvalDate: '',
	approvalRemarks: '',

	recordStatus: '',
	createdBy: '',
	createdDate: '',
	lastUpdatedBy: '',
	lastUpdatedDate: '',

	customFields: [],
	signatures: []
};

const POMappingValidationRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-02516-02517"
			title="PO Mapping & Validation – Initiation & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('PO Mapping & Validation submitted:', values);
					alert('PO Mapping & Validation form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02516-02517"
							title="PO Mapping & Validation – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Client & Business Context */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Business Context</h3>
								<div className="form-fields">
									{[
										['clientName', 'Client Name'],
										['clientCode', 'Client Code / ID'],
										['projectReference', 'Project / Contract Reference'],
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

							{/* Purchase Order (PO) Details */}
							<div className="form-section">
								<h3 className="form-section-title">Purchase Order (PO) Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">PO Number</label>
										{isPrintMode ? <div className="print-value">{values.poNumber || '___________________'}</div> :
											<>
												<Field name="poNumber" className="form-input" />
												<ErrorMessage name="poNumber" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">PO Date</label>
										{isPrintMode ? <div className="print-value">{values.poDate || '___________________'}</div> :
											<>
												<Field name="poDate" type="date" className="form-input" />
												<ErrorMessage name="poDate" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">PO Value / Amount</label>
										{isPrintMode ? <div className="print-value">{values.poValueAmount || '___________________'}</div> :
											<>
												<Field name="poValueAmount" className="form-input" />
												<ErrorMessage name="poValueAmount" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">PO Currency</label>
										{isPrintMode ? <div className="print-value">{values.poCurrency || '___________________'}</div> :
											<>
												<Field name="poCurrency" className="form-input" />
												<ErrorMessage name="poCurrency" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">PO Valid From Date</label>
										{isPrintMode ? <div className="print-value">{values.poValidFromDate || '___________________'}</div> :
											<>
												<Field name="poValidFromDate" type="date" className="form-input" />
												<ErrorMessage name="poValidFromDate" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">PO Valid To Date</label>
										{isPrintMode ? <div className="print-value">{values.poValidToDate || '___________________'}</div> :
											<>
												<Field name="poValidToDate" type="date" className="form-input" />
												<ErrorMessage name="poValidToDate" component="div" className="form-error" />
											</>
										}
									</div>
								</div>
							</div>

							{/* PO Mapping Details */}
							<div className="form-section">
								<h3 className="form-section-title">PO Mapping Details</h3>
								<div className="form-fields">
									{[
										['mappedServiceItem', 'Mapped Service / Item'],
										['mappedProjectCostCenter', 'Mapped Project / Cost Center'],
										['mappedBillingEntity', 'Mapped Billing Entity']
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

							{/* Validation Details */}
							<div className="form-section">
								<h3 className="form-section-title">Validation Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">PO Valid as per Contract</label>
										{isPrintMode ? (
											<div className="print-value">{values.poValidAsPerContract || '___________________'}</div>
										) : (
											<>
												<Field name="poValidAsPerContract" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="poValidAsPerContract" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">PO Balance Available</label>
										{isPrintMode ? (
											<div className="print-value">{values.poBalanceAvailable || '___________________'}</div>
										) : (
											<>
												<Field name="poBalanceAvailable" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="poBalanceAvailable" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">PO Mandatory Fields Verified</label>
										{isPrintMode ? (
											<div className="print-value">{values.poMandatoryFieldsVerified || '___________________'}</div>
										) : (
											<>
												<Field name="poMandatoryFieldsVerified" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="poMandatoryFieldsVerified" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Remarks on Validation</label>
										{isPrintMode ? (
											<div className="print-value">{values.validationRemarks || '___________________'}</div>
										) : (
											<>
												<Field name="validationRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="validationRemarks" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Request / Initiation Details */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Initiation Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Requested By</label>
										{isPrintMode ? (
											<div className="print-value">{values.requestedBy || '___________________'}</div>
										) : (
											<>
												<Field name="requestedBy" className="form-input" />
												<ErrorMessage name="requestedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Requested Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.requestedDate || '___________________'}</div>
										) : (
											<>
												<Field name="requestedDate" type="date" className="form-input" />
												<ErrorMessage name="requestedDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Business Justification / Reason</label>
										{isPrintMode ? (
											<div className="print-value">{values.businessJustification || '___________________'}</div>
										) : (
											<>
												<Field name="businessJustification" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="businessJustification" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Approval / Authorization Details */}
							<div className="form-section">
								<h3 className="form-section-title">Approval / Authorization Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Approval Status</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalStatus || '___________________'}</div>
										) : (
											<>
												<Field name="approvalStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Approved">Approved</option>
													<option value="Rejected">Rejected</option>
												</Field>
												<ErrorMessage name="approvalStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approved By</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvedBy || '___________________'}</div>
										) : (
											<>
												<Field name="approvedBy" className="form-input" />
												<ErrorMessage name="approvedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approval Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalDate || '___________________'}</div>
										) : (
											<>
												<Field name="approvalDate" type="date" className="form-input" />
												<ErrorMessage name="approvalDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Approval Remarks</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalRemarks || '___________________'}</div>
										) : (
											<>
												<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="approvalRemarks" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Record Control */}
							<div className="form-section">
								<h3 className="form-section-title">Record Control</h3>
								<div className="form-fields">
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

									{[
										['createdBy', 'Created By'],
										['createdDate', 'Created Date', 'date'],
										['lastUpdatedBy', 'Last Updated By'],
										['lastUpdatedDate', 'Last Updated Date', 'date']
									].map(([n, l, t]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? (
												<div className="print-value">{values[n] || '___________________'}</div>
											) : (
												<>
													<Field name={n} type={t || 'text'} className="form-input" />
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											)}
										</div>
									))}
								</div>
							</div>

							{/* Custom Fields */}
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

export default POMappingValidationRequestApprovalForm;
