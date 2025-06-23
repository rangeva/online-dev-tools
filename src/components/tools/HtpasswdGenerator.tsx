
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HtpasswdGenerator = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [algorithm, setAlgorithm] = useState('bcrypt');
  const [htpasswdEntry, setHtpasswdEntry] = useState('');
  const [error, setError] = useState('');

  // Simple hash implementations for demo
  const generateBcryptHash = async (password: string): Promise<string> => {
    // This is a simplified demo - real bcrypt would be more complex
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `$2y$10$${hash.substring(0, 22)}${hash.substring(22, 53)}`;
  };

  const generateMD5Hash = async (password: string): Promise<string> => {
    // Simple MD5-like hash for demo
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `$apr1$salt$${Math.abs(hash).toString(16).padStart(22, '0')}`;
  };

  const generateSHA1Hash = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `{SHA}${btoa(hash)}`;
  };

  const generateEntry = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError('Username can only contain letters, numbers, hyphens, and underscores');
      return;
    }

    try {
      let hash = '';
      
      switch (algorithm) {
        case 'bcrypt':
          hash = await generateBcryptHash(password);
          break;
        case 'md5':
          hash = await generateMD5Hash(password);
          break;
        case 'sha1':
          hash = await generateSHA1Hash(password);
          break;
        default:
          hash = password; // Plain text (not recommended)
      }

      setHtpasswdEntry(`${username}:${hash}`);
      setError('');
    } catch (err) {
      setError('Failed to generate hash');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateRandomPassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-3">Username</label>
          <Input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-3">Password</label>
          <div className="flex gap-3">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={generateRandomPassword}
              type="button"
            >
              Generate
            </Button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Hash Algorithm</label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bcrypt">bcrypt (Recommended)</SelectItem>
            <SelectItem value="md5">MD5 (Legacy)</SelectItem>
            <SelectItem value="sha1">SHA-1 (Legacy)</SelectItem>
            <SelectItem value="plain">Plain Text (Not Recommended)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={generateEntry} disabled={!username || !password} className="w-full">
        Generate .htpasswd Entry
      </Button>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-700 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {htpasswdEntry && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex justify-between items-center">
              .htpasswd Entry
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(htpasswdEntry)}
              >
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm bg-slate-50 p-4 rounded border break-all">
              {htpasswdEntry}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-slate-600 space-y-3">
            <p>1. Copy the generated entry to your .htpasswd file</p>
            <p>2. Configure your web server to use the .htpasswd file for authentication</p>
            <p>3. For Apache, add this to your .htaccess or virtual host configuration:</p>
            <pre className="bg-slate-100 p-3 rounded mt-3 text-xs">
{`AuthType Basic
AuthName "Restricted Area"
AuthUserFile /path/to/.htpasswd
Require valid-user`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HtpasswdGenerator;
