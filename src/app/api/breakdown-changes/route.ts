import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";


async function fetchBreakingChangesForVersion(version: string) {
    
    const url = `https://learn.microsoft.com/en-us/dotnet/core/compatibility/${version}?toc=%2Fdotnet%2Ffundamentals%2Ftoc.json&bc=%2Fdotnet%2Fbreadcrumb%2Ftoc.json`;
  
    console.log(url,"url");

    const { data } = await axios.get(url);

    console.log(data,"data");

    const $ = cheerio.load(data);
  


    const results: {
      version: string;
      title: string;
      basedOn: string;
      category: string;
      link: string;
    }[] = [];
  
    // Each breaking change entry is usually within a table or list.
    // The most consistent approach: find all links within the main content that reference anchors (#)

      $("table tbody tr").each((_, row) => {
    const cells = $(row).find("td");

    if (cells.length > 0) {
      const linkNode = $(cells[0]).find("a").first();
      const title = linkNode.text().trim();
      const href = linkNode.attr("href");

      const category =
        $(cells[1]).text().trim() ||
        $(row).closest("section").find("h2").first().text().trim() ||
        "General";

      if (title && href) {
        const link = href.startsWith("http")
          ? href
          : `https://learn.microsoft.com${href}`;

        results.push({
          version,
          basedOn: `${parseInt(version) - 1}.0`,
          title,
          category,
          link,
        });
      }
    }
  });
  
    return results;
  }

  export async function GET(request: Request) {
    console.log("request",request);
    const { searchParams } = new URL(request.url);
    const from = parseInt(searchParams.get("sourceVersion") || "8");
    const to = parseInt(searchParams.get("targetVersion") || "10");
  
    // determine intermediate versions (example: 9, 10)
    const versionsToFetch = [];
    for (let i = from + 1; i <= to; i++) versionsToFetch.push(`${i}.0`);
  
    let allChanges: any[] = [];
  
console.log("versionsToFetch",versionsToFetch);

    for (const v of versionsToFetch) {
      const changes = await fetchBreakingChangesForVersion(v);
      allChanges = [...allChanges, ...changes];
    }
  
console.log("allChanges",allChanges);

    // remove duplicates by title
    const unique = Array.from(
      new Map(allChanges.map((item) => [item.title, item])).values()
    );
  
console.log(unique);

    return NextResponse.json({
      versionsChecked: versionsToFetch,
      count: unique.length,
      data: unique,
    });
  }