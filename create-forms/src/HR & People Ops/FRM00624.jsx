import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormWrapper from '../FormWrapper';
import { usePrintMode } from '../PrintModeContext';

const validationSchema = Yup.object({
  candidate_name: Yup.string().required('Required'),
  documents: Yup.object({
    id_proof: Yup.boolean(),
    address_proof: Yup.boolean(),
    education: Yup.boolean(),
    employment: Yup.boolean(),
    consent_form: Yup.boolean(),
  }),
});

const initialValues = {
  candidate_name: '',
  bgv_agency: '',
  documents: {
    id_proof: false,
    address_proof: false,
    education: false,
    employment: false,
    criminal_check: false,
    consent_form: false,
  },
  remarks: '',
};

const FRM00624 = () => {
  const { isPrintMode } = usePrintMode();
  const formikRef = useRef(null);
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <FormWrapper formId="FRM-00624" version="1.0" title="BGV Initiation Checklist">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => setFormValues(values)}
      >
        {({ values }) => {
          useEffect(() => setFormValues(values), [values]);

          if (isPrintMode) {
            return (
              <div className="print-view">
                 <div style={{ marginBottom: 20 }}>
                   <strong>Candidate:</strong> {values.candidate_name} <br />
                   <strong>Assigned Agency:</strong> {values.bgv_agency || 'N/A'}
                 </div>
                 <h4 style={{ borderBottom: '1px solid #ddd' }}>DOCUMENT CHECKLIST</h4>
                 <ul style={{ listStyle: 'none', padding: 0 }}>
                   <li style={liStyle}>{values.documents.consent_form ? '☑' : '☐'} Signed Consent Form</li>
                   <li style={liStyle}>{values.documents.id_proof ? '☑' : '☐'} ID Proof (Aadhaar/PAN)</li>
                   <li style={liStyle}>{values.documents.address_proof ? '☑' : '☐'} Address Proof</li>
                   <li style={liStyle}>{values.documents.education ? '☑' : '☐'} Educational Certificates</li>
                   <li style={liStyle}>{values.documents.employment ? '☑' : '☐'} Employment History/Relieving Letters</li>
                   <li style={liStyle}>{values.documents.criminal_check ? '☑' : '☐'} Criminal Record Check Requested</li>
                 </ul>
                 <div style={{ marginTop: 20 }}>
                   <strong>Remarks:</strong> {values.remarks || '—'}
                 </div>
              </div>
            );
          }

          return (
            <Form>
              <div style={{ marginBottom: 20 }}>
                <label>Candidate Name</label>
                <Field name="candidate_name" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label>BGV Agency (Vendor)</label>
                <Field name="bgv_agency" style={inputStyle} placeholder="e.g. FirstAdvantage" />
              </div>

              <h4 style={{ marginBottom: 10 }}>Document Readiness Checklist</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <label><Field type="checkbox" name="documents.consent_form" /> Signed Consent Form Collected</label>
                <label><Field type="checkbox" name="documents.id_proof" /> Identity Proofs (Clear Copies)</label>
                <label><Field type="checkbox" name="documents.address_proof" /> Address Proof (Current & Perm)</label>
                <label><Field type="checkbox" name="documents.education" /> Educational Certificates</label>
                <label><Field type="checkbox" name="documents.employment" /> Employment Docs (Last 3 Employers)</label>
                <label><Field type="checkbox" name="documents.criminal_check" /> Criminal Check Details Provided</label>
              </div>

              <div style={{ marginTop: 20 }}>
                <label>Remarks / Missing Docs</label>
                <Field as="textarea" name="remarks" rows="2" style={inputStyle} />
              </div>

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button type="submit" style={buttonStyle}>💾 Confirm Initiation</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '10px 24px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const liStyle = { padding: '5px 0', borderBottom: '1px solid #eee' };

export default FRM00624;