import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    /*{
      id: uuid(),
      name: 'Mercedes',
      createdAt: new Date().getTime()
    }*/
  ]

  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand) throw new NotFoundException(`Couldn´t find brand with id: '${id}'`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandUpdate = this.findOne(id);

    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandUpdate = {
          ...brandUpdate,
          ...updateBrandDto,
          updatedAt: new Date().getTime(),
          id
        }
        return brandUpdate;
      }
      return brand;
    });
    return brandUpdate;
  }

  remove(id: string) {
    this.brands = this.brands.filter(brand => brand.id !== id);
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
    return this.brands;
  }
}
