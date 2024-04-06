import { Module } from '@nestjs/common';
import { SolrController } from './solr.controller';
import { SolrService } from './solr.service';

@Module({
  controllers: [SolrController],
  providers: [SolrService],
})
export class SolrmoduleModule {}
