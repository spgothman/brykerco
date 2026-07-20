import Image from "next/image"
import { images } from "@/lib/images"

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Image
          src={images.logoWhite}
          alt="Bryker & Co."
          width={2172}
          height={724}
          className="h-[50px] w-auto"
        />
        <p className="mt-2 text-sm text-midBlue">
          Premium operating partner for consumer brands.
        </p>
        <p className="mt-8 text-xs text-blueGray">
          &copy; {new Date().getFullYear()} Bryker & Co. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
