import { useState } from 'react';
import Head from 'next/head';

import FormCard from '../components/FormCard';
import { EquipmentInfo, RoofInfo, SystemInfo, PersonalInfo } from '../components/Forms';
import FormCompleted from '../components/FormCompleted';

const App = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const goToStep = (step) => setFormStep(step);

  return (
    <>
      <div className="p-8">
        <Head>
          <title>Uniform Multi Step Form</title>
        </Head>

        <FormCard currentStep={formStep} goToStep={goToStep}>
          {formStep >= 0 && <PersonalInfo formStep={formStep} nextFormStep={nextFormStep} />}
          {formStep >= 1 && <RoofInfo formStep={formStep} nextFormStep={nextFormStep} />}
          {formStep >= 2 && <SystemInfo formStep={formStep} nextFormStep={nextFormStep} />}
          {formStep >= 3 && <EquipmentInfo formStep={formStep} nextFormStep={nextFormStep} />}

          {formStep > 3 && <FormCompleted />}
        </FormCard>
      </div>
    </>
  );
};

export default App;
