export type UploadResponse = {
  urls: string[];
  meta: {
    total: number;
    valid: number;
    invalid: number;
    duplicates: number;
  };
};