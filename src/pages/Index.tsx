
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code, Hash, FileText, Calendar, Shield, Settings } from 'lucide-react';

// Import tool components
import WordCounter from '@/components/tools/WordCounter';
import TextDiff from '@/components/tools/TextDiff';
import CaseConverter from '@/components/tools/CaseConverter';
import RegexTester from '@/components/tools/RegexTester';
import UrlEncoder from '@/components/tools/UrlEncoder';
import Base64Encoder from '@/components/tools/Base64Encoder';
import JwtDecoder from '@/components/tools/JwtDecoder';
import EpochConverter from '@/components/tools/EpochConverter';
import IsoGenerator from '@/components/tools/IsoGenerator';
import CronEditor from '@/components/tools/CronEditor';
import JsonFormatter from '@/components/tools/JsonFormatter';
import XmlFormatter from '@/components/tools/XmlFormatter';
import HashGenerator from '@/components/tools/HashGenerator';
import HtpasswdGenerator from '@/components/tools/HtpasswdGenerator';
import SslChecker from '@/components/tools/SslChecker';
import UuidGenerator from '@/components/tools/UuidGenerator';
import LoremGenerator from '@/components/tools/LoremGenerator';
import FakeDataGenerator from '@/components/tools/FakeDataGenerator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('text');

  const toolCategories = [
    {
      id: 'text',
      name: 'Text & String',
      icon: FileText,
      description: 'Text manipulation and analysis tools',
      tools: [
        { id: 'word-counter', name: 'Word/Character Count', component: WordCounter },
        { id: 'text-diff', name: 'Text Diff Checker', component: TextDiff },
        { id: 'case-converter', name: 'Case Converter', component: CaseConverter },
        { id: 'regex-tester', name: 'Regex Tester', component: RegexTester },
      ]
    },
    {
      id: 'encoding',
      name: 'Encoding/Decoding',
      icon: Code,
      description: 'Encode and decode various formats',
      tools: [
        { id: 'url-encoder', name: 'URL Encoder/Decoder', component: UrlEncoder },
        { id: 'base64-encoder', name: 'Base64 Encoder/Decoder', component: Base64Encoder },
        { id: 'jwt-decoder', name: 'JWT Decoder', component: JwtDecoder },
      ]
    },
    {
      id: 'datetime',
      name: 'Date & Time',
      icon: Calendar,
      description: 'Date and time utilities',
      tools: [
        { id: 'epoch-converter', name: 'Epoch Converter', component: EpochConverter },
        { id: 'iso-generator', name: 'ISO 8601 Generator', component: IsoGenerator },
        { id: 'cron-editor', name: 'Cron Expression Editor', component: CronEditor },
      ]
    },
    {
      id: 'data',
      name: 'JSON & XML',
      icon: Hash,
      description: 'Data format tools',
      tools: [
        { id: 'json-formatter', name: 'JSON Formatter & Validator', component: JsonFormatter },
        { id: 'xml-formatter', name: 'XML Formatter', component: XmlFormatter },
      ]
    },
    {
      id: 'security',
      name: 'Security & Hashing',
      icon: Shield,
      description: 'Security and encryption tools',
      tools: [
        { id: 'hash-generator', name: 'Hash Generator', component: HashGenerator },
        { id: 'htpasswd-generator', name: 'Htpasswd Generator', component: HtpasswdGenerator },
        { id: 'ssl-checker', name: 'SSL Checker', component: SslChecker },
      ]
    },
    {
      id: 'utilities',
      name: 'Developer Utilities',
      icon: Settings,
      description: 'General developer tools',
      tools: [
        { id: 'uuid-generator', name: 'UUID Generator', component: UuidGenerator },
        { id: 'lorem-generator', name: 'Lorem Ipsum Generator', component: LoremGenerator },
        { id: 'fake-data-generator', name: 'Fake Data Generator', component: FakeDataGenerator },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Developer Toolbox
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Essential utilities for developers. Simple, fast, and always available when you need them.
          </p>
          <Badge variant="secondary" className="mt-4">
            {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)} Tools Available
          </Badge>
        </div>

        {/* Tool Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {toolCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {toolCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-slate-600">{category.description}</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => {
                  const ToolComponent = tool.component;
                  return (
                    <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ToolComponent />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
