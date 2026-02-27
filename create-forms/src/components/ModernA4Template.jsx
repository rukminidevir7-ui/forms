import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/ModernA4Template.css';

const ModernA4Template = ({
  children,
  formId = 'FRM-00000',
  title = 'Form',
  department = 'HR & People Ops'
}) => {

  useEffect(() => {

    const convertInputs = () => {
      const inputs = document.querySelectorAll(
        ".items-table input[type='text']"
      );

      inputs.forEach(input => {
        if (input.dataset.converted) return;

        const textarea = document.createElement("textarea");

        textarea.value = input.value;
        textarea.name = input.name;
        textarea.className = input.className;
        textarea.style.width = "100%";
        textarea.style.minHeight = "60px";
        textarea.rows = 2;

        // Auto height while typing
        textarea.addEventListener("input", () => {
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
        });

        input.replaceWith(textarea);
        textarea.dataset.converted = "true";
      });
    };

    // Delay slightly to ensure form is rendered
    setTimeout(convertInputs, 100);

  }, []);

  return (
    <div className="modern-a4-template">

      <Header />

      <div className="form-title-section">
        <h1 className="form-title">{title}</h1>
        <div className="form-meta">
          <span>{department}</span>
          <span>•</span>
          <span>{formId}</span>
        </div>
      </div>

      <div className="form-body">
        {children}
      </div>

      <Footer />

    </div>
  );
};

export default ModernA4Template;