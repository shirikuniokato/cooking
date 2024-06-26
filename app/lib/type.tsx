export type COOK = {
  id: number;
  name: string;
  link: string;
  memo: string;
  is_cook: boolean;
  user_name: string;
  created_at: Date;
  updated_at: Date;
};

export type REQUEST_TYPE = {
  name?: string;
  link?: string;
  memo?: string;
  user_name?: string;
};
