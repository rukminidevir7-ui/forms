// RevenueLeakageCheckRequestApprovalForm.jsx
// Revenue Leakage Check – Combined Basic Form (Request + Approval)
// Reference: FRM-02578 & FRM-02579

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const yesNo = ['Yes', 'No'];

const validationSchema = Yup.object({

	// Client & Business Context
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	projectReference: Yup.string().required('Required'),
	billingEntityLocation: Yup.string().required('Required'),

	// Scope
	billingModel: Yup.string().required('Required'),
	periodFrom: Yup.string().required('Required'),
	periodTo: Yup.string().required('Required'),
	processArea: Yup.string().required('Required'),
	timesheetSource: Yup.string().required('Required'),
	billingSystemReference: Yup.string().required('Required'),
	contractRateCardReference: Yup.string().required('Required'),

	// Leakage Identification
	leakageIdentified: Yup.string().required('Required'),
	leakageCategory: Yup.string().required('Required'),
	leakageDescription: Yup.string().required('Required'),
	estimatedLeakageAmount: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),

	// Root Cause
	rootCauseCategory: Yup.string().required('Required'),
	controlGapIdentified: Yup.string().required('Required'),
	controlGapDescription: Yup.string().required('Required'),

	// Actions
	immediateCorrectionRequired: Yup.string().required('Required'),
	correctiveActionDescription: Yup.string().required('Required'),
	preventiveAction: Yup.string().required('Required'),
	responsibleOwner: Yup.string().required('Required'),
	targetClosureDate: Yup.string().required('Required'),

	// Supporting
	attachmentRequired: Yup.string().required('Required'),
	attachmentType: Yup.string().required('Required'),
	attachmentUploaded: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string().required('Required'),

	// Request
	initiatedBy: Yup.string().required('Required'),
	initiationDate: Yup.string().required('Required'),

	// Approval
	approvalStatus: Yup.string().required('Required'),
	approvedBy: Yup.string().required('Required'),
	approvalDate: Yup.string().required('Required'),
	approvalRemarks: Yup.string().required('Required'),

	// Control
	recordStatus: Yup.string().required('Required'),
	createdBy: Yup.string().required('Required'),
	createdDate: Yup.string().required('Required'),
	lastUpdatedBy: Yup.string().required('Required'),
	lastUpdatedDate: Yup.string().required('Required'),

	attachments: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			fileName: Yup.string().required('File required')
		})
	),

	signatures: Yup.array().of(
		Yup.object({
			id: Yup.string(),
			signatureName: Yup.string().required('Required'),
			signatureDate: Yup.string().required('Required'),
			signatureData: Yup.string()
		})
	)

});

const initialValues = {

	clientName: '',
	clientCode: '',
	projectReference: '',
	billingEntityLocation: '',

	billingModel: '',
	periodFrom: '',
	periodTo: '',
	processArea: '',
	timesheetSource: '',
	billingSystemReference: '',
	contractRateCardReference: '',

	leakageIdentified: '',
	leakageCategory: '',
	leakageDescription: '',
	estimatedLeakageAmount: '',
	currency: '',

	rootCauseCategory: '',
	controlGapIdentified: '',
	controlGapDescription: '',

	immediateCorrectionRequired: '',
	correctiveActionDescription: '',
	preventiveAction: '',
	responsibleOwner: '',
	targetClosureDate: '',

	attachmentRequired: '',
	attachmentType: '',
	attachmentUploaded: '',
	attachmentReferenceFileName: '',

	initiatedBy: '',
	initiationDate: '',

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
	signatures: []
};

