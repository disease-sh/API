import { Controller, Get, Param } from '@nestjs/common';
import { GeoService } from './service';
import { Country, State } from './schemas';

@Controller('/')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get('countries')
  getAllCountries(): Country[] {
    return this.geoService.getAllCountries();
  }

  @Get('countries/:country')
  getCountry(@Param() params): Country {
    return this.geoService.getCountry(params.id);
  }

  @Get('states')
  getAllStates(): State[] {
    return this.geoService.getAllStates();
  }
}
