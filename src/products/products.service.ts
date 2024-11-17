import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Entity, Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product;
  }

  findAll() {
    return this.productRepository.find({
      relations:{
        provider:true,
      }
    });
  }

  findOne(id: string) {
    const product= this.productRepository.findOne({
      where: {
        productId: id,
      },
      relations:{
        provider:true,
      }
    })
    if(!product) throw new NotFoundException()
      return product;
    
  }

  findByProvider(id: string) {
    return this.productRepository.findBy({
      provider:{
        providerId:id,

      }
    })
    /*const productsFound=this.products.filter((product)=>product.provider==id);
    if(productsFound.length==0) throw new NotFoundException()
      return productsFound; */
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate=await this.productRepository.preload({
      productId:id,
      ...updateProductDto
    })
    if(!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate);
    return productToUpdate;

  }

  remove(id: string) {
    this.findOne(id)
    this.productRepository.delete({
    productId:id,
    })
    return{
      message:'Objeto con Id ${id} eliminado'
    }
  }
}
