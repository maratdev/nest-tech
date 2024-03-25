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
    try {
      const newAsset = {
        user: user.id,
        name: dto.name,
        assetId: dto.assetId,
      };
      await this.watchlistModel.create(newAsset);
      return newAsset;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    try {
      await this.watchlistModel.destroy({
        where: {
          id: assetId,
          user: userId,
        },
      });
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
