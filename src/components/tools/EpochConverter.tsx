
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CurrentEpochDisplay from './epoch-converter/CurrentEpochDisplay';
import TimestampToHuman from './epoch-converter/TimestampToHuman';
import HumanToTimestamp from './epoch-converter/HumanToTimestamp';
import StartEndDates from './epoch-converter/StartEndDates';
import SecondsConverter from './epoch-converter/SecondsConverter';
import DynamicDates from './epoch-converter/DynamicDates';

const EpochConverter = () => {
  const clearAllForms = () => {
    // This will trigger a re-render of all child components
    window.location.reload();
  };

  // Keyboard shortcut for clearing
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          clearAllForms();
        }
      }
    };
    
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <CurrentEpochDisplay />

      <Tabs defaultValue="timestamp-to-human" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="timestamp-to-human">Timestamp to Human</TabsTrigger>
          <TabsTrigger value="human-to-timestamp">Human to Timestamp</TabsTrigger>
          <TabsTrigger value="start-end-dates">Start/End Dates</TabsTrigger>
          <TabsTrigger value="seconds-converter">Seconds Converter</TabsTrigger>
          <TabsTrigger value="dynamic-dates">Dynamic Dates</TabsTrigger>
        </TabsList>

        <TabsContent value="timestamp-to-human" className="space-y-4">
          <TimestampToHuman />
        </TabsContent>

        <TabsContent value="human-to-timestamp" className="space-y-4">
          <HumanToTimestamp />
        </TabsContent>

        <TabsContent value="start-end-dates" className="space-y-4">
          <StartEndDates />
        </TabsContent>

        <TabsContent value="seconds-converter" className="space-y-4">
          <SecondsConverter />
        </TabsContent>

        <TabsContent value="dynamic-dates" className="space-y-4">
          <DynamicDates />
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button variant="outline" onClick={clearAllForms}>
          Clear All Forms
        </Button>
        <p className="text-sm text-gray-600 mt-2">
          Press 'c' to clear all forms
        </p>
      </div>
    </div>
  );
};

export default EpochConverter;
