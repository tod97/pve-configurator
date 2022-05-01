import { useRef } from 'react';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';

const schema = yup.object().shape({
  equip: yup.string().min(2, 'Equip is too short').required('Address is required'),
});

export default function EquipmentInfo({ formStep, nextFormStep }) {
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
    <div className={formStep === 3 ? '' : 'hidden'}>
      <h2>Equipment Info</h2>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <Input name="equip" label="Address" type="text" />
        </div>
        <button type="submit">Next</button>
      </Form>
    </div>
  );
}
