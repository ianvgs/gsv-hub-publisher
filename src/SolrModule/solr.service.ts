/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client, Query } from 'solr-client';
import SolrNode from 'solr-client';
import solrConfig from './solr.config';

@Injectable()
export class SolrService {
  private readonly client: Client;
  /*   private solrClient = SolrNode.createClient(solrConfig); */

  constructor() {
    this.client = new Client({
      host: 'localhost',
      port: 8983,
      core: 'my_core',
    });
  }

  async search(query: string, filters: any): Promise<any> {
    const solrQuery = new Query();
    solrQuery.q(query);

    for (const filter in filters) {
/*       solrQuery.addFilter(filter, filters[filter]); */
    }

    return await this.client.search(solrQuery);
  }

  /*   searchProducts(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const solrQuery = this.solrClient.createQuery()
        .q(query)
        .start(0)
        .rows(10);

      this.solrClient.search(solrQuery, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.response.docs);
        }
      });
    }); */
}
