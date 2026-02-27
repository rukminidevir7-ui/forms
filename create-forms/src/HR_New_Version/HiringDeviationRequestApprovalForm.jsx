// HiringDeviationRequestApprovalForm.jsx

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
	// SECTION 1 – REQUEST / INITIATION
	requesterName: Yup.string().required('Requester Name is required'),
	department: Yup.string().required('Department is required'),
	positionJobTitle: Yup.string().required('Position / Job Title is required'),
	candidateName: Yup.string().required('Candidate Name is required'),
	typeOfHiringDeviation: Yup.string().required('Type of Hiring Deviation is required'),
	policyProcessDeviated: Yup.string().required('Policy / Process Being Deviated is required'),
	reasonForDeviation: Yup.string().required('Reason for Deviation is required'),
	businessJustification: Yup.string().required('Business Justification is required'),
	riskImpactOfDeviation: Yup.string().required('Risk / Impact of Deviation is required'),
	proposedMitigationControl: Yup.string().required('Proposed Mitigation / Control is required'),
	requiredByDate: Yup.string().required('Required By Date is required'),

	// SECTION 2 – DEVIATION DETAILS (BASIC)
	isOneTimeDeviation: Yup.string().required('This field is required'),
	deviationDuration: Yup.string().required('Duration / Period of Deviation is required'),
	hasFinancialImpact: Yup.string().required('This field is required'),
	estimatedCostImpact: Yup.string().required('Estimated Cost Impact is required'),
	externalApprovalRequired: Yup.string().required('This field is required'),

	// SECTION 3 – APPROVAL
	deviationReferenceNumber: Yup.string().required('Deviation Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	budgetAvailability: Yup.string().required('Budget Availability is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments is required'),
	approvalDate: Yup.string().required('Approval Date is required'),

	// Custom Fields
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
	// SECTION 1
	requesterName: '',
	department: '',
	positionJobTitle: '',
	candidateName: '',
	typeOfHiringDeviation: '',
	policyProcessDeviated: '',
	reasonForDeviation: '',
	businessJustification: '',
	riskImpactOfDeviation: '',
	proposedMitigationControl: '',
	requiredByDate: '',

	// SECTION 2
	isOneTimeDeviation: '',
	deviationDuration: '',
	hasFinancialImpact: '',
	estimatedCostImpact: '',
	externalApprovalRequired: '',

	// SECTION 3
	deviationReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	budgetAvailability: '',
	approvalComments: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const HiringDeviationRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-HIRING-DEVIATION"
			title="Hiring Deviation — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Hiring Deviation form submitted:', values);
					alert('✅ Hiring Deviation form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-HIRING-DEVIATION"
							title="Hiring Deviation — Request & Approval"
							department="HR & People Ops"
						>
							{/* SECTION 1 */}
							<div className="form-section">
								<h3 className="form-section-title">
									📋 Section 1 — Request / Initiation Details
								</h3>

								<div className="form-fields">
									{[
										{ name: 'requesterName', label: 'Requester Name' },
										{ name: 'department', label: 'Department' },
										{ name: 'positionJobTitle', label: 'Position / Job Title' },
										{ name: 'candidateName', label: 'Candidate Name' }
									].map((f) => (
										<div key={f.name} className="form-field">
											<label className="form-label required">{f.label}</label>
											{isPrintMode ? (
												<div className="print-value">
													{values[f.name] || '___________________'}
												</div>
											) : (
												<>
													<Field name={f.name} className="form-input" />
													<ErrorMessage name={f.name} component="div" className="form-error" />
												</>
											)}
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">Type of Hiring Deviation</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.typeOfHiringDeviation || '___________________'}
											</div>
										) : (
											<>
												<Field name="typeOfHiringDeviation" className="form-input" />
												<ErrorMessage name="typeOfHiringDeviation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Policy / Process Being Deviated</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.policyProcessDeviated || '___________________'}
											</div>
										) : (
											<>
												<Field name="policyProcessDeviated" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="policyProcessDeviated" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Reason for Deviation</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reasonForDeviation || '___________________'}
											</div>
										) : (
											<>
												<Field name="reasonForDeviation" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="reasonForDeviation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Business Justification</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.businessJustification || '___________________'}
											</div>
										) : (
											<>
												<Field name="businessJustification" as="textarea" className="form-textarea" rows="3" />
												<ErrorMessage name="businessJustification" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Risk / Impact of Deviation</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.riskImpactOfDeviation || '___________________'}
											</div>
										) : (
											<>
												<Field name="riskImpactOfDeviation" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="riskImpactOfDeviation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Proposed Mitigation / Control</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedMitigationControl || '___________________'}
											</div>
										) : (
											<>
												<Field name="proposedMitigationControl" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="proposedMitigationControl" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Required By Date</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.requiredByDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="requiredByDate" type="date" className="form-input" />
												<ErrorMessage name="requiredByDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Deviation Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Is this a one-time deviation?</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.isOneTimeDeviation || '___________________'}
											</div>
										) : (
											<>
												<Field name="isOneTimeDeviation" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="isOneTimeDeviation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Duration / Period of Deviation</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.deviationDuration || '___________________'}
											</div>
										) : (
											<>
												<Field name="deviationDuration" className="form-input" />
												<ErrorMessage name="deviationDuration" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Any financial impact?</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hasFinancialImpact || '___________________'}
											</div>
										) : (
											<>
												<Field name="hasFinancialImpact" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="hasFinancialImpact" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Estimated Cost Impact (if any)</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.estimatedCostImpact || '___________________'}
											</div>
										) : (
											<>
												<Field name="estimatedCostImpact" className="form-input" />
												<ErrorMessage name="estimatedCostImpact" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Is approval required from external authority?
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.externalApprovalRequired || '___________________'}
											</div>
										) : (
											<>
												<Field name="externalApprovalRequired" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="externalApprovalRequired" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 3 */}
							<div className="form-section">
								<h3 className="form-section-title">
									✅ Section 3 — Approval / Authorization Details
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Deviation Reference Number</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.deviationReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="deviationReferenceNumber" className="form-input" />
												<ErrorMessage name="deviationReferenceNumber" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approving Authority Name</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvingAuthorityName || '___________________'}
											</div>
										) : (
											<>
												<Field name="approvingAuthorityName" className="form-input" />
												<ErrorMessage name="approvingAuthorityName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approval Status</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvalStatus || '___________________'}
											</div>
										) : (
											<>
												<Field name="approvalStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Approved">Approved</option>
													<option value="Rejected">Rejected</option>
													<option value="On Hold">On Hold</option>
												</Field>
												<ErrorMessage name="approvalStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Budget Availability</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.budgetAvailability || '___________________'}
											</div>
										) : (
											<>
												<Field name="budgetAvailability" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
													<option value="NA">NA</option>
												</Field>
												<ErrorMessage name="budgetAvailability" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Approval Decision / Comments</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvalComments || '___________________'}
											</div>
										) : (
											<>
												<Field name="approvalComments" as="textarea" className="form-textarea" rows="3" />
												<ErrorMessage name="approvalComments" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approval Date</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvalDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="approvalDate" type="date" className="form-input" />
												<ErrorMessage name="approvalDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Additional Custom Fields</h3>
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
													+ Add Custom Field
												</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{isPrintMode && values.customFields.length > 0 && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Additional Custom Fields</h3>
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
								<h3 className="form-section-title">✍️ Digital Signatures</h3>

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
													+ Add Signature
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

							{/* Submit */}
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

export default HiringDeviationRequestApprovalForm;
