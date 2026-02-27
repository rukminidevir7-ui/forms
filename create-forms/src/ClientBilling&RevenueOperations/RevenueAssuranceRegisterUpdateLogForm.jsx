// RevenueAssuranceRegisterUpdateLogForm.jsx
// FRM-02594 – Revenue Assurance Register Update – Basic Log / Register

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const yesNo = ['Yes','No'];

const validationSchema = Yup.object({

	// Header
	registerPeriodFrom: Yup.string().required('Required'),
	registerPeriodTo: Yup.string().required('Required'),
	preparedBy: Yup.string().required('Required'),
	preparedDate: Yup.string().required('Required'),

	// Case reference
	raCaseId: Yup.string().required('Required'),
	clientName: Yup.string().required('Required'),
	clientCode: Yup.string().required('Required'),
	projectReference: Yup.string().required('Required'),
	processArea: Yup.string().required('Required'),
	issueSummary: Yup.string().required('Required'),
	issueDescription: Yup.string().required('Required'),
	issueCategory: Yup.string().required('Required'),
	dateIdentified: Yup.string().required('Required'),
	identifiedBy: Yup.string().required('Required'),

	// Financial impact
	estimatedImpactAmount: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	impactType: Yup.string().required('Required'),

	// Root cause
	rootCauseCategory: Yup.string().required('Required'),
	controlGapIdentified: Yup.string().required('Required'),
	controlGapDescription: Yup.string().required('Required'),

	// Actions
	correctiveAction: Yup.string().required('Required'),
	preventiveAction: Yup.string().required('Required'),
	actionOwner: Yup.string().required('Required'),
	targetClosureDate: Yup.string().required('Required'),

	// Status
	currentStatus: Yup.string().required('Required'),
	progressNotes: Yup.string().required('Required'),
	lastUpdatedDate: Yup.string().required('Required'),

	// Linkage
	relatedFormReference: Yup.string().required('Required'),
	approvalReference: Yup.string(),

	// Supporting docs
	attachmentAvailable: Yup.string().required('Required'),
	attachmentReferenceFileName: Yup.string(),

	// Control
	reviewedBy: Yup.string().required('Required'),
	reviewDate: Yup.string().required('Required'),
	recordStatus: Yup.string().required('Required'),

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

	registerPeriodFrom: '',
	registerPeriodTo: '',
	preparedBy: '',
	preparedDate: '',

	raCaseId: '',
	clientName: '',
	clientCode: '',
	projectReference: '',
	processArea: '',
	issueSummary: '',
	issueDescription: '',
	issueCategory: '',
	dateIdentified: '',
	identifiedBy: '',

	estimatedImpactAmount: '',
	currency: '',
	impactType: '',

	rootCauseCategory: '',
	controlGapIdentified: '',
	controlGapDescription: '',

	correctiveAction: '',
	preventiveAction: '',
	actionOwner: '',
	targetClosureDate: '',

	currentStatus: '',
	progressNotes: '',
	lastUpdatedDate: '',

	relatedFormReference: '',
	approvalReference: '',

	attachmentAvailable: '',
	attachmentReferenceFileName: '',

	reviewedBy: '',
	reviewDate: '',
	recordStatus: '',

	attachments: [],
	signatures: []
};

const RevenueAssuranceRegisterUpdateLogForm = () => {

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
			formId="FRM-02594"
			title="Revenue Assurance Register Update – Log / Register"
		>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values)=>{
					console.log(values);
					alert('Revenue assurance register saved');
				}}
			>
			{({values,setFieldValue})=>(
				<Form>

					<ModernA4Template
						formId="FRM-02594"
						title="Revenue Assurance Register Update – Log / Register"
						department="Client Billing & Revenue Operations"
					>

						<div className="form-section">
							<h3 className="form-section-title">Register Header and Context</h3>
							<div className="form-fields">
								{field(values,'registerPeriodFrom','Register Period From','date')}
								{field(values,'registerPeriodTo','Register Period To','date')}
								{field(values,'preparedBy','Prepared By')}
								{field(values,'preparedDate','Prepared Date','date')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Log Entry Case Reference</h3>
							<div className="form-fields">
								{field(values,'raCaseId','RA Case / Exception ID')}
								{field(values,'clientName','Client Name')}
								{field(values,'clientCode','Client Code / ID')}
								{field(values,'projectReference','Project / Contract Reference')}
								{select(values,'processArea','Process Area',['Billing','Invoicing','Collections','Revenue','Controls'])}

								<div className="form-field full-width">
									<label className="form-label required">Issue / Observation Summary</label>
									{isPrintMode
										? <div className="print-value">{values.issueSummary || '___________________'}</div>
										: <>
											<Field as="textarea" name="issueSummary" className="form-textarea"/>
											<ErrorMessage name="issueSummary" component="div" className="form-error"/>
										  </>
									}
								</div>

								<div className="form-field full-width">
									<label className="form-label required">Issue / Observation Description</label>
									{isPrintMode
										? <div className="print-value">{values.issueDescription || '___________________'}</div>
										: <>
											<Field as="textarea" name="issueDescription" className="form-textarea" rows="3"/>
											<ErrorMessage name="issueDescription" component="div" className="form-error"/>
										  </>
									}
								</div>

								{select(values,'issueCategory','Issue Category',['Leakage','Audit finding','Exception','Control gap','Other'])}
								{field(values,'dateIdentified','Date Identified','date')}
								{field(values,'identifiedBy','Identified By')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Financial Impact</h3>
							<div className="form-fields">
								{field(values,'estimatedImpactAmount','Estimated Impact Amount')}
								{field(values,'currency','Currency')}
								{select(values,'impactType','Impact Type',['Understatement','Overstatement','Timing','Risk only'])}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Root Cause and Control Gap</h3>
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

								<div className="form-field full-width">
									<label className="form-label required">Corrective Action Description</label>
									{isPrintMode
										? <div className="print-value">{values.correctiveAction || '___________________'}</div>
										: <>
											<Field as="textarea" name="correctiveAction" className="form-textarea"/>
											<ErrorMessage name="correctiveAction" component="div" className="form-error"/>
										  </>
									}
								</div>

								<div className="form-field full-width">
									<label className="form-label required">Preventive / Control Improvement Action</label>
									{isPrintMode
										? <div className="print-value">{values.preventiveAction || '___________________'}</div>
										: <>
											<Field as="textarea" name="preventiveAction" className="form-textarea"/>
											<ErrorMessage name="preventiveAction" component="div" className="form-error"/>
										  </>
									}
								</div>

								{field(values,'actionOwner','Action Owner')}
								{field(values,'targetClosureDate','Target Closure Date','date')}

							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Current Status Tracking</h3>
							<div className="form-fields">
								{select(values,'currentStatus','Current Status',['Open','In progress','On hold','Closed'])}

								<div className="form-field full-width">
									<label className="form-label required">Latest Update / Progress Notes</label>
									{isPrintMode
										? <div className="print-value">{values.progressNotes || '___________________'}</div>
										: <>
											<Field as="textarea" name="progressNotes" className="form-textarea"/>
											<ErrorMessage name="progressNotes" component="div" className="form-error"/>
										  </>
									}
								</div>

								{field(values,'lastUpdatedDate','Last Updated Date','date')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Linkage and Reference</h3>
							<div className="form-fields">
								{field(values,'relatedFormReference','Related Form Reference')}
								{field(values,'approvalReference','Approval Reference')}
							</div>
						</div>

						<div className="form-section">
							<h3 className="form-section-title">Supporting Documents</h3>

							<div className="form-fields">
								{select(values,'attachmentAvailable','Attachment Available',yesNo)}
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
															const f = e.target.files[0];
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
							<h3 className="form-section-title">Register Control</h3>
							<div className="form-fields">
								{field(values,'reviewedBy','Reviewed By')}
								{field(values,'reviewDate','Review Date','date')}
								{select(values,'recordStatus','Record Status',['Active','Closed','Archived'])}
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
								<button type="submit" className="btn-submit">Save Register</button>
							</div>
						)}

					</ModernA4Template>

				</Form>
			)}
			</Formik>

		</ModernFormWrapper>
	);
};

export default RevenueAssuranceRegisterUpdateLogForm;
