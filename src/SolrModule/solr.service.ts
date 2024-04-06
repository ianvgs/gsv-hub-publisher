/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client, Query } from 'solr-client';
/* import SolrNode from 'solr-client'; */

@Injectable()
export class SolrService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      host: '10.2.98.118',
      port: 8983,
      core: 'basein-papeis',
      solrVersion: 9.5,
    });
  }

  async search(query: string /* , filters: any */): Promise<any> {
    const createQuery = this.client
      .query()
      .q({ TX_PRGF_CTU: query })
      .start(0)
      .rows(10);
    /* for (const filter in filters) { */
    /*       solrQuery.addFilter(filter, filters[filter]); */
    /*  } */

    const results = await this.client.search(createQuery);
    console.log(results.response.docs);
    return;
  }
}
