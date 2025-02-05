export type NativeAddress = "native";

export interface Chain {
  name: string;
  evmChainId?: number;
  rpcUrl: string;
  networkEnum: NetworkEnum;
  isTestnet: boolean;
  blockExplorerUrl: string;
  nativeCurrency: NativeEVMToken;
  tokens: ERC20Token[];
}

export enum NetworkEnum {
  BASE_MAINNET = "base-mainnet",
  BASE_SEPOLIA = "base-sepolia",
}

export interface ERC20Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  chain: NetworkEnum;
}

export interface NativeEVMToken extends ERC20Token {
  address: NativeAddress;
}

export type Token = ERC20Token | NativeEVMToken;
