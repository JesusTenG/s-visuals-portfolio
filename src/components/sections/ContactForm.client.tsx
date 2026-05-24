"use client";

import { useId, useState, type FormEvent } from "react";

import { contactCtaClassNames } from "@/components/ui/contactCtaButton";
import SVisualsButton from "@/components/ui/SVisualsButton";
import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./FinalCtaSection.module.css";

type Props = Readonly<{
  form: Dictionary["contact"]["form"];
}>;

type FieldKey = "name" | "email" | "message";

type FormValues = Record<FieldKey, string>;

type FormErrors = Partial<Record<FieldKey, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues, form: Dictionary["contact"]["form"]): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = form.errors.nameRequired;
  if (!email) errors.email = form.errors.emailRequired;
  else if (!EMAIL_PATTERN.test(email)) errors.email = form.errors.emailInvalid;
  if (!message) errors.message = form.errors.messageRequired;

  return errors;
}

export function ContactForm({ form }: Props) {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;

  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function handleChange(field: FieldKey, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (statusMessage) setStatusMessage(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage(null);
      return;
    }

    // TODO: Wire to API route or server action when contact endpoint is configured.
    setStatusMessage(form.submitUnavailable);
  }

  return (
    <form
      className={styles["contact-section__form"]}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusMessage ? `${formId}-status` : undefined}
    >
      <div className={styles["contact-section__field"]}>
        <label className={styles["contact-section__label"]} htmlFor={nameId}>
          {form.nameLabel}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          placeholder={form.namePlaceholder}
          className={styles["contact-section__input"]}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name ? (
          <p id={`${nameId}-error`} className={styles["contact-section__error"]} role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles["contact-section__field"]}>
        <label className={styles["contact-section__label"]} htmlFor={emailId}>
          {form.emailLabel}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          placeholder={form.emailPlaceholder}
          className={styles["contact-section__input"]}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email ? (
          <p id={`${emailId}-error`} className={styles["contact-section__error"]} role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles["contact-section__field"]}>
        <label className={styles["contact-section__label"]} htmlFor={messageId}>
          {form.messageLabel}
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          value={values.message}
          placeholder={form.messagePlaceholder}
          className={`${styles["contact-section__input"]} ${styles["contact-section__textarea"]}`}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        {errors.message ? (
          <p id={`${messageId}-error`} className={styles["contact-section__error"]} role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className={styles["contact-section__actions"]}>
        <SVisualsButton
          type="submit"
          showIcon={false}
          className={`${contactCtaClassNames.primary} ${contactCtaClassNames.prominent}`}
        >
          {form.submit}
        </SVisualsButton>
      </div>

      {statusMessage ? (
        <p
          id={`${formId}-status`}
          className={styles["contact-section__status"]}
          role="status"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
