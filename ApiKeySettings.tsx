import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

interface ApiKeySettingsProps {
  onSaveApiKey: (apiKey: string) => void;
  useApiKey: boolean;
  onToggleUseApiKey: (use: boolean) => void;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ 
  onSaveApiKey, 
  useApiKey, 
  onToggleUseApiKey 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSaveApiKey(apiKey);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <Card className="bg-secondary/30 border-secondary/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium">API Key Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="use-api-key" 
            checked={useApiKey} 
            onCheckedChange={onToggleUseApiKey}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="use-api-key">Use Jina API Key</Label>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-start space-x-2">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>Use your Jina API key to access a higher rate limit. Without an API key, you can send 3 requests per minute.</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">Jina API Key</Label>
          <div className="flex space-x-2">
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Jina API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={!useApiKey}
              className="bg-secondary/50 border-secondary focus-visible:ring-primary transition-all duration-300"
            />
            <Button 
              onClick={handleSave} 
              disabled={!useApiKey || !apiKey.trim()}
              className="bg-primary hover:bg-primary/80 transition-all duration-300"
            >
              {isSaved ? 'Saved!' : 'Save'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
