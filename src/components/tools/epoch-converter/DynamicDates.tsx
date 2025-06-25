
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getDynamicDates } from './utils';

const DynamicDates = () => {
  const dynamicDates = getDynamicDates();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Date List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Unix Timestamp</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dynamicDates.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.label}</TableCell>
                <TableCell className="font-mono">{item.epoch}</TableCell>
                <TableCell>{item.date.toUTCString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DynamicDates;
