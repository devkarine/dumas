export interface Cep {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  locatinn: {
    type: string;
    coordinntes: {
      latitude: number;
      longitude: number;
    };
  };
  city_id: string;
}
