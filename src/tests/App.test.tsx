import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import ProviderPlanets from '../context/Provider';

describe('Realizando testes de para verificar a cobertura', () => {
  it('Testando se o dropdown está da coluna está sendo renderizado', () => {
    render(
      <ProviderPlanets>
        <App />
      </ProviderPlanets>
    );
    const dropdown = screen.getByTestId('column-filter');
    expect(dropdown).toBeInTheDocument();
  });

  it('verifica se o botão filtrar está sendo renderizado', () => {
    render(<ProviderPlanets>
      <App />
    </ProviderPlanets>);
    const btnFiltrar = screen.getByRole('button');
    expect(btnFiltrar).toBeInTheDocument();
  });
})
