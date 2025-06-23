
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

export const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !feedback) {
      toast({
        title: "Error",
        description: "Please fill in both your email and feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with the feedback
      const subject = encodeURIComponent('Developer Toolbox Feedback');
      const body = encodeURIComponent(`
Feedback from: ${email}

Feedback:
${feedback}

---
Sent from Developer Toolbox
      `);
      
      const mailtoLink = `mailto:rangeva@gmail.com?subject=${subject}&body=${body}`;
      
      // Open the user's email client
      window.location.href = mailtoLink;
      
      toast({
        title: "Thank you!",
        description: "Your email client should open with the feedback ready to send.",
      });
      
      // Reset form
      setEmail('');
      setFeedback('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error preparing feedback:', error);
      toast({
        title: "Error",
        description: "There was an issue preparing your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
            aria-label="Send Feedback"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              We'd love to hear your suggestions and feedback about our developer tools.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Your feedback and suggestions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Preparing..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Feedback
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
