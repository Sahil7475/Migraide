'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreakingChanges } from "@/components/analysis/BreakingChanges";
import { ProsAndCons } from "@/components/analysis/ProsAndCons";
import { Dependencies } from "@/components/analysis/Dependencies";
import { MigrationRoadmap } from "@/components/analysis/MigrationRoadmap";
import { Documentation } from "@/components/analysis/Documentation";
import { react17to18Migration } from "@/data/react17to18";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [migrationData, setMigrationData] = useState<any>(null);

  useEffect(() => {
    const category = searchParams.get('category');
    
    if (!category) {
      router.push("/");
      return;
    }

    switch (category) {
      case "framework-version":
        const language = searchParams.get('language');
        const framework = searchParams.get('framework');
        const sourceVersion = searchParams.get('sourceVersion');
        const targetVersion = searchParams.get('targetVersion');
        const libraries = searchParams.get('libraries');
        
        if (!language || !framework || !sourceVersion || !targetVersion) {
          router.push("/");
          return;
        }
        
        setMigrationData({
          category,
          language,
          framework,
          sourceVersion,
          targetVersion,
          libraries: libraries ? libraries.split(',') : []
        });
        break;
        
      case "framework-migrate":
        const lang = searchParams.get('language');
        const sourceFramework = searchParams.get('sourceFramework');
        const targetFramework = searchParams.get('targetFramework');
        
        if (!lang || !sourceFramework || !targetFramework) {
          router.push("/");
          return;
        }
        
        setMigrationData({
          category,
          language: lang,
          sourceFramework,
          targetFramework,
          sourceFrameworkVersion: searchParams.get('sourceFrameworkVersion'),
          targetFrameworkVersion: searchParams.get('targetFrameworkVersion')
        });
        break;
        
      case "language":
        const sourceLanguage = searchParams.get('sourceLanguage');
        const targetLanguage = searchParams.get('targetLanguage');
        const sourceLanguageVersion = searchParams.get('sourceLanguageVersion');
        const targetLanguageVersion = searchParams.get('targetLanguageVersion');
        
        if (!sourceLanguage || !targetLanguage || !sourceLanguageVersion || !targetLanguageVersion) {
          router.push("/");
          return;
        }
        
        setMigrationData({
          category,
          sourceLanguage,
          targetLanguage,
          sourceLanguageVersion,
          targetLanguageVersion
        });
        break;
        
      case "library-migration":
        const libLang = searchParams.get('language');
        const sourceLibrary = searchParams.get('sourceLibrary');
        const targetLibrary = searchParams.get('targetLibrary');
        const sourceLibraryVersion = searchParams.get('sourceLibraryVersion');
        const targetLibraryVersion = searchParams.get('targetLibraryVersion');
        
        if (!libLang || !sourceLibrary || !targetLibrary || !sourceLibraryVersion) {
          router.push("/");
          return;
        }
        
        setMigrationData({
          category,
          language: libLang,
          sourceLibrary,
          targetLibrary,
          sourceLibraryVersion,
          targetLibraryVersion
        });
        break;
        
      case "package-manager":
        const pmLang = searchParams.get('language');
        const sourcePackageManager = searchParams.get('sourcePackageManager');
        const targetPackageManager = searchParams.get('targetPackageManager');
        
        if (!pmLang || !sourcePackageManager || !targetPackageManager) {
          router.push("/");
          return;
        }
        
        setMigrationData({
          category,
          language: pmLang,
          sourcePackageManager,
          targetPackageManager,
          projectType: searchParams.get('projectType')
        });
        break;
        
      default:
        router.push("/");
        return;
    }
  }, [searchParams, router]);

  if (!migrationData) {
    return null;
  }

  const analysisData = react17to18Migration;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Selector
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Migration Analysis</h1>
              <p className="text-muted-foreground">
                {migrationData.category === "framework-version" && 
                  `${migrationData.framework} ${migrationData.sourceVersion} → ${migrationData.targetVersion}`
                }
                {migrationData.category === "framework-migrate" && 
                  `${migrationData.sourceFramework} → ${migrationData.targetFramework}`
                }
                {migrationData.category === "language" && 
                  `${migrationData.sourceLanguage} ${migrationData.sourceLanguageVersion} → ${migrationData.targetLanguage} ${migrationData.targetLanguageVersion}`
                }
                {migrationData.category === "library-migration" && 
                  `${migrationData.sourceLibrary} ${migrationData.sourceLibraryVersion} → ${migrationData.targetLibrary === "native" ? "Native Implementation" : migrationData.targetLibrary}${migrationData.targetLibraryVersion ? ` ${migrationData.targetLibraryVersion}` : ""}`
                }
                {migrationData.category === "package-manager" && 
                  `${migrationData.sourcePackageManager} → ${migrationData.targetPackageManager}`
                }
              </p>
              {migrationData.libraries && migrationData.libraries.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Libraries: {migrationData.libraries.join(", ")}
                </p>
              )}
              {migrationData.projectType && (
                <p className="text-sm text-muted-foreground mt-1">
                  Project Type: {migrationData.projectType}
                </p>
              )}
            </div>

            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="breaking-changes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="breaking-changes">Breaking Changes</TabsTrigger>
            <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
            <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="breaking-changes">
            <BreakingChanges changes={analysisData.breakingChanges} />
          </TabsContent>

          <TabsContent value="pros-cons">
            <ProsAndCons pros={analysisData.pros} cons={analysisData.cons} />
          </TabsContent>

          <TabsContent value="dependencies">
            <Dependencies dependencies={analysisData.dependencies} />
          </TabsContent>

          <TabsContent value="roadmap">
            <MigrationRoadmap steps={analysisData.roadmap} />
          </TabsContent>

          <TabsContent value="docs">
            <Documentation links={analysisData.documentationLinks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}