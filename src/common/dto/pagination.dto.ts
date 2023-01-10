import { IsInt, IsNumber, IsOptional, IsPositive, Min,  } from 'class-validator';

export class PaginationDto{

    @IsOptional()
    @IsPositive()
    @IsInt()
    @Min(1)
    public limit?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    public offset?: number;
}