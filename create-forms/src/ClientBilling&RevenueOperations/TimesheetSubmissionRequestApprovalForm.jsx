// TimesheetSubmissionRequestApprovalForm.jsx

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
	// Employee / Resource Information
	employeeName: Yup.string().required('Employee Name is required'),
	employeeId: Yup.string().required('Employee ID is required'),
	roleDesignation: Yup.string().required('Role / Designation is required'),

	// Client & Project Information
	clientName: Yup.string().required('Client Name is required'),
	projectContractName: Yup.string().required('Project / Contract Name is required'),
	billingEntityLocation: Yup.string().required('Billing Entity / Location is required'),

	// Timesheet Period
	fromDate: Yup.string().required('From Date is required'),
	toDate: Yup.string().required('To Date is required'),
	totalWorkingDays: Yup.string().required('Total Working Days is required'),
	totalBillableHoursUnits: Yup.string().required('Total Billable Hours / Units is required'),

	// Work / Activity Summary
	taskActivityDescription: Yup.string().required('Task / Activity Description is required'),
	billable: Yup.string().required('Billable status is required'),
	workRemarks: Yup.string(),

	// Request / Submission Details
	submittedBy: Yup.string().required('Submitted By is required'),
	submissionDate: Yup.string().required('Submission Date is required'),
	employeeDeclaration: Yup.string().required('Employee Declaration is required'),

	// Approval / Authorization Details
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
	employeeName: '',
	employeeId: '',
	roleDesignation: '',

	clientName: '',
	projectContractName: '',
	billingEntityLocation: '',

	fromDate: '',
	toDate: '',
	totalWorkingDays: '',
	totalBillableHoursUnits: '',

	taskActivityDescription: '',
	billable: '',
	workRemarks: '',

	submittedBy: '',
	submissionDate: '',
	employeeDeclaration: '',

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

const TimesheetSubmissionRequestApprovalForm = () => {
	const { isPrintMode } = usePrintMode();

	return (
		<ModernFormWrapper
			formId="FRM-02527-02528"
			title="Timesheet Submission & Approval"
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log('Timesheet submission form submitted:', values);
					alert('Timesheet submission saved');
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<ModernA4Template
							formId="FRM-02527-02528"
							title="Timesheet Submission & Approval – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							{/* Employee / Resource Information */}
							<div className="form-section">
								<h3 className="form-section-title">Employee / Resource Information</h3>
								<div className="form-fields">
									{[
										['employeeName', 'Employee Name'],
										['employeeId', 'Employee ID'],
										['roleDesignation', 'Role / Designation']
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

							{/* Client & Project Information */}
							<div className="form-section">
								<h3 className="form-section-title">Client & Project Information</h3>
								<div className="form-fields">
									{[
										['clientName', 'Client Name'],
										['projectContractName', 'Project / Contract Name'],
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

							{/* Timesheet Period */}
							<div className="form-section">
								<h3 className="form-section-title">Timesheet Period</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">From Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.fromDate || '___________________'}</div>
										) : (
											<>
												<Field name="fromDate" type="date" className="form-input" />
												<ErrorMessage name="fromDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">To Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.toDate || '___________________'}</div>
										) : (
											<>
												<Field name="toDate" type="date" className="form-input" />
												<ErrorMessage name="toDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Total Working Days</label>
										{isPrintMode ? (
											<div className="print-value">{values.totalWorkingDays || '___________________'}</div>
										) : (
											<>
												<Field name="totalWorkingDays" className="form-input" />
												<ErrorMessage name="totalWorkingDays" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Total Billable Hours / Units</label>
										{isPrintMode ? (
											<div className="print-value">{values.totalBillableHoursUnits || '___________________'}</div>
										) : (
											<>
												<Field name="totalBillableHoursUnits" className="form-input" />
												<ErrorMessage name="totalBillableHoursUnits" component="div" className="form-error" />
											</>
										)}
									</div>
								</div>
							</div>

							{/* Work / Activity Summary */}
							<div className="form-section">
								<h3 className="form-section-title">Work / Activity Summary</h3>
								<div className="form-fields">
									<div className="form-field full-width">
										<label className="form-label required">Task / Activity Description</label>
										{isPrintMode ? (
											<div className="print-value">{values.taskActivityDescription || '___________________'}</div>
										) : (
											<>
												<Field
													name="taskActivityDescription"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
												<ErrorMessage name="taskActivityDescription" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Billable</label>
										{isPrintMode ? (
											<div className="print-value">{values.billable || '___________________'}</div>
										) : (
											<>
												<Field name="billable" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="billable" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field full-width">
										<label className="form-label">Remarks (if any)</label>
										{isPrintMode ? (
											<div className="print-value">{values.workRemarks || '___________________'}</div>
										) : (
											<Field
												name="workRemarks"
												as="textarea"
												className="form-textarea"
												rows="2"
											/>
										)}
									</div>
								</div>
							</div>

							{/* Request / Submission Details */}
							<div className="form-section">
								<h3 className="form-section-title">Request / Submission Details</h3>
								<div className="form-fields">
									<div className="form-field">
										<label className="form-label required">Submitted By</label>
										{isPrintMode ? (
											<div className="print-value">{values.submittedBy || '___________________'}</div>
										) : (
											<>
												<Field name="submittedBy" className="form-input" />
												<ErrorMessage name="submittedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Submission Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.submissionDate || '___________________'}</div>
										) : (
											<>
												<Field name="submissionDate" type="date" className="form-input" />
												<ErrorMessage name="submissionDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Employee Declaration</label>
										{isPrintMode ? (
											<div className="print-value">{values.employeeDeclaration || '___________________'}</div>
										) : (
											<>
												<Field name="employeeDeclaration" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Signed">Signed</option>
													<option value="Yes">Yes</option>
												</Field>
												<ErrorMessage name="employeeDeclaration" component="div" className="form-error" />
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
												<Field
													name="approvalRemarks"
													as="textarea"
													className="form-textarea"
													rows="2"
												/>
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
													<option value="Open">Open</option>
													<option value="Approved">Approved</option>
													<option value="Rejected">Rejected</option>
												</Field>
												<ErrorMessage name="recordStatus" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Created By</label>
										{isPrintMode ? (
											<div className="print-value">{values.createdBy || '___________________'}</div>
										) : (
											<>
												<Field name="createdBy" className="form-input" />
												<ErrorMessage name="createdBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Created Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.createdDate || '___________________'}</div>
										) : (
											<>
												<Field name="createdDate" type="date" className="form-input" />
												<ErrorMessage name="createdDate" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Last Updated By</label>
										{isPrintMode ? (
											<div className="print-value">{values.lastUpdatedBy || '___________________'}</div>
										) : (
											<>
												<Field name="lastUpdatedBy" className="form-input" />
												<ErrorMessage name="lastUpdatedBy" component="div" className="form-error" />
											</>
										)}
									</div>

									<div className="form-field">
										<label className="form-label required">Last Updated Date</label>
										{isPrintMode ? (
											<div className="print-value">{values.lastUpdatedDate || '___________________'}</div>
										) : (
											<>
												<Field name="lastUpdatedDate" type="date" className="form-input" />
												<ErrorMessage name="lastUpdatedDate" component="div" className="form-error" />
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
												<button type="button" className="btn-add-field" onClick={() => arrayHelpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>
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

export default TimesheetSubmissionRequestApprovalForm;
