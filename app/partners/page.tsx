import { PartnerDirectory } from '@/components/partner-directory';
import partnersData from '@/data/partners.json';
import type { Partner } from '@/types';

export default function PartnersPage() {
  const partners = partnersData as Partner[];

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
              These are sample partner links for now. They are not endorsements. Replace with your curated list later.
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
          <PartnerDirectory partners={partners} />
        </div>
      </section>
    </div>
  );
}
