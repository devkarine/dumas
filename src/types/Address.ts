export interface Address {
  id: string;
  name: string;
  public_place: string;
  zip_code: string;
  number: string;
  neighborhood: string;
  reference: string;
  complement: string;
  latitude: number;
  longitude: number;
  city_id: string;
  addressable_type: string;
  addressable_id: string;
  state?: string;
  street?: string;
  city?: string;
}
