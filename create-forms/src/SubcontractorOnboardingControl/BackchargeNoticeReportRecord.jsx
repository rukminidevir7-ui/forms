// BackchargeNoticeReportRecord.jsx
// FRM-01180 – Backcharge Notice Form

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  projectName: Yup.string().required('Required'),
  subcontractorName: Yup.string().required('Required'),
  backchargeRefNo: Yup.string().required('Required'),
  actualCost: Yup.number().required('Required')
});

const initialValues = {

  formNo: 'FRM-01180',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',
  noticeDate: '',
  backchargeRefNo: '',

  descriptionOfIssue: '',
  reasonForBackcharge: '',
  workDamageDetails: '',
  responsibleParty: '',

  estimatedCost: '',
  actualCost: '',
  amountToBeRecovered: '',
  recoveryMethod: '',

  supportingDocuments: '',
  remarks: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const BackchargeNoticeReportRecord = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01180"
      title="Backcharge Notice Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Backcharge Notice Saved');
        }}
      >

      {({ values, setFieldValue }) => {

        // Auto set recovery = actual cost if empty
        if (values.actualCost && !values.amountToBeRecovered) {
          setFieldValue('amountToBeRecovered', values.actualCost);
        }

        return (

          <Form>

            <ModernA4Template
              formId={values.formNo}
              title="Backcharge Notice"
              department={values.department}
            >

              {/* Project / Contract Details */}
              <div className="form-section">
                <h3 className="form-section-title">Project / Contract Details</h3>
                <div className="form-fields">
                  <Field name="projectName" placeholder="Project Name" className="form-input"/>
                  <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                  <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                  <Field name="workOrderNo" placeholder="Work Order / Contract No" className="form-input"/>
                  <Field name="noticeDate" type="date" className="form-input"/>
                  <Field name="backchargeRefNo" placeholder="Backcharge Ref No" className="form-input"/>
                </div>
              </div>

              {/* Backcharge Details */}
              <div className="form-section">
                <h3 className="form-section-title">Backcharge Details</h3>
                <div className="form-fields">

                  <div className="form-field full-width">
                    <label>Description of Issue</label>
                    <Field as="textarea" name="descriptionOfIssue" className="form-textarea"/>
                  </div>

                  <div className="form-field full-width">
                    <label>Reason for Backcharge</label>
                    <Field as="textarea" name="reasonForBackcharge" className="form-textarea"/>
                  </div>

                  <div className="form-field full-width">
                    <label>Work / Damage Details</label>
                    <Field as="textarea" name="workDamageDetails" className="form-textarea"/>
                  </div>

                  <Field name="responsibleParty" placeholder="Responsible Party" className="form-input"/>

                </div>
              </div>

              {/* Cost Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Cost Impact</h3>
                <div className="form-fields">

                  <Field name="estimatedCost" placeholder="Estimated Cost" className="form-input"/>
                  <Field name="actualCost" placeholder="Actual Cost" className="form-input"/>
                  <Field name="amountToBeRecovered" placeholder="Amount to be Recovered" className="form-input"/>
                  <Field name="recoveryMethod" placeholder="Recovery Method (Deduct from RA / Final Bill)" className="form-input"/>

                </div>
              </div>

              {/* Supporting Details */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Details</h3>
                <div className="form-fields">

                  <div className="form-field full-width">
                    <label>Supporting Documents</label>
                    <Field as="textarea" name="supportingDocuments" className="form-textarea"/>
                  </div>

                  <div className="form-field full-width">
                    <label>Remarks</label>
                    <Field as="textarea" name="remarks" className="form-textarea"/>
                  </div>

                </div>
              </div>

              {/* Shared Enterprise Components */}
              <FormAttachments />
              <FormCustomFields />
              <FormSignatures />

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Backcharge Notice
                  </button>
                </div>
              }

            </ModernA4Template>

          </Form>
        );
      }}

      </Formik>

    </ModernFormWrapper>

  );
};

export default BackchargeNoticeReportRecord;
