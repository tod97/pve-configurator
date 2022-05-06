import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';

const schema = yup.object().shape({
  roofSize: yup.string().required('roofSize is required'),
  roofAngle: yup.string().required('roofAngle is required'),
});

export default function RoofInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const formRef = useRef();
  const roof_types = [
    {
      label: 'A Capanna',
      url: 'https://picsum.photos/200/300',
      value: 30,
    },
    {
      label: 'A Padiglione',
      url: 'https://picsum.photos/201/300',
      value: 28,
    },
    {
      label: 'Spiovente',
      url: 'https://picsum.photos/202/300',
      value: 17,
    },
    {
      label: 'Piano',
      url: 'https://picsum.photos/203/300',
      value: 0,
    },
  ];

  const [roofObstacoles, setRoofObstacoles] = useState([
    {
      label: 'Camino',
      value: 2.5,
      count: 0,
    },
    {
      label: 'Finestre',
      value: 5,
      count: 0,
    },
    {
      label: 'Antenne',
      value: 4,
      count: 0,
    },
  ]);
  const [roofSize, setRoofSize] = useState('');
  const [roofAngle, setRoofAngle] = useState('');

  const updateObstacoleCount = (index, value) => {
    if (roofObstacoles[index].count + value >= 0 && roofObstacoles[index].count + value < 5) {
      roofObstacoles[index].count += value;
      setRoofObstacoles([...roofObstacoles]);
    }
  };

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
      <Form className="flex flex-col justify-center lg:w-1/2 m-auto" ref={formRef} onSubmit={handleSubmit}>
        <div className="w-3/4 m-auto py-3 mt-20 mb-20">
          <Input id="roofSize" value={roofSize} name="roofSize" type="hidden" />
          <TextField
            type={'number'}
            inputMode={'numeric'}
            onChange={(e) => setRoofSize(e.target.value)}
            className="w-full"
            label="Dimensione del tetto (mq)"
          />
        </div>

        <Input id="roofAngle" value={roofAngle} name="roofAngle" type="hidden" />
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {roof_types.map((type) => {
            return (
              <a
                key={type.label}
                onClick={() => setRoofAngle(type.value)}
                className={`relative cursor-pointer w-2/5 max-w-50 h-full aspect-square overflow-hidden bg-center bg-no-repeat bg-cover rounded-xl border-4 ${
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

        <div className="m-auto">
          {roofObstacoles.map((obstacole, i) => {
            return (
              <div key={obstacole.label} className="flex items-center justify-between my-8">
                <div>{obstacole.label}</div>
                <div className="flex items-center">
                  <div
                    onClick={() => updateObstacoleCount(i, -1)}
                    className="cursor-pointer flex items-center justify-center w-10 h-10 border-2 border-black"
                  >
                    -
                  </div>
                  <div className="w-4 mx-4 text-center">{obstacole.count}</div>
                  <div
                    onClick={() => updateObstacoleCount(i, 1)}
                    className="cursor-pointer flex items-center justify-center w-10 h-10 border-2 border-black"
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="relative w-40 m-auto inline-block group focus:outline-none focus:ring" type="submit">
          <span className="absolute inset-0 transition-transform translate-x-0 translate-y-0 bg-cyan-400 group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>

          <span className="relative w-40 inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current">Next</span>
        </button>
      </Form>
    </div>
  );
}
