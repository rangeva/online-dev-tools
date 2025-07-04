
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getDynamicDates } from './utils';

const DynamicDates = () => {
  const dynamicDates = getDynamicDates();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Dynamic Date List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Description</TableHead>
                <TableHead className="min-w-[100px]">Unix Timestamp</TableHead>
                <TableHead className="min-w-[150px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dynamicDates.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-xs md:text-sm">{item.label}</TableCell>
                  <TableCell className="font-mono text-xs md:text-sm">{item.epoch}</TableCell>
                  <TableCell className="text-xs md:text-sm break-all">{item.date.toUTCString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicDates;
