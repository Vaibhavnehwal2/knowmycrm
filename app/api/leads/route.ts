import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage for leads (Phase 1)
const leads: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const lead = {
      id: uuidv4(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    // Store in memory
    leads.push(lead);
    
    // Log to console
    console.log('\n=== NEW LEAD SUBMISSION ===');
    console.log('Source:', lead.source);
    console.log('Data:', JSON.stringify(lead, null, 2));
    console.log('Total leads:', leads.length);
    console.log('===========================\n');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lead submitted successfully',
      leadId: lead.id 
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    count: leads.length,
    leads: leads 
  });
}
