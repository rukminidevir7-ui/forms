// NewHireConfirmationRequestApproval.jsx

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
	candidateEmployeeName: Yup.string().required('Candidate / Employee Name is required'),
	offerRequisitionRefNo: Yup.string().required('Offer / Requisition Reference Number is required'),
	employmentType: Yup.string().required('Employment Type is required'),
	proposedJoiningDate: Yup.string().required('Proposed Date of Joining is required'),
	reportingManagerName: Yup.string().required('Reporting Manager Name is required'),
	workLocation: Yup.string().required('Work Location is required'),
	offeredCTC: Yup.string().required('Offered CTC / Compensation is required'),
	businessUnitProject: Yup.string().required('Business Unit / Project is required'),

	// SECTION 2 – NEW HIRE CONFIRMATION DETAILS (BASIC)
	joiningStatus: Yup.string().required('Joining Status is required'),
	documentsSubmitted: Yup.string().required('Documents Submitted status is required'),
	backgroundVerificationStatus: Yup.string().required('Background Verification Status is required'),
	medicalChecksCompleted: Yup.string().required('Medical / Other Checks status is required'),
	exceptionDeviation: Yup.string().required('Exception / Deviation details are required'),
	hrRemarks: Yup.string().required('Remarks by HR / Recruitment Team are required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	newHireConfirmationRefNo: Yup.string().required('New Hire Confirmation Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments are required'),
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
	candidateEmployeeName: '',
	offerRequisitionRefNo: '',
	employmentType: '',
	proposedJoiningDate: '',
	reportingManagerName: '',
	workLocation: '',
	offeredCTC: '',
	businessUnitProject: '',

	// SECTION 2
	joiningStatus: '',
	documentsSubmitted: '',
	backgroundVerificationStatus: '',
	medicalChecksCompleted: '',
	exceptionDeviation: '',
	hrRemarks: '',

	// SECTION 3
	newHireConfirmationRefNo: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvalComments: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const NewHireConfirmationRequestApproval = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-NEW-HIRE-CONFIRMATION"
			title="New Hire Confirmation — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('New Hire Confirmation form submitted:', values);
					alert('✅ New Hire Confirmation form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-NEW-HIRE-CONFIRMATION"
							title="New Hire Confirmation — Request & Approval"
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
										{ name: 'candidateEmployeeName', label: 'Candidate / Employee Name' },
										{ name: 'offerRequisitionRefNo', label: 'Offer / Requisition Reference Number' }
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
										<label className="form-label required">
											Employment Type
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.employmentType || '___________________'}
											</div>
										) : (
											<>
												<Field name="employmentType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Permanent">Permanent</option>
													<option value="Contract">Contract</option>
													<option value="Intern">Intern</option>
													<option value="Consultant">Consultant</option>
												</Field>
												<ErrorMessage name="employmentType" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Proposed Date of Joining
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedJoiningDate || '___________________'}
											</div>
										) : (
											<>
												<Field name="proposedJoiningDate" type="date" className="form-input" />
												<ErrorMessage name="proposedJoiningDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Reporting Manager Name
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reportingManagerName || '___________________'}
											</div>
										) : (
											<>
												<Field name="reportingManagerName" className="form-input" />
												<ErrorMessage name="reportingManagerName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Work Location
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.workLocation || '___________________'}
											</div>
										) : (
											<>
												<Field name="workLocation" className="form-input" />
												<ErrorMessage name="workLocation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Offered CTC / Compensation
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.offeredCTC || '___________________'}
											</div>
										) : (
											<>
												<Field name="offeredCTC" className="form-input" />
												<ErrorMessage name="offeredCTC" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Business Unit / Project
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.businessUnitProject || '___________________'}
											</div>
										) : (
											<>
												<Field name="businessUnitProject" className="form-input" />
												<ErrorMessage name="businessUnitProject" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – NEW HIRE CONFIRMATION DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — New Hire Confirmation Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">
											Joining Status
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.joiningStatus || '___________________'}
											</div>
										) : (
											<>
												<Field name="joiningStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Joined">Joined</option>
													<option value="Deferred">Deferred</option>
													<option value="Not Joined">Not Joined</option>
												</Field>
												<ErrorMessage name="joiningStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Documents Submitted by Candidate
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.documentsSubmitted || '___________________'}
											</div>
										) : (
											<>
												<Field name="documentsSubmitted" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="documentsSubmitted" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Background Verification Status
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.backgroundVerificationStatus || '___________________'}
											</div>
										) : (
											<>
												<Field name="backgroundVerificationStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Completed">Completed</option>
													<option value="In Progress">In Progress</option>
													<option value="Not Started">Not Started</option>
												</Field>
												<ErrorMessage name="backgroundVerificationStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Medical / Other Checks Completed
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.medicalChecksCompleted || '___________________'}
											</div>
										) : (
											<>
												<Field name="medicalChecksCompleted" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
													<option value="NA">NA</option>
												</Field>
												<ErrorMessage name="medicalChecksCompleted" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Any Exception / Deviation (if any)
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.exceptionDeviation || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="exceptionDeviation"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="exceptionDeviation" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Remarks by HR / Recruitment Team
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hrRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="hrRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="hrRemarks" component="div" className="form-error" />
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
											New Hire Confirmation Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.newHireConfirmationRefNo || '___________________'}
											</div>
										) : (
											<>
												<Field name="newHireConfirmationRefNo" className="form-input" />
												<ErrorMessage name="newHireConfirmationRefNo" component="div" className="form-error" />
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

export default NewHireConfirmationRequestApproval;
