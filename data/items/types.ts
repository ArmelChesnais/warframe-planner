import type { Conditions, Consumes, State } from '../dataHelpers';

export type Resource<T extends State> = {
  name: string;
  scale: number;
  craft?: {
    cost: number;
    consumes?: Consumes<T>;
    once?: boolean;
    preconditions?: Conditions;
    repeatable?: boolean;
  };
  buy?: {
    cost: number;
    consumes?: Consumes<T>;
    preconditions?: Conditions;
    repeatable?: boolean;
  };
}