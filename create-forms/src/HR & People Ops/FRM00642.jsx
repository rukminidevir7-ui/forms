import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  changeRequestID: Yup.string().required(),
  employeeID: Yup.string().required(),
  employeeName: Yup.string().required(),
  department: Yup.string().required(),
  fieldModified: Yup.string().required(),
  oldValue: Yup.string().required(),
  newValue: Yup.string().required(),
  effectiveDate: Yup.string().required(),
  approvedBy: Yup.string().required(),
  approvalDate: Yup.string().required()
});

const initialValues = {
  changeRequestID: '',
  employeeID: '',
  employeeName: '',
  department: '',
  changeCategory: '',
  fieldModified: '',
  oldValue: '',
  newValue: '',
  effectiveDate: '',

  payrollUpdated: '',
  pfUpdated: '',
  esicUpdated: '',
  itUpdated: '',

  approvedBy: '',
  approvalDate: '',
  recordCreatedDate: new Date().toISOString().split('T')[0],

  customFields: []
};

const FRM00642 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values) => (
    <ModernA4Template
      formId="FRM-00642"
      title="Employee Data Change – Report / Record"
      department="HR & People Ops"
    >

      <div className="form-section">
        <h3 className="form-section-title">Core Record Information</h3>
        <div className="form-fields">

          {[
            'changeRequestID',
            'employeeID',
            'employeeName',
            'department',
            'changeCategory',
            'fieldModified',
            'oldValue',
            'newValue'
          ].map((field,i)=>(
            <div key={i} className="form-field">
              <label className="form-label required">
                {field.replace(/([A-Z])/g,' $1')}
              </label>
              {isPrintMode ? (
                <div className="print-value">{values[field]}</div>
              ) : (
                <Field name={field} className="form-input" />
              )}
            </div>
          ))}

          <div className="form-field">
            <label className="form-label required">Effective Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.effectiveDate}</div>
            ) : (
              <Field type="date" name="effectiveDate" className="form-input" />
            )}
          </div>

        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">System & Statutory Update Status</h3>
        <div className="form-fields">

          {[
            { name:'payrollUpdated', label:'Payroll Updated' },
            { name:'pfUpdated', label:'PF Portal Updated' },
            { name:'esicUpdated', label:'ESIC Portal Updated' },
            { name:'itUpdated', label:'IT Declaration Updated' }
          ].map((item,i)=>(
            <div key={i} className="form-field">
              <label className="form-label">{item.label}</label>
              {isPrintMode ? (
                <div className="print-value">{values[item.name]}</div>
              ) : (
                <Field as="select" name={item.name} className="form-input">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
              )}
            </div>
          ))}

          <div className="form-field">
            <label className="form-label required">Approved By</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedBy}</div>
            ) : (
              <Field name="approvedBy" className="form-input" />
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Approval Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalDate}</div>
            ) : (
              <Field type="date" name="approvalDate" className="form-input" />
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Record Created Date</label>
            <div className="print-value">{values.recordCreatedDate}</div>
          </div>

        </div>
      </div>

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log('FRM00642 Submitted', values);
          alert('Audit Record Saved Successfully');
        }}
      >
        {({ values }) => (
          <Form>
            {renderFormContent(values)}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00642;
