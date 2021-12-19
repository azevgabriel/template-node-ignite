import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';

@Entity('cars')
class Car {

  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @Column()
  daily_rate: number;
  
  @Column()
  licence_plate: string;
  
  @Column()
  fine_amount: number;
  
  @Column()
  brand: string;
  
  @Column()
  available: boolean;
  
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export { Car };