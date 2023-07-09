import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

  constructor( @InjectModel(User.name) private userModel: Model<User> ) { }
  
  async create(createUserDto: CreateUserDto) : Promise<User>{
    // console.log(createUserDto);
    
    try{
      const newUser = new this.userModel(createUserDto);

      //ToDo: Encrypt password
  
      //ToDo: Save User
  
      //ToDo: Gen JWT

      return await newUser.save();
    } catch ( error ) {
      if( error.code === 11000 ) throw new BadRequestException(`${ createUserDto.email } already exists!`);
      throw new InternalServerErrorException('Something went wrong!!!');
    }

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
