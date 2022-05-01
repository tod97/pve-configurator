import { useFormData } from '../context';

export default function FormCompleted() {
  const { data } = useFormData();

  return (
    <>
      <h2>Completed</h2>

      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}
