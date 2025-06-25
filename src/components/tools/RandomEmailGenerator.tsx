
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import EmailGeneratorForm from "./email-generator/EmailGeneratorForm";
import EmailGeneratorOptionsComponent from "./email-generator/EmailGeneratorOptions";
import EmailDisplayArea from "./email-generator/EmailDisplayArea";
import { generateRandomEmail, EmailGeneratorOptions } from "./email-generator/emailGeneratorUtils";

const RandomEmailGenerator = () => {
  const [email, setEmail] = useState<string>("");
  const [emails, setEmails] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [selectedDomain, setSelectedDomain] = useState<string>("random");
  const [customDomain, setCustomDomain] = useState<string>("");
  const [options, setOptions] = useState<EmailGeneratorOptions>({
    includeNumbers: true,
    includeDots: true,
    includeUnderscores: false,
  });

  const handleGenerate = () => {
    if (count === 1) {
      const generatedEmail = generateRandomEmail(selectedDomain, customDomain, options);
      setEmail(generatedEmail);
      setEmails([]);
    } else {
      const generatedEmails = Array.from({ length: count }, () => 
        generateRandomEmail(selectedDomain, customDomain, options)
      );
      setEmails(generatedEmails);
      setEmail("");
    }
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
            <EmailGeneratorForm
              count={count}
              selectedDomain={selectedDomain}
              customDomain={customDomain}
              onCountChange={setCount}
              onDomainChange={setSelectedDomain}
              onCustomDomainChange={setCustomDomain}
            />
            
            <EmailGeneratorOptionsComponent
              options={options}
              onOptionsChange={setOptions}
            />
          </div>

          <Button onClick={handleGenerate} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Email{count > 1 ? 's' : ''}
          </Button>

          <EmailDisplayArea email={email} emails={emails} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RandomEmailGenerator;
