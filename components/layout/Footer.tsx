"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { images } from "@/lib/images"

export default function Footer() {
  const pathname = usePathname()
  const showCareersLine = pathname === "/about"

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
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="text-sm text-midBlue">
            Premium operating partner for consumer brands.
          </p>
          {showCareersLine && (
            <p className="text-sm text-midBlue sm:text-right">
              Interested in joining the team? Send your resume to{" "}
              <a
                href="mailto:shane@brykerco.com"
                className="text-midBlue underline decoration-midBlue/50 underline-offset-2 transition-colors hover:text-white"
              >
                shane@brykerco.com
              </a>
            </p>
          )}
        </div>
        <p className="mt-8 text-xs text-blueGray">
          &copy; {new Date().getFullYear()} Bryker & Co. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
