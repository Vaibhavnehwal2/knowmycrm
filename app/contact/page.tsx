import Link from 'next/link';
import { Metadata } from 'next';
import { Phone, Mail, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactCard } from '@/components/contact-card';
import { getCompanyContact } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Contact Us | KnowMyCRM',
  description: 'Get in touch with KnowMyCRM. Offices in India and Romania. Call us or book a consultation.',
};

export default function ContactPage() {
  const contact = getCompanyContact();
  const { india, romania } = contact.locations;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-blue-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Have questions about CRM or ERP selection? We're here to help. 
              Reach out to our team in India or Romania.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <ContactCard location={india} />
          <ContactCard location={romania} />
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Other Ways to Connect
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Book a Call */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Book a Consultation</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Schedule a 30-minute call with our CRM/ERP selection experts.
                    </p>
                    <Button asChild size="sm">
                      <Link href="/book">
                        Schedule Call <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Fit Wizard */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <ArrowRight className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Try the Fit Wizard</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get instant CRM recommendations based on your requirements.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/wizard">
                        Start Wizard <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info */}
      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">
            KnowMyCRM provides vendor-neutral selection support and partner introductions 
            for CRM and ERP decisions. No sponsorship bias—we help you find the right fit.
          </p>
        </div>
      </section>
    </div>
  );
}
