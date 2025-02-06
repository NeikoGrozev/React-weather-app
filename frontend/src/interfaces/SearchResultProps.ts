export interface SearchResultProps {
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    LocalizedType: string;
    CountryID: string;
    EnglishName: string;
    EnglishType: string;
    Level: number;
  };
  Country: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
  };
}
