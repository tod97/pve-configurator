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
      label: 'Fotovoltaico inverter',
      url: 'https://picsum.photos/400/300',
      value: 1,
    },
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
  const inverter_types = [
    {
      label: 'Inverter 1',
      value: 1,
      price: 300,
    },
    {
      label: 'Inverter 2',
      value: 2,
      price: 700,
    },
    {
      label: 'Inverter 3',
      value: 3,
      price: 100,
    },
    {
      label: 'Inverter 1',
      value: 4,
      price: 300,
    },
    {
      label: 'Inverter 2',
      value: 5,
      price: 700,
    },
    {
      label: 'Inverter 3',
      value: 6,
      price: 100,
    },
  ];
  const battery_types = [
    {
      label: 'Accumulo 1',
      value: 1,
      price: 300,
    },
    {
      label: 'Accumulo 2',
      value: 2,
      price: 700,
    },
    {
      label: 'Accumulo 3',
      value: 3,
      price: 100,
    },
    {
      label: 'Accumulo 4',
      value: 4,
      price: 300,
    },
    {
      label: 'Accumulo 5',
      value: 5,
      price: 700,
    },
    {
      label: 'Accumulo 6',
      value: 6,
      price: 100,
    },
  ];
  const eolic_types = [
    {
      label: 'Eolico 1',
      value: 1,
      price: 300,
    },
    {
      label: 'Eolico 2',
      value: 2,
      price: 700,
    },
    {
      label: 'Eolico 3',
      value: 3,
      price: 100,
    },
    {
      label: 'Eolico 4',
      value: 4,
      price: 300,
    },
    {
      label: 'Eolico 5',
      value: 5,
      price: 700,
    },
    {
      label: 'Eolico 6',
      value: 6,
      price: 100,
    },
  ];

  const [systemType, setSystemType] = useState('');
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
