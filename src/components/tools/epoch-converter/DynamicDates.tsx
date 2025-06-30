
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getDynamicDates } from './utils';
import { useI18n } from '@/contexts/I18nContext';

const DynamicDates = () => {
  const { t } = useI18n();
  const dynamicDates = getDynamicDates(t);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{t('tools.epochConverter.dynamicDateList')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">{t('tools.epochConverter.description')}</TableHead>
                <TableHead className="min-w-[100px]">{t('tools.epochConverter.unixTimestamp')}</TableHead>
                <TableHead className="min-w-[150px]">{t('tools.epochConverter.date')}</TableHead>
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
