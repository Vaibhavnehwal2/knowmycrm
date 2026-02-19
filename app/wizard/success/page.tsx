import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ArrowRight, Home, LayoutGrid, Phone } from 'lucide-react';

export default function WizardSuccessPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <div className="text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-8">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Thanks — we're on it!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          We'll reach out within <strong>24 hours</strong> with a personalized shortlist + evaluation checklist tailored to your needs.
        </p>

        {/* What to expect */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 mb-8">
          <CardContent className="py-6">
            <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
            <ul className="text-left text-sm text-gray-700 space-y-3 max-w-sm mx-auto">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
                <span>Our team reviews your requirements and top picks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">2</span>
                <span>We prepare a detailed shortlist with demo scripts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">3</span>
                <span>You receive an email with everything you need to evaluate vendors</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <Link href="/compare-crm">
            <Button variant="outline" className="w-full sm:w-auto">
              <LayoutGrid className="mr-2 h-4 w-4" /> Compare CRMs
            </Button>
          </Link>
          <Link href="/book">
            <Button className="w-full sm:w-auto">
              <Phone className="mr-2 h-4 w-4" /> Book a Call
            </Button>
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500">
          Questions? Reply to our email or book a call anytime.
        </p>
      </div>
    </div>
  );
}
