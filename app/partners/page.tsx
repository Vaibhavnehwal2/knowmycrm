import { getAllPartners } from '@/lib/partners';
import { PartnerCardGrid } from '@/components/partner-card-grid';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function PartnersPage() {
  const partners = getAllPartners();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Implementation Partners
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Browse our curated directory of CRM and ERP implementation partners. 
              Click on any partner to learn more about their capabilities and expertise.
            </p>
            <p className="text-sm text-gray-500">
              All trademarks and logos are property of their respective owners. Used for identification only.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Directory */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <PartnerCardGrid partners={partners} />
        </div>
      </section>
    </div>
  );
}
