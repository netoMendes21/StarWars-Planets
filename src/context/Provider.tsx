import { useEffect, useState } from 'react';
import PlanetsContext from './Context';
import { DataApiType, ProviderPlanetsType } from '../Types';

function ProviderPlanets({ children }: ProviderPlanetsType) {
  const [planetsList, SetplanetsList] = useState<DataApiType[]>([]);
  const fetchApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    const removeKey = results.map((result: any) => {
      const { residents, ...retorno } = result;
      return retorno;
    });
    SetplanetsList(removeKey);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const planet = {
    planetsList,
  };
  return (
    <PlanetsContext.Provider value={ planet }>
      { children }
    </PlanetsContext.Provider>
  );
}

export default ProviderPlanets;
