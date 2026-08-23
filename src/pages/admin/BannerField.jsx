import { useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";

import { BANNER_OPTIONS, resolveBanner } from "../../data/banners";
import { fileToBase64, validateImageFile } from "../../utils/image";

import { Field, FormRow, Select, Input, GhostButton, Preview } from "./styles";

/*
 * Campo de banner usado nos formulários de curso e publicação.
 * O admin pode escolher um banner pronto (bannerKey), colar uma URL
 * ou enviar uma imagem (base64). `value` = { banner, bannerKey }.
 */
const BannerField = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const preview = resolveBanner(value);
  const isUpload = value.banner?.startsWith("data:");

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    const error = validateImageFile(file);

    if (error) {
      alert(error);
      event.target.value = "";
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      onChange({ banner: base64, bannerKey: "" });
    } catch (readError) {
      console.error(readError);
      alert("Não foi possível carregar a imagem.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <>
      <FormRow>
        <Field>
          <label htmlFor="banner-key">Banner pronto</label>
          <Select
            id="banner-key"
            value={value.bannerKey || ""}
            onChange={(event) => onChange({ banner: "", bannerKey: event.target.value })}
          >
            <option value="">— escolher —</option>
            {BANNER_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <label htmlFor="banner-url">URL da imagem</label>
          <Input
            id="banner-url"
            type="url"
            placeholder="https://..."
            value={isUpload ? "" : value.banner || ""}
            onChange={(event) => onChange({ banner: event.target.value, bannerKey: "" })}
          />
        </Field>
      </FormRow>

      <Field>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <GhostButton type="button" onClick={() => inputRef.current?.click()}>
            <FiUpload /> Enviar imagem
          </GhostButton>

          {preview && (
            <GhostButton
              type="button"
              onClick={() => onChange({ banner: "", bannerKey: "" })}
            >
              <FiX /> Remover banner
            </GhostButton>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFile}
        />

        {preview && <Preview src={preview} alt="Pré-visualização do banner" />}
        <small>Máximo 2 MB. Imagens enviadas ficam salvas com a publicação.</small>
      </Field>
    </>
  );
};

export { BannerField };
