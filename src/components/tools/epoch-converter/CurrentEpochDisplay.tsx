
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CurrentEpochDisplay = () => {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg md:text-xl">Current Unix Epoch Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-mono font-bold text-blue-600 mb-2 break-all">
            {currentEpoch}
          </div>
          <div className="text-xs md:text-sm text-gray-600 break-all">
            {new Date().toUTCString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentEpochDisplay;
