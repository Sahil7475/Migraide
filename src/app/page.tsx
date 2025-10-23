'use client'

import { useRouter } from "next/navigation";
import { MigrationSelector } from "@/components/MigrationSelector";
import { Code2, Sparkles } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleAnalyze = (source: string, target: string) => {
    router.push(`/analysis?source=${encodeURIComponent(source)}&target=${encodeURIComponent(target)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code2 className="w-10 h-10 text-primary" />
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Migration Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              Plan and execute seamless migrations between frameworks, versions, and languages.
              Get comprehensive analysis, breaking changes, and step-by-step guidance.
            </p>
          </div>

          <MigrationSelector onAnalyze={handleAnalyze} />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Breaking Changes Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Detailed breakdown of all breaking changes with severity ratings and code examples
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              Pros & cons analysis, dependency updates, and migration roadmap tailored to your project
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Official Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Aggregated links to official guides, changelogs, and community resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}