import { CardProps } from "@/types";
import Image from "next/image";

export function Card({ repo, imgSrc }: CardProps) {
    return (
        <div className="flex m-[-2]">
            <div className="m-1">
                <Image src={imgSrc} alt={`Repo card for ${repo}`} width={400} height={120} />
            </div>
        </div>
    )
}