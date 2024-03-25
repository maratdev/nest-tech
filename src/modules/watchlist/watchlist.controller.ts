import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({
    status: 201,
    description: 'Returns a list of assets',
    type: CreateAssetResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset(
    @Body() assetDto: WatchlistDto,
    @Req() req,
  ): Promise<CreateAssetResponse> {
    return this.watchlistService.createAsset(assetDto, req.user);
  }

  @ApiTags('API')
  @ApiResponse({
    status: 200,
    description: 'Deletes an asset',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id') assetId: string, @Req() req): Promise<boolean> {
    const { id } = req.user;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
