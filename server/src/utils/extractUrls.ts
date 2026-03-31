import xlsx from "xlsx";
import { isValidUrl } from "./validateUrl";

export const extractUrlsFromFile = (filePath: string) => {
  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = xlsx.utils.sheet_to_json<any>(sheet);

  const uniqueUrls = new Set<string>();
  let invalidCount = 0;
  let duplicateCount = 0;

  data.forEach((row) => {
    Object.values(row).forEach((value) => {
      if (typeof value === "string") {
        const trimmed = value.trim();

        if (isValidUrl(trimmed)) {
          if (uniqueUrls.has(trimmed)) {
            duplicateCount++;
          } else {
            uniqueUrls.add(trimmed);
          }
        } else {
          invalidCount++;
        }
      }
    });
  });

  return {
    validUrls: Array.from(uniqueUrls),
    invalidCount,
    duplicateCount, 
  };
};