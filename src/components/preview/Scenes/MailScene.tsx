'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function MailScene() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 @xl:grid-cols-3">
        {/* Mail List */}
        <Card className="@xl:col-span-1">
          <CardHeader>
            <CardTitle 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Inbox
            </CardTitle>
            <CardDescription 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Your email messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
              <Avatar>
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span 
                    className="font-medium"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    John Doe
                  </span>
                  <Badge className="bg-secondary text-secondary-foreground">New</Badge>
                </div>
                <div 
                  className="text-sm text-muted-foreground truncate"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Project update meeting
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
              <Avatar>
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span 
                    className="font-medium"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Sarah Wilson
                  </span>
                </div>
                <div 
                  className="text-sm text-muted-foreground truncate"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Design review feedback
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mail Content */}
        <Card className="@xl:col-span-2">
          <CardHeader>
            <CardTitle 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Project Update Meeting
            </CardTitle>
            <CardDescription 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              From: john@example.com
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p>Hi team,</p>
              <p>I wanted to schedule a meeting to discuss the latest project updates and get your feedback on the new features we&apos;ve been working on.</p>
              <p>Let me know what time works best for everyone.</p>
              <p>Best regards,<br />John</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Reply
              </Button>
              <Button 
                variant="outline"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Forward
              </Button>
              <Button 
                variant="outline"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
