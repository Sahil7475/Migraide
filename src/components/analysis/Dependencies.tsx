import { DependencyUpdate } from "@/types/migration";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, ArrowUp, RefreshCw } from "lucide-react";

interface DependenciesProps {
  dependencies: DependencyUpdate[];
}

const statusConfig = {
  compatible: {
    label: "Compatible",
    icon: CheckCircle,
    className: "bg-low/20 text-low border-low/30",
  },
  "needs-update": {
    label: "Needs Update",
    icon: ArrowUp,
    className: "bg-medium/20 text-medium border-medium/30",
  },
  incompatible: {
    label: "Incompatible",
    icon: AlertCircle,
    className: "bg-critical/20 text-critical border-critical/30",
  },
  "alternative-needed": {
    label: "Alternative Needed",
    icon: RefreshCw,
    className: "bg-high/20 text-high border-high/30",
  },
};

export const Dependencies = ({ dependencies }: DependenciesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dependency Updates</h2>

      <div className="grid gap-3">
        {dependencies.map((dep, index) => {
          const config = statusConfig[dep.status];
          const StatusIcon = config.icon;

          return (
            <Card key={index} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold font-mono text-primary">{dep.name}</h3>
                    <Badge variant="outline" className={config.className}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="font-mono">{dep.currentVersion}</span>
                    <span>→</span>
                    <span className="font-mono">{dep.targetVersion}</span>
                  </div>

                  {dep.alternative && (
                    <div className="mt-2 p-2 bg-muted rounded text-sm">
                      <span className="font-medium">Recommended alternative:</span>{" "}
                      <span className="font-mono text-primary">{dep.alternative}</span>
                    </div>
                  )}

                  {dep.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{dep.notes}</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
