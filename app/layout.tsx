import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PreferredSourceChip } from "@/components/PreferredSource";

const siteUrl = "https://www.flostudios.ai";

const title = "FloStudios: Where AI meets creativity";

const description =
  "AI-enhanced learning, content, and experiences for education in artificial intelligence, robotics, and emerging tech. A FloLabs Innovations Group studio.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title,
  description,

  applicationName: "FloStudios",

  keywords: [
    "FloStudios",
    "AI education",
    "creative learning",
    "robotics",
    "emerging tech",
    "FloLabs",
  ],

  authors: [{ name: "FloLabs Innovations Group" }],

  creator: "FloStudios",
  publisher: "FloLabs Innovations Group",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "m5NkfhDlwfCKi3g5U2gyhV4eHmiJrtY0l0NfosowGao",
  },

  icons: {
    icon: [
      {
        url: "/flostudios-logo.svg",
        type: "image/svg+xml",
      },
    ],

    shortcut: "/flostudios-logo.svg",

    apple: [
      {
        url: "/flostudios-logo.svg",
        type: "image/svg+xml",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "FloStudios",

    title,
    description,

    locale: "en_US",

    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FloStudios: Where AI meets creativity",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>

        {/* Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('theme');

                  if(t !== 'light' && t !== 'dark'){
                    t = window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'dark'
                      : 'light';
                  }

                  document.documentElement.dataset.theme = t;

                } catch(e){}
              })();
            `,
          }}
        />


        {/* Google Tag Manager Header */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];

                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event:'gtm.js'
                });

                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';

                j.async=true;

                j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;

                f.parentNode.insertBefore(j,f);

              })(window,document,'script','dataLayer','GTM-KSPHX499');
            `,
          }}
        />


        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />

      </head>


      <body>

        {/* Google Tag Manager Body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KSPHX499"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>


        {children}
        <PreferredSourceChip />

      </body>

    </html>
  );
}
