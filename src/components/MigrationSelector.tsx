'use client'

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
  onAnalyze: (data: any) => void;
}

// Programming languages
const programmingLanguages = [
  "JavaScript/TypeScript", "Python", "Java", "C#", "PHP", "Go", "Ruby", "Rust", "Swift", "Kotlin"
];

// Static mappings for framework/platform options
const frameworksByLanguage: Record<string, string[]> = {
  "JavaScript/TypeScript": ["React", "Angular", "Vue", "Next.js", "Express.js", "Node.js"],
  "C#": ["ASP.NET Core", "Blazor", "WPF", "WinForms"],
  "Python": ["Django", "Flask", "FastAPI", "Pyramid", "Tornado"],
  "Java": ["Spring Boot", "Jakarta EE", "Struts", "Play Framework"],
  "PHP": ["Laravel", "Symfony", "CodeIgniter", "CakePHP"],
  "Go": ["Gin", "Echo", "Fiber", "Beego"],
  "Ruby": ["Rails", "Sinatra", "Hanami"],
  "Rust": ["Actix", "Rocket", "Warp"],
  "Swift": ["UIKit", "SwiftUI", "Vapor"],
  "Kotlin": ["Spring Boot", "Ktor", "Android"]
};

const dependencyFileByLanguage: Record<string, { file: string; desc: string }> = {
  javascript: { file: "package.json", desc: "for Node.js or frontend frameworks" },
  typescript: { file: "package.json", desc: "for Node.js or React/Angular projects" },
  python: { file: "requirements.txt", desc: "for Python dependencies" },
  java: { file: "pom.xml", desc: "for Maven-based Java projects" },
  kotlin: { file: "build.gradle", desc: "for Gradle-based Kotlin projects" },
  csharp: { file: ".csproj", desc: "for .NET or ASP.NET projects" },
  ruby: { file: "Gemfile", desc: "for Ruby on Rails projects" },
  php: { file: "composer.json", desc: "for PHP/Laravel projects" },
  go: { file: "go.mod", desc: "for Go modules" },
  rust: { file: "Cargo.toml", desc: "for Rust packages" },
};

// Static version pairs (example)
const versionsByFramework: Record<string, string[]> = {
  React: ["17.x", "18.x"],
  Angular: ["14", "15"],
  Vue: ["2.x", "3.x"],
  "Next.js": ["12", "13"],
  "ASP.NET Core": ["6.0", "7.0"],
  Blazor: ["6.0", "7.0"],
};

// Common libraries by framework
const librariesByFramework: Record<string, string[]> = {
  React: [
    "React Router", "Redux", "MobX", "React Query", "Apollo Client", 
    "Material-UI", "Ant Design", "Chakra UI", "Styled Components", "Emotion",
    "React Hook Form", "Formik", "React Testing Library", "Jest", "Cypress"
  ],
  Angular: [
    "Angular Router", "NgRx", "RxJS", "Angular Material", "PrimeNG",
    "Angular Forms", "Angular Testing", "Karma", "Protractor", "Jasmine"
  ],
  Vue: [
    "Vue Router", "Vuex", "Pinia", "Vuetify", "Quasar", "Element Plus",
    "Vue Test Utils", "Vitest", "Cypress", "Vue Composition API"
  ],
  "Next.js": [
    "Next.js Router", "Next.js API Routes", "Next.js Image", "Next.js Font",
    "SWR", "React Query", "Tailwind CSS", "Styled Components", "Sass"
  ],
  "ASP.NET Core": [
    "Entity Framework Core", "AutoMapper", "Serilog", "Swagger", "MediatR",
    "FluentValidation", "AutoFac", "Hangfire", "SignalR", "Identity"
  ],
  Django: [
    "Django REST Framework", "Celery", "Redis", "PostgreSQL", "MySQL",
    "Django Channels", "Django Debug Toolbar", "Django Extensions", "Pytest"
  ],
  Flask: [
    "Flask-SQLAlchemy", "Flask-Migrate", "Flask-Login", "Flask-WTFt", "Flask-Mail",
    "Celery", "Redis", "Gunicorn", "Pytest", "Flask-CORS"
  ]
};

