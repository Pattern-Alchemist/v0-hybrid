export function orgJsonLd(){
  return {'@context':'https://schema.org','@type':'Organization',name:process.env.NEXT_PUBLIC_BRAND_NAME||'AstroKalki',url:process.env.NEXT_PUBLIC_SITE_URL,logo:`${process.env.NEXT_PUBLIC_SITE_URL}/logo.jpg`}
}
