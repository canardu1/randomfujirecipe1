// XMP template strings
export const XMP_HEADER = `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 7.0-c000 1.000000, 0000/00/00-00:00:00        ">`;

export const XMP_FOOTER = `</x:xmpmeta>
<?xpacket end="w"?>`;

export const createXMPBody = (settings: Record<string, string | number>) => `
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
    xmlns:xmp="http://ns.adobe.com/xap/1.0/">
${Object.entries(settings)
  .map(([key, value]) => `   <crs:${key}>${value}</crs:${key}>`)
  .join('\n')}
  </rdf:Description>
 </rdf:RDF>`;