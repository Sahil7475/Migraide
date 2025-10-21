import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Upload } from "lucide-react";

interface MigrationSelectorProps {
  onAnalyze: (source: string, target: string) => void;
}

export const MigrationSelector = ({ onAnalyze }: MigrationSelectorProps) => {
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const handleAnalyze = () => {
    if (source && target) {
      onAnalyze(source, target);
    }
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Select Migration Type</h2>
          <p className="text-muted-foreground">
            Choose what you want to migrate and we'll analyze the changes
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select migration category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="framework-version">Framework Version Upgrade</SelectItem>
                <SelectItem value="framework-switch">Framework Switch</SelectItem>
                <SelectItem value="language">Language Migration</SelectItem>
                <SelectItem value="backend">Backend Framework</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">From</label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Source version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react-17">React 17.x</SelectItem>
                  <SelectItem value="vue-2">Vue 2.x</SelectItem>
                  <SelectItem value="angular-14">Angular 14</SelectItem>
                  <SelectItem value="nextjs-12">Next.js 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">To</label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger>
                  <SelectValue placeholder="Target version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react-18">React 18.x</SelectItem>
                  <SelectItem value="vue-3">Vue 3.x</SelectItem>
                  <SelectItem value="angular-15">Angular 15</SelectItem>
                  <SelectItem value="nextjs-13">Next.js 13</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Upload package.json (Optional)</p>
            <p className="text-xs text-muted-foreground">
              We'll analyze your dependencies for compatibility
            </p>
          </div>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={!source || !target}
          className="w-full"
          size="lg"
        >
          Analyze Migration
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
