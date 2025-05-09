import { act } from 'react';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.setState({ token: null, user: null });
    });
  });

  it('debería inicializar con estado vacío', () => {
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  it('debería guardar el token correctamente', () => {
    act(() => {
      useAuthStore.setState({ token: 'test-token', user: null });
    });
    expect(useAuthStore.getState().token).toBe('test-token');
  });

  it('debería guardar el usuario correctamente', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@test.com',
      role: 'Administrador'
    };
    act(() => {
      useAuthStore.setState({ token: null, user: mockUser });
    });
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it('debería limpiar el estado al hacer logout', () => {
    act(() => {
      useAuthStore.setState({
        token: 'test-token',
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
          role: 'Administrador'
        }
      });
      useAuthStore.getState().logout();
    });
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
}); 