import { DeepPartial, ObjectLiteral, Repository } from 'typeorm'
import { QueryErrorCatcher } from '../decorator'

export abstract class CommonRepository<ENTITY extends ObjectLiteral, PK_TYPE> {
  constructor(
    private readonly repository: Repository<ENTITY>,
    protected readonly pkField: string,
  ) {}

  @QueryErrorCatcher()
  async insert(entity: DeepPartial<ENTITY>): Promise<PK_TYPE> {
    const inserted = await this.repository.insert(
      this.repository.create(entity),
    )
    return inserted.identifiers[0][this.pkField]
  }

  async findOneBy(
    where: Parameters<Repository<ENTITY>['findOneBy']>[0],
  ): Promise<ENTITY | null> {
    return this.repository.findOneBy(where)
  }

  async findBy(
    where: Parameters<Repository<ENTITY>['findBy']>[0],
  ): Promise<ENTITY[]> {
    return this.repository.findBy(where)
  }

  async update(
    pk: PK_TYPE,
    updates: Parameters<Repository<ENTITY>['update']>[1],
  ) {
    return this.repository.update(pk as any, updates)
  }
}
