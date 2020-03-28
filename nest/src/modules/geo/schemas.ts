export interface Country {
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
}

export interface CountryInfo {
  _id: number | null;
  lat: number;
  long: number;
  flag: string;
  iso3: null | string;
  iso2: null | string;
}

export interface State {
  state: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  active: number;
}
