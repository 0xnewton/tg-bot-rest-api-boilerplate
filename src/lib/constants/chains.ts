import {
  ETH_BASE_MAINNET,
  ETH_BASE_SEPOLIA,
  getChainERC20Tokens,
} from "./tokens";
import { Chain, NetworkEnum, NODE_ENV } from "../types";

export const SUPPORTED_CHAINS: Chain[] = [
  {
    name: "Base Mainnet",
    evmChainId: 8453,
    networkEnum: NetworkEnum.BASE_MAINNET,
    isTestnet: false,
    rpcUrl: "https://mainnet.base.org", // Todo: Pay for production url
    blockExplorerUrl: "https://base.blockscout.com/",
    nativeCurrency: ETH_BASE_MAINNET,
    tokens: getChainERC20Tokens(NetworkEnum.BASE_MAINNET),
  },
  {
    name: "Base Sepolia",
    evmChainId: 84532,
    networkEnum: NetworkEnum.BASE_SEPOLIA,
    isTestnet: true,
    rpcUrl: "https://sepolia.base.org", // Todo: Pay for production url
    blockExplorerUrl: "https://sepolia-explorer.base.org",
    nativeCurrency: ETH_BASE_SEPOLIA,
    tokens: getChainERC20Tokens(NetworkEnum.BASE_SEPOLIA),
  },
];

export const supportedChains = SUPPORTED_CHAINS.filter((c) => {
  if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
    return c.isTestnet;
  }
  return !c.isTestnet;
});
