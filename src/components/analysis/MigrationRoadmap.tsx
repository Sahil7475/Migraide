import { MigrationStep } from "@/types/migration";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface MigrationRoadmapProps {
  steps: MigrationStep[];
}

export const MigrationRoadmap = ({ steps }: MigrationRoadmapProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Migration Roadmap</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-border" />

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex gap-4">
              {/* Step number badge */}
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm z-10 relative">
                  {step.priority}
                </div>
              </div>

              {/* Step content */}
              <Card className="flex-1 p-5 -mt-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {step.estimatedTime}
                  </div>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
