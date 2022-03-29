export type Person = {
  id?: string;
  isActive: boolean;
  picture: string;
  age: number;
  name: string;
  email: string;
  address: string;
  about: string;
  registered: string;
};

export type PersonEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
