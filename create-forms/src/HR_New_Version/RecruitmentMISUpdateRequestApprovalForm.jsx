// RecruitmentMISUpdateRequestApprovalForm.jsx

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
	// SECTION 1 – REQUEST / INITIATION DETAILS
	requesterName: Yup.string().required('Requester Name is required'),
	department: Yup.string().required('Department is required'),
	positionJobTitle: Yup.string().required('Position / Job Title is required'),
	misReportName: Yup.string().required('MIS / Report Name is required'),
	typeOfUpdate: Yup.string().required('Type of Update is required'),
	moduleProcessArea: Yup.string().required('Module / Process Area is required'),
	descriptionOfChange: Yup.string().required('Description of Change is required'),
	businessJustification: Yup.string().required('Business Justification is required'),
	impactArea: Yup.string().required('Impact Area is required'),
	priority: Yup.string().required('Priority is required'),
	requestedCompletionDate: Yup.string().required('Requested Completion Date is required'),

	// SECTION 2 – MIS UPDATE DETAILS (BASIC)
	currentDataIssue: Yup.string().required('Current Data Issue / Limitation is required'),
	expectedOutput: Yup.string().required('Expected Output / Result is required'),
	dataDependencyImpact: Yup.string().required('Data Dependency / Source System Impact is required'),
	testingRequired: Yup.string().required('Testing / Validation Required is required'),
	hrMisRemarks: Yup.string().required('Remarks by HR / MIS Team is required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	misUpdateReferenceNumber: Yup.string().required('MIS Update Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvedScopeConditions: Yup.string().required('Approved Scope / Conditions is required'),
	resourceAvailability: Yup.string().required('Resource / Effort Availability is required'),
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
	misReportName: '',
	typeOfUpdate: '',
	moduleProcessArea: '',
	descriptionOfChange: '',
	businessJustification: '',
	impactArea: '',
	priority: '',
	requestedCompletionDate: '',

	// SECTION 2
	currentDataIssue: '',
	expectedOutput: '',
	dataDependencyImpact: '',
	testingRequired: '',
	hrMisRemarks: '',

	// SECTION 3
	misUpdateReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvedScopeConditions: '',
	resourceAvailability: '',
	approvalComments: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const RecruitmentMISUpdateRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-RECRUITMENT-MIS-UPDATE"
			title="Recruitment MIS Update — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Recruitment MIS Update form submitted:', values);
					alert('✅ Recruitment MIS Update form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-RECRUITMENT-MIS-UPDATE"
							title="Recruitment MIS Update — Request & Approval"
							department="HR & People Ops"
						>
							{/* SECTION 1 – REQUEST / INITIATION DETAILS */}
							<div className="form-section">
								<h3 className="form-section-title">
									📋 Section 1 — Request / Initiation Details
								</h3>

								<div className="form-fields">
									{[
										{ name: 'requesterName', label: 'Requester Name' },
										{ name: 'department', label: 'Department' },
										{ name: 'positionJobTitle', label: 'Position / Job Title' },
										{ name: 'misReportName', label: 'MIS / Report Name' }
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
													<ErrorMessage
														name={f.name}
														component="div"
														className="form-error"
													/>
												</>
											)}
										</div>
									))}

									<div className="form-field">
										<label className="form-label required">
											Type of Update
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.typeOfUpdate || '___________________'}
											</div>
										) : (
											<>
												<Field name="typeOfUpdate" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="New Field">New Field</option>
													<option value="Correction">Correction</option>
													<option value="Enhancement">Enhancement</option>
													<option value="Deletion">Deletion</option>
												</Field>
												<ErrorMessage name="typeOfUpdate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Module / Process Area
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.moduleProcessArea || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="moduleProcessArea"
													className="form-input"
													placeholder="Recruitment / Hiring / Onboarding etc."
												/>
												<ErrorMessage name="moduleProcessArea" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Description of Change Required
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.descriptionOfChange || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="descriptionOfChange"
													as="textarea"
													className="form-textarea"
													rows="3"
												/>
												<ErrorMessage name="descriptionOfChange" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Reason / Business Justification for MIS Update
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.businessJustification || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="businessJustification"
													as="textarea"
													className="form-textarea"
													rows="3"
												/>
												<ErrorMessage name="businessJustification" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Impact Area
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.impactArea || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="impactArea"
													className="form-input"
													placeholder="Reports / Dashboards / Integrations etc."
												/>
												<ErrorMessage name="impactArea" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Priority
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.priority || '___________________'}
											</div>
										) : (
											<>
												<Field name="priority" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Low">Low</option>
													<option value="Medium">Medium</option>
													<option value="High">High</option>
												</Field>
												<ErrorMessage name="priority" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Requested Completion Date
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.requestedCompletionDate || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="requestedCompletionDate"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="requestedCompletionDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – MIS UPDATE DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — MIS Update Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field full-width">
										<label className="form-label required">
											Current Data Issue / Limitation (if any)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.currentDataIssue || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="currentDataIssue"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="currentDataIssue" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Expected Output / Result After Update
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.expectedOutput || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="expectedOutput"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="expectedOutput" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Any Data Dependency / Source System Impact
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.dataDependencyImpact || '___________________'}
											</div>
										) : (
											<>
												<Field name="dataDependencyImpact" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="dataDependencyImpact" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Testing / Validation Required
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.testingRequired || '___________________'}
											</div>
										) : (
											<>
												<Field name="testingRequired" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="testingRequired" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Remarks by HR / MIS Team
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hrMisRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="hrMisRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="hrMisRemarks" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 3 – APPROVAL / AUTHORIZATION DETAILS */}
							<div className="form-section">
								<h3 className="form-section-title">
									✅ Section 3 — Approval / Authorization Details
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">
											MIS Update Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.misUpdateReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="misUpdateReferenceNumber" className="form-input" />
												<ErrorMessage name="misUpdateReferenceNumber" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Approving Authority Name
										</label>
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
										<label className="form-label required">
											Approval Status
										</label>
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

									<div className="form-field full-width">
										<label className="form-label required">
											Approved Scope / Conditions (if any)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvedScopeConditions || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="approvedScopeConditions"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="approvedScopeConditions" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Resource / Effort Availability
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.resourceAvailability || '___________________'}
											</div>
										) : (
											<>
												<Field name="resourceAvailability" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="resourceAvailability" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Approval Decision / Comments
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.approvalComments || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="approvalComments"
													as="textarea"
													className="form-textarea"
													rows="3"
												/>
												<ErrorMessage name="approvalComments" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Approval Date
										</label>
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

export default RecruitmentMISUpdateRequestApprovalForm;
