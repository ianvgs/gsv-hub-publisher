/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client } from 'solr-client';
import { UserDto } from 'src/dto/usert.dto';

@Injectable()
export class SolrService {
  private readonly baseInClient: Client;
  /*   private readonly baseGsvCliente: Client;
  private readonly baseExternos: Client; */

  constructor() {
    this.baseInClient = new Client({
      host: '10.2.98.118',
      port: 8983,
      core: 'basein-papeis',
      solrVersion: 9.5,
      secure: false,
    });
  }

  async search(query: string, user: UserDto): Promise<any> {
    /*    console.log('User', user); */

    const createQuery = this.baseInClient
      .query()
      .q({ TX_PRGF_CTU: query /* , PAPEL: [user.papeis] */ })
      .qop('OR')
      .q({ CD_NVL_PRGF_CTU: query })
      /*     .matchFilter('PAPEL', [user.papeis])  */

      /*       .matchFilter('PAPEL', ['I168', 'I166']) */
      /*    .df({'TX_PRGF_CTU', 'CD_NVL_PRGF_CTU'}) */
      //ASsim ele faz a query que tenha nos dois campos e nao encontra
      /*   SELECT WHERE */
      /*         .q({ '*': '*' })
        .fq([
          { field: 'id', value: 100 },
          { field: 'n
          ame', value: 'John' },
        ]) */
      //aparentemente o fq aplica filtro no resultado do q
      /*   .fq({ category_id: { in: [1, 2, 3] } }) */
      /*   .fq('CD_NVL_PRGF_CTU', 'TX_PRGF_CTU' :query) */
      /*   .matchFilter('PAPEL', 'I168') */ //the fq (Filter Query)
      /*   .fl(['title_t']) //the fl (field List) */
      .start(0)
      .rows(100);
    /* for (const filter in filters) { */
    /*       solrQuery.addFilter(filter, filters[filter]); */
    /*  } */

    //FQ -> .fq() aplicar filtro nos resultados da primeira .q()
    /*     client.query()
      .q({ TX_PRGF_CTU: query })
      .fq({ CD_NVL_PRGF_CTU: query })
      .then((response) => {
          console.log(response.response.docs);
      })
      .catch((err) => {
          console.error(err);
      }); */

    const results = await this.baseInClient.search(createQuery);
    /*     console.log(results.response.docs); */
    return results.response.docs;
  }
}
