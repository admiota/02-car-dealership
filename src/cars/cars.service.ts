import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars:Car[] = [
        {
            id: uuid(),
            brand: 'Ford',
            model: 'Fiesta'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Wrangler'
        }
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id:string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
        return car;
    }

    create(dto: CreateCarDto): Car {
        const newCar: Car = {
            id: uuid(),
            ...dto
            //brand: dto.brand,
            //model: dto.model,
        };
        this.cars.push(newCar);
        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carUpdate: Car = this.findOneById(id);
        if (updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException(`Car id is not valid inside body`);
        }
        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carUpdate = { ...carUpdate, ...updateCarDto, id };
                return carUpdate;
            }
            return car;
        });
        return carUpdate;
    }

    delete(id:string) {
        const carDelete = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        return carDelete;
    }
}
