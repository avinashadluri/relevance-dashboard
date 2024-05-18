import { ReactNode } from 'react';

type ExampleProps = {
  children?: ReactNode;
};

export const Example = ({ children }: ExampleProps) => <h1>{children}</h1>;
