import { MigrationData } from "@/types/migration";

export const react17to18Migration: MigrationData = {
  source: {
    name: "React",
    version: "17.x",
  },
  target: {
    name: "React",
    version: "18.x",
  },
  breakingChanges: [
    {
      id: "automatic-batching",
      title: "Automatic Batching Behavior Change",
      severity: "high",
      description:
        "React 18 introduces automatic batching for all state updates, including those in promises, setTimeout, and native event handlers.",
      impact:
        "Component re-renders may batch differently, potentially changing timing-dependent behavior. Tests relying on immediate re-renders may fail.",
      codeExample: {
        before: `// React 17 - these triggered 2 separate renders
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);`,
        after: `// React 18 - automatically batched into 1 render
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// To opt-out if needed:
import { flushSync } from 'react-dom';
flushSync(() => {
  setCount(c => c + 1);
});
setFlag(f => !f); // Second render`,
      },
    },
    {
      id: "render-callback-deprecated",
      title: "ReactDOM.render Callback Deprecated",
      severity: "medium",
      description:
        "The callback passed to ReactDOM.render is deprecated and won't be called when using createRoot.",
      impact:
        "Code relying on post-render callbacks needs refactoring to use useEffect or other lifecycle methods.",
      codeExample: {
        before: `ReactDOM.render(
  <App />,
  container,
  () => console.log('rendered') // Won't work with createRoot
);`,
        after: `const root = createRoot(container);
root.render(<App />);

// In your component:
useEffect(() => {
  console.log('rendered');
}, []);`,
      },
    },
    {
      id: "hydration-mismatch",
      title: "Stricter Hydration Error Handling",
      severity: "critical",
      description:
        "React 18 has stricter hydration mismatch detection and will log errors for mismatches that were previously silent.",
      impact:
        "SSR applications with hydration mismatches will now show console errors, making debugging easier but potentially revealing existing issues.",
    },
    {
      id: "suspend-behavior",
      title: "Suspense Behavior Changes",
      severity: "high",
      description:
        "Suspense boundaries now consistently show fallback UI during initial mount, even if content is ready synchronously.",
      impact:
        "Components that worked around previous Suspense quirks may display fallback UI unexpectedly.",
    },
    {
      id: "useeffect-cleanup",
      title: "useEffect Cleanup Timing",
      severity: "medium",
      description:
        "In Strict Mode, React 18 runs useEffect cleanup and effect twice on mount to help find bugs.",
      impact:
        "Side effects that aren't properly cleaned up will be more obvious, requiring fixes to effect dependencies and cleanup functions.",
    },
    {
      id: "ie-support-dropped",
      title: "Internet Explorer Support Dropped",
      severity: "low",
      description: "React 18 officially drops support for Internet Explorer 11.",
      impact:
        "Projects requiring IE11 support cannot upgrade to React 18 without polyfills or staying on React 17.",
    },
  ],
  pros: [
    {
      title: "Automatic Batching",
      description:
        "All state updates are automatically batched, reducing unnecessary re-renders and improving performance across the entire application.",
      category: "performance",
    },
    {
      title: "Concurrent Rendering",
      description:
        "New concurrent features allow React to prepare multiple versions of the UI simultaneously, making apps more responsive.",
      category: "performance",
    },
    {
      title: "Suspense for Data Fetching",
      description:
        "Enhanced Suspense support for data fetching with better streaming SSR integration.",
      category: "features",
    },
    {
      title: "startTransition API",
      description:
        "New API to mark updates as non-urgent, keeping the UI responsive during expensive operations.",
      category: "dx",
    },
    {
      title: "Improved SSR with Streaming",
      description:
        "Server-side rendering is now streamable and interruptible, dramatically improving time-to-interactive.",
      category: "performance",
    },
    {
      title: "Better Error Boundaries",
      description:
        "Error boundaries now work with server-side rendering and provide better error messages.",
      category: "dx",
    },
    {
      title: "Active Development",
      description:
        "React 18 is the current major version with active feature development and long-term support.",
      category: "community",
    },
  ],
  cons: [
    {
      title: "Breaking Changes",
      description:
        "Several behavioral changes require code updates, particularly around batching and hydration.",
      category: "maintenance",
    },
    {
      title: "Library Compatibility",
      description:
        "Some third-party libraries may not yet support React 18's concurrent features or may have issues with automatic batching.",
      category: "community",
    },
    {
      title: "Learning Curve",
      description:
        "New concepts like transitions, Suspense boundaries, and concurrent rendering require team education.",
      category: "dx",
    },
    {
      title: "SSR Complexity",
      description:
        "While more powerful, the new SSR streaming features add complexity to server configuration.",
      category: "maintenance",
    },
  ],
  dependencies: [
    {
      name: "react-dom",
      currentVersion: "17.x",
      targetVersion: "18.x",
      status: "needs-update",
      notes: "Must be updated alongside React",
    },
    {
      name: "@types/react",
      currentVersion: "17.x",
      targetVersion: "18.x",
      status: "needs-update",
      notes: "TypeScript definitions for React 18",
    },
    {
      name: "@types/react-dom",
      currentVersion: "17.x",
      targetVersion: "18.x",
      status: "needs-update",
      notes: "TypeScript definitions for ReactDOM 18",
    },
    {
      name: "react-test-renderer",
      currentVersion: "17.x",
      targetVersion: "18.x",
      status: "needs-update",
      notes: "Update if using for testing",
    },
    {
      name: "react-router-dom",
      currentVersion: "5.x",
      targetVersion: "6.x",
      status: "compatible",
      notes: "React Router v6 recommended for React 18",
    },
    {
      name: "redux",
      currentVersion: "4.x",
      targetVersion: "4.2+",
      status: "needs-update",
      notes: "Update to 4.2.0+ for React 18 compatibility",
    },
    {
      name: "react-redux",
      currentVersion: "7.x",
      targetVersion: "8.x",
      status: "needs-update",
      notes: "Version 8+ required for React 18",
    },
    {
      name: "enzyme",
      currentVersion: "3.x",
      targetVersion: "-",
      status: "incompatible",
      alternative: "@testing-library/react",
      notes: "Enzyme doesn't support React 18. Migrate to React Testing Library.",
    },
  ],
  roadmap: [
    {
      id: "step-1",
      title: "Update Dependencies",
      description:
        "Update react and react-dom to version 18, along with @types packages if using TypeScript.",
      estimatedTime: "15 minutes",
      priority: 1,
    },
    {
      id: "step-2",
      title: "Replace ReactDOM.render with createRoot",
      description:
        "Update all ReactDOM.render() calls to use the new createRoot API. This is the main API change.",
      estimatedTime: "30 minutes",
      priority: 2,
    },
    {
      id: "step-3",
      title: "Update Server-Side Rendering",
      description:
        "If using SSR, migrate from renderToString to the new streaming APIs (renderToPipeableStream or renderToReadableStream).",
      estimatedTime: "2-4 hours",
      priority: 3,
    },
    {
      id: "step-4",
      title: "Test Automatic Batching Impact",
      description:
        "Run your test suite and check for timing-dependent tests that may now fail due to automatic batching.",
      estimatedTime: "1-2 hours",
      priority: 4,
    },
    {
      id: "step-5",
      title: "Fix Hydration Warnings",
      description:
        "Address any new hydration mismatch warnings that appear in SSR applications.",
      estimatedTime: "2-6 hours",
      priority: 5,
    },
    {
      id: "step-6",
      title: "Update Testing Setup",
      description:
        "Replace enzyme with @testing-library/react if currently using it. Update test utilities to work with React 18.",
      estimatedTime: "4-8 hours",
      priority: 6,
    },
    {
      id: "step-7",
      title: "Review Third-Party Libraries",
      description:
        "Check all third-party React libraries for React 18 compatibility and update as needed.",
      estimatedTime: "2-4 hours",
      priority: 7,
    },
    {
      id: "step-8",
      title: "Adopt Concurrent Features (Optional)",
      description:
        "Start using new concurrent features like startTransition and useDeferredValue where beneficial.",
      estimatedTime: "Ongoing",
      priority: 8,
    },
  ],
  documentationLinks: [
    {
      title: "React 18 Upgrade Guide",
      url: "https://react.dev/blog/2022/03/08/react-18-upgrade-guide",
    },
    {
      title: "React 18 Release Notes",
      url: "https://react.dev/blog/2022/03/29/react-v18",
    },
    {
      title: "Concurrent React Documentation",
      url: "https://react.dev/reference/react",
    },
    {
      title: "Automatic Batching in React 18",
      url: "https://github.com/reactwg/react-18/discussions/21",
    },
    {
      title: "New Suspense SSR Architecture",
      url: "https://github.com/reactwg/react-18/discussions/37",
    },
  ],
};
