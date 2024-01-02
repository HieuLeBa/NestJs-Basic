import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'description không được để trống' })
    description: string;

    @IsNotEmpty({ message: 'isActive không được để trống' })
    @IsBoolean({ message: 'isActive la boolean cmm' })
    isActive: boolean;

    @IsNotEmpty({ message: 'Permissions không được để trống' })
    @IsMongoId({ each: true, message: "Permissions is mongo object id"})
    @IsBoolean({ message: 'Permissions la Array Ngu vcl' })
    permissions: mongoose.Schema.Types.ObjectId[];
}
