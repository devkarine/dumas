import { Address } from './Address';
import { Telephone } from './Telephone';

export interface Chef {
  id: string;
  name: string;
  email: string;
  address: Address;
  telephones: Telephone[];
}
