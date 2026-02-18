export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p>
              We collect information you provide directly to us through our Fit Wizard, contact forms, and when you book a call. This includes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name and email address</li>
              <li>Company name and size</li>
              <li>Industry and country</li>
              <li>Workflow and integration requirements</li>
              <li>Current CRM and ERP systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide CRM and ERP selection recommendations</li>
              <li>Connect you with implementation partners</li>
              <li>Communicate with you about your inquiry</li>
              <li>Improve our services and content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p>
              We do not sell your information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Implementation partners you explicitly request to be introduced to</li>
              <li>Service providers who assist in our operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the information we hold about you</li>
              <li>Request correction of your information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our <a href="/book" className="text-primary hover:underline">contact form</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
