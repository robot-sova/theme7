export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export type IndexMDProps = {
  title: string;
  meta_title: string;
  description: string;
  draft: string;
  hero?: any;
};

export type PageHeaderProps = {
  title: string;
  subtitle: string;
};

export interface PageIndexProps {
  title: string;
  meta_title: string;
  image: string;
  description: string;
  page_header: {
    title: string;
    subtitle: string;
  };
}
