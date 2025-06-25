
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const phoneFormats = {
  "US": { format: "+1 (XXX) XXX-XXXX", pattern: /^\+1 \(\d{3}\) \d{3}-\d{4}$/ },
  "UK": { format: "+44 XXXX XXXXXX", pattern: /^\+44 \d{4} \d{6}$/ },
  "Canada": { format: "+1 (XXX) XXX-XXXX", pattern: /^\+1 \(\d{3}\) \d{3}-\d{4}$/ },
  "Australia": { format: "+61 X XXXX XXXX", pattern: /^\+61 \d \d{4} \d{4}$/ },
  "Germany": { format: "+49 XXX XXXXXXX", pattern: /^\+49 \d{3} \d{7}$/ },
  "France": { format: "+33 X XX XX XX XX", pattern: /^\+33 \d \d{2} \d{2} \d{2} \d{2}$/ },
  "Japan": { format: "+81 XX-XXXX-XXXX", pattern: /^\+81 \d{2}-\d{4}-\d{4}$/ },
  "Brazil": { format: "+55 (XX) XXXXX-XXXX", pattern: /^\+55 \(\d{2}\) \d{5}-\d{4}$/ },
  "India": { format: "+91 XXXXX XXXXX", pattern: /^\+91 \d{5} \d{5}$/ },
  "China": { format: "+86 XXX XXXX XXXX", pattern: /^\+86 \d{3} \d{4} \d{4}$/ }
};

const RandomPhoneGenerator = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const { toast } = useToast();

  const generateRandomDigit = () => Math.floor(Math.random() * 10).toString();

  const generatePhoneNumber = (country: string) => {
    const format = phoneFormats[country as keyof typeof phoneFormats];
    if (!format) return "";

    let phone = format.format;
    phone = phone.replace(/X/g, generateRandomDigit);
    
    // Special handling for specific countries
    if (country === "US" || country === "Canada") {
      // Ensure area code doesn't start with 0 or 1
      phone = phone.replace(/\+1 \(([01])\d{2}\)/, (match, firstDigit) => {
        const newFirstDigit = Math.floor(Math.random() * 8) + 2; // 2-9
        return match.replace(firstDigit, newFirstDigit.toString());
      });
    }
    
    return phone;
  };

  const handleGenerate = () => {
    if (count === 1) {
      const phone = generatePhoneNumber(selectedCountry);
      setPhoneNumber(phone);
      setPhoneNumbers([]);
    } else {
      const phones = Array.from({ length: count }, () => generatePhoneNumber(selectedCountry));
      setPhoneNumbers(phones);
      setPhoneNumber("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    });
  };

  const copyAllToClipboard = () => {
    const allNumbers = phoneNumbers.join('\n');
    navigator.clipboard.writeText(allNumbers);
    toast({
      title: "Copied!",
      description: `${phoneNumbers.length} phone numbers copied to clipboard`,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Random Phone Number Generator</CardTitle>
          <CardDescription>
            Generate random phone numbers for different countries in their respective formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(phoneFormats).map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="count">Count</Label>
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
              <Label>&nbsp;</Label>
              <Button onClick={handleGenerate} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Format: {phoneFormats[selectedCountry as keyof typeof phoneFormats]?.format}</Label>
          </div>

          {phoneNumber && (
            <div className="space-y-2">
              <Label>Generated Phone Number</Label>
              <div className="flex gap-2">
                <Input value={phoneNumber} readOnly className="font-mono" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(phoneNumber)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {phoneNumbers.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Phone Numbers ({phoneNumbers.length})</Label>
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
                {phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded border">
                    <span className="font-mono text-sm">{phone}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(phone)}
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

export default RandomPhoneGenerator;
