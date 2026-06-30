export interface DownloadLink {
  quality: string;
  url: string;
}

export interface BackupLink {
  name: string;
  url: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  language: string;
  quality: string;
  duration: string;
  size: string;
  rating: string;
  cover: string;
  description: string;
  cast: string[];
  director: string;
  youtubeTrailer?: string;
  downloads: DownloadLink[];
  backupLinks: BackupLink[];
  trending?: boolean;
}
