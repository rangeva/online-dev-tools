
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Code, 
  Hash, 
  FileText, 
  Calendar, 
  Shield, 
  Database,
  Shuffle,
  Type,
  Clock,
  Key,
  Globe,
  Settings,
  Zap,
  CheckCircle,
  AlertCircle,
  Copy,
  Download
} from "lucide-react";

// Tool components
import { WordCounter } from "@/components/tools/WordCounter";
import { TextDiff } from "@/components/tools/TextDiff";
import { CaseConverter } from "@/components/tools/CaseConverter";
import { RegexTester } from "@/components/tools/RegexTester";
import { UrlEncoder } from "@/components/tools/UrlEncoder";
import { Base64Encoder } from "@/components/tools/Base64Encoder";
import { JwtDecoder } from "@/components/tools/JwtDecoder";
import { EpochConverter } from "@/components/tools/EpochConverter";
import { IsoGenerator } from "@/components/tools/IsoGenerator";
import { CronEditor } from "@/components/tools/CronEditor";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { XmlFormatter } from "@/components/tools/XmlFormatter";
import { HashGenerator } from "@/components/tools/HashGenerator";
import { HtpasswdGenerator } from "@/components/tools/HtpasswdGenerator";
import { SslChecker } from "@/components/tools/SslChecker";
import { UuidGenerator } from "@/components/tools/UuidGenerator";
import { LoremGenerator } from "@/components/tools/LoremGenerator";
import { FakeDataGenerator } from "@/components/tools/FakeDataGenerator";
import { YamlConverter } from "@/components/tools/YamlConverter";
import { FeedbackForm } from "@/components/FeedbackForm";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const toolCategories = [
    { id: "all", name: "All Tools", icon: Settings },
    { id: "text", name: "Text Tools", icon: Type },
    { id: "encoding", name: "Encoding/Decoding", icon: Code },
    { id: "date", name: "Date & Time", icon: Clock },
    { id: "data", name: "Data & Format", icon: Database },
    { id: "security", name: "Security", icon: Shield },
    { id: "generators", name: "Generators", icon: Zap },
    { id: "network", name: "Network", icon: Globe }
  ];

  const tools = [
    {
      id: "word-counter",
      name: "Word/Character Counter",
      description: "Count words, characters, and lines in your text",
      category: "text",
      icon: FileText,
      component: WordCounter,
      tags: ["text", "count", "words", "characters"]
    },
    {
      id: "text-diff",
      name: "Text Diff Checker",
      description: "Compare two texts and highlight differences",
      category: "text",
      icon: CheckCircle,
      component: TextDiff,
      tags: ["text", "diff", "compare", "differences"]
    },
    {
      id: "case-converter",
      name: "Case Converter",
      description: "Convert text between different cases (uppercase, lowercase, camelCase, etc.)",
      category: "text",
      icon: Type,
      component: CaseConverter,
      tags: ["text", "case", "convert", "uppercase", "lowercase"]
    },
    {
      id: "regex-tester",
      name: "Regex Tester",
      description: "Test and debug regular expressions with real-time matching",
      category: "text",
      icon: Search,
      component: RegexTester,
      tags: ["regex", "pattern", "test", "match"]
    },
    {
      id: "url-encoder",
      name: "URL Encoder/Decoder",
      description: "Encode and decode URLs and query parameters",
      category: "encoding",
      icon: Globe,
      component: UrlEncoder,
      tags: ["url", "encode", "decode", "query"]
    },
    {
      id: "base64-encoder",
      name: "Base64 Encoder/Decoder",
      description: "Encode and decode Base64 strings",
      category: "encoding",
      icon: Code,
      component: Base64Encoder,
      tags: ["base64", "encode", "decode"]
    },
    {
      id: "jwt-decoder",
      name: "JWT Decoder",
      description: "Decode and inspect JSON Web Tokens",
      category: "encoding",
      icon: Key,
      component: JwtDecoder,
      tags: ["jwt", "token", "decode", "json"]
    },
    {
      id: "epoch-converter",
      name: "Epoch Converter",
      description: "Convert between Unix timestamps and human-readable dates",
      category: "date",
      icon: Clock,
      component: EpochConverter,
      tags: ["epoch", "timestamp", "date", "unix"]
    },
    {
      id: "iso-generator",
      name: "ISO 8601 Generator",
      description: "Generate and validate ISO 8601 date strings",
      category: "date",
      icon: Calendar,
      component: IsoGenerator,
      tags: ["iso", "date", "format", "8601"]
    },
    {
      id: "cron-editor",
      name: "Cron Expression Editor",
      description: "Create and validate cron expressions with visual editor",
      category: "date",
      icon: Settings,
      component: CronEditor,
      tags: ["cron", "schedule", "expression", "job"]
    },
    {
      id: "json-formatter",
      name: "JSON Formatter & Validator",
      description: "Format, validate, and minify JSON data",
      category: "data",
      icon: Database,
      component: JsonFormatter,
      tags: ["json", "format", "validate", "minify"]
    },
    {
      id: "xml-formatter",
      name: "XML Formatter",
      description: "Format and prettify XML documents",
      category: "data",
      icon: FileText,
      component: XmlFormatter,
      tags: ["xml", "format", "prettify"]
    },
    {
      id: "yaml-converter",
      name: "YAML Converter",
      description: "Convert between YAML and JSON formats",
      category: "data",
      icon: Shuffle,
      component: YamlConverter,
      tags: ["yaml", "json", "convert", "format"]
    },
    {
      id: "hash-generator",
      name: "Hash Generator",
      description: "Generate MD5, SHA1, SHA256 and other hashes",
      category: "security",
      icon: Hash,
      component: HashGenerator,
      tags: ["hash", "md5", "sha", "security"]
    },
    {
      id: "htpasswd-generator",
      name: "Htpasswd Generator",
      description: "Generate htpasswd entries for HTTP authentication",
      category: "security",
      icon: Shield,
      component: HtpasswdGenerator,
      tags: ["htpasswd", "auth", "password", "apache"]
    },
    {
      id: "ssl-checker",
      name: "SSL Checker",
      description: "Check SSL certificate details and validity",
      category: "security",
      icon: Shield,
      component: SslChecker,
      tags: ["ssl", "certificate", "security", "https"]
    },
    {
      id: "uuid-generator",
      name: "UUID Generator",
      description: "Generate UUIDs (v1, v4) and validate existing ones",
      category: "generators",
      icon: Zap,
      component: UuidGenerator,
      tags: ["uuid", "generate", "unique", "identifier"]
    },
    {
      id: "lorem-generator",
      name: "Lorem Ipsum Generator",
      description: "Generate placeholder text for your designs",
      category: "generators",
      icon: FileText,
      component: LoremGenerator,
      tags: ["lorem", "ipsum", "placeholder", "text"]
    },
    {
      id: "fake-data-generator",
      name: "Fake Data Generator",
      description: "Generate realistic fake data for testing",
      category: "generators",
      icon: Database,
      component: FakeDataGenerator,
      tags: ["fake", "data", "generate", "test"]
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const selectedToolData = tools.find(tool => tool.id === selectedTool);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Developer Toolbox
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Essential online tools for developers
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Free
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                No Sign-up
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!selectedTool ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                All-in-One Developer Tools
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
                A comprehensive collection of essential online tools for developers. 
                No sign-up required, completely free, and works entirely in your browser.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1 h-auto p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {toolCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-medium">{category.name}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card 
                    key={tool.id} 
                    className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:scale-105"
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {toolCategories.find(cat => cat.id === tool.category)?.name}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        {tool.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {tool.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  No tools found
                </h3>
                <p className="text-slate-500 dark:text-slate-500">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </>
        ) : (
          <div>
            {/* Tool Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedTool(null)}
                  className="border-slate-200 dark:border-slate-700"
                >
                  ← Back to Tools
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center space-x-2">
                  {selectedToolData && (
                    <>
                      <selectedToolData.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {selectedToolData.name}
                      </h2>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tool Component */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              {selectedToolData?.component && <selectedToolData.component />}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Form */}
      <FeedbackForm />
    </div>
  );
};

export default Index;
