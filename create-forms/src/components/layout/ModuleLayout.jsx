import React, { useState } from "react";
import { ThemeProvider } from "../../context/ThemeContext";
import { PrintModeProvider } from "../../PrintModeContext";
import CustomizationPanel from "../CustomizationPanel";
import DynamicSidebar from "./DynamicSidebar";
import { modulesConfig } from "../../config/modulesConfig";

const ModuleLayout = ({ moduleKey, goHome }) => {

  const module = modulesConfig[moduleKey];

  if (!module) return <div>Module not found</div>;

  const { title, forms, width } = module;

  const [activeForm, setActiveForm] = useState(forms[0].id);

  const activeFormObject = forms.find(f => f.id === activeForm);
  const FormComponent = activeFormObject?.component;

  return (
    <ThemeProvider>
      <PrintModeProvider>

        <div style={{ display: 'flex', minHeight: '100vh' }}>

          <DynamicSidebar
            moduleTitle={title}
            forms={forms}
            activeForm={activeForm}
            setActiveForm={setActiveForm}
            goHome={goHome}
            width={width}
          />

          <main style={{
            flex: 1,
            background: '#e0e0e0',
            padding: 40
          }}>
            {FormComponent ? <FormComponent /> : <div>Form not found</div>}
          </main>

          <CustomizationPanel />

        </div>

      </PrintModeProvider>
    </ThemeProvider>
  );
};

export default ModuleLayout;