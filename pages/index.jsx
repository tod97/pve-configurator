import { useState } from 'react';
import Head from 'next/head';

import FormCard from '../components/FormCard';
import { RoofInfo, SystemInfo, PersonalInfo } from '../components/Forms';
import FormCompleted from '../components/FormCompleted';

const App = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const goToStep = (step) => setFormStep(step);

  return (
    <>
      <Head>
        <title>Pve Configurator</title>
      </Head>

      <FormCard currentStep={formStep} goToStep={goToStep}>
        {formStep >= 0 && <PersonalInfo formStep={formStep} nextFormStep={nextFormStep} />}
        {formStep >= 1 && <RoofInfo formStep={formStep} nextFormStep={nextFormStep} />}
        {formStep >= 2 && <SystemInfo formStep={formStep} nextFormStep={nextFormStep} />}

        {formStep > 2 && <FormCompleted />}
      </FormCard>
    </>
  );
};

export default App;
