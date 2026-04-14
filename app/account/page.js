export const metadata = {
  title: "Mi cuenta | Tienda",
  description: "Accede a tu cuenta de cliente.",
};

export default function AccountPage() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const loginUrl = domain ? `https://${domain}/account/login` : null;
  const registerUrl = domain ? `https://${domain}/account/register` : null;
  const recoverUrl = domain ? `https://${domain}/account/recover` : null;

  return (
    <div className="oob-container max-w-lg py-16 md:py-20">
      <h1 className="oob-heading-xl text-3xl text-[var(--oob-cream)] mb-4" data-gsap="fade-up">Mi cuenta</h1>
      <p className="text-[var(--oob-muted)] text-sm mb-8">
        El inicio de sesión y el registro de clientes los gestiona Shopify. Desde aquí puedes abrir
        las páginas oficiales de cuenta de tu tienda.
      </p>

      {loginUrl ? (
        <div className="space-y-4">
          <a
            href={loginUrl}
            className="flex w-full items-center justify-center rounded-full bg-[var(--oob-gold)] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--oob-bg)] hover:bg-[var(--oob-gold-hover)] transition-colors"
          >
            Iniciar sesión
          </a>
          {registerUrl ? (
            <a
              href={registerUrl}
              className="flex w-full items-center justify-center rounded-full border border-[color:var(--oob-border)] px-8 py-3.5 text-sm font-medium text-[var(--oob-cream)] hover:border-[var(--oob-gold)] hover:text-[var(--oob-gold)] transition-colors"
            >
              Crear cuenta
            </a>
          ) : null}
          {recoverUrl ? (
            <p className="text-center text-sm">
              <a href={recoverUrl} className="text-[var(--oob-gold)] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-[var(--oob-muted)] rounded-lg border border-[color:var(--oob-border)] p-4">
          Configura <code className="text-[var(--oob-gold)]">SHOPIFY_STORE_DOMAIN</code> para
          mostrar enlaces de acceso.
        </p>
      )}

      <div className="mt-12 border-t border-[color:var(--oob-border)] pt-8 text-sm text-[var(--oob-muted)]">
        <p>
          <strong className="text-[var(--oob-cream)]">Cuentas y login social:</strong> se configuran
          en el admin de Shopify (Customer Account API, apps o proveedores compatibles).
        </p>
      </div>
    </div>
  );
}
