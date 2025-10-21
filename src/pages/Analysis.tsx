import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreakingChanges } from "@/components/analysis/BreakingChanges";
import { ProsAndCons } from "@/components/analysis/ProsAndCons";
import { Dependencies } from "@/components/analysis/Dependencies";
import { MigrationRoadmap } from "@/components/analysis/MigrationRoadmap";
import { Documentation } from "@/components/analysis/Documentation";
import { react17to18Migration } from "@/data/react17to18";
import { ArrowLeft, Download } from "lucide-react";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { source, target } = location.state || {};

  if (!source || !target) {
    navigate("/");
    return null;
  }

  const migrationData = react17to18Migration;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Selector
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Migration Analysis</h1>
              <p className="text-muted-foreground">
                {migrationData.source.name} {migrationData.source.version} →{" "}
                {migrationData.target.name} {migrationData.target.version}
              </p>
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
            <BreakingChanges changes={migrationData.breakingChanges} />
          </TabsContent>

          <TabsContent value="pros-cons">
            <ProsAndCons pros={migrationData.pros} cons={migrationData.cons} />
          </TabsContent>

          <TabsContent value="dependencies">
            <Dependencies dependencies={migrationData.dependencies} />
          </TabsContent>

          <TabsContent value="roadmap">
            <MigrationRoadmap steps={migrationData.roadmap} />
          </TabsContent>

          <TabsContent value="docs">
            <Documentation links={migrationData.documentationLinks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analysis;
