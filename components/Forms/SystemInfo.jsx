import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';

const schema = yup.object().shape({
  systemType: yup.string().required('SystemType is required'),
});

export default function SystemInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const formRef = useRef();
  const system_types = [
    {
      label: 'Fotovoltaico accumulo',
      url: 'https://picsum.photos/401/300',
      value: 2,
    },
    {
      label: 'Eolico fotovoltaico con accumulo',
      url: 'https://picsum.photos/402/300',
      value: 3,
    },
  ];
  const pv_types = [
    {
      label: 'Sunpower',
      value: 1,
      efficiency: 0.22,
      area: 2,
      time_deg: 0.008,
      price: 350,
    },
    {
      label: 'Solaria',
      value: 2,
      efficiency: 0.202,
      area: 2,
      time_deg: 0.01,
      price: 300,
    },
    {
      label: 'Jinko Solar',
      value: 3,
      efficiency: 0.21,
      area: 1.95,
      time_deg: 0.0055,
      price: 450,
    },
  ];
  const inverter_types = [
    {
      label: 'Piko IQ',
      value: 1,
      peak: 7,
      charge_reg: 0,
      price: 1000,
    },
  ];
  const battery_types = [
    {
      label: 'Tesla Powerwall',
      value: 1,
      capacity: 14,
      price: 1000,
    },
  ];
  const eolic_types = [
    {
      label: 'Domus',
      value: 1,
      power: 1,
      price: 920,
    },
    {
      label: 'Eolo 2000',
      value: 2,
      power: 2,
      price: 1500,
    },
  ];

  const [systemType, setSystemType] = useState('');
  const [pvType, setPvType] = useState('');
  const [inverterType, setInverterType] = useState('');
  const [batteryType, setBatteryType] = useState('');
  const [eolicType, setEolicType] = useState('');

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed - do something with data
      setFormValues(data);
      nextFormStep();
    } catch (err) {
      const errors = {};
      // Validation failed - do show error
      if (err instanceof yup.ValidationError) {
        console.log(err.inner);
        // Validation failed - do show error
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      }
    }
  }

  return (
    <div className={formStep === 2 ? '' : 'hidden'}>
      <Form className="flex flex-col justify-center m-auto lg:w-3/4 p-8" ref={formRef} onSubmit={handleSubmit}>
        <Input id="systemType" value={systemType} name="systemType" type="hidden" />
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 mb-20">
          {system_types.map((type) => {
            return (
              <a
                key={type.label}
                onClick={() => {
                  if (type.value < 3) {
                    setEolicType('');
                  }
                  if (type.value < 2) {
                    setBatteryType('');
                  }
                  setSystemType(type.value);
                }}
                className={`relative cursor-pointer w-full h-40 lg:w-80 lg:h-80 aspect-square overflow-hidden bg-center bg-no-repeat bg-cover rounded-xl border-4 ${
                  systemType === type.value ? 'border-cyan-400' : 'border-black'
                }`}
                style={{ backgroundImage: `url(${type.url})` }}
              >
                <div className="w-full h-full relative text-white bg-black bg-opacity-40">
                  <h5 className="absolute bottom-8 left-4 text-2xl font-bold">{type.label}</h5>
                </div>
              </a>
            );
          })}
        </div>

        {(systemType === 1 || systemType === 2 || systemType === 3) && (
          <>
            <div class="mb-8">
              <div className="flex overflow-x-auto">
                {pv_types.map((pv) => {
                  return (
                    <div
                      key={pv.label}
                      onClick={() => setPvType(pv.value)}
                      className={`cursor-pointer flex items-center text-center border-4 mr-4 p-4 max-w-50 ${
                        pvType === pv.value ? 'border-cyan-400' : 'border-black'
                      }`}
                    >
                      {pv.label}
                    </div>
                  );
                })}
              </div>
              {pvType && <div>Prezzo: {pv_types.find((x) => x.value === pvType).price}</div>}
            </div>
            <div class="mb-8">
              <div className="flex overflow-x-auto">
                {inverter_types.map((inverter) => {
                  return (
                    <div
                      key={inverter.label}
                      onClick={() => setInverterType(inverter.value)}
                      className={`cursor-pointer flex items-center text-center border-4 mr-4 p-4 max-w-50 ${
                        inverterType === inverter.value ? 'border-cyan-400' : 'border-black'
                      }`}
                    >
                      {inverter.label}
                    </div>
                  );
                })}
              </div>
              {inverterType && <div>Prezzo: {inverter_types.find((x) => x.value === inverterType).price}</div>}
            </div>
          </>
        )}

        {(systemType === 2 || systemType === 3) && (
          <div class="mb-8">
            <div className="flex overflow-x-auto">
              {battery_types.map((battery) => {
                return (
                  <div
                    key={battery.label}
                    onClick={() => setBatteryType(battery.value)}
                    className={`cursor-pointer flex items-center text-center border-4 mr-4 p-4 max-w-50 ${
                      batteryType === battery.value ? 'border-cyan-400' : 'border-black'
                    }`}
                  >
                    {battery.label}
                  </div>
                );
              })}
            </div>
            {batteryType && <div>Prezzo: {battery_types.find((x) => x.value === batteryType).price}</div>}
          </div>
        )}

        {systemType === 3 && (
          <div class="mb-8">
            <div className="flex overflow-x-auto">
              {eolic_types.map((eolic) => {
                return (
                  <div
                    key={eolic.label}
                    onClick={() => setEolicType(eolic.value)}
                    className={`cursor-pointer flex items-center text-center border-4 mr-4 p-4 max-w-50 ${
                      eolicType === eolic.value ? 'border-cyan-400' : 'border-black'
                    }`}
                  >
                    {eolic.label}
                  </div>
                );
              })}
            </div>
            {eolicType && <div>Prezzo: {eolic_types.find((x) => x.value === eolicType).price}</div>}
          </div>
        )}

        <button className="relative w-40 m-auto inline-block group focus:outline-none focus:ring" type="submit">
          <span className="absolute inset-0 transition-transform translate-x-0 translate-y-0 bg-cyan-400 group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>

          <span className="relative w-40 inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current">Next</span>
        </button>
      </Form>
    </div>
  );
}
