import { useState } from 'react';
import Head from 'next/head';

import styles from '../styles/styles.module.scss';
import FormCard from '../components/FormCard';
import { EquipmentInfo, RoofInfo, SystemInfo, PersonalInfo } from '../components/Forms';
import FormCompleted from '../components/FormCompleted';

const App = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <>
      <div className={`${styles.container}`}>
        <Head>
          <title>Uniform Multi Step Form</title>
        </Head>

        <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
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
