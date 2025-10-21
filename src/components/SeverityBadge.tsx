import { SeverityLevel } from "@/types/migration";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

const severityConfig = {
  critical: {
    label: "Critical",
    className: "bg-critical/20 text-critical border-critical/30",
    icon: AlertCircle,
  },
  high: {
    label: "High",
    className: "bg-high/20 text-high border-high/30",
    icon: AlertTriangle,
  },
  medium: {
    label: "Medium",
    className: "bg-medium/20 text-medium border-medium/30",
    icon: AlertTriangle,
  },
  low: {
    label: "Low",
    className: "bg-low/20 text-low border-low/30",
    icon: CheckCircle,
  },
};

export const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  );
};
