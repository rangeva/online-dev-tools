
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Extend the global Window interface to include Tally
declare global {
  interface Window {
    Tally: {
      openPopup: (formId: string, options?: any) => void;
      closePopup: (formId: string) => void;
    };
  }
}

export const FeedbackForm = () => {
  const { toast } = useToast();
  const formId = '3jX45R';

  const handleFeedbackClick = () => {
    console.log('Opening Tally feedback form...');
    
    if (typeof window !== 'undefined' && window.Tally) {
      window.Tally.openPopup(formId, {
        layout: 'modal',
        width: 600,
        autoClose: 3000,
        onOpen: () => {
          console.log('Tally form opened');
        },
        onClose: () => {
          console.log('Tally form closed');
        },
        onSubmit: (payload: any) => {
          console.log('Feedback submitted:', payload);
          toast({
            title: "Thank you!",
            description: "Your feedback has been sent successfully. We appreciate your input!",
          });
        },
        hiddenFields: {
          source: 'Developer Toolbox',
          url: window.location.href
        }
      });
    } else {
      console.error('Tally widget not loaded');
      toast({
        title: "Error",
        description: "Feedback form could not be loaded. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleFeedbackClick}
      size="icon"
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
      aria-label="Send Feedback"
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
};
