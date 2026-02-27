import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const changeOptions = [
  'Personal Information',
  'Contact Details',
  'Address Change',
  'Bank Details',
  'Nominee Details',
  'Marital Status',
  'Name Change',
  'PAN / Aadhaar Update',
  'PF / UAN Update',
  'Emergency Contact'
];

const validationSchema = Yup.object({
  employeeID: Yup.string().required('Employee ID required'),
  employeeName: Yup.string().required('Employee Name required'),
  department: Yup.string().required('Department required'),
  designation: Yup.string().required('Designation required'),
  requestDate: Yup.string().required('Request Date required'),
  changeType: Yup.array().min(1, 'Select at least one change type')
});

const initialValues = {
  employeeID: '',
  employeeName: '',
  department: '',
  designation: '',
  workLocation: '',
  requestDate: '',
  changeType: [],

  // Personal
  dob: '',
  gender: '',

  // Contact
  mobile: '',
  email: '',

  // Address
  permanentAddress: '',
  currentAddress: '',

  // Bank
  bankName: '',
  accountNumber: '',
  ifscCode: '',

  // Nominee
  nomineeName: '',
  nomineeRelationship: '',
  nomineeDOB: '',

  // PAN
  panNumber: '',
  aadhaarNumber: '',

  // PF
  uanNumber: '',

  // Emergency
  emergencyName: '',
  emergencyRelation: '',
  emergencyContact: '',

  reasonForChange: '',

  signatures: {
    employee: { type: '', data: '', name: '' }
  }
};

const FRM00640 = () => {
  const { isPrintMode } = usePrintMode();

  const renderSection = (title, condition, fields, values) => {
    if (!values.changeType.includes(condition)) return null;

    return (
      <div className="form-section">
        <h3 className="form-section-title">{title}</h3>
        <div className="form-fields">
          {fields.map((field, i) => (
            <div className="form-field" key={i}>
              <label className="form-label">
                {field.label}
              </label>
              {isPrintMode ? (
                <div className="print-value">
                  {values[field.name] || '________________'}
                </div>
              ) : (
                <Field
                  name={field.name}
                  type={field.type || 'text'}
                  className="form-input"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <ModernFormWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('FRM00640 Submitted', values);
          alert('Data Change Request Saved Successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00640"
              title="Employee Data Change – Request / Initiation"
              department="HR & People Ops"
            >

              {/* BASIC DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Details</h3>
                <div className="form-fields">
                  {['employeeID','employeeName','department','designation','workLocation']
                    .map((field, i) => (
                      <div className="form-field" key={i}>
                        <label className="form-label required">
                          {field.replace(/([A-Z])/g,' $1')}
                        </label>
                        <Field name={field} className="form-input" />
                      </div>
                  ))}

                  <div className="form-field">
                    <label className="form-label required">Request Date</label>
                    <Field name="requestDate" type="date" className="form-input" />
                  </div>
                </div>
              </div>

              {/* CHANGE TYPE CHECKBOX */}
              <div className="form-section">
                <h3 className="form-section-title">Select Change Type</h3>
                <div className="form-fields">
                  {changeOptions.map((type, i) => (
                    <div key={i} className="form-field">
                      <label>
                        <Field
                          type="checkbox"
                          name="changeType"
                          value={type}
                        /> {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* DYNAMIC SECTIONS */}

              {renderSection("Personal Information",
                "Personal Information",
                [
                  { name:'dob', label:'Date of Birth', type:'date' },
                  { name:'gender', label:'Gender' }
                ], values)}

              {renderSection("Contact Details",
                "Contact Details",
                [
                  { name:'mobile', label:'Mobile Number' },
                  { name:'email', label:'Email Address' }
                ], values)}

              {renderSection("Address Details",
                "Address Change",
                [
                  { name:'permanentAddress', label:'Permanent Address' },
                  { name:'currentAddress', label:'Current Address' }
                ], values)}

              {renderSection("Bank Details",
                "Bank Details",
                [
                  { name:'bankName', label:'Bank Name' },
                  { name:'accountNumber', label:'Account Number' },
                  { name:'ifscCode', label:'IFSC Code' }
                ], values)}

              {renderSection("Nominee Details",
                "Nominee Details",
                [
                  { name:'nomineeName', label:'Nominee Name' },
                  { name:'nomineeRelationship', label:'Relationship' },
                  { name:'nomineeDOB', label:'DOB', type:'date' }
                ], values)}

              {renderSection("PAN / Aadhaar",
                "PAN / Aadhaar Update",
                [
                  { name:'panNumber', label:'PAN Number' },
                  { name:'aadhaarNumber', label:'Aadhaar Number' }
                ], values)}

              {renderSection("PF / UAN",
                "PF / UAN Update",
                [
                  { name:'uanNumber', label:'UAN Number' }
                ], values)}

              {renderSection("Emergency Contact",
                "Emergency Contact",
                [
                  { name:'emergencyName', label:'Contact Name' },
                  { name:'emergencyRelation', label:'Relationship' },
                  { name:'emergencyContact', label:'Contact Number' }
                ], values)}

              {/* REASON */}
              <div className="form-section">
                <h3 className="form-section-title">Reason for Change</h3>
                <Field as="textarea"
                  name="reasonForChange"
                  className="form-textarea"
                />
              </div>

              {/* SIGNATURE */}
              <div className="form-section">
                <h3 className="form-section-title">Employee Declaration</h3>
                <SignatureComponent
                  label="Employee Signature"
                  onChange={(data) =>
                    setFieldValue('signatures.employee.data', data)
                  }
                />
                <Field
                  name="signatures.employee.name"
                  placeholder="Employee Name"
                  className="form-input"
                />
              </div>

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00640;
