import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';

const schema = yup.object().shape({
  roof: yup.string().min(2, 'Roof is too short').required('Roof is required'),
  roofAngle: yup.string().required('roofAngle is required'),
});

export default function RoofInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const formRef = useRef();
  const roof_types = [
    {
      label: 'A Capanna',
      url: 'https://picsum.photos/200/300',
      value: 1,
    },
    {
      label: 'A Padiglione',
      url: 'https://picsum.photos/201/300',
      value: 2,
    },
    {
      label: 'Spiovente',
      url: 'https://picsum.photos/202/300',
      value: 3,
    },
    {
      label: 'Piano',
      url: 'https://picsum.photos/203/300',
      value: 4,
    },
  ];

  const [roofAngle, setRoofAngle] = useState('');

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
    <div className={formStep === 1 ? '' : 'hidden'}>
      <Form className="flex flex-col justify-center" ref={formRef} onSubmit={handleSubmit}>
        <div className="w-3/4 m-auto py-3 mt-32 mb-20">
          <TextField className="w-full" label="Dimensione del tetto (mq)" />
        </div>

        <Input id="roofAngle" value={roofAngle} name="roofAngle" type="hidden" />
        <div className="flex flex-wrap justify-center gap-4">
          {roof_types.map((type) => {
            return (
              <a
                onClick={(e) => setRoofAngle(type.value)}
                className={`relative cursor-pointer w-2/5 h-full aspect-square overflow-hidden bg-center bg-no-repeat bg-cover rounded-xl border-4 ${
                  roofAngle === type.value ? 'border-cyan-400' : 'border-black'
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

        <div>
          <Input name="roof" label="Roof" type="roof" />
        </div>

        <button className="relative w-40 m-auto inline-block group focus:outline-none focus:ring" type="submit">
          <span className="absolute inset-0 transition-transform translate-x-0 translate-y-0 bg-cyan-400 group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>

          <span className="relative w-40 inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current">Next</span>
        </button>
      </Form>
    </div>
  );
}
