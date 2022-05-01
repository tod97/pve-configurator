import { useRef } from 'react';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';

const schema = yup.object().shape({
  roof: yup.string().min(2, 'Roof is too short').required('Roof is required'),
});

export default function RoofInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const formRef = useRef();

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
      <h2>Roof Info</h2>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <Input name="roof" label="Roof" type="roof" />
        </div>
        <button type="submit">Next</button>
      </Form>
    </div>
  );
}
