import { useFormData } from '../context';

/*
  calcolo irraggiamento: con l'indirizzo prendo il dato da https://re.jrc.ec.europa.eu/pvg_tools/en/

  area tetto = area tetto - ostacoli
  n pannelli = (area tetto / area pannello) per difetto
  area totale impianto = n pannelli * area pannello
  
  anno 1:
    energia prodotta mese  = area totale * efficienza * irradiazione del mese

  anno 10:
    energia prodotta mese  = area totale * (efficienza * ( 1 - (10 * time_deg) )) * irradiazione del mese

  anno 25:
    energia prodotta mese  = area totale * (efficienza * ( 1 - (25 * time_deg) )) * irradiazione del mese

  consumo mese calcolato da costo bolletta

*/

export default function FormCompleted() {
  const { data } = useFormData();

  return (
    <>
      <h2>Completed</h2>

      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}
