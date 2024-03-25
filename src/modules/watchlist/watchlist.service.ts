import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist) private readonly watchlistModel: typeof Watchlist,
  ) {}

  async createAsset(dto, user): Promise<CreateAssetResponse> {
    const newAsset = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId,
    };
    await this.watchlistModel.create(newAsset);
    return newAsset;
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    await this.watchlistModel.destroy({
      where: {
        id: assetId,
        user: userId,
      },
    });
    return true;
  }
}
