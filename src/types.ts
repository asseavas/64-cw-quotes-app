export interface ApiQuote {
  author: string;
  category: string;
  text: string;
}

export interface ApiQuotes {
  [id: string]: ApiQuote;
}

export interface Quote extends ApiQuote {
  id: string;
}
