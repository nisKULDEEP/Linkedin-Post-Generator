export interface Post {
  imageUrl: string;
  text: string;
}

export interface ScrapeMessage {
    type: 'SCRAPE_POSTS';
}

export interface ScrapeResult {
    type: 'SCRAPE_RESULT';
    payload: string;
}
