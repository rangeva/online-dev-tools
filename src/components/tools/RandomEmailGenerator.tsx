import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const domains = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "protonmail.com", "mail.com", "yandex.com", "zoho.com"
];

const firstNames = [
  "john", "jane", "mike", "sarah", "david", "lisa", "chris", "anna", "james", "mary",
  "robert", "patricia", "michael", "jennifer", "william", "linda", "richard", "elizabeth",
  "joseph", "barbara", "thomas", "susan", "charles", "jessica", "daniel", "karen"
];

const lastNames = [
  "smith", "johnson", "williams", "brown", "jones", "garcia", "miller", "davis",
  "rodriguez", "martinez", "hernandez", "lopez", "gonzalez", "wilson", "anderson",
  "thomas", "taylor", "moore", "jackson", "martin", "lee", "perez", "thompson"
];

const RandomEmailGenerator = () => {
  const [email, setEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [selectedDomain, setSelectedDomain] = useState<string>("random");
  const [customDomain, setCustomDomain] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeDots, setIncludeDots] = useState<boolean>(true);
  const [includeUnderscores, setIncludeUnderscores] = useState<boolean>(false);
  const { toast } = useToast();

  const generateRandomEmail = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    let username = firstName;
    
    // Add separator and last name
    if (Math.random() > 0.3) {
      const separators = [];
      if (includeDots) separators.push(".");
      if (includeUnderscores) separators.push("_");
      if (separators.length === 0) separators.push(""); // No separator
      
      const separator = separators[Math.floor(Math.random() * separators.length)];
      username += separator + lastName;
    }
    
    // Add random numbers
    if (includeNumbers && Math.random() > 0.4) {
      const randomNum = Math.floor(Math.random() * 9999);
      username += randomNum;
    }
    
    // Select domain
    let domain;
    if (selectedDomain === "custom" && customDomain) {
      domain = customDomain;
    } else if (selectedDomain === "random") {
      domain = domains[Math.floor(Math.random() * domains.length)];
    } else {
      domain = selectedDomain;
    }
    
    return `${username}@${domain}`;
  };

  const handleGenerate = () => {
    if (count === 1) {
      const generatedEmail = generateRandomEmail();
      setEmail(generatedEmail);
      setEmails([]);
    } else {
      const generatedEmails = Array.from({ length: count }, () => generateRandomEmail());
      setEmails(generatedEmails);
      setEmail("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Email copied to clipboard",
    });
  };

  const copyAllToClipboard = () => {
    const allEmails = emails.join('\n');
    navigator.clipboard.writeText(allEmails);
    toast({
      title: "Copied!",
      description: `${emails.length} emails copied to clipboard`,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Random Email Generator</CardTitle>
          <CardDescription>
            Generate random email addresses with customizable options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="count">Number of Emails</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Random Domain</SelectItem>
                    {domains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Domain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedDomain === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input
                    id="customDomain"
                    placeholder="example.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <Label>Options</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeNumbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                  />
                  <Label htmlFor="includeNumbers">Include Numbers</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeDots"
                    checked={includeDots}
                    onCheckedChange={(checked) => setIncludeDots(checked === true)}
                  />
                  <Label htmlFor="includeDots">Include Dots (.)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeUnderscores"
                    checked={includeUnderscores}
                    onCheckedChange={(checked) => setIncludeUnderscores(checked === true)}
                  />
                  <Label htmlFor="includeUnderscores">Include Underscores (_)</Label>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleGenerate} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Email{count > 1 ? 's' : ''}
          </Button>

          {email && (
            <div className="space-y-2">
              <Label>Generated Email</Label>
              <div className="flex gap-2">
                <Input value={email} readOnly className="font-mono" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(email)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {emails.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Emails ({emails.length})</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAllToClipboard}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <div className="max-h-60 overflow-y-auto border rounded-md p-3 space-y-1 bg-slate-50 dark:bg-slate-900">
                {emails.map((emailAddr, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded border">
                    <span className="font-mono text-sm">{emailAddr}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(emailAddr)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RandomEmailGenerator;
