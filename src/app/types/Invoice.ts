export type Address = {
	street: string;
	city: string;
	postCode: string;
	country: string;
};

export type Item = {
	name: string;
	quantity: number;
	price: number;
	total: number;
};

export type Invoice = {
	id: string;
	frontendId: string;
	createdAt: string;
	paymentDue: string;
	description: string;
	paymentTerms: number;
	clientName: string;
	clientEmail: string;
	status: string;
	senderAddress: Address;
	clientAddress: Address;
	items: Item[];
	total: number;
	isReady?: boolean;
};

// public string FrontendId { get; set; }

export type InvoiceRequestDto = {
	Description: string;
	PaymentTerms: number;
	ClientName: string;
	ClientEmail: string;
	isReady: boolean;
	SenderAddress: Address;
	ClientAddress: Address;
	Items: Item[];
};
