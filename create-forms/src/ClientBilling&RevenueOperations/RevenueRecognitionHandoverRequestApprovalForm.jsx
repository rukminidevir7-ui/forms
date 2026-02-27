// RevenueRecognitionHandoverRequestApprovalForm.jsx

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

	// Client & Contract Context
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	projectContractName: Yup.string().required('Required'),
	contractAgreementReference: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),

	// Revenue Recognition Scope
	revenueModel: Yup.string().required('Required'),
	recognitionStandard: Yup.string().required('Required'),
	periodFrom: Yup.string().required('Required'),
	periodTo: Yup.string().required('Required'),

	// Commercial & Contract Summary
	contractStartDate: Yup.string().required('Required'),
	contractEndDate: Yup.string().required('Required'),
	totalContractValue: Yup.string().required('Required'),
	billingMilestonesRulesSummary: Yup.string().required('Required'),

	// Performance Obligations & Recognition Logic
	performanceObligationsIdentified: Yup.string().required('Required'),
	recognitionMethod: Yup.string().required('Required'),
	basisOfProgressMeasurement: Yup.string().required('Required'),

	// Billing & Revenue Alignment
	billedAmountToDate: Yup.string().required('Required'),
	revenueRecognisedToDate: Yup.string().required('Required'),
	unbilledRevenue: Yup.string().required('Required'),
	deferredRevenue: Yup.string().required('Required'),

	// Open Items & Adjustments
	openMilestonesDeliverables: Yup.string().required('Required'),
	pendingInvoicesCreditsDebits: Yup.string().required('Required'),
	revenueAdjustmentsRequired: Yup.string().required('Required'),
	adjustmentDescription: Yup.string().required('Required'),

	// Key Risks & Judgements
	significantJudgementsApplied: Yup.string().required('Required'),
	keyRevenueRisksAssumptions: Yup.string().required('Required'),

	// Supporting Documents / Handover Pack
	contractAmendmentsAttached: Yup.string().required('Required'),
	rateCardSOWAttached: Yup.string().required('Required'),
	billingUsageReportsAttached: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Request / Initiation
	preparedHandedOverBy: Yup.string().required('Required'),
	handoverDate: Yup.string().required('Required'),

	// Approval
	approvalStatus: Yup.string().required('Required'),
	approvedBy: Yup.string().required('Required'),
	approvalDate: Yup.string().required('Required'),
	approvalRemarks: Yup.string().required('Required'),

	// Operational Control
	recordStatus: Yup.string().required('Required'),
	createdBy: Yup.string().required('Required'),
	createdDate: Yup.string().required('Required'),
	lastUpdatedBy: Yup.string().required('Required'),
	lastUpdatedDate: Yup.string().required('Required'),

	// Dynamic attachments
	attachments: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			fileName: Yup.string().required('File required'),
			fileType: Yup.string(),
			fileData: Yup.mixed()
		})
	),

	// Custom fields
	customFields: Yup.array().of(
		Yup.object({
			fieldName: Yup.string().required('Required'),
			fieldValue: Yup.string().required('Required')
		})
	),

	// Signatures
	signatures: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			signatureName: Yup.string().required('Required'),
			signatureData: Yup.string(),
			signatureDate: Yup.string().required('Required')
		})
	)

});

const initialValues = {

	clientName: '',
	clientCode: '',
	projectContractName: '',
	contractAgreementReference: '',
	billingEntityLocation: '',

	revenueModel: '',
	recognitionStandard: '',
	periodFrom: '',
	periodTo: '',

	contractStartDate: '',
	contractEndDate: '',
	totalContractValue: '',
	billingMilestonesRulesSummary: '',

	performanceObligationsIdentified: '',
	recognitionMethod: '',
	basisOfProgressMeasurement: '',

	billedAmountToDate: '',
	revenueRecognisedToDate: '',
	unbilledRevenue: '',
	deferredRevenue: '',

	openMilestonesDeliverables: '',
	pendingInvoicesCreditsDebits: '',
	revenueAdjustmentsRequired: '',
	adjustmentDescription: '',

	significantJudgementsApplied: '',
	keyRevenueRisksAssumptions: '',

	contractAmendmentsAttached: '',
	rateCardSOWAttached: '',
	billingUsageReportsAttached: '',
	attachmentReferenceFileName: '',

	preparedHandedOverBy: '',
	handoverDate: '',

	approvalStatus: '',
	approvedBy: '',
	approvalDate: '',
	approvalRemarks: '',

	recordStatus: '',
	createdBy: '',
	createdDate: '',
	lastUpdatedBy: '',
	lastUpdatedDate: '',

	attachments: [],
	customFields: [],
	signatures: []

};

