import Head from "next/head";

export default function MetaTags() {
  return (
    <Head>
      <title>BEEZ PRODUCTIONS | Broadcasting & Media Production Company</title>
      <meta
        name="description"
        content="BEEZ PRODUCTIONS is a professional broadcasting and media production company based in Baghdad, specializing in high-quality video and audio content."
      />
      <meta
        name="keywords"
        content="Beez Productions, Broadcasting Company, Media Production, Video Production, Audio Production, Film Production, Baghdad Media, Iraq Broadcasting"
      />
      <meta name="author" content="Malamih - شركة ملامح" />

      <meta
        property="og:title"
        content="BEEZ PRODUCTIONS | Broadcasting & Media Production Company"
      />
      <meta
        property="og:description"
        content="Specialists in broadcasting and media production. Located in Baghdad, serving clients with professional audio and video content."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/OG.png" />

      <meta name="twitter:card" content="/OG.png" />
      <meta name="twitter:title" content="BEEZ PRODUCTIONS" />
      <meta
        name="twitter:description"
        content="Broadcasting & Media Production Company in Baghdad."
      />
      <meta name="twitter:image" content="/OG.png" />
    </Head>
  );
}
