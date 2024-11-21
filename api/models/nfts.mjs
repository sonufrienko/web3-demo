import mongoose from 'mongoose';

const NftsSchema = new mongoose.Schema({
  contractAddress: {
    type: String,
    required: true,
    lowercase: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  name: String,
  description: String,
  imageUrl: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

NftsSchema.index({ contractAddress: 1, tokenId: 1 }, { unique: true });
export const NftsModel = mongoose.model('nfts', NftsSchema);