// All libraries for library migration category
const allLibraries = [
  // React ecosystem
  "React Router", "Redux", "MobX", "React Query", "Apollo Client", 
  "Material-UI", "Ant Design", "Chakra UI", "Styled Components", "Emotion",
  "React Hook Form", "Formik", "React Testing Library", "Jest", "Cypress",
  // Angular ecosystem
  "Angular Router", "NgRx", "RxJS", "Angular Material", "PrimeNG",
  "Angular Forms", "Angular Testing", "Karma", "Protractor", "Jasmine",
  // Vue ecosystem
  "Vue Router", "Vuex", "Pinia", "Vuetify", "Quasar", "Element Plus",
  "Vue Test Utils", "Vitest", "Cypress", "Vue Composition API",
  // Next.js ecosystem
  "Next.js Router", "Next.js API Routes", "Next.js Image", "Next.js Font",
  "SWR", "React Query", "Tailwind CSS", "Styled Components", "Sass",
  // .NET ecosystem
  "Entity Framework Core", "AutoMapper", "Serilog", "Swagger", "MediatR",
  "FluentValidation", "AutoFac", "Hangfire", "SignalR", "Identity",
  // Python ecosystem
  "Django REST Framework", "Celery", "Redis", "PostgreSQL", "MySQL",
  "Django Channels", "Django Debug Toolbar", "Django Extensions", "Pytest",
  "Flask-SQLAlchemy", "Flask-Migrate", "Flask-Login", "Flask-WTF", "Flask-Mail",
  "Flask-CORS", "Gunicorn",
  // Other popular libraries
  "Lodash", "Moment.js", "Day.js", "Axios", "Express.js", "Socket.io",
  "Webpack", "Babel", "ESLint", "Prettier", "TypeScript"
];

// Versions by library
const versionsByLibrary: Record<string, string[]> = {
  "React Router": ["5.x", "6.x"],
  "Redux": ["4.x", "5.x"],
  "MobX": ["5.x", "6.x"],
  "React Query": ["3.x", "4.x", "5.x"],
  "Apollo Client": ["2.x", "3.x"],
  "Material-UI": ["4.x", "5.x"],
  "Ant Design": ["4.x", "5.x"],
  "Chakra UI": ["1.x", "2.x"],
  "Styled Components": ["5.x", "6.x"],
  "Emotion": ["10.x", "11.x"],
  "React Hook Form": ["6.x", "7.x"],
  "Formik": ["2.x", "3.x"],
  "React Testing Library": ["12.x", "13.x", "14.x"],
  "Jest": ["26.x", "27.x", "28.x", "29.x"],
  "Cypress": ["9.x", "10.x", "11.x", "12.x", "13.x"],
  "Angular Router": ["13.x", "14.x", "15.x", "16.x"],
  "NgRx": ["12.x", "13.x", "14.x", "15.x"],
  "RxJS": ["6.x", "7.x"],
  "Angular Material": ["13.x", "14.x", "15.x", "16.x"],
  "PrimeNG": ["13.x", "14.x", "15.x", "16.x"],
  "Vue Router": ["3.x", "4.x"],
  "Vuex": ["3.x", "4.x"],
  "Pinia": ["1.x", "2.x"],
  "Vuetify": ["2.x", "3.x"],
  "Quasar": ["1.x", "2.x"],
  "Element Plus": ["1.x", "2.x"],
  "Lodash": ["4.x", "5.x"],
  "Moment.js": ["2.x", "3.x"],
  "Day.js": ["1.x", "2.x"],
  "Axios": ["0.x", "1.x"],
  "Express.js": ["4.x", "5.x"],
  "Socket.io": ["2.x", "3.x", "4.x"],
  "Webpack": ["4.x", "5.x"],
  "Babel": ["7.x", "8.x"],
  "ESLint": ["7.x", "8.x"],
  "Prettier": ["2.x", "3.x"],
  "TypeScript": ["4.x", "5.x"]
};

// Package managers by language
const packageManagersByLanguage: Record<string, string[]> = {
  "JavaScript/TypeScript": ["npm", "yarn", "pnpm", "bun"],
  "Python": ["pip", "conda", "poetry", "pipenv"],
  "Java": ["Maven", "Gradle", "SBT"],
  "C#": ["NuGet", "Paket"],
  "PHP": ["Composer", "PEAR"],
  "Go": ["Go Modules", "Dep", "Glide"],
  "Ruby": ["Bundler", "Gem"],
  "Rust": ["Cargo"],
  "Swift": ["Swift Package Manager", "CocoaPods"],
  "Kotlin": ["Gradle", "Maven"]
};

// Project types for package manager migration
const projectTypes = [
  "Web Application", "Mobile App", "Desktop App", "Library/Package", "Microservice", "Monorepo", "CLI Tool"
];

// Language versions
const languageVersions: Record<string, string[]> = {
  "JavaScript/TypeScript": ["ES5", "ES6", "ES2017", "ES2018", "ES2019", "ES2020", "ES2021", "ES2022", "ES2023"],
  "Python": ["2.7", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "3.12"],
  "Java": ["8", "11", "17", "21"],
  "C#": ["6.0", "7.0", "8.0", "9.0", "10.0", "11.0"],
  "PHP": ["7.4", "8.0", "8.1", "8.2", "8.3"],
  "Go": ["1.16", "1.17", "1.18", "1.19", "1.20", "1.21", "1.22"],
  "Ruby": ["2.6", "2.7", "3.0", "3.1", "3.2", "3.3"],
  "Rust": ["1.60", "1.61", "1.62", "1.63", "1.64", "1.65", "1.66", "1.67", "1.68", "1.69", "1.70", "1.71", "1.72", "1.73", "1.74", "1.75"],
  "Swift": ["5.0", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9"],
  "Kotlin": ["1.6", "1.7", "1.8", "1.9", "2.0"]
};



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