const RevenueRecognitionHandoverRequestApprovalForm = () => {

	const { isPrintMode } = usePrintMode();

	const renderField = (values, name, label, type = 'text', as) => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode ? (
				<div className="print-value">{values[name] || '___________________'}</div>
			) : (
				<>
					<Field name={name} type={type} as={as} className="form-input" />
					<ErrorMessage name={name} component="div" className="form-error" />
				</>
			)}
		</div>
	);

	return (

		<ModernFormWrapper
			formId="FRM-02583-02584"
			title="Revenue Recognition Handover Pack – Request & Approval"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					alert('Revenue recognition handover saved');
				}}
			>

				{({ values, setFieldValue }) => (

					<Form>

						<ModernA4Template
							formId="FRM-02583 / FRM-02584"
							title="Revenue Recognition Handover Pack – Combined Basic Form"
							department="Client Billing & Revenue Operations"
						>

							<div className="form-section">
								<h3 className="form-section-title">Client & Contract Context</h3>
								<div className="form-fields">
									{renderField(values,'clientName','Client Name')}
									{renderField(values,'clientCode','Client Code / ID')}
									{renderField(values,'projectContractName','Project / Contract Name')}
									{renderField(values,'contractAgreementReference','Contract / Agreement Reference')}
									{renderField(values,'billingEntityLocation','Billing Entity / Location')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Revenue Recognition Scope</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Revenue Model</label>
										{isPrintMode ? <div className="print-value">{values.revenueModel || '___________________'}</div> :
											<>
												<Field name="revenueModel" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="T&M">T&M</option>
													<option value="Milestone">Milestone</option>
													<option value="Usage">Usage</option>
													<option value="Fixed Price">Fixed Price</option>
													<option value="Mixed">Mixed</option>
												</Field>
												<ErrorMessage name="revenueModel" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">Recognition Standard</label>
										{isPrintMode ? <div className="print-value">{values.recognitionStandard || '___________________'}</div> :
											<>
												<Field name="recognitionStandard" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Ind AS 115">Ind AS 115</option>
													<option value="IFRS 15">IFRS 15</option>
													<option value="Other">Other</option>
												</Field>
												<ErrorMessage name="recognitionStandard" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'periodFrom','Period Covered From','date')}
									{renderField(values,'periodTo','Period Covered To','date')}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Commercial & Contract Summary</h3>
								<div className="form-fields">
									{renderField(values,'contractStartDate','Contract Start Date','date')}
									{renderField(values,'contractEndDate','Contract End Date','date')}
									{renderField(values,'totalContractValue','Total Contract Value')}

									<div className="form-field full-width">
										<label className="form-label required">Billing Milestones / Billing Rules Summary</label>
										{isPrintMode ? <div className="print-value">{values.billingMilestonesRulesSummary || '___________________'}</div> :
											<>
												<Field name="billingMilestonesRulesSummary" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="billingMilestonesRulesSummary" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Performance Obligations & Recognition Logic</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Performance Obligations Identified</label>
										{isPrintMode ? <div className="print-value">{values.performanceObligationsIdentified || '___________________'}</div> :
											<>
												<Field name="performanceObligationsIdentified" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="performanceObligationsIdentified" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">Recognition Method</label>
										{isPrintMode ? <div className="print-value">{values.recognitionMethod || '___________________'}</div> :
											<>
												<Field name="recognitionMethod" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Over time">Over time</option>
													<option value="Point in time">Point in time</option>
												</Field>
												<ErrorMessage name="recognitionMethod" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field">
										<label className="form-label required">Basis of Progress Measurement</label>
										{isPrintMode ? <div className="print-value">{values.basisOfProgressMeasurement || '___________________'}</div> :
											<>
												<Field name="basisOfProgressMeasurement" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Timesheet">Timesheet</option>
													<option value="Usage">Usage</option>
													<option value="Milestone">Milestone</option>
													<option value="Output">Output</option>
												</Field>
												<ErrorMessage name="basisOfProgressMeasurement" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Billing & Revenue Alignment</h3>
								<div className="form-fields">
									{renderField(values,'billedAmountToDate','Billed Amount to Date')}
									{renderField(values,'revenueRecognisedToDate','Revenue Recognised to Date')}
									{renderField(values,'unbilledRevenue','Unbilled Revenue')}
									{renderField(values,'deferredRevenue','Deferred Revenue')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Open Items & Adjustments</h3>
								<div className="form-fields">

									{renderField(values,'openMilestonesDeliverables','Open Milestones / Deliverables')}
									{renderField(values,'pendingInvoicesCreditsDebits','Pending Invoices / Credits / Debits')}

									<div className="form-field">
										<label className="form-label required">Revenue Adjustments Required</label>
										{isPrintMode ? <div className="print-value">{values.revenueAdjustmentsRequired || '___________________'}</div> :
											<>
												<Field name="revenueAdjustmentsRequired" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="revenueAdjustmentsRequired" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Adjustment Description</label>
										{isPrintMode ? <div className="print-value">{values.adjustmentDescription || '___________________'}</div> :
											<>
												<Field name="adjustmentDescription" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="adjustmentDescription" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Key Risks & Judgements</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Significant Judgements Applied</label>
										{isPrintMode ? <div className="print-value">{values.significantJudgementsApplied || '___________________'}</div> :
											<>
												<Field name="significantJudgementsApplied" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Yes">Yes</option>
													<option value="No">No</option>
												</Field>
												<ErrorMessage name="significantJudgementsApplied" component="div" className="form-error" />
											</>
										}
									</div>

									<div className="form-field full-width">
										<label className="form-label required">Key Revenue Risks / Assumptions</label>
										{isPrintMode ? <div className="print-value">{values.keyRevenueRisksAssumptions || '___________________'}</div> :
											<>
												<Field name="keyRevenueRisksAssumptions" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="keyRevenueRisksAssumptions" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Supporting Documents / Handover Pack</h3>
								<div className="form-fields">

									{[
										['contractAmendmentsAttached','Contract & Amendments Attached'],
										['rateCardSOWAttached','Rate Card / Pricing / SOW Attached'],
										['billingUsageReportsAttached','Billing & Usage / Timesheet Reports Attached']
									].map(([n,l]) => (
										<div key={n} className="form-field">
											<label className="form-label required">{l}</label>
											{isPrintMode ? <div className="print-value">{values[n] || '___________________'}</div> :
												<>
													<Field name={n} as="select" className="form-input">
														<option value="">-- Select --</option>
														<option value="Yes">Yes</option>
														<option value="No">No</option>
													</Field>
													<ErrorMessage name={n} component="div" className="form-error" />
												</>
											}
										</div>
									))}

									{!isPrintMode && (
										<FieldArray name="attachments">
											{(helpers) => (
												<div className="full-width">

													{values.attachments.map((att, i) => (
														<div key={att.id || i} className="custom-field-row">
															<input
																type="file"
																className="form-input"
																onChange={(e) => {
																	const file = e.currentTarget.files[0];
																	if (file) {
																		helpers.replace(i, {
																			...att,
																			fileName: file.name,
																			fileType: file.type,
																			fileData: file
																		});
																		setFieldValue('attachmentReferenceFileName', file.name);
																	}
																}}
															/>
															<span className="file-name">{att.fileName}</span>
															<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
														</div>
													))}

													<button
														type="button"
														className="btn-add-field"
														onClick={() => helpers.push({ id: uuidv4(), fileName: '', fileType: '', fileData: null })}
													>
														Add Attachment
													</button>

												</div>
											)}
										</FieldArray>
									)}

									{renderField(values,'attachmentReferenceFileName','Attachment Reference / File Name')}

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Request / Initiation</h3>
								<div className="form-fields">
									{renderField(values,'preparedHandedOverBy','Prepared / Handed Over By')}
									{renderField(values,'handoverDate','Handover Date','date')}
								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Approval / Authorization</h3>
								<div className="form-fields">

									<div className="form-field">
										<label className="form-label required">Approval Status</label>
										{isPrintMode ? <div className="print-value">{values.approvalStatus || '___________________'}</div> :
											<>
												<Field name="approvalStatus" as="select" className="form-input">
													<option value="">-- Select --</option>
													<option value="Approved">Approved</option>
													<option value="Rejected">Rejected</option>
												</Field>
												<ErrorMessage name="approvalStatus" component="div" className="form-error" />
											</>
										}
									</div>

									{renderField(values,'approvedBy','Approved By')}
									{renderField(values,'approvalDate','Approval Date','date')}

									<div className="form-field full-width">
										<label className="form-label required">Approval Remarks</label>
										{isPrintMode ? <div className="print-value">{values.approvalRemarks || '___________________'}</div> :
											<>
												<Field name="approvalRemarks" as="textarea" className="form-textarea" rows="2" />
												<ErrorMessage name="approvalRemarks" component="div" className="form-error" />
											</>
										}
									</div>

								</div>
							</div>

							<div className="form-section">
								<h3 className="form-section-title">Operational Control</h3>
								<div className="form-fields">
									{renderField(values,'recordStatus','Record Status')}
									{renderField(values,'createdBy','Created By')}
									{renderField(values,'createdDate','Created Date','date')}
									{renderField(values,'lastUpdatedBy','Last Updated By')}
									{renderField(values,'lastUpdatedDate','Last Updated Date','date')}
								</div>
							</div>

							{/* Custom Fields */}
							{!isPrintMode && (
								<div className="form-section">
									<h3 className="form-section-title">Additional Custom Fields</h3>
									<FieldArray name="customFields">
										{(helpers) => (
											<div>
												{values.customFields.map((f, i) => (
													<div key={i} className="custom-field-row">
														<Field name={`customFields.${i}.fieldName`} className="form-input" placeholder="Field Name" />
														<Field name={`customFields.${i}.fieldValue`} className="form-input" placeholder="Field Value" />
														<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
													</div>
												))}
												<button
													type="button"
													className="btn-add-field"
													onClick={() => helpers.push({ id: uuidv4(), fieldName: '', fieldValue: '' })}
												>
													Add Custom Field
												</button>
											</div>
										)}
									</FieldArray>
								</div>
							)}

							{/* Signatures */}
							<div className="form-section signatures-section">
								<h3 className="form-section-title">Digital Signatures</h3>

								{!isPrintMode && (
									<FieldArray name="signatures">
										{(helpers) => (
											<div>

												{values.signatures.map((sig, i) => (
													<div key={i} className="signature-row-container">

														<div className="signature-row">
															<Field name={`signatures.${i}.signatureName`} className="form-input" placeholder="Signature Name" />
															<Field name={`signatures.${i}.signatureDate`} type="date" className="form-input" />
															<button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
														</div>

														<SignatureComponent
															name={`Signature ${i + 1}`}
															value={sig}
															onChange={(o) => setFieldValue(`signatures.${i}.signatureData`, o.data || '')}
														/>

													</div>
												))}

												<button
													type="button"
													className="btn-add-signature"
													onClick={() => helpers.push({ id: uuidv4(), signatureName: '', signatureData: '', signatureDate: '' })}
												>
													Add Signature
												</button>

											</div>
										)}
									</FieldArray>
								)}

							</div>

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

export default RevenueRecognitionHandoverRequestApprovalForm;
