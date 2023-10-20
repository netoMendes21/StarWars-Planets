export type DataApiType = {
  name: string,
  rotation_period: string,
  orbital_period: string,
  diameter: string,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water:string,
  population: string,
  films: string[],
  created: string,
  edited: string,
  url: string,
};

export type ProviderPlanetsType = {
  children: React.ReactNode,
};

export type PlanetsType = {
  planetsList: DataApiType[],
};

export type FiltroDasOpcoes = {
  name: string,
  ordenar: string,
  coluna: string,
  operador: string,
  filtroNumerico: string,
};
