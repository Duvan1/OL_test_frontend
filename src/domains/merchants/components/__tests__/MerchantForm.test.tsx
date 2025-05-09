import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MerchantForm from '../MerchantForm';
import { useAuthStore } from '@/store/authStore';

// Mock del store de autenticación
jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(() => ({
    token: 'test-token',
  })),
}));

// Mock del servicio de comerciantes
jest.mock('../../services/merchantService', () => ({
  getMunicipalities: jest.fn(() => Promise.resolve([
    { id: 1, name: 'Ciudad Test 1' },
    { id: 2, name: 'Ciudad Test 2' },
  ])),
  createMerchant: jest.fn(() => Promise.resolve({ id: 1 })),
}));

describe('MerchantForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza todos los campos requeridos', async () => {
    await act(async () => {
      render(<MerchantForm mode="create" />);
    });
    
    // Verificar que todos los campos estén presentes
    expect(screen.getByRole('textbox', { name: /nombre/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /tipo de documento/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /número de documento/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /ciudad/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /teléfono/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /correo electrónico/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de registro/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /estado/i })).toBeInTheDocument();
  });

  it('muestra errores de validación al enviar formulario vacío', async () => {
    await act(async () => {
      render(<MerchantForm mode="create" />);
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText(/Enviar Formulario/i));
    });
    
    await waitFor(() => {
      expect(screen.getByText(/La razón social es obligatoria/i)).toBeInTheDocument();
      expect(screen.getByText(/El tipo de documento es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/El número de documento es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/Seleccione una ciudad/i)).toBeInTheDocument();
      expect(screen.getByText(/El teléfono es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/El correo es obligatorio/i)).toBeInTheDocument();
    });
  });

  it('envía el formulario correctamente con datos válidos', async () => {
    await act(async () => {
      render(<MerchantForm mode="create" />);
    });
    
    await act(async () => {
      await userEvent.type(screen.getByRole('textbox', { name: /nombre/i }), 'Empresa Test');
      await userEvent.selectOptions(screen.getByRole('combobox', { name: /tipo de documento/i }), 'NIT');
      await userEvent.type(screen.getByRole('textbox', { name: /número de documento/i }), '123456789');
      await userEvent.selectOptions(screen.getByRole('combobox', { name: /ciudad/i }), '1');
      await userEvent.type(screen.getByRole('textbox', { name: /teléfono/i }), '1234567');
      await userEvent.type(screen.getByRole('textbox', { name: /correo electrónico/i }), 'test@test.com');
      
      const dateInput = screen.getByLabelText(/fecha de registro/i);
      fireEvent.change(dateInput, { target: { value: '2024-03-20' } });
      
      await userEvent.selectOptions(screen.getByRole('combobox', { name: /estado/i }), 'ACTIVE');
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Enviar Formulario/i));
    });

    // Verificar que no hay errores
    await waitFor(() => {
      expect(screen.queryByText(/es obligatorio/i)).not.toBeInTheDocument();
    });
  });

  it('carga las ciudades al montar el componente', async () => {
    await act(async () => {
      render(<MerchantForm mode="create" />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Ciudad Test 1')).toBeInTheDocument();
      expect(screen.getByText('Ciudad Test 2')).toBeInTheDocument();
    });
  });
}); 