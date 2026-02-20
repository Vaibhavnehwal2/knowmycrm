'use client';

import { useState } from 'react';
import { Linkedin, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export interface LinkedInPost {
  id: string;
  type: 'iframe' | 'link';
  embedSrc?: string;
  title: string;
  date: string;
  linkedInUrl?: string;
}

interface LinkedInEmbedProps {
  post: LinkedInPost;
  compact?: boolean;
}

export function LinkedInEmbed({ post, compact = false }: LinkedInEmbedProps) {
  const [hasError, setHasError] = useState(false);
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Derive LinkedIn URL from embedSrc if not provided
  const linkedInUrl = post.linkedInUrl || deriveLinkedInUrl(post.embedSrc);

  // Show fallback if no embedSrc or error loading
  const showFallback = !post.embedSrc || hasError;

  if (showFallback) {
    return (
      <Card className="h-full bg-white border border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Linkedin className="h-4 w-4 text-[#0A66C2]" />
            <span className="font-medium">KnowMyCRM on LinkedIn</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-700 mb-4 line-clamp-3">{post.title}</p>
          {linkedInUrl ? (
            <Button asChild variant="outline" size="sm" className="w-full">
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                View on LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : (
            <div className="text-sm text-gray-500 text-center py-2">
              Embed unavailable
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-[#0A66C2]" />
            <span className="font-medium text-sm text-gray-800">KnowMyCRM on LinkedIn</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      
      {/* Embed Container */}
      <div className="flex justify-center bg-white">
        <div className={`w-full ${compact ? 'max-w-[400px]' : 'max-w-[540px]'}`}>
          <iframe
            src={post.embedSrc}
            title={post.title}
            loading="lazy"
            className="w-full border-0"
            style={{ 
              height: compact ? '450px' : '600px',
              minHeight: compact ? '350px' : '500px',
            }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onError={() => setHasError(true)}
          />
        </div>
      </div>
      
      {/* Footer with link */}
      {linkedInUrl && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          <a 
            href={linkedInUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-[#0A66C2] hover:underline flex items-center gap-1"
          >
            Open in LinkedIn <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}
    </div>
  );
}

/**
 * Try to derive a public LinkedIn URL from the embed src
 */
function deriveLinkedInUrl(embedSrc?: string): string | undefined {
  if (!embedSrc) return undefined;
  
  const match = embedSrc.match(/urn:li:(ugcPost|share):(\d+)/);
  if (match) {
    const [, type, postId] = match;
    return `https://www.linkedin.com/feed/update/urn:li:${type}:${postId}`;
  }
  return undefined;
}

export default LinkedInEmbed;
