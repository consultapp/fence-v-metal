// form_subject

import { FenceProflist, FenceShtaketnik } from "@/fence";

export async function sendFenceForm(
  form: HTMLFormElement,
  calculations: ReturnType<
    FenceProflist["getCalculation"] | FenceShtaketnik["getCalculation"]
  >
) {
  console.dir(form);

  const data = new FormData(form);
  data.append("action", "calc_fence");
  data.append("table", "<h1>Table H1</h1>");
  data.append("form_subject", "Тестовый расчет из калькулятора");

  const response = await fetch(
    `${window.__INITIAL_STATE__.url}/wp-admin/admin-ajax.php`,
    {
      method: "POST",
      body: JSON.stringify({ data, calculations }),
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}
