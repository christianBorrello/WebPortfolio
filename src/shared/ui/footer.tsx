import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("common");
  const year = new Date().getFullYear().toString();

  return (
    <footer className="border-t border-foreground/10 bg-background px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <p className="text-sm text-foreground/50">
          &copy; {t("footer.copyright", { year })}
        </p>
        <p className="text-xs text-foreground/40">{t("footer.built_with")}</p>
      </div>
    </footer>
  );
}
