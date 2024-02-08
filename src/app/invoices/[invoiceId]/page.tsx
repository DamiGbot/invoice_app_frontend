import Card from "@/app/components/Card";
import InvoiceStatus from "@/app/components/UI/InvoiceStatus";
import data from "../../helpers/data.json";
import { Invoice } from "@/app/types/Invoice";
import { formatDate } from "@/app/helpers/formatDate";
import { InvoiceParams } from "@/app/types/Params";

type InoviceDetailsProps = {
	params: InvoiceParams;
};

export default function InvoiceDetails({ params }: InoviceDetailsProps) {
	// filter data by id
	const invoiceData = data.find((el) => el.id === params.invoiceId) as Invoice;
	// console.log(invoiceData);

	return (
		<>
			<Card className="flex flex-row items-center justify-between mt-[32px]">
				<p className="font-medium text-[15px] tracking-[-0.25px] text-[#858BB2] leading-[15px]">
					Status
				</p>
				<InvoiceStatus status="pending" />
			</Card>

			<Card className="mt-[16px] mb-[48px] ">
				<div>
					<p className="font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]">
						<span className="text-[#7E88C3]">#</span> {invoiceData.id}
					</p>
					<p className="font-medium text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px]">
						{invoiceData.description}
					</p>

					<p className="font-medium text-[11px] tracking-[-0.23px] text-[#7E88C3] leading-[18px] mt-[30px]">
						{invoiceData.senderAddress.street}
						<br />
						{invoiceData.senderAddress.city}
						<br />
						{invoiceData.senderAddress.postCode}
						<br />
						{invoiceData.senderAddress.country}
					</p>
				</div>

				<div className="flex gap-[41px] mt-[31px]">
					<div>
						<p className="font-medium text-[11px] tracking-[-0.23px] text-[#7E88C3] leading-[18px]">
							Invoice Data
						</p>
						<p className="mt-[12px] font-bold text-[15px] tracking-[-0.31px] text-[#0C0E16] leading-[20px]">
							{formatDate(invoiceData.createdAt)}
						</p>

						<p className="font-medium text-[11px] tracking-[-0.23px] text-[#7E88C3] leading-[18px] mt-[30px]">
							Payment Due
						</p>
						<p className="mt-[12px] font-bold text-[15px] tracking-[-0.31px] text-[#0C0E16] leading-[20px]">
							{formatDate(invoiceData.paymentDue)}
						</p>
					</div>

					<div>
						<p className="font-medium text-[11px] tracking-[-0.23px] text-[#7E88C3] leading-[18px]">
							Bill To
						</p>
						<p className="mt-[12px] font-bold text-[15px] tracking-[-0.31px] text-[#0C0E16] leading-[20px]">
							{invoiceData.clientName}
						</p>

						<p className="mt-[8px] font-medium text-[11px] tracking-[-0.23px] text-[#7E88C3] leading-[18px]">
							{invoiceData.clientAddress.street}
							<br />
							{invoiceData.clientAddress.city}
							<br />
							{invoiceData.clientAddress.postCode}
							<br />
							{invoiceData.clientAddress.country}
						</p>
					</div>
				</div>

				<div className="mt-[32px]">
					<p className="font-medium text-[11px] tracking-[-0.23px] text-[#7E88C3] leading-[18px]">
						Sent to
					</p>
					<p className="mt-[12px] font-bold text-[15px] tracking-[-0.31px] text-[#0C0E16] leading-[20px]">
						{invoiceData.clientEmail}
					</p>
				</div>

				<div className="bg-[#F9FAFE] mt-[40px] p-[24px] rounded-t-[8px]">
					<div className="flex flex-col gap-[24px]">
						{invoiceData.items.map((item) => {
							return (
								<div
									key={item.name}
									className="flex justify-between items-center"
								>
									<div>
										<p className="font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]">
											{item.name}
										</p>
										<p className="mt-[8px] font-bold text-[12px] tracking-[-0.25px] text-[#7E88C3] leading-[15px]">
											{item.quantity} x &#163; {item.price}
										</p>
									</div>
									<div>
										<p className="font-bold text-[12px] tracking-[-0.25px] text-[#0C0E16] leading-[15px]">
											&#163; {item.total}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="bg-[#373B53] p-[24px] text-[#ffffff] flex justify-between items-center rounded-b-[8px]">
					<p>Grand Total</p>
					<p>&#163; {invoiceData.total}</p>
				</div>
			</Card>
		</>
	);
}
