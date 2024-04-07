import { Module } from '@nestjs/common';
import { SolrController } from './solr.controller';
import { SolrService } from './services/solr.service';
import { UserService } from './services/user.service';

@Module({
  controllers: [SolrController],
  providers: [SolrService, UserService],
})
export class SolrmoduleModule {}
