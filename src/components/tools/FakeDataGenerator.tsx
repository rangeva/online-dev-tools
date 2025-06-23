
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FakeDataOptions {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
  company: boolean;
  jobTitle: boolean;
  date: boolean;
}

const FakeDataGenerator = () => {
  const [options, setOptions] = useState<FakeDataOptions>({
    firstName: true,
    lastName: true,
    email: true,
    phone: false,
    address: false,
    company: false,
    jobTitle: false,
    date: false
  });
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState('json');
  const [generatedData, setGeneratedData] = useState('');

  const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
  ];

  const companies = [
    'TechCorp Inc.', 'Global Solutions LLC', 'Innovation Labs', 'Digital Dynamics',
    'Future Systems', 'Smart Technologies', 'Data Insights Co.', 'Cloud Nine Ltd.',
    'NextGen Solutions', 'Quantum Analytics', 'Cyber Security Pro', 'AI Innovations',
    'Web Solutions Inc.', 'Mobile First LLC', 'Enterprise Systems', 'StartUp Hub'
  ];

  const jobTitles = [
    'Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
    'Marketing Manager', 'Sales Director', 'DevOps Engineer', 'Business Analyst',
    'Project Manager', 'Full Stack Developer', 'Quality Assurance', 'System Administrator',
    'Content Writer', 'Digital Marketer', 'Customer Success Manager', 'Technical Lead'
  ];

  const streets = [
    'Main St', 'Oak Ave', 'Park Rd', 'First St', 'Second St', 'Maple Ave',
    'Cedar St', 'Pine St', 'Washington Ave', 'Lincoln St', 'Jefferson Rd', 'Adams St'
  ];

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'
  ];

  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'GA'];

  const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];

  const generateFakeData = () => {
    const data = [];

    for (let i = 0; i < Math.min(count, 100); i++) {
      const record: any = {};

      if (options.firstName) record.firstName = getRandomItem(firstNames);
      if (options.lastName) record.lastName = getRandomItem(lastNames);
      if (options.email) {
        const firstName = record.firstName || getRandomItem(firstNames);
        const lastName = record.lastName || getRandomItem(lastNames);
        record.email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      }
      if (options.phone) {
        record.phone = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
      }
      if (options.address) {
        const number = Math.floor(Math.random() * 9999) + 1;
        const street = getRandomItem(streets);
        const city = getRandomItem(cities);
        const state = getRandomItem(states);
        const zip = Math.floor(Math.random() * 90000) + 10000;
        record.address = `${number} ${street}, ${city}, ${state} ${zip}`;
      }
      if (options.company) record.company = getRandomItem(companies);
      if (options.jobTitle) record.jobTitle = getRandomItem(jobTitles);
      if (options.date) {
        const start = new Date(1990, 0, 1);
        const end = new Date();
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        record.birthDate = randomDate.toISOString().split('T')[0];
      }

      data.push(record);
    }

    let output = '';
    switch (format) {
      case 'json':
        output = JSON.stringify(data, null, 2);
        break;
      case 'csv':
        if (data.length > 0) {
          const headers = Object.keys(data[0]);
          const csvRows = [headers.join(',')];
          data.forEach(record => {
            const values = headers.map(header => `"${record[header] || ''}"`);
            csvRows.push(values.join(','));
          });
          output = csvRows.join('\n');
        }
        break;
      case 'sql':
        if (data.length > 0) {
          const headers = Object.keys(data[0]);
          const tableName = 'fake_data';
          const createTable = `CREATE TABLE ${tableName} (\n  ${headers.map(h => `${h} VARCHAR(255)`).join(',\n  ')}\n);\n\n`;
          const inserts = data.map(record => {
            const values = headers.map(header => `'${(record[header] || '').toString().replace(/'/g, "''")}'`);
            return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values.join(', ')});`;
          });
          output = createTable + inserts.join('\n');
        }
        break;
    }

    setGeneratedData(output);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedData);
  };

  const handleOptionChange = (option: keyof FakeDataOptions, checked: boolean) => {
    setOptions(prev => ({ ...prev, [option]: checked }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Data Fields</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => handleOptionChange(key as keyof FakeDataOptions, !!checked)}
                />
                <label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Records Count</label>
          <Input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Output Format</label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={generateFakeData} 
        className="w-full"
        disabled={!Object.values(options).some(Boolean)}
      >
        Generate Fake Data
      </Button>

      {generatedData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              Generated Data ({format.toUpperCase()})
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-50 p-4 rounded border text-xs overflow-x-auto max-h-80 overflow-y-auto">
              {generatedData}
            </pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-slate-600">
            <p><strong>Use Cases:</strong> Testing applications, populating databases, creating mockups, and API testing.</p>
            <p className="mt-2"><strong>Note:</strong> This data is completely fake and randomly generated. Do not use for any real purposes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FakeDataGenerator;
