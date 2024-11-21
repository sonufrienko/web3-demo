import express from 'express';
import { NftsModel } from '../models/nfts.mjs';
import { getNFTMetadata } from '../lib/web3.mjs';

const router = express.Router();

router.get('/nfts/:contractAddress/:tokenId', async (req, res) => {
  try {
    const { contractAddress, tokenId } = req.params;

    // check cache
    let metadata = await NftsModel.findOne({ contractAddress, tokenId });

    // 24h cache
    if (!metadata || Date.now() - metadata.updatedAt > 24 * 60 * 60 * 1000) {
      const freshMetadata = await getNFTMetadata(contractAddress, tokenId);

      metadata = await NftsModel.findOneAndUpdate(
        { contractAddress, tokenId },
        { ...freshMetadata, updatedAt: Date.now() },
        { new: true, upsert: true }
      );
    }

    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
