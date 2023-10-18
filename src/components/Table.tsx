import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/Context';
import { FiltroDasOpcoes } from '../Types';

function Table() {
  const { planetsList } = useContext(PlanetsContext);
  const [planetaFiltrado, setPlanetaFiltrado] = useState(planetsList);
  const [inputValue, setInputValue] = useState<FiltroDasOpcoes>({
    name: '',
    coluna: 'population',
    operador: 'maior que',
    filtroNumerico: '0',
  });
  const [formData, setFormData] = useState<FiltroDasOpcoes[]>([]);

  const handleChangeInput = (e:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const resultadoColuna = formData.map((elemento) => elemento.coluna);

  const arrayColuna = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const comparadorArrays = arrayColuna
    .filter((elemento) => !resultadoColuna.includes(elemento));

  useEffect(() => {
    const filtroPlanetas = () => {
      const filtro = planetsList
        .filter((planet) => planet.name.toLowerCase()
          .includes(inputValue.name.toLowerCase()));
      setPlanetaFiltrado(filtro);
    };
    filtroPlanetas();
  }, [planetsList, inputValue]);

  const filtroGeral = planetaFiltrado
    .filter((planeta: any) => formData.every((selecao: any) => {
      if (selecao.operador === 'maior que') {
        return Number(planeta[selecao.coluna]) > Number(selecao.filtroNumerico);
      } if (selecao.operador === 'menor que') {
        return Number(planeta[selecao.coluna]) < Number(selecao.filtroNumerico);
      } if (selecao.operador === 'igual a') {
        return Number(planeta[selecao.coluna]) === Number(selecao.filtroNumerico);
      }
      return false;
    }));

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      {formData.map((elem, index) => (
        <div key={ index } data-testid="filter">
          <p>{elem.coluna}</p>
          <p>{elem.operador}</p>
          <p>{elem.filtroNumerico}</p>
          <button type="button">Remover</button>
        </div>
      ))}
      <form>
        <select
          onChange={ handleChangeInput }
          name="coluna"
          id=""
          data-testid="column-filter"
        >
          {comparadorArrays.map((coluna, i) => (
            <option key={ i } value={ coluna }>
              {coluna}
            </option>))}
        </select>

        <select
          onChange={ handleChangeInput }
          name="operador"
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          onChange={ handleChangeInput }
          value={ inputValue.filtroNumerico }
          type="number"
          data-testid="value-filter"
          name="filtroNumerico"
        />

        <button
          type="button"
          onClick={ () => setFormData([...formData, inputValue]) }
          data-testid="button-filter"
        >
          Filtrar

        </button>

      </form>

      <label>
        Pesquisar
        <input
          type="text"
          data-testid="name-filter"
          value={ inputValue.name }
          onChange={ handleChangeInput }
          name="name"
        />

      </label>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>url</th>
            <th>edited</th>
            <th>created</th>
          </tr>
        </thead>
        <tbody>
          {filtroGeral.map((planeta, index) => (
            <tr key={ index }>
              <td>{planeta.name}</td>
              <td>{planeta.rotation_period}</td>
              <td>{planeta.orbital_period}</td>
              <td>{planeta.diameter}</td>
              <td>{planeta.climate}</td>
              <td>{planeta.gravity}</td>
              <td>{planeta.terrain}</td>
              <td>{planeta.surface_water}</td>
              <td>{planeta.population}</td>
              <td>
                <ul>
                  {planeta.films.map((filme, i) => (
                    <li key={ i }>{filme}</li>
                  ))}
                </ul>
              </td>
              <td>{planeta.created}</td>
              <td>{planeta.edited}</td>
              <td>{planeta.url}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Table;
