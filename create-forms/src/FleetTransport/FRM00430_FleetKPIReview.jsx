// FRM00430_FleetKPIReview.jsx
// FRM-00430 – Fleet KPI Review – Request / Initiation Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // 1. Document Control
  formDate: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  version: Yup.string().required('Required'),

  // 2. Request Details
  requestReferenceNo: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  reviewPurpose: Yup.string().required('Required'),

  // 3. Fleet Overview
  totalVehicles: Yup.number().typeError('Must be a number').required('Required'),
  activeVehicles: Yup.number().typeError('Must be a number').required('Required'),
  vehiclesUnderMaintenance: Yup.number().typeError('Must be a number').required('Required'),
  totalDrivers: Yup.number().typeError('Must be a number').required('Required'),
  totalTripsCompleted: Yup.number().typeError('Must be a number').required('Required'),

  // 5. Financial Summary
  totalFuelCost: Yup.number().typeError('Must be a number').required('Required'),
  maintenanceExpenses: Yup.number().typeError('Must be a number').required('Required'),
  operatingCostPerVehicle: Yup.number().typeError('Must be a number').required('Required'),
  budgetVariance: Yup.number().typeError('Must be a number').required('Required'),

  // 6–7
  observations: Yup.string().required('Required'),
  risksIdentified: Yup.string().required('Required'),

  // 9
  reviewConclusion: Yup.string().required('Required'),
  conclusionComments: Yup.string().required('Required'),

  // 8. Improvement Actions
  improvementActions: Yup.array().of(
    Yup.object().shape({
      action: Yup.string().required('Required'),
      owner: Yup.string().required('Required'),
      targetDate: Yup.string().required('Required'),
      status: Yup.string().required('Required')
    })
  ),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formDate: '',
  reviewPeriod: '',
  preparedBy: '',
  version: '',

  requestReferenceNo: '',
  requestDate: '',
  requestedBy: '',
  businessUnit: '',
  reviewPurpose: '',

  totalVehicles: '',
  activeVehicles: '',
  vehiclesUnderMaintenance: '',
  totalDrivers: '',
  totalTripsCompleted: '',

  totalFuelCost: '',
  maintenanceExpenses: '',
  operatingCostPerVehicle: '',
  budgetVariance: '',

  observations: '',
  risksIdentified: '',

  reviewConclusion: '',
  conclusionComments: '',

  improvementActions: [
    { action: '', owner: '', targetDate: '', status: '' }
  ],

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00430_FleetKPIReview = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00430"
      title="Fleet KPI Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Fleet KPI Review submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00430"
              title="Fleet KPI Review"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Document Control */}
              <div className="form-section">
                <h3 className="form-section-title">1. Document Control</h3>
                <div className="form-fields">
                  {field(values,'formDate','Date','date')}
                  {field(values,'reviewPeriod','Review Period')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'version','Version')}
                </div>
              </div>

              {/* 2. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestReferenceNo','Request Reference No')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'businessUnit','Business Unit / Location')}
                  {textarea(values,'reviewPurpose','Purpose of Review')}
                </div>
              </div>

              {/* 3. Fleet Overview */}
              <div className="form-section">
                <h3 className="form-section-title">3. Fleet Overview</h3>
                <div className="form-fields">
                  {field(values,'totalVehicles','Total Vehicles','number')}
                  {field(values,'activeVehicles','Active Vehicles','number')}
                  {field(values,'vehiclesUnderMaintenance','Vehicles Under Maintenance','number')}
                  {field(values,'totalDrivers','Total Drivers','number')}
                  {field(values,'totalTripsCompleted','Total Trips Completed','number')}
                </div>
              </div>

              {/* 5. Financial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Financial Summary</h3>
                <div className="form-fields">
                  {field(values,'totalFuelCost','Total Fuel Cost','number')}
                  {field(values,'maintenanceExpenses','Maintenance Expenses','number')}
                  {field(values,'operatingCostPerVehicle','Operating Cost per Vehicle','number')}
                  {field(values,'budgetVariance','Budget vs Actual Variance','number')}
                </div>
              </div>

              {/* Observations */}
              <div className="form-section">
                <h3 className="form-section-title">5. Observations</h3>
                <div className="form-fields">
                  {textarea(values,'observations','Observations')}
                </div>
              </div>

              {/* Risks */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risks / Issues Identified</h3>
                <div className="form-fields">
                  {textarea(values,'risksIdentified','Risks Identified')}
                </div>
              </div>

              {/* Improvement Actions */}
              <div className="form-section">
                <h3 className="form-section-title">7. Corrective / Improvement Actions</h3>

                <FieldArray name="improvementActions">
                  {({ push, remove }) => (
                    <>
                      {values.improvementActions.map((action, index) => (
                        <div key={index} className="form-fields">
                          {field(values,`improvementActions.${index}.action`,'Action')}
                          {field(values,`improvementActions.${index}.owner`,'Owner')}
                          {field(values,`improvementActions.${index}.targetDate`,'Target Date','date')}
                          {field(values,`improvementActions.${index}.status`,'Status')}
                          {!isPrintMode && (
                            <button type="button" onClick={() => remove(index)}>Remove</button>
                          )}
                        </div>
                      ))}
                      {!isPrintMode && (
                        <button type="button" onClick={() => push({ action:'', owner:'', targetDate:'', status:'' })}>
                          + Add Action
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Conclusion */}
              <div className="form-section">
                <h3 className="form-section-title">8. Review Conclusion</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label required">Conclusion</label>
                    <Field as="select" name="reviewConclusion" className="form-input">
                      <option value="">-- Select --</option>
                      <option value="Meets Expectations">Meets Expectations</option>
                      <option value="Needs Improvement">Needs Improvement</option>
                      <option value="Critical Attention Required">Critical Attention Required</option>
                    </Field>
                  </div>
                  {textarea(values,'conclusionComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={() => {}} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit KPI Review
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

export default FRM00430_FleetKPIReview;
