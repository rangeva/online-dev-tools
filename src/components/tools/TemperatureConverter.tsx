
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [fromScale, setFromScale] = useState("celsius");
  const [results, setResults] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const temperatureScales = [
    { id: "celsius", name: "Celsius (°C)", symbol: "°C" },
    { id: "fahrenheit", name: "Fahrenheit (°F)", symbol: "°F" },
    { id: "kelvin", name: "Kelvin (K)", symbol: "K" },
    { id: "rankine", name: "Rankine (°R)", symbol: "°R" },
    { id: "delisle", name: "Delisle (°De)", symbol: "°De" },
    { id: "newton", name: "Newton (°N)", symbol: "°N" },
    { id: "reaumur", name: "Réaumur (°Ré)", symbol: "°Ré" },
    { id: "romer", name: "Rømer (°Rø)", symbol: "°Rø" }
  ];

  // Convert from any scale to Celsius first, then to target scale
  const toCelsius = (value: number, scale: string): number => {
    switch (scale) {
      case "celsius": return value;
      case "fahrenheit": return (value - 32) * 5/9;
      case "kelvin": return value - 273.15;
      case "rankine": return (value - 491.67) * 5/9;
      case "delisle": return 100 - value * 2/3;
      case "newton": return value * 100/33;
      case "reaumur": return value * 5/4;
      case "romer": return (value - 7.5) * 40/21;
      default: return value;
    }
  };

  const fromCelsius = (celsius: number, scale: string): number => {
    switch (scale) {
      case "celsius": return celsius;
      case "fahrenheit": return celsius * 9/5 + 32;
      case "kelvin": return celsius + 273.15;
      case "rankine": return celsius * 9/5 + 491.67;
      case "delisle": return (100 - celsius) * 3/2;
      case "newton": return celsius * 33/100;
      case "reaumur": return celsius * 4/5;
      case "romer": return celsius * 21/40 + 7.5;
      default: return celsius;
    }
  };

  const convertTemperature = () => {
    const inputTemp = parseFloat(inputValue);
    if (isNaN(inputTemp)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid number",
        variant: "destructive"
      });
      return;
    }

    // Convert input to Celsius first
    const celsiusValue = toCelsius(inputTemp, fromScale);
    
    // Convert from Celsius to all other scales
    const conversions: Record<string, number> = {};
    temperatureScales.forEach(scale => {
      if (scale.id !== fromScale) {
        conversions[scale.id] = fromCelsius(celsiusValue, scale.id);
      }
    });

    setResults(conversions);
  };

  const copyResult = (value: number, scale: string) => {
    const scaleInfo = temperatureScales.find(s => s.id === scale);
    navigator.clipboard.writeText(`${value.toFixed(6)} ${scaleInfo?.symbol}`);
    toast({
      title: "Copied!",
      description: `Temperature copied to clipboard`
    });
  };

  const formatResult = (value: number): string => {
    return value.toFixed(6).replace(/\.?0+$/, "");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Temperature Converter</CardTitle>
          <CardDescription>
            Convert temperatures between Kelvin, Celsius, Fahrenheit, Rankine, Delisle, Newton, Réaumur, and Rømer scales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature Value</Label>
              <Input
                id="temperature"
                type="number"
                placeholder="Enter temperature"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                step="any"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-scale">From Scale</Label>
              <select
                id="from-scale"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={fromScale}
                onChange={(e) => setFromScale(e.target.value)}
              >
                {temperatureScales.map(scale => (
                  <option key={scale.id} value={scale.id}>
                    {scale.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button onClick={convertTemperature} className="w-full">
            Convert Temperature
          </Button>

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Conversion Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {temperatureScales
                  .filter(scale => scale.id !== fromScale)
                  .map(scale => (
                    <div
                      key={scale.id}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{scale.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatResult(results[scale.id])} {scale.symbol}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyResult(results[scale.id], scale.id)}
                        className="ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h4 className="font-semibold mb-2">Temperature Scale Information</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Celsius:</strong> Water freezes at 0°C, boils at 100°C</p>
              <p><strong>Fahrenheit:</strong> Water freezes at 32°F, boils at 212°F</p>
              <p><strong>Kelvin:</strong> Absolute zero at 0K, water freezes at 273.15K</p>
              <p><strong>Rankine:</strong> Absolute zero at 0°R, water freezes at 491.67°R</p>
              <p><strong>Delisle:</strong> Water boils at 0°De, freezes at 150°De</p>
              <p><strong>Newton:</strong> Water freezes at 0°N, boils at 33°N</p>
              <p><strong>Réaumur:</strong> Water freezes at 0°Ré, boils at 80°Ré</p>
              <p><strong>Rømer:</strong> Water freezes at 7.5°Rø, boils at 60°Rø</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemperatureConverter;
