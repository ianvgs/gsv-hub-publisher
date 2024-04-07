/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Client } from 'solr-client';
import { UserDto } from 'src/dto/usert.dto';
import axiosNest from 'src/utils/axios';
/* import axiosNest from 'src/utils/axios'; */

interface INItem {
  id: string;
  TX_DCR_SIS: string;
  TX_URL_SIS: string;
  TX_TAG_PSQ: string;
  TX_RSM_DCR: string;
  IND_SIS_ATI: number;
  CD_PRF_DEPE_RSP?: number; // Adicione '?' se a propriedade for opcional
  NM_PRF_RSP?: string; // Adicione '?' se a propriedade for opcional
}

@Injectable()
export class SolrService {
  private readonly solrBaseInClient: Client;
  private readonly solrFerramentasClient: Client;

  constructor() {
    this.solrBaseInClient = new Client({
      host: 'pxl1gsv00020.dispositivos.bb.com.br',
      port: 8986,
      core: 'basein',
      solrVersion: 9.5,
    });
    this.solrFerramentasClient = new Client({
      host: 'pxl1gsv00020.dispositivos.bb.com.br',
      port: 8986,
      core: 'ferramentas',
      solrVersion: 9.5,
    });
  }

  async searchIn(query: string, user: UserDto): Promise<any> {
    const createQuery = this.solrBaseInClient
      .query()
      .requestHandler('select')
      .q(`${query}`)
      .start(0)
      .rows(1);

    const results: any = await this.solrBaseInClient.search(createQuery);

    const formatDados: any = results.response.docs?.map((el) => ({
      in: el?.IN,
      nome: el?.TX_TIT_ASNT,
      link: `https://intranet1.bb.com.br/inc/conteudoAssunto.ctr?comando=visualizarConteudoBuscador&codigoAssunto=${el?.IN}&numeroConteudo=1057&versaoConteudo=248&naturezaInformacaoConteudo=1&tipoConteudo=1&secao=`,
    }));
    return { tipo: 'IN', dados: formatDados };
  }

  async searchFerramentas(query: string, user: UserDto): Promise<any> {
    const createQuery = this.solrFerramentasClient
      .query()
      .requestHandler('select')
      .q(`${query}`)
      .start(0)
      .rows(1);

    const results: any = await this.solrFerramentasClient.search(createQuery);
    console.log('results.response.docs', results.response.docs);

    const formatDados = results.response.docs?.map((el) => ({
      nome: el?.TX_DCR_SIS,
      link: el?.TX_URL_SIS,
    }));

    return {
      tipo: 'Ferramentas',
      dados: formatDados,
    };
  }

  async orquestrador(query: string, user: UserDto): Promise<any> {
    const [searchIn, searchFerramentas] = await Promise.all([
      this.searchIn(query, user),
      this.searchFerramentas(query, user),
    ]);

    console.log('searchIn', searchIn);
    console.log('searchFerramentas', searchFerramentas);

    return [searchIn, searchFerramentas];
  }
}
