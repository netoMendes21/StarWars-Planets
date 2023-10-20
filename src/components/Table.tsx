import { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/Context';
import { FiltroDasOpcoes } from '../Types';

export default function Table() {
  const { planetsList } = useContext(PlanetsContext);
  const [planetaFiltrado, setPlanetaFiltrado] = useState(planetsList);
  const [inputValue, setInputValue] = useState<FiltroDasOpcoes>({
    name: '',
    ordenar: '',
    coluna: 'population',
    operador: 'maior que',
    filtroNumerico: '0',
  });
  const [formData, setFormData] = useState<FiltroDasOpcoes[]>([]);
  const [sortTable, setSortTable] = useState({
    sort: '', column: 'population',
  });

  const [tabelaOrdenada, setTabelaOrdenada] = useState({
    sort: '', column: 'population',
  });

  const handleChangeInput = (e:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleChangeSort = (e:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTabelaOrdenada({ ...tabelaOrdenada, [name]: value });
  };

  const resultadoColuna = formData.map((elemento) => elemento.coluna);
  const arrayColuna = [
    'population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

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
    })).sort((a: any, b: any) => {
      if (a[sortTable.column] === 'unknown') return 1;
      if (b[sortTable.column] === 'unknown') return -1;
      if (sortTable.sort === 'ASC') {
        return Number(a[sortTable.column]) - Number(b[sortTable.column]);
      } if (sortTable.sort === 'DESC') {
        return Number(b[sortTable.column]) - Number(a[sortTable.column]);
      }
      return 0;
    });

  const excluirColuna = (item: any) => {
    const exclusao = formData.filter((column) => !column.coluna.includes(item));
    setFormData(exclusao);
  };

  const excluirTodosFiltros = () => {
    setFormData([]);
  };

  return (
    <div>
      <h1>Projeto Star Wars - Trybe</h1>
      {formData.map((elem, index) => (
        <div key={ index } data-testid="filter">
          <p>{elem.coluna}</p>
          <p>{elem.operador}</p>
          <p>{elem.filtroNumerico}</p>
          <button
            onClick={ () => excluirColuna(elem.coluna) }
            type="button"
          >
            Remover

          </button>
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

        <label htmlFor="ASC">Ascendente</label>
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          onChange={ handleChangeSort }
          checked={ tabelaOrdenada.sort === 'ASC' }
          name="sort"
          id="ASC"
          value="ASC"
        />

        <label htmlFor="DESC">Descrescente</label>
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          onChange={ handleChangeSort }
          name="sort"
          checked={ tabelaOrdenada.sort === 'DESC' }
        />

        <select
          value={ tabelaOrdenada.column }
          onChange={ handleChangeSort }
          data-testid="column-sort"
          name="column"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setSortTable(tabelaOrdenada) }
          name="ordenar"
        >
          Ordenar
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => excluirTodosFiltros() }
        >
          Remover Filtros

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
              <td data-testid="planet-name">{planeta.name}</td>
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
