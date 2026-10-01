import assert from "node:assert/strict";
import { test } from "node:test";
import { isValidBrPhone, maskPhone, validateFiles, validateForm } from "./prescription.ts";

test("telefone BR", () => {
  assert.ok(isValidBrPhone("(19) 99920-4440"));
  assert.ok(isValidBrPhone("+55 19 99920-4440"));
  assert.ok(isValidBrPhone("1932345678"));
  assert.ok(!isValidBrPhone("99920-4440"));
  assert.ok(!isValidBrPhone("(00) 99920-4440"));
  assert.equal(maskPhone("19999204440"), "(19) 99920-4440");
});

test("arquivos", () => {
  const ok = { name: "receita.PDF", type: "application/pdf", size: 1000 };
  assert.equal(validateFiles([ok]), null);
  assert.ok(validateFiles([]));
  assert.ok(validateFiles([{ ...ok, name: "x.exe", type: "application/x-msdownload" }]));
  assert.ok(validateFiles([{ ...ok, type: "image/png" }]));
  assert.ok(validateFiles([{ ...ok, size: 5 * 1024 * 1024 }]));
});

test("formulário exige consentimento", () => {
  const base = { name: "Ana", whatsapp: "19999204440", email: "", consent: false, files: [{ name: "a.jpg", type: "image/jpeg", size: 10 }] };
  assert.deepEqual(Object.keys(validateForm(base)), ["consent"]);
  assert.deepEqual(validateForm({ ...base, consent: true }), {});
});
