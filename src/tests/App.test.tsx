import { act, render, screen } from '@testing-library/react';
import App from '../App';
import ProviderPlanets from '../context/Provider';
import testData from './testData';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockData = { json: async () => testData } as Response;

describe('Realizando testes de para verificar a cobertura', () => {
  it('Testando se o dropdown está sendo renderizado', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockData);
    await act(async () => {
      render(
        <ProviderPlanets>
          <App />
        </ProviderPlanets>
      )
    });
    const dropdown = screen.getByTestId('column-filter');
    expect(dropdown).toBeInTheDocument();
  });

  it('verifica se o botão filtrar está sendo renderizado', () => {
    render(<ProviderPlanets>
      <App />
    </ProviderPlanets>);
    const btnFiltrar = screen.getByRole('button', { name: 'Filtrar' });
    expect(btnFiltrar).toBeInTheDocument();
  });

  it('verificar se a função excluir filtro está sendo executada', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockData);
    await act(async () => {
      render(
        <ProviderPlanets>
          <App />
        </ProviderPlanets>
      )
    });
    const btnFiltrar = screen.getByTestId('button-filter');
    await userEvent.click(btnFiltrar)
    const planetas = screen.getAllByTestId("planet-name");
    expect(planetas.length).toBe(8);
  })

  it('testar se a função está ordenando os elementos da tabela', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(mockData);
    await act(async () => {
      render(
        <ProviderPlanets>
          <App />
        </ProviderPlanets>
      )
    });
    const coluna = screen.getByTestId('column-filter');
    await userEvent.selectOptions(coluna, 'population');

    
    const asc = screen.getByTestId('column-sort-input-asc');
    await userEvent.click(asc);
    
    const btnOrdenar = screen.getByTestId('column-sort-button');
    await userEvent.click(btnOrdenar);

    let listaAsc = screen.getAllByTestId('planet-name');
    expect(listaAsc.length).toBe(10);
  })
})
