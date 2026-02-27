// PaymentCertificateReportRecord.jsx
// FRM-01183 – Payment Certificate Form

import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  projectName: Yup.string().required('Required'),
  subcontractorName: Yup.string().required('Required'),
  certificateNo: Yup.string().required('Required')
});

const initialValues = {

  /* ===========================
     FORM METADATA
  ============================ */
  formNo: 'FRM-01183',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  /* ===========================
     PROJECT / CONTRACT DETAILS
  ============================ */
  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',

  /* ===========================
     CERTIFICATE DETAILS
  ============================ */
  certificateNo: '',
  certificateDate: '',
  billReference: '',
  billingPeriod: '',

  /* ===========================
     AMOUNT DETAILS
  ============================ */
  grossWorkValue: '',
  deductions: '',
  retention: '',
  advanceRecovery: '',
  ldPenalty: '',
  backcharges: '',
  netCertifiedAmount: '',
  amountPreviouslyPaid: '',
  balancePayable: '',

  /* ===========================
     CERTIFICATION STATEMENT
  ============================ */
  certificationStatement:
    'This is to certify that the work value mentioned above has been verified in accordance with contract terms and is recommended for payment subject to applicable deductions.',

  /* ===========================
     SIGN-OFF FIELDS
  ============================ */
  preparedByName: '',
  preparedBySignature: '',
  preparedByDate: '',

  checkedByName: '',
  checkedBySignature: '',
  checkedByDate: '',

  certifiedByName: '',
  certifiedBySignature: '',
  certifiedByDate: '',

  clientRepName: '',
  clientRepSignature: '',
  clientRepDate: '',

  /* Shared Components */
  attachments: [],
  customFields: []
};

const PaymentCertificateReportRecord = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-01183"
      title="Payment Certificate Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Payment Certificate Saved');
        }}
      >

      {({ values, setFieldValue }) => {

        /* ===========================
           SAFE AUTO CALCULATIONS
        ============================ */
        useEffect(() => {

          const totalDeductions =
            (Number(values.deductions) || 0) +
            (Number(values.retention) || 0) +
            (Number(values.advanceRecovery) || 0) +
            (Number(values.ldPenalty) || 0) +
            (Number(values.backcharges) || 0);

          const netCertified =
            (Number(values.grossWorkValue) || 0) - totalDeductions;

          const balance =
            netCertified - (Number(values.amountPreviouslyPaid) || 0);

          setFieldValue('netCertifiedAmount', netCertified, false);
          setFieldValue('balancePayable', balance, false);

        }, [
          values.grossWorkValue,
          values.deductions,
          values.retention,
          values.advanceRecovery,
          values.ldPenalty,
          values.backcharges,
          values.amountPreviouslyPaid
        ]);

        return (
          <Form>

            <ModernA4Template
              formId={values.formNo}
              title="Payment Certificate"
              department={values.department}
              process={values.process}
            >

              {/* ===========================
                 PROJECT DETAILS
              ============================ */}
              <div className="form-section">
                <h3 className="form-section-title">Project / Contract Details</h3>
                <div className="form-fields">
                  <Field name="projectName" placeholder="Project Name" className="form-input"/>
                  <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                  <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                  <Field name="workOrderNo" placeholder="Work Order / Contract No" className="form-input"/>
                </div>
              </div>

              {/* ===========================
                 CERTIFICATE DETAILS
              ============================ */}
              <div className="form-section">
                <h3 className="form-section-title">Certificate Details</h3>
                <div className="form-fields">
                  <Field name="certificateNo" placeholder="Certificate No" className="form-input"/>
                  <Field name="certificateDate" type="date" className="form-input"/>
                  <Field name="billReference" placeholder="RA / Final Bill Ref" className="form-input"/>
                  <Field name="billingPeriod" placeholder="Billing Period" className="form-input"/>
                </div>
              </div>

              {/* ===========================
                 AMOUNT DETAILS
              ============================ */}
              <div className="form-section">
                <h3 className="form-section-title">Amount Details</h3>
                <div className="form-fields">
                  <Field name="grossWorkValue" placeholder="Gross Work Value" className="form-input"/>
                  <Field name="deductions" placeholder="General Deductions" className="form-input"/>
                  <Field name="retention" placeholder="Retention" className="form-input"/>
                  <Field name="advanceRecovery" placeholder="Advance Recovery" className="form-input"/>
                  <Field name="ldPenalty" placeholder="LD / Penalty" className="form-input"/>
                  <Field name="backcharges" placeholder="Backcharges" className="form-input"/>
                  <Field name="netCertifiedAmount" placeholder="Net Certified Amount" className="form-input" disabled/>
                  <Field name="amountPreviouslyPaid" placeholder="Amount Previously Paid" className="form-input"/>
                  <Field name="balancePayable" placeholder="Balance Payable" className="form-input" disabled/>
                </div>
              </div>

              {/* ===========================
                 CERTIFICATION STATEMENT
              ============================ */}
              <div className="form-section">
                <h3 className="form-section-title">Certification Statement</h3>
                <Field
                  as="textarea"
                  name="certificationStatement"
                  className="form-textarea"
                  rows="4"
                />
              </div>

              {/* ===========================
                 SIGN-OFF SECTION
              ============================ */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>
                <div className="form-fields">
                  <Field name="preparedByName" placeholder="Prepared By Name" className="form-input"/>
                  <Field name="preparedByDate" type="date" className="form-input"/>

                  <Field name="checkedByName" placeholder="Checked By Name" className="form-input"/>
                  <Field name="checkedByDate" type="date" className="form-input"/>

                  <Field name="certifiedByName" placeholder="Certified By (Engineer)" className="form-input"/>
                  <Field name="certifiedByDate" type="date" className="form-input"/>

                  <Field name="clientRepName" placeholder="Client Representative Name" className="form-input"/>
                  <Field name="clientRepDate" type="date" className="form-input"/>
                </div>
              </div>

              <FormAttachments />
              <FormCustomFields />

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Payment Certificate
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

export default PaymentCertificateReportRecord;
