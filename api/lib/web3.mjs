import Web3 from 'web3';
import 'dotenv/config';

const web3 = new Web3(process.env.INFURA_URL);
const ERC721_ABI = [
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export async function getNFTMetadata(contractAddress, tokenId) {
  try {
    const contract = new web3.eth.Contract(ERC721_ABI, contractAddress);
    const tokenURI = await contract.methods.tokenURI(tokenId).call();

    // Handle IPFS URIs
    const url = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch metadata');

    const metadata = await response.json();
    return {
      name: metadata.name,
      description: metadata.description,
      imageUrl: metadata.image?.replace('ipfs://', 'https://ipfs.io/ipfs/'),
    };
  } catch (error) {
    throw new Error(`Failed to fetch NFT metadata: ${error.message}`);
  }
}
