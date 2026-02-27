// EmployeeDataChangeRequest.jsx

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
	employeeName: Yup.string().required('Employee Name is required'),
	employeeId: Yup.string().required('Employee ID is required'),
	currentDesignation: Yup.string().required('Current Designation is required'),
	businessUnitLocation: Yup.string().required('Business Unit / Location is required'),
	typeOfDataChange: Yup.string().required('Type of Data Change is required'),
	reasonForDataChange: Yup.string().required('Reason for Data Change is required'),
	effectiveDateOfChange: Yup.string().required('Effective Date of Change is required'),
	supportingDocumentsAttached: Yup.string().required('Supporting Documents Attached status is required'),

	// SECTION 2 – DATA CHANGE DETAILS (BASIC)
	fieldsToBeUpdated: Yup.string().required('Field(s) to be Updated is required'),
	currentValue: Yup.string().required('Current Value is required'),
	proposedNewValue: Yup.string().required('Proposed New Value is required'),
	impactArea: Yup.string().required('Impact Area is required'),
	hrOperationsRemarks: Yup.string().required('Remarks by HR Operations Team are required'),

	// SECTION 3 – APPROVAL / AUTHORIZATION DETAILS
	employeeDataChangeReferenceNumber: Yup.string().required('Employee Data Change Reference Number is required'),
	approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
	approvalStatus: Yup.string().required('Approval Status is required'),
	approvalComments: Yup.string().required('Approval Decision / Comments are required'),
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
	// SECTION 1
	requesterName: '',
	department: '',
	employeeName: '',
	employeeId: '',
	currentDesignation: '',
	businessUnitLocation: '',
	typeOfDataChange: '',
	reasonForDataChange: '',
	effectiveDateOfChange: '',
	supportingDocumentsAttached: '',

	// SECTION 2
	fieldsToBeUpdated: '',
	currentValue: '',
	proposedNewValue: '',
	impactArea: '',
	hrOperationsRemarks: '',

	// SECTION 3
	employeeDataChangeReferenceNumber: '',
	approvingAuthorityName: '',
	approvalStatus: '',
	approvalComments: '',
	approvalDate: '',

	// Common
	customFields: [],
	signatures: []
};

const EmployeeDataChangeRequest = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-EMPLOYEE-DATA-CHANGE"
			title="Employee Data Change — Request & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Employee Data Change form submitted:', values);
					alert('✅ Employee Data Change form saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-EMPLOYEE-DATA-CHANGE"
							title="Employee Data Change — Request & Approval"
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
										{ name: 'employeeName', label: 'Employee Name' },
										{ name: 'employeeId', label: 'Employee ID' },
										{ name: 'currentDesignation', label: 'Current Designation' },
										{ name: 'businessUnitLocation', label: 'Business Unit / Location' }
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
											Type of Data Change
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.typeOfDataChange || '___________________'}
											</div>
										) : (
											<>
												<Field name="typeOfDataChange" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Personal">Personal</option>
													<option value="Job">Job</option>
													<option value="Compensation">Compensation</option>
													<option value="Banking">Banking</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="typeOfDataChange" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Reason for Data Change
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.reasonForDataChange || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="reasonForDataChange"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="reasonForDataChange" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Effective Date of Change
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.effectiveDateOfChange || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="effectiveDateOfChange"
													type="date"
													className="form-input"
												/>
												<ErrorMessage name="effectiveDateOfChange" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">
											Supporting Documents Attached
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.supportingDocumentsAttached || '___________________'}
											</div>
										) : (
											<>
												<Field name="supportingDocumentsAttached" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="supportingDocumentsAttached" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* SECTION 2 – DATA CHANGE DETAILS (BASIC) */}
							<div className="form-section">
								<h3 className="form-section-title">
									📄 Section 2 — Data Change Details (Basic)
								</h3>

								<div className="form-fields">
									<div className="form-field full-width">
										<label className="form-label required">
											Field(s) to be Updated
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.fieldsToBeUpdated || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="fieldsToBeUpdated"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="fieldsToBeUpdated" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Current Value
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.currentValue || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="currentValue"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="currentValue" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Proposed New Value
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.proposedNewValue || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="proposedNewValue"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="proposedNewValue" component="div" className="form-error" />
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
													placeholder="Payroll / Benefits / HR Systems / Reporting etc."
												/>
												<ErrorMessage name="impactArea" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">
											Remarks by HR Operations Team
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.hrOperationsRemarks || '___________________'}
											</div>
										) : (
											<>
												<Field
													name="hrOperationsRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="hrOperationsRemarks" component="div" className="form-error" />
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
											Employee Data Change Reference Number
										</label>
										{isPrintMode ? (
											<div className="print-value">
												{values.employeeDataChangeReferenceNumber || '___________________'}
											</div>
										) : (
											<>
												<Field name="employeeDataChangeReferenceNumber" className="form-input" />
												<ErrorMessage name="employeeDataChangeReferenceNumber" component="div" className="form-error" />
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

export default EmployeeDataChangeRequest;
