export interface AutocompleteProps {
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
  Country: {
    ID: string;
    LocalizedName: string;
  };
}
