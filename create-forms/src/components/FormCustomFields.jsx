import React from 'react';
import { FieldArray, Field } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';

const FormCustomFields = ({
  name = 'customFields',
  values = {}
}) => {

  const { isPrintMode } = usePrintMode();
  const list = values?.[name] || [];

  return (
    <div className="form-section">
      <h3 className="form-section-title">
        Additional Custom Fields
      </h3>

      {/* ---------------- NORMAL MODE ---------------- */}
      {!isPrintMode && (
        <FieldArray name={name}>
          {(helpers) => (
            <div className="full-width">

              {list.map((field, i) => (
                <div key={field?.id || i} className="custom-field-row">

                  <Field
                    name={`${name}[${i}].label`}
                    placeholder="Field Label"
                    className="form-input"
                  />

                  <Field
                    name={`${name}[${i}].value`}
                    placeholder="Field Value"
                    className="form-input"
                  />

                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => helpers.remove(i)}
                  >
                    Remove
                  </button>

                </div>
              ))}

              <button
                type="button"
                className="btn-add-field"
                onClick={() =>
                  helpers.push({
                    id: uuidv4(),
                    label: '',
                    value: ''
                  })
                }
              >
                Add Custom Field
              </button>

            </div>
          )}
        </FieldArray>
      )}

      {/* ---------------- PRINT MODE ---------------- */}
      {isPrintMode && list?.length > 0 && (
        <div className="modern-print-grid">
          {list.map((f, i) => (
            <div key={i} className="modern-print-row">
              <div className="print-label">
                {f?.label}
              </div>
              <div className="print-colon">:</div>
              <div className="print-value">
                {f?.value}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default FormCustomFields;