import MerchantForm from '@/domains/merchants/components/MerchantForm';
import { getMerchantById } from '@/domains/merchants/services/merchantService';

export default async function EditMerchantPage({ params }: { params: { merchantId: string } }) {
  // Aquí deberías obtener los datos del comerciante por ID
  const initialData = await getMerchantById(params.merchantId);
  return <MerchantForm mode="edit" initialData={initialData} />;
} 