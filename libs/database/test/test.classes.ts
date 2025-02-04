import { Injectable, Module } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseModule } from '@slibs/database'
import {
  Column,
  Entity,
  FindManyOptions,
  FindOptionsWhere,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm'

@Entity({ name: 'test' })
export class TestEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id!: number

  @Column({ type: 'varchar' })
  name!: string
}

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {}

  async insert(e: Pick<TestEntity, 'name'>) {
    const entity = this.testRepository.create(e)
    const affected = await this.testRepository.insert(entity)
    return affected.identifiers[0]['id']
  }

  async findOneBy(options: FindOptionsWhere<TestEntity>) {
    return this.testRepository.findOneBy(options)
  }

  async find(options: FindManyOptions<TestEntity>) {
    return this.testRepository.find(options)
  }

  async update(id: number, e: Omit<TestEntity, 'id'>) {
    await this.testRepository.update(id, e)
  }

  async delete(id: number) {
    await this.testRepository.delete(id)
  }
}

@Module({
  imports: [DatabaseModule.forFeature([TestEntity])],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
