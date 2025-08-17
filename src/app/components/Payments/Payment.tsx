import Image from "next/image";
const Payment = ({src}:{src:string}) => {
    return (
        <div className="payment">
            <Image src={src} alt="payment" width={144} height={88} />
        </div>
    )
}

export default Payment;