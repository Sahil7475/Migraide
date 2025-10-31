'use client'

import { BreakingChange } from "@/types/migration";
import { Card } from "@/components/ui/card";
import { SeverityBadge } from "@/components/SeverityBadge";
import { CodeBlock } from "@/components/CodeBlock";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface BreakingChangesProps {
  changes: BreakingChange[];
}

export const BreakingChanges = ({ changes }: BreakingChangesProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Breaking Changes</h2>
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-1 bg-critical/10 text-critical rounded">
            {changes.filter((c) => c.severity === "critical").length} Critical
          </span>
          <span className="px-2 py-1 bg-high/10 text-high rounded">
            {changes.filter((c) => c.severity === "high").length} High
          </span>
          <span className="px-2 py-1 bg-medium/10 text-medium rounded">
            {changes.filter((c) => c.severity === "medium").length} Medium
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {changes.map((change) => (
          <Card key={change.id} className="p-6">
            <div
              className="cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === change.id ? null : change.id)
              }
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{change.title}</h3>
  {/*                   <SeverityBadge severity={change.severity} /> */}
                  </div>
                  <p className="text-muted-foreground">{change.description}</p>
                </div>
                {expandedId === change.id ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground ml-4" />
                )}
              </div>

              {expandedId === change.id && (
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Impact</h4>
                    <p className="text-sm text-muted-foreground">{change.impact}</p>
                  </div>

                  {change.codeExample && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Code Example</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <CodeBlock
                          code={change.codeExample.before}
                          title="Before (React 17)"
                        />
                        <CodeBlock
                          code={change.codeExample.after}
                          title="After (React 18)"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
