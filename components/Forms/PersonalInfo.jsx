import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';
import _ from 'lodash';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
});

export default function PersonalInfo({ formStep, nextFormStep }) {
  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const { setFormValues } = useFormData();
  const formRef = useRef();

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

  const onAddressChange = (e) => {
    if (e.target.textContent) {
      document.getElementById('address').value = e.target.textContent;
    }
  };

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
        <div className="w-1/2 m-auto py-3 ">
          <Input id="address" name="address" type="hidden" />
          <Autocomplete
            onChange={onAddressChange}
            onInputChange={onAddressInputChange}
            options={addresses}
            filterOptions={(x) => x}
            loading={isLoadingAddresses}
            loadingText={'Carico...'}
            noOptionsText={'Nessun indirizzo trovato'}
            renderInput={(params) => <TextField {...params} label="Indirizzo" />}
          />
        </div>
        <div>{/* <Input name="email" label="Email" type="email" /> */}</div>
        <button className="pt-12" type="submit">
          Next
        </button>
      </Form>
    </div>
  );
}
