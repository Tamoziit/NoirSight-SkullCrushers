import ThreeBackground from "@/components/ThreeBackground";
import { useParams, useSearchParams } from "react-router-dom";

const PaymentCancel = () => {
	const { sessionId } = useParams();
	console.log(sessionId)

	return (
		<div className="min-h-screen bg-black text-white">
			<ThreeBackground />
		</div>
	)
}

export default PaymentCancel;