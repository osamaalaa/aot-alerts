import { ItemEntity } from './Item.entity';
import { IEntity } from './interface/Entity';

const ENTITIES = {
    ITEM:'item'
}
export class EntityFactory{
    public static createEntity(entity:string):IEntity{
        switch(entity){
            case ENTITIES.ITEM : return new ItemEntity();
            default:throw new Error("Entity is not defined. Please create one entity")
        }
    }
}