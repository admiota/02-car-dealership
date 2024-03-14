import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateCarDto{
    private constructor() { }
    
    @IsString() @IsUUID() @IsOptional()
    public readonly id?: string;

    @IsString() @IsOptional()
    public readonly brand?: string;

    @IsString() @IsOptional()
    public readonly model?: string;
}