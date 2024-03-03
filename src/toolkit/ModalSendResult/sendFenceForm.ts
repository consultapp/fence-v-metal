import { FenceProflist, FenceShtaketnik } from "@/fence";
import { Ceil } from "@/functions";
import { getUnits } from "@/components/Calculator/getUnits";

type TCalculations = ReturnType<
  FenceProflist["getCalculation"] | FenceShtaketnik["getCalculation"]
>;

export async function sendFenceForm(
  form: HTMLFormElement,
  calculations: TCalculations
) {
  console.dir(form);

  const data = new FormData(form);
  const isAgree = data.getAll("isAgree");
  console.log("isAgree", isAgree);

  if (isAgree && isAgree.length && isAgree[0] === "on") {
    console.log("isAgree", isAgree);
    data.append("action", "calc_fence");
    data.append("table", "<h1>Table H1</h1>");
    data.append("form_subject", "Тестовый расчет из калькулятора");
    data.append("calculationsTable", getEmailResultTableHTML(calculations));

    const response = await fetch(
      `${window.__INITIAL_STATE__.url}/wp-admin/admin-ajax.php`,
      {
        method: "POST",
        body: data,
        cache: "no-cache",
      }
    );

    return response.json();
  }
}

function getRowHTML(a: string, b: string, c: string) {
  return `    <tr>
  <td align="left">${a}</td>
  <td align="center">${b}</td>
  <td align="center">${c}</td>
</tr>`;
}

function getEmailResultTableHTML(calculations: TCalculations): string {
  const { cMaterial, cPillar, cJoist, cScrew, cStub } = calculations;
  return `
  <table
      role="presentation"
      style="width:100%;border:0;border-spacing:0;"
    >
    ${getRowHTML("Товар", "Количество", "Цена")}
    ${getRowHTML(
      cMaterial?.product.name ?? "",
      `${cMaterial?.count} ${getUnits(cMaterial?.countInfo ?? "")}`,
      `${cMaterial?.totalPrice}`
    )}
    ${getRowHTML(
      cPillar?.product.name ?? "",
      `${cPillar?.count} м`,
      `${cPillar?.totalPrice}`
    )}
    ${getRowHTML(
      cJoist?.product.name ?? "",
      `${cJoist?.meters} м`,
      `${cJoist?.totalPrice}`
    )}
    ${getRowHTML(
      cScrew?.product.name ?? "",
      `${cScrew?.count} шт.`,
      `${cScrew?.totalPrice}`
    )}
    ${getRowHTML(
      cStub?.product.name ?? "",
      `${cStub?.count} шт.`,
      `${cStub?.totalPrice}`
    )}
    ${getRowHTML(
      "Итого",
      "",
      `${Ceil(
        (cMaterial?.totalPrice ?? 0) +
          (cPillar?.totalPrice ?? 0) +
          (cJoist?.totalPrice ?? 0) +
          (cScrew?.totalPrice ?? 0) +
          (cStub?.totalPrice ?? 0)
      )}
    &nbsp;руб.`
    )}
    </table>
  `;
}

// Request URL:
// https://metal.webcartel.ru/wp-admin/admin-ajax.php
// Request Method:
// POST
// Status Code:
// 200 OK
// Remote Address:
// 185.22.155.62:443
// Referrer Policy:
// strict-origin-when-cross-origin
// Access-Control-Allow-Credentials:
// true
// Access-Control-Allow-Origin:
// https://metal.webcartel.ru
// Alt-Svc:
// h3=":443"; ma=2592000, h3-29=":443"; ma=2592000, h3-Q050=":443"; ma=2592000, h3-Q046=":443"; ma=2592000, h3-Q043=":443"; ma=2592000, quic=":443"; ma=2592000; v="43,46"
// Cache-Control:
// no-cache, must-revalidate, max-age=0
// Content-Encoding:
// br
// Content-Length:
// 140
// Content-Type:
// text/html; charset=UTF-8
// Date:
// Thu, 29 Feb 2024 12:54:34 GMT
// Expires:
// Wed, 11 Jan 1984 05:00:00 GMT
// Referrer-Policy:
// strict-origin-when-cross-origin
// Server:
// LiteSpeed
// Vary:
// Accept-Encoding,User-Agent
// X-Content-Type-Options:
// nosniff
// X-Frame-Options:
// SAMEORIGIN
// X-Robots-Tag:
// noindex
// :authority:
// metal.webcartel.ru
// :method:
// POST
// :path:
// /wp-admin/admin-ajax.php
// :scheme:
// https
// Accept:
// application/json, text/javascript, */*; q=0.01
// Accept-Encoding:
// gzip, deflate, br, zstd
// Accept-Language:
// ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7
// Cache-Control:
// no-cache
// Content-Length:
// 860
// Content-Type:
// multipart/form-data; boundary=----WebKitFormBoundaryPafarj5OfFCGeXqa
// Cookie:
// wp-settings-1=libraryContent%3Dbrowse%26ampampampeditor%3Dtinymce%26ampampampimgsize%3Dfull%26ampampamphidetb%3D1%26ampampampposts_list_mode%3Dlist%26ampampeditor%3Dtinymce%26ampampposts_list_mode%3Dlist%26ampampuploader%3D1%26ampeditor%3Dtinymce%26editor%3Dhtml%26post_dfw%3Doff%26hidetb%3D1%26advImgDetails%3Dshow%26imgsize%3Dfull%26editor_plain_text_paste_warning%3D1; wp-settings-time-1=1707645821; basket=1529x91-678x200-517x98.4-1220x91
// Origin:
// https://metal.webcartel.ru
// Pragma:
// no-cache
// Referer:
// https://metal.webcartel.ru/
// Sec-Ch-Ua:
// "Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"
// Sec-Ch-Ua-Mobile:
// ?0
// Sec-Ch-Ua-Platform:
// "macOS"
// Sec-Fetch-Dest:
// empty
// Sec-Fetch-Mode:
// cors
// Sec-Fetch-Site:
// same-origin
// User-Agent:
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36
