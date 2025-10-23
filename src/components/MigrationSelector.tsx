'use client'

import { useState, useRef,useMemo } from "react";
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
  const [language, setLanguage] = useState("");
  const [framework, setFramework] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("");
  const [sourceVersion, setSourceVersion] = useState("");
  const [targetVersion, setTargetVersion] = useState("");
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  
  // Framework Migration states
  const [sourceFramework, setSourceFramework] = useState("");
  const [targetFramework, setTargetFramework] = useState("");
  const [sourceFrameworkVersion, setSourceFrameworkVersion] = useState("");
  const [targetFrameworkVersion, setTargetFrameworkVersion] = useState("");
  
  // Language Migration states
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [sourceLanguageVersion, setSourceLanguageVersion] = useState("");
  const [targetLanguageVersion, setTargetLanguageVersion] = useState("");
  
  // Library Migration states
  const [sourceLibrary, setSourceLibrary] = useState("");
  const [targetLibrary, setTargetLibrary] = useState("");
  const [sourceLibraryVersion, setSourceLibraryVersion] = useState("");
  const [targetLibraryVersion, setTargetLibraryVersion] = useState("");
  
  // Package Manager Migration states
  const [sourcePackageManager, setSourcePackageManager] = useState("");
  const [targetPackageManager, setTargetPackageManager] = useState("");
  const [projectType, setProjectType] = useState("");

  const frameworkOptions = language ? frameworksByLanguage[language] || [] : [];
  const versionOptions = framework ? versionsByFramework[framework] || [] : [];
  const libraryOptions = framework ? librariesByFramework[framework] || [] : [];
  const libraryVersionOptions = selectedLibrary ? versionsByLibrary[selectedLibrary] || [] : [];
  const packageManagerOptions = language ? packageManagersByLanguage[language] || [] : [];
  const languageVersionOptions = (lang: string) => languageVersions[lang] || [];

  const inputRef = useRef<HTMLInputElement>(null);

  const fileLabel = useMemo(() => {
    const lang = language?.toLowerCase();
    const mapping = dependencyFileByLanguage[lang];
  
    if (!mapping) {
      return "Upload your project’s dependency/configuration file (e.g., package.json, csproj, pom.xml)";
    }
  
    switch (category) {
      case "framework-version":
        return `Upload your ${mapping.file} (${mapping.desc}) to detect framework version and dependencies`;
      case "framework-migrate":
        return `Upload your ${mapping.file} (${mapping.desc}) to analyze your current setup for migration`;
      case "language":
        return `Upload your ${mapping.file} (${mapping.desc}) to help detect project dependencies`;
      case "library-migration":
        return `Upload your ${mapping.file} (${mapping.desc}) to identify libraries and versions`;
      default:
        return `Upload your ${mapping.file} (${mapping.desc})`;
    }
  }, [language, category]);

  const fileAccept = useMemo(() => {
    const lang = language?.toLowerCase();
    switch (lang) {
      case "javascript":
      case "typescript":
      case "php":
        return ".json";
      case "csharp":
        return ".csproj";
      case "java":
        return ".xml,.gradle";
      case "python":
        return ".txt,.toml";
      case "go":
        return ".mod";
      case "rust":
        return ".toml";
      case "ruby":
        return "";
      default:
        return ".json,.xml,.txt,.csproj";
    }
  }, [language]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleLibraryToggle = (library: string) => {
    setSelectedLibraries(prev => 
      prev.includes(library) 
        ? prev.filter(lib => lib !== library)
        : [...prev, library]
    );
  };

  const handleAnalyze = () => {
    switch (category) {
      case "framework-version":
        if (language && framework && sourceVersion && targetVersion) {
          onAnalyze({ 
            category, 
            language, 
            framework, 
            sourceVersion, 
            targetVersion, 
            selectedLibraries,
            file 
          });
        }
        break;
        
      case "framework-migrate":
        if (sourceLanguage && targetLanguage && sourceFramework && targetFramework) {
          onAnalyze({ 
            category, 
            sourceLanguage,
            targetLanguage,
            sourceFramework,
            targetFramework,
            sourceFrameworkVersion: sourceFrameworkVersion || null,
            targetFrameworkVersion: targetFrameworkVersion || null,
            file 
          });
        }
        break;
        
      case "language":
        if (sourceLanguage && targetLanguage && sourceLanguageVersion && targetLanguageVersion) {
          onAnalyze({ 
            category, 
            sourceLanguage,
            targetLanguage,
            sourceLanguageVersion,
            targetLanguageVersion,
            file 
          });
        }
        break;
        
      case "library-migration":
        if (language && sourceLibrary && targetLibrary && sourceLibraryVersion && targetLibraryVersion) {
          onAnalyze({ 
            category, 
            language,
            sourceLibrary,
            targetLibrary,
            sourceLibraryVersion,
            targetLibraryVersion,
            file 
          });
        }
        break;
        
      case "package-manager":
        if (language && sourcePackageManager && targetPackageManager) {
          onAnalyze({ 
            category, 
            language,
            sourcePackageManager,
            targetPackageManager,
            projectType: projectType || null,
            file 
          });
        }
        break;
    }
  };

  const handleDivClick = () => {
    inputRef.current?.click(); // programmatically open file selector
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



        {/* Step 1: Category */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={category} onValueChange={(val) => { 
            setCategory(val); 
            // Reset all states
            setLanguage(""); 
            setFramework(""); 
            setSelectedLibrary("");
            setSourceVersion(""); 
            setTargetVersion(""); 
            setSelectedLibraries([]);
            setSourceFramework("");
            setTargetFramework("");
            setSourceFrameworkVersion("");
            setTargetFrameworkVersion("");
            setSourceLanguage("");
            setTargetLanguage("");
            setSourceLanguageVersion("");
            setTargetLanguageVersion("");
            setSourceLibrary("");
            setTargetLibrary("");
            setSourceLibraryVersion("");
            setTargetLibraryVersion("");
            setSourcePackageManager("");
            setTargetPackageManager("");
            setProjectType("");
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select migration category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="framework-version">Framework Version Upgrade</SelectItem>
              <SelectItem value="framework-migrate">Framework Migrate</SelectItem>
              <SelectItem value="language">Language Migration</SelectItem>
              <SelectItem value="library-migration">Library Migration</SelectItem>
              <SelectItem value="package-manager">Package Manager Migration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Framework Version Upgrade Flow */}
        {category === "framework-version" && (
          <>
            {/* Programming Language */}
            <div>
              <label className="text-sm font-medium mb-2 block">Programming Language</label>
              <Select value={language} onValueChange={(val) => { setLanguage(val); setFramework(""); setSourceVersion(""); setTargetVersion(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select programming language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Framework/Platform */}
            {language && (
              <div>
                <label className="text-sm font-medium mb-2 block">Framework/Platform</label>
                <Select value={framework} onValueChange={(val) => { setFramework(val); setSourceVersion(""); setTargetVersion(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework/platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworksByLanguage[language]?.map((fw) => (
                      <SelectItem key={fw} value={fw}>{fw}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Current & Target Versions */}
            {framework && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Current Framework Version</label>
                  <Select value={sourceVersion} onValueChange={setSourceVersion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Current version" />
                    </SelectTrigger>
                    <SelectContent>
                      {versionsByFramework[framework]?.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Target Framework Version</label>
                  <Select value={targetVersion} onValueChange={setTargetVersion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Target version" />
                    </SelectTrigger>
                    <SelectContent>
                      {versionsByFramework[framework]?.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Library Selection */}
            {framework && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Select Libraries/Dependencies (Optional)
                </label>
                <p className="text-xs text-muted-foreground mb-3">
                  Choose the libraries you're currently using to get more accurate migration analysis
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                  {librariesByFramework[framework]?.map((library) => (
                    <label
                      key={library}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLibraries.includes(library)}
                        onChange={() => handleLibraryToggle(library)}
                        className="rounded"
                      />
                      <span className="text-sm">{library}</span>
                    </label>
                  ))}
                </div>
                {selectedLibraries.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      Selected: {selectedLibraries.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Framework Migrate Flow */}
        {category === "framework-migrate" && (
          <>
             {/* Source Language */}
             <div>
              <label className="text-sm font-medium mb-2 block">Source Language</label>
              <Select value={sourceLanguage} onValueChange={(val) => { setSourceLanguage(val); setSourceLanguageVersion(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Language */}
            <div>
              <label className="text-sm font-medium mb-2 block">Target Language</label>
              <Select value={targetLanguage} onValueChange={(val) => { setTargetLanguage(val); setTargetLanguageVersion(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.filter(lang => lang !== sourceLanguage).map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Source Framework */}
            {sourceLanguage && (
              <div>
                <label className="text-sm font-medium mb-2 block">Source Framework/Platform</label>
                <Select value={sourceFramework} onValueChange={(val) => { setSourceFramework(val); setTargetFramework(""); setSourceFrameworkVersion(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Framework currently in use" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworksByLanguage[sourceLanguage]?.map((fw) => (
                      <SelectItem key={fw} value={fw}>{fw}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Target Framework */}
            {targetLanguage && (
              <div>
                <label className="text-sm font-medium mb-2 block">Target Framework/Platform</label>
                <Select value={targetFramework} onValueChange={(val) => { setTargetFramework(val); setTargetFrameworkVersion(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Framework to migrate to" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworksByLanguage[targetLanguage]?.filter(fw => fw !== sourceLanguage).map((fw) => (
                      <SelectItem key={fw} value={fw}>{fw}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Source Version */}
            {sourceFramework && (
              <div>
                <label className="text-sm font-medium mb-2 block">Source Version (Optional but recommended)</label>
                <Select value={sourceFrameworkVersion} onValueChange={setSourceFrameworkVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Current version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versionsByFramework[sourceFramework]?.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Target Version */}
            {targetFramework && (
              <div>
                <label className="text-sm font-medium mb-2 block">Target Version (Optional)</label>
                <Select value={targetFrameworkVersion} onValueChange={setTargetFrameworkVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Target version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versionsByFramework[targetFramework]?.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}

        {/* Language Migration Flow */}
        {category === "language" && (
          <>
            {/* Source Language */}
            <div>
              <label className="text-sm font-medium mb-2 block">Source Language</label>
              <Select value={sourceLanguage} onValueChange={(val) => { setSourceLanguage(val); setSourceLanguageVersion(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Language */}
            <div>
              <label className="text-sm font-medium mb-2 block">Target Language</label>
              <Select value={targetLanguage} onValueChange={(val) => { setTargetLanguage(val); setTargetLanguageVersion(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.filter(lang => lang !== sourceLanguage).map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Source Language Version */}
            {sourceLanguage && (
              <div>
                <label className="text-sm font-medium mb-2 block">Current Version of Source Language</label>
                <Select value={sourceLanguageVersion} onValueChange={setSourceLanguageVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Source language version" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageVersionOptions(sourceLanguage).map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Target Language Version */}
            {targetLanguage && (
              <div>
                <label className="text-sm font-medium mb-2 block">Target Version of Target Language</label>
                <Select value={targetLanguageVersion} onValueChange={setTargetLanguageVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Target language version" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageVersionOptions(targetLanguage).map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}

        {/* Library Migration Flow */}
        {category === "library-migration" && (
          <>
            {/* Programming Language */}
            <div>
              <label className="text-sm font-medium mb-2 block">Programming Language</label>
              <Select value={language} onValueChange={(val) => { setLanguage(val); setSourceLibrary(""); setTargetLibrary(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select programming language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Source Library */}
            {language && (
              <div>
                <label className="text-sm font-medium mb-2 block">Source Library</label>
                <Select value={sourceLibrary} onValueChange={(val) => { setSourceLibrary(val); setSourceLibraryVersion(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source library" />
                  </SelectTrigger>
                  <SelectContent>
                    {allLibraries.map((lib) => (
                      <SelectItem key={lib} value={lib}>{lib}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Target Library */}
            {sourceLibrary && (
              <div>
                <label className="text-sm font-medium mb-2 block">Target Library or Native Implementation</label>
                <Select value={targetLibrary} onValueChange={(val) => { setTargetLibrary(val); setTargetLibraryVersion(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target library" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native Implementation</SelectItem>
                    {allLibraries.filter(lib => lib !== sourceLibrary).map((lib) => (
                      <SelectItem key={lib} value={lib}>{lib}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Source Library Version */}
            {sourceLibrary && (
              <div>
                <label className="text-sm font-medium mb-2 block">Current Library Version</label>
                <Select value={sourceLibraryVersion} onValueChange={setSourceLibraryVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Source library version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versionsByLibrary[sourceLibrary]?.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Target Library Version */}
            {targetLibrary && targetLibrary !== "native" && (
              <div>
                <label className="text-sm font-medium mb-2 block">Target Library Version</label>
                <Select value={targetLibraryVersion} onValueChange={setTargetLibraryVersion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Target library version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versionsByLibrary[targetLibrary]?.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}

        {/* Package Manager Migration Flow */}
        {category === "package-manager" && (
          <>
            {/* Programming Language */}
            <div>
              <label className="text-sm font-medium mb-2 block">Programming Language</label>
              <Select value={language} onValueChange={(val) => { setLanguage(val); setSourcePackageManager(""); setTargetPackageManager(""); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select programming language" />
                </SelectTrigger>
                <SelectContent>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Source Package Manager */}
            {language && (
              <div>
                <label className="text-sm font-medium mb-2 block">Source Package Manager</label>
                <Select value={sourcePackageManager} onValueChange={(val) => { setSourcePackageManager(val); setTargetPackageManager(""); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source package manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageManagersByLanguage[language]?.map((pm) => (
                      <SelectItem key={pm} value={pm}>{pm}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Target Package Manager */}
            {sourcePackageManager && (
              <div>
                <label className="text-sm font-medium mb-2 block">Target Package Manager</label>
                <Select value={targetPackageManager} onValueChange={setTargetPackageManager}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target package manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageManagersByLanguage[language]?.filter(pm => pm !== sourcePackageManager).map((pm) => (
                      <SelectItem key={pm} value={pm}>{pm}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Project Type */}
            {targetPackageManager && (
              <div>
                <label className="text-sm font-medium mb-2 block">Project Type (Optional)</label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}

        {/* Upload dependency file */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"  onClick={handleDivClick}>
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium mb-1"> {fileLabel}</p>
          <p className="text-xs text-muted-foreground">
            {file ? `Uploaded: ${file.name}` : "We'll analyze your dependencies for compatibility"}
          </p>
          <input
        type="file"
        className="hidden"
        accept={fileAccept}
        ref={inputRef}
        onChange={handleFileChange}
      />
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={
            category === "framework-version" ? !(language && framework && sourceVersion && targetVersion) :
            category === "framework-migrate" ? !(sourceLanguage && targetLanguage && sourceFrameworkVersion && targetFrameworkVersion && sourceFramework && targetFramework) :
            category === "language" ? !(sourceLanguage && targetLanguage && sourceLanguageVersion && targetLanguageVersion) :
            category === "library-migration" ? !(language && sourceLibrary && targetLibrary && sourceLibraryVersion && (targetLibrary === "native" || targetLibraryVersion)) :
            category === "package-manager" ? !(language && sourcePackageManager && targetPackageManager) :
            true
          }
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
