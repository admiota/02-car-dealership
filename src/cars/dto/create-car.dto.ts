import { IsString, IsUUID, MinLength } from "class-validator";

export class CreateCarDto{
    private constructor() { }
    
    //@IsUUID()
    //public readonly id: string;
    @IsString()
    public readonly brand: string;
    @IsString()
    public readonly model: string;
}