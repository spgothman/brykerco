import type { Metadata } from "next"

export const SITE_NAME = "Bryker & Co."
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://brykerco.com"

const DEFAULT_DESCRIPTION =
  "Premium operating partner for high-growth consumer brands."

type PageMetadataOptions = {
  title: string
  description?: string
  path?: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path || "/"
  const url = `${SITE_URL}${canonicalPath}`
  const fullTitle =
    path === "/" ? { absolute: SITE_NAME } : title

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: typeof fullTitle === "string" ? fullTitle : SITE_NAME,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: typeof fullTitle === "string" ? fullTitle : SITE_NAME,
      description,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
