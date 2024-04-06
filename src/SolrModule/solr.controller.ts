/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SolrService } from './solr.service';

@Controller('solr')
export class SolrController {
  constructor(private readonly solrService: SolrService) {}

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('filters') filters: string,
  ): Promise<any> {
    const parsedFilters = JSON.parse(filters);
    return await this.solrService.search(query, parsedFilters);
  }

  /*   @Get('search')
  async searchProducts(@Query('query') query: string): Promise<any> {
    try {
      const results = await this.solrService.searchProducts(query);
      return { success: true, results };
    } catch (error) {
      return { success: false, error: error.message };
    }
  } */
}
