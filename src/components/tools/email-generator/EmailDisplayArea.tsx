
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailDisplayAreaProps {
  email: string;
  emails: string[];
}

const EmailDisplayArea = ({ email, emails }: EmailDisplayAreaProps) => {
  const { toast } = useToast();

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

  if (!email && emails.length === 0) {
    return null;
  }

  return (
    <>
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
    </>
  );
};

export default EmailDisplayArea;
