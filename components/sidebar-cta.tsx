import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function SidebarCTA() {
  return (
    <div className="sticky top-20">
      <Card className="border-2 border-primary/20 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl">Get a shortlist plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            Tell us your workflows, integrations, and timeline. We'll respond with your next-best step.
          </p>
          <div className="space-y-2">
            <Link href="/wizard" className="block">
              <Button className="w-full">
                Start Fit Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources/crm-erp-selection-checklist" className="block">
              <Button variant="outline" className="w-full">
                Download Checklist
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
