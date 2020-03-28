import { Injectable } from '@nestjs/common';
import { Country, State } from './schemas';
import { RedisService } from '../redis/service';

@Injectable()
export class GeoService {
  constructor(private redisService: RedisService) {
    console.log(redisService.getInstance());
  }

  getAllCountries(): Country[] {
    return [
      {
        country: 'Iceland',
        countryInfo: {
          _id: 352,
          lat: 65,
          long: -18,
          flag:
            'https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/is.png',
          iso3: 'ISL',
          iso2: 'IS',
        },
        cases: 963,
        todayCases: 73,
        deaths: 2,
        todayDeaths: 0,
        recovered: 114,
        active: 847,
        critical: 18,
        casesPerOneMillion: 2822,
        deathsPerOneMillion: 6,
      },
    ];
  }

  getCountry(country: string): Country {
    return {
      country: 'Iceland',
      countryInfo: {
        _id: 352,
        lat: 65,
        long: -18,
        flag:
          'https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/is.png',
        iso3: 'ISL',
        iso2: 'IS',
      },
      cases: 963,
      todayCases: 73,
      deaths: 2,
      todayDeaths: 0,
      recovered: 114,
      active: 847,
      critical: 18,
      casesPerOneMillion: 2822,
      deathsPerOneMillion: 6,
    };
  }

  getAllStates(): State[] {
    return [
      {
        state: 'New York',
        cases: 52318,
        todayCases: 6056,
        deaths: 728,
        todayDeaths: 122,
        active: 48864,
      },
    ];
  }
}
