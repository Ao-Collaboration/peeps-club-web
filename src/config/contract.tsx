export const getPassportContractId = (chainId?: number): string => chainId === 4 ? '0x33E0fF47866389311795deF4478c824540771fF9' : '0xc55D1b888ae9D5b154ae5296D7c1795B0f09Ae2f'
export const getPeepsContractId = (chainId?: number): string => chainId === 4 ? '0x86d2123524C9b0326688dB6D785307Eb221e1856' : '0x383A7B0488756b5618f4CE2bCBc608ad48f09A57'
export const getTreatContractId = (chainId?: number): string => chainId === 5 ? '0x6c3c12152f2e9D0c7570b4fE7267Bad980C37a76' : ''
export const validChainIds = [1, 5, 4]
