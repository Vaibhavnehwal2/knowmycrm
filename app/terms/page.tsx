export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
          Terms of Service
        </h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p>
              KnowMyCRM provides CRM and ERP selection support and implementation partner introductions. We do not sell software or provide implementation services directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Warranties</h2>
            <p>
              Our recommendations are based on the information you provide and our analysis. We make no warranties about the suitability of any CRM, ERP, or implementation partner for your specific needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Responsibility</h2>
            <p>
              Final tool selection and partner contracting remain your responsibility. You should:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Conduct your own due diligence</li>
              <li>Verify partner credentials and references</li>
              <li>Review contracts with legal counsel</li>
              <li>Test software thoroughly before committing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p>
              KnowMyCRM shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or selection of CRM, ERP, or implementation partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trademarks</h2>
            <p>
              All trademarks, logos, and brand names mentioned on this site are property of their respective owners. They are used for identification purposes only and do not imply endorsement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p>
              Questions about these terms? Contact us through our <a href="/book" className="text-primary hover:underline">contact form</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
