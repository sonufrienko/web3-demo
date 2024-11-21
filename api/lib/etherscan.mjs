import 'dotenv/config';

const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

export class EtherscanService {
  static async getLastTransactions(address, limit = 5) {
    try {
      const url = new URL(ETHERSCAN_API_URL);
      url.searchParams.append('module', 'account');
      url.searchParams.append('action', 'txlist');
      url.searchParams.append('address', address);
      url.searchParams.append('startblock', '0');
      url.searchParams.append('endblock', '99999999');
      url.searchParams.append('page', '1');
      url.searchParams.append('offset', limit.toString());
      url.searchParams.append('sort', 'desc');
      url.searchParams.append('apikey', ETHERSCAN_API_KEY);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch from Etherscan');
      }

      const data = await response.json();
      if (data.status !== '1') {
        throw new Error(data.message || 'Etherscan API error');
      }

      return data.result.map((tx) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: tx.value,
        timestamp: new Date(parseInt(tx.timeStamp) * 1000),
        blockNumber: parseInt(tx.blockNumber),
        gasPrice: tx.gasPrice,
        gasUsed: tx.gasUsed,
      }));
    } catch (error) {
      throw new Error(`Etherscan API error: ${error.message}`);
    }
  }
}
