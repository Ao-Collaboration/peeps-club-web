export class SaleInfo {
	maxMint: number
	endTimestamp: number
	totalMinted: number
	tokenPrice: number
	txLimit: number

	constructor(saleInfo: number[]) {
		this.maxMint = saleInfo[0]
		this.endTimestamp = saleInfo[1]
		this.totalMinted = saleInfo[2]
		this.tokenPrice = saleInfo[3]
		this.txLimit = saleInfo[4]
	}
}
