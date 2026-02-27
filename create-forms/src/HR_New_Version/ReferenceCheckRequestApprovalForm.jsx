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
	// REQUEST SECTION
	requesterName: Yup.string().required('Requester Name is required'),
	department: Yup.string().required('Department is required'),
	positionJobTitle: Yup.string().required('Position / Job Title is required'),
	typeOfRequirement: Yup.string().required('Type of Requirement is required'),
	employmentType: Yup.string().required('Employment Type is required'),
	reasonForRequirement: Yup.string().required('Reason for Requirement is required'),
	requiredSkills: Yup.string().required('Required Skills / Competencies is required'),
	educationalQualification: Yup.string().required('Educational Qualification is required'),
	experienceRequired: Yup.string().required('Experience Required (Years) is required'),
	proposedSalaryCTC: Yup.string().required('Proposed Salary / CTC is required'),
	requiredByDate: Yup.string().required('Required By Date is required'),

	// REFERENCE CHECK SECTION
	candidateName: Yup.string().required('Candidate Name is required'),
	referencePersonName: Yup.string().required('Reference Person Name is required'),
	referenceOrganization: Yup.string().required('Reference Organization is required'),
	referenceContactNumber: Yup.string().required('Reference Contact Number is required'),
	relationshipWithCandidate: Yup.string().required('Relationship with Candidate is required'),

	// APPROVAL SECTION
	requisitionReferenceNumber: Yup.string().required('Requisition / Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvedManpowerCount: Yup.string().required('Approved Manpower Count is required'),
	budgetAvailability: Yup.string().required('Budget Availability is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments is required'),
	approvalDate: Yup.string().required('Approval Date is required'),

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
	// REQUEST SECTION
	requesterName: '',
	department: '',
	positionJobTitle: '',
	typeOfRequirement: '',
	employmentType: '',
	reasonForRequirement: '',
	requiredSkills: '',
	educationalQualification: '',
	experienceRequired: '',
	proposedSalaryCTC: '',
	requiredByDate: '',

	// REFERENCE CHECK SECTION
	candidateName: '',
	referencePersonName: '',
	referenceOrganization: '',
	referenceContactNumber: '',
	relationshipWithCandidate: '',

	// APPROVAL SECTION
	requisitionReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvedManpowerCount: '',
	budgetAvailability: '',
	approvalComments: '',
	approvalDate: '',

	// Custom fields
	customFields: [],

	// Signatures
	signatures: []
};

const ReferenceCheckRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper formId="FRM-SPECIAL-REFERENCE-CHECK" title="Reference Check — Request & Approval">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Reference Check form submitted:', values);
					alert('✅ Reference Check form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template formId="FRM-SPECIAL-REFERENCE-CHECK" title="Reference Check — Request & Approval" department="HR & People Ops">
							{/* Section 1 - Request / Initiation Details */}
							<div className="form-section">
								<h3 className="form-section-title">📋 Section 1 — Request / Initiation Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Requester Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.requesterName || '___________________'}</div>
										) : (
											<>
												<Field name="requesterName" className="form-input" placeholder="Enter requester name" />
												<ErrorMessage name="requesterName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Department</label>
										{isPrintMode ? (
											<div className="print-value">{values.department || '___________________'}</div>
										) : (
											<>
												<Field name="department" className="form-input" placeholder="e.g., IT, HR, Finance" />
												<ErrorMessage name="department" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Position / Job Title</label>
										{isPrintMode ? (
											<div className="print-value">{values.positionJobTitle || '___________________'}</div>
										) : (
											<>
												<Field name="positionJobTitle" className="form-input" placeholder="e.g., Software Engineer, Project Manager" />
												<ErrorMessage name="positionJobTitle" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Type of Requirement</label>
										{isPrintMode ? (
											<div className="print-value">{values.typeOfRequirement || '___________________'}</div>
										) : (
											<>
												<Field name="typeOfRequirement" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="New">New</option>
													<option value="Replacement">Replacement</option>
													<option value="Temporary">Temporary</option>
												</Field>
												<ErrorMessage name="typeOfRequirement" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Employment Type</label>
										{isPrintMode ? (
											<div className="print-value">{values.employmentType || '___________________'}</div>
										) : (
											<>
												<Field name="employmentType" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Permanent">Permanent</option>
													<option value="Contract">Contract</option>
													<option value="Temporary">Temporary</option>
													<option value="Internship">Internship</option>
												</Field>
												<ErrorMessage name="employmentType" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Reason for Requirement</label>
										{isPrintMode ? (
											<div className="print-value">{values.reasonForRequirement || '___________________'}</div>
										) : (
											<>
												<Field name="reasonForRequirement" as="textarea" className="form-textarea" rows="2" placeholder="Explain the reason for this requirement" />
												<ErrorMessage name="reasonForRequirement" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Required Skills / Competencies</label>
										{isPrintMode ? (
											<div className="print-value">{values.requiredSkills || '___________________'}</div>
										) : (
											<>
												<Field name="requiredSkills" as="textarea" className="form-textarea" rows="2" placeholder="List required skills and competencies" />
												<ErrorMessage name="requiredSkills" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Educational Qualification</label>
										{isPrintMode ? (
											<div className="print-value">{values.educationalQualification || '___________________'}</div>
										) : (
											<>
												<Field name="educationalQualification" as="textarea" className="form-textarea" rows="2" placeholder="e.g., Bachelor's in Engineering, MBA, etc." />
												<ErrorMessage name="educationalQualification" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Experience Required (Years)</label>
										{isPrintMode ? (
											<div className="print-value">{values.experienceRequired || '___________________'}</div>
										) : (
											<>
												<Field name="experienceRequired" className="form-input" placeholder="e.g., 5 years" />
												<ErrorMessage name="experienceRequired" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Proposed Salary / CTC</label>
										{isPrintMode ? (
											<div className="print-value">{values.proposedSalaryCTC || '___________________'}</div>
										) : (
											<>
												<Field name="proposedSalaryCTC" className="form-input" placeholder="e.g., 50,000 - 70,000" />
												<ErrorMessage name="proposedSalaryCTC" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Required By Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.requiredByDate || '___________________'}</div>
										) : (
											<>
												<Field name="requiredByDate" type="date" className="form-input" />
												<ErrorMessage name="requiredByDate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Section 2 - Reference Check Details */}
							<div className="form-section">
								<h3 className="form-section-title">🔍 Section 2 — Reference Check (Request Side – Basic)</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Candidate Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.candidateName || '___________________'}</div>
										) : (
											<>
												<Field name="candidateName" className="form-input" placeholder="Enter candidate full name" />
												<ErrorMessage name="candidateName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Reference Person Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.referencePersonName || '___________________'}</div>
										) : (
											<>
												<Field name="referencePersonName" className="form-input" placeholder="Enter reference person's name" />
												<ErrorMessage name="referencePersonName" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Reference Organization</label>
										{isPrintMode ? (
											<div className="print-value">{values.referenceOrganization || '___________________'}</div>
										) : (
											<>
												<Field name="referenceOrganization" className="form-input" placeholder="Name of organization" />
												<ErrorMessage name="referenceOrganization" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Reference Contact Number</label>
										{isPrintMode ? (
											<div className="print-value">{values.referenceContactNumber || '___________________'}</div>
										) : (
											<>
												<Field name="referenceContactNumber" className="form-input" placeholder="e.g., +91 98765 43210" />
												<ErrorMessage name="referenceContactNumber" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Relationship with Candidate</label>
										{isPrintMode ? (
											<div className="print-value">{values.relationshipWithCandidate || '___________________'}</div>
										) : (
											<>
												<Field name="relationshipWithCandidate" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Former Manager">Former Manager</option>
													<option value="Former Colleague">Former Colleague</option>
													<option value="Client">Client</option>
													<option value="Industry Contact">Industry Contact</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="relationshipWithCandidate" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Section 3 - Approval / Authorization Details */}
							<div className="form-section">
								<h3 className="form-section-title">✅ Section 3 — Approval / Authorization Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Requisition / Reference Number</label>
										{isPrintMode ? (
											<div className="print-value">{values.requisitionReferenceNumber || '___________________'}</div>
										) : (
											<>
												<Field name="requisitionReferenceNumber" className="form-input" placeholder="e.g., REF-2026-001" />
												<ErrorMessage name="requisitionReferenceNumber" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approving Authority Name</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvingAuthorityName || '___________________'}</div>
										) : (
											<>
												<Field name="approvingAuthorityName" className="form-input" placeholder="Name of approving authority" />
												<ErrorMessage name="approvingAuthorityName" component="div" className="form-error" />
											</>
										)}
									</div>

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
													<option value="On Hold">On Hold</option>
												</Field>
												<ErrorMessage name="approvalStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Approved Manpower Count</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvedManpowerCount || '___________________'}</div>
										) : (
											<>
												<Field name="approvedManpowerCount" type="number" className="form-input" placeholder="e.g., 1, 2, 3..." />
												<ErrorMessage name="approvedManpowerCount" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Budget Availability</label>
										{isPrintMode ? (
											<div className="print-value">{values.budgetAvailability || '___________________'}</div>
										) : (
											<>
												<Field name="budgetAvailability" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="budgetAvailability" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Approval Decision / Comments</label>
										{isPrintMode ? (
											<div className="print-value">{values.approvalComments || '___________________'}</div>
										) : (
											<>
												<Field name="approvalComments" as="textarea" className="form-textarea" rows="3" placeholder="Enter approval decision and any additional comments" />
												<ErrorMessage name="approvalComments" component="div" className="form-error" />
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
								</div>
							</div>

							{/* Section 4 - Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Section 4 — Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(arrayHelpers) => (
											<div>
												{(values.customFields || []).length > 0 && (
													<div className="custom-fields-list">
														{(values.customFields || []).map((f, idx) => (
															<div key={f.id || idx} className="custom-field-row">
																<div className="form-field">
																	<Field name={`customFields.${idx}.fieldName`} className="form-input" placeholder="Field Name" />
																	<ErrorMessage name={`customFields.${idx}.fieldName`} component="div" className="form-error" />
																</div>
																<div className="form-field" style={{ flex: 2 }}>
																	<Field name={`customFields.${idx}.fieldValue`} className="form-input" placeholder="Field Value" />
																	<ErrorMessage name={`customFields.${idx}.fieldValue`} component="div" className="form-error" />
																</div>
																<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>Remove</button>
															</div>
														))}
													</div>
												)}
												<button type="button" className="btn-add-field" onClick={() => arrayHelpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>+ Add Custom Field</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{isPrintMode && values.customFields && values.customFields.length > 0 && (
								<div className="form-section">
									<h3 className="form-section-title">➕ Section 4 — Additional Custom Fields</h3>
									<div className="form-fields">
										{values.customFields.map((f, i) => (
											<div key={i} className="form-field full-width custom-field-print"><strong>{f.fieldName}:</strong> {f.fieldValue || '___________________'}</div>
										))}
									</div>
								</div>
							)}

							{/* Section 5 - Signatures */}
							<div className="form-section signatures-section">
								<h3 className="form-section-title">✍️ Section 5 — Digital Signatures</h3>

								{!isPrintMode && (
									<FieldArray name="signatures">
										{(arrayHelpers) => (
											<div>
												{(values.signatures || []).length > 0 && (
													<div className="signatures-list">
														{(values.signatures || []).map((sig, idx) => (
															<div key={sig.id || idx} className="signature-row-container">
																<div className="signature-row">
																	<div className="form-field">
																		<label className="form-label required">Signature Name</label>
																		<Field name={`signatures.${idx}.signatureName`} className="form-input" placeholder="e.g., Manager, Director, HOD" />
																		<ErrorMessage name={`signatures.${idx}.signatureName`} component="div" className="form-error" />
																	</div>

																	<div className="form-field">
																		<label className="form-label required">Date</label>
																		<Field name={`signatures.${idx}.signatureDate`} type="date" className="form-input" />
																		<ErrorMessage name={`signatures.${idx}.signatureDate`} component="div" className="form-error" />
																	</div>

																	<button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>Remove Signature</button>
																</div>

																<div className="signature-pad-container">
																	<label className="form-label">Signature Pad / Upload</label>
																	<SignatureComponent
																		name={`Signature ${idx + 1}`}
																		onChange={(sig) => setFieldValue(`signatures.${idx}.signatureData`, sig.data || '')}
																		value={sig}
																	/>
																</div>
															</div>
														))}
													</div>
												)}

												<button type="button" className="btn-add-signature" onClick={() => arrayHelpers.push({ id: uuidv4(), signatureName: '', signatureData: '', signatureDate: '' })}>+ Add Signature</button>
											</div>
										)}
									</FieldArray>
								)}

								{isPrintMode && values.signatures && values.signatures.length > 0 && (
									<div className="print-signatures">
										{values.signatures.map((sig, i) => (
											<div key={i} className="print-signature-box">
												<div className="sig-name">{sig.signatureName || `Signature ${i + 1}`}</div>
												<div className="sig-space">{sig.signatureData && <img src={sig.signatureData} alt={`sig-${i}`} className="print-sig-image" />}</div>
												<div className="sig-line"></div>
												<div className="sig-date">{sig.signatureDate && `Date: ${sig.signatureDate}`}</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Submit */}
							{!isPrintMode && (
								<div className="form-actions">
									<button type="submit" className="btn-submit">Save Form</button>
								</div>
							)}
						</ModernA4Template>
					</Form>
				)}
			</Formik>
		</ModernFormWrapper>
	);
};

export default ReferenceCheckRequestApprovalForm;
