import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';
import _ from 'lodash';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  consumption: yup.string().required('Consumption is required'),
});

export default function PersonalInfo({ formStep, nextFormStep }) {
  const [addresses, setAddresses] = useState([]);
  const marks = [
    {
      value: 20,
      label: '20 €',
    },
    {
      value: 300,
      label: '300 €',
    },
  ];
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const { setFormValues } = useFormData();
  const formRef = useRef();

  const [address, setAddress] = useState([]);
  const [consumption, setConsumption] = useState([]);

  function valuetext(value) {
    return (
      <div className="text-center p-3">
        <p className="text-3xl mb-3">{value} €</p>
        <p>82 kWh - 108 kWh</p>
      </div>
    );
  }

  const onAddressInputChange = _.debounce((e) => {
    const searchTxt = e.target.value;
    if (searchTxt && searchTxt.trim().length > 0) {
      setIsLoadingAddresses(true);
      fetch(encodeURI(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${searchTxt}`))
        .then((res) => res.json())
        .then((data) => {
          setAddresses(
            data
              .filter((item, pos) => {
                return data.map((x) => x.place_id).indexOf(item.place_id) == pos && data.map((x) => x.display_name).indexOf(item.display_name) == pos;
              })
              .map((x) => {
                return { label: x.display_name, id: x.place_id };
              })
          );
          setIsLoadingAddresses(false);
        });
    }
  }, 300);

  async function handleSubmit(data) {
    console.log(data);
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
    <div className={formStep === 0 ? '' : 'hidden'}>
      <Form className="flex flex-col justify-center" ref={formRef} onSubmit={handleSubmit}>
        <div className="w-3/4 m-auto py-3 mt-32 mb-40">
          <Input id="address" value={address} name="address" type="hidden" />
          <Autocomplete
            onChange={(e) => setAddress(e.target.textContent)}
            onInputChange={onAddressInputChange}
            options={addresses}
            filterOptions={(x) => x}
            loading={isLoadingAddresses}
            loadingText={'Carico...'}
            noOptionsText={'Nessun indirizzo trovato'}
            renderInput={(params) => <TextField {...params} label="Indirizzo" />}
          />
        </div>
        <div className="w-3/4 m-auto mb-20">
          <Input id="consumption" value={consumption} name="consumption" type="hidden" />
          <Slider
            onChange={(e) => setConsumption(e.target.value)}
            min={20}
            valueLabelFormat={valuetext}
            defaultValue={20}
            max={300}
            step={5}
            color="cyan"
            valueLabelDisplay="auto"
            marks={marks}
          />
        </div>
        <button className="relative w-40 m-auto inline-block group focus:outline-none focus:ring" type="submit">
          <span className="absolute inset-0 transition-transform translate-x-0 translate-y-0 bg-cyan-400 group-hover:translate-y-1.5 group-hover:translate-x-1.5"></span>

          <span className="relative w-40 inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase border-2 border-current">Next</span>
        </button>
      </Form>
    </div>
  );
}
