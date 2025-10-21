export type SeverityLevel = "critical" | "high" | "medium" | "low";

export interface BreakingChange {
  id: string;
  title: string;
  severity: SeverityLevel;
  description: string;
  impact: string;
  codeExample?: {
    before: string;
    after: string;
  };
}

export interface ProCon {
  title: string;
  description: string;
  category: "performance" | "features" | "dx" | "community" | "maintenance";
}

export interface DependencyUpdate {
  name: string;
  currentVersion: string;
  targetVersion: string;
  status: "compatible" | "needs-update" | "incompatible" | "alternative-needed";
  alternative?: string;
  notes?: string;
}

export interface MigrationStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  priority: number;
}

export interface MigrationData {
  source: {
    name: string;
    version: string;
  };
  target: {
    name: string;
    version: string;
  };
  breakingChanges: BreakingChange[];
  pros: ProCon[];
  cons: ProCon[];
  dependencies: DependencyUpdate[];
  roadmap: MigrationStep[];
  documentationLinks: {
    title: string;
    url: string;
  }[];
}