const RevenueLeakageCheckRequestApprovalForm = () => {

	const { isPrintMode } = usePrintMode();

	const field = (values, name, label, type='text') => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode
				? <div className="print-value">{values[name] || '___________________'}</div>
				: <>
					<Field name={name} type={type} className="form-input"/>
					<ErrorMessage name={name} component="div" className="form-error"/>
				  </>
			}
		</div>
	);

	const select = (values, name, label, options) => (
		<div className="form-field">
			<label className="form-label required">{label}</label>
			{isPrintMode
				? <div className="print-value">{values[name] || '___________________'}</div>
				: <>
					<Field as="select" name={name} className="form-input">
						<option value="">-- Select --</option>
						{options.map(o=><option key={o} value={o}>{o}</option>)}
					</Field>
					<ErrorMessage name={name} component="div" className="form-error"/>
				  </>
			}
		</div>
	);

	return (
		<ModernFormWrapper
			formId="FRM-02578-02579"
			title="Revenue Leakage Check – Request and Approval"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values)=>{
					console.log(values);
					alert('Revenue leakage check saved');
				}}
			>
			{({values,setFieldValue})=>(
				<Form>

					<ModernA4Template
						formId="FRM-02578-02579"
						title="Revenue Leakage Check – Request and Approval"
						department="Client Billing & Revenue Operations"
					>

						<div className="form-section">
							<h3 className="form-section-title">Client and Business Context</h3>
							<div className="form-fields">
								{field(values,'clientName','Client Name')}
								{field(values,'clientCode','Client Code / ID')}
								{field(values,'projectReference','Project / Contract Reference')}
								{field(values,'billingEntityLocation','Billing Entity / Location')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Scope of Revenue Leakage Check</h3>
							<div className="form-fields">
								{select(values,'billingModel','Billing Model',['T&M','Milestone','Usage','Mixed'])}
								{field(values,'periodFrom','Period From','date')}
								{field(values,'periodTo','Period To','date')}
								{select(values,'processArea','Process Area',['Billing','Invoicing','Allocation','Collection','Others'])}
								{field(values,'timesheetSource','Timesheet / Usage / Milestone Source')}
								{field(values,'billingSystemReference','Billing System / ERP Reference')}
								{field(values,'contractRateCardReference','Contract / Rate Card Reference')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Leakage Identification</h3>
							<div className="form-fields">
								{select(values,'leakageIdentified','Leakage Identified',yesNo)}
								{select(values,'leakageCategory','Leakage Category',['Missed billing','Wrong rate','Wrong quantity','Tax','Other'])}

								<div className="form-field full-width">
									<label className="form-label required">Leakage Description</label>
									{isPrintMode
										? <div className="print-value">{values.leakageDescription || '___________________'}</div>
										: <>
											<Field as="textarea" name="leakageDescription" className="form-textarea"/>
											<ErrorMessage name="leakageDescription" component="div" className="form-error"/>
										  </>
									}
								</div>

								{field(values,'estimatedLeakageAmount','Estimated Leakage Amount')}
								{field(values,'currency','Currency')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Root Cause and Control Gaps</h3>
							<div className="form-fields">
								{select(values,'rootCauseCategory','Root Cause Category',['Process','System','Master data','Human error'])}
								{select(values,'controlGapIdentified','Control Gap Identified',yesNo)}

								<div className="form-field full-width">
									<label className="form-label required">Control Gap Description</label>
									{isPrintMode
										? <div className="print-value">{values.controlGapDescription || '___________________'}</div>
										: <>
											<Field as="textarea" name="controlGapDescription" className="form-textarea"/>
											<ErrorMessage name="controlGapDescription" component="div" className="form-error"/>
										  </>
									}
								</div>
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Corrective and Preventive Actions</h3>
							<div className="form-fields">
								{select(values,'immediateCorrectionRequired','Immediate Correction Required',yesNo)}

								<div className="form-field full-width">
									<label className="form-label required">Corrective Action Description</label>
									{isPrintMode
										? <div className="print-value">{values.correctiveActionDescription || '___________________'}</div>
										: <>
											<Field as="textarea" name="correctiveActionDescription" className="form-textarea"/>
											<ErrorMessage name="correctiveActionDescription" component="div" className="form-error"/>
										  </>
									}
								</div>

								<div className="form-field full-width">
									<label className="form-label required">Preventive Action / Control Improvement</label>
									{isPrintMode
										? <div className="print-value">{values.preventiveAction || '___________________'}</div>
										: <>
											<Field as="textarea" name="preventiveAction" className="form-textarea"/>
											<ErrorMessage name="preventiveAction" component="div" className="form-error"/>
										  </>
									}
								</div>

								{field(values,'responsibleOwner','Responsible Owner')}
								{field(values,'targetClosureDate','Target Closure Date','date')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Supporting Documents and Evidence</h3>

							<div className="form-fields">
								{select(values,'attachmentRequired','Attachment Required',yesNo)}
								{select(values,'attachmentType','Attachment Type',['Reports','Extracts','Calculations','Other'])}
								{select(values,'attachmentUploaded','Attachment Uploaded',yesNo)}
							</div>

							{!isPrintMode && (
								<FieldArray name="attachments">
									{(helpers)=>(
										<div>
											{values.attachments.map((a,i)=>(
												<div key={i} className="custom-field-row">
													<input
														type="file"
														className="form-input"
														onChange={(e)=>{
															const f=e.target.files[0];
															if(f){
																helpers.replace(i,{id:uuidv4(),fileName:f.name});
																setFieldValue('attachmentReferenceFileName',f.name);
															}
														}}
													/>
													<span>{a.fileName}</span>
													<button type="button" className="btn-remove" onClick={()=>helpers.remove(i)}>Remove</button>
												</div>
											))}
											<button
												type="button"
												className="btn-add-field"
												onClick={()=>helpers.push({id:uuidv4(),fileName:''})}
											>
												Add Attachment
											</button>
										</div>
									)}
								</FieldArray>
							)}

							<div className="form-fields">
								{field(values,'attachmentReferenceFileName','Attachment Reference / File Name')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Request and Initiation</h3>
							<div className="form-fields">
								{field(values,'initiatedBy','Initiated By')}
								{field(values,'initiationDate','Initiation Date','date')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Approval and Authorization</h3>
							<div className="form-fields">
								{select(values,'approvalStatus','Approval Status',['Approved','Rejected'])}
								{field(values,'approvedBy','Approved By')}
								{field(values,'approvalDate','Approval Date','date')}

								<div className="form-field full-width">
									<label className="form-label required">Approval Remarks / Directions</label>
									{isPrintMode
										? <div className="print-value">{values.approvalRemarks || '___________________'}</div>
										: <>
											<Field as="textarea" name="approvalRemarks" className="form-textarea"/>
											<ErrorMessage name="approvalRemarks" component="div" className="form-error"/>
										  </>
									}
								</div>

							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Operational Control</h3>
							<div className="form-fields">
								{select(values,'recordStatus','Record Status',['Open','Approved','Closed'])}
								{field(values,'createdBy','Created By')}
								{field(values,'createdDate','Created Date','date')}
								{field(values,'lastUpdatedBy','Last Updated By')}
								{field(values,'lastUpdatedDate','Last Updated Date','date')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Signatures</h3>

							{!isPrintMode && (
								<FieldArray name="signatures">
									{(helpers)=>(
										<div>
											{values.signatures.map((s,i)=>(
												<div key={i} className="signature-row-container">

													<div className="signature-row">
														<Field name={`signatures.${i}.signatureName`} className="form-input" placeholder="Signature Name"/>
														<Field name={`signatures.${i}.signatureDate`} type="date" className="form-input"/>
														<button type="button" className="btn-remove" onClick={()=>helpers.remove(i)}>Remove</button>
													</div>

													<SignatureComponent
														name={`Signature ${i+1}`}
														value={s}
														onChange={(sig)=>setFieldValue(`signatures.${i}.signatureData`,sig.data || '')}
													/>

												</div>
											))}

											<button
												type="button"
												className="btn-add-signature"
												onClick={()=>helpers.push({id:uuidv4(),signatureName:'',signatureDate:'',signatureData:''})}
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

export default RevenueLeakageCheckRequestApprovalForm;
