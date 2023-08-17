interface Photo {
  id: number;
  category: string;
  url: string;
  photographer: string;
  alt: string;
  page_url: string;
  width: number;
  height: number;
  path: string;
}

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

interface PanelProps {
  selectedCategory: string;
  filteredPhotos: Photo[];
  setSelectedImage: (url: string) => void;
}

interface CanvasProps {
  selectedImage: string;
}

export type { Photo, HeaderProps, SidebarProps, PanelProps, CanvasProps };
