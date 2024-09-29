import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Entity, Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository <Manager>
  ){}
  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find()
  }

  findOne(id: string) {
    const manager=this.managerRepository.findOneBy({
      managerId: id
    })
    if(!manager) throw new NotFoundException("No manager found ")
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId:id,
      ...UpdateManagerDto
    })

    return this.managerRepository.save(managerToUpdate)
    }

  remove(id: string) {
    return this.managerRepository.delete({
      managerId:id 
    })
}
