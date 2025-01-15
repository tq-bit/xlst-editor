interface AppXPathResult {
  text: string;
  xml: string;
  isEvaluation: boolean;
}

interface AppXpathStoreItem {
  id: string;
  description?: string;
  query: string;
  xml: string;
  createdAt: string;
}
