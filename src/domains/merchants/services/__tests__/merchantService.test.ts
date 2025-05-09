import { getMerchants, getMerchantById, createMerchant, updateMerchant, deleteMerchant, getMunicipalities, patchMerchantStatus, downloadMerchantsCSV, getDepartments, getCities, getMerchantEstablishments, getEstablishments } from '../merchantService';

// Mock de fetch global
global.fetch = jest.fn();

describe('merchantService', () => {
  const mockToken = 'test-token';
  const mockMerchant = {
    id: 1,
    name: 'Empresa Test',
    document_type: 'NIT',
    document_number: '123456789',
    municipality_id: 1,
    phone: '1234567',
    email: 'test@test.com',
    registration_date: '2024-03-20',
    status: 'ACTIVE',
    hasEstablishments: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('debería obtener la lista de comerciantes', async () => {
    const mockResponse = {
      data: [mockMerchant],
      total: 1,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getMerchants({ page: 1, limit: 10 }, mockToken);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/merchants?page=1&limit=10'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );
  });

  it('debería obtener un comerciante por ID', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMerchant),
    });

    const result = await getMerchantById(1, mockToken);
    expect(result).toEqual(mockMerchant);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/merchants/1'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );
  });

  it('debería crear un nuevo comerciante', async () => {
    const newMerchant = {
      name: 'Empresa Test',
      document_type: 'NIT',
      document_number: '123456789',
      municipality_id: 1,
      phone: '1234567',
      email: 'test@test.com',
      registration_date: '2024-03-20',
      status: 'ACTIVE'
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...newMerchant, id: 1 }),
    });

    const result = await createMerchant(newMerchant, mockToken);
    expect(result).toEqual({ ...newMerchant, id: 1 });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/merchants'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(newMerchant),
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );
  });

  it('debería actualizar un comerciante existente', async () => {
    const updatedMerchant = {
      ...mockMerchant,
      name: 'Empresa Test Actualizada'
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(updatedMerchant),
    });

    const result = await updateMerchant(1, updatedMerchant, mockToken);
    expect(result).toEqual(updatedMerchant);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/merchants/1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updatedMerchant),
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );
  });

  it('debería eliminar un comerciante', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMerchant),
    });

    const result = await deleteMerchant(1, mockToken);
    expect(result).toEqual(mockMerchant);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/merchants/1'),
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
      })
    );
  });

  it('debería obtener municipios', async () => {
    const mockMunicipalities = [
      { id: 1, name: 'Ciudad Test 1' },
      { id: 2, name: 'Ciudad Test 2' }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMunicipalities),
    });

    const result = await getMunicipalities(mockToken);
    expect(result).toEqual(mockMunicipalities);
  });

  it('debería actualizar el estado de un comerciante', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...mockMerchant, status: 'INACTIVE' }),
    });

    const result = await patchMerchantStatus(1, 'INACTIVE', mockToken);
    expect(result).toEqual({ ...mockMerchant, status: 'INACTIVE' });
  });

  it('debería descargar el reporte CSV', async () => {
    const mockBlob = new Blob(['test'], { type: 'text/csv' });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(mockBlob),
    });

    const result = await downloadMerchantsCSV(mockToken);
    expect(result).toBeInstanceOf(Blob);
  });

  it('debería obtener departamentos', async () => {
    const result = await getDepartments();
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
  });

  it('debería obtener ciudades por departamento', async () => {
    const result = await getCities('amazonas');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alcalá');
  });

  it('debería obtener establecimientos de un comerciante', async () => {
    const result = await getMerchantEstablishments('1');
    expect(result).toHaveProperty('totalIncome');
    expect(result).toHaveProperty('totalEmployees');
  });

  it('debería obtener establecimientos', async () => {
    const mockEstablishments = [{ id: 1, name: 'Establecimiento Test' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockEstablishments }),
    });

    const result = await getEstablishments(mockToken);
    expect(result).toEqual(mockEstablishments);
  });

  it('debería manejar errores de la API', async () => {
    const errorMessage = 'Error al procesar la solicitud';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: errorMessage }),
    });

    await expect(getMerchants({ page: 1, limit: 10 }, mockToken)).rejects.toThrow(errorMessage);
  });
}); 