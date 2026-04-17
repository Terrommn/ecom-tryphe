import { TrypheShell } from "@/components/layout/TrypheShell";

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
    <TrypheShell>
      <div className="bg-[#faf9f7]">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-10 max-w-lg py-16 md:py-20">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-neutral-950 mb-4" data-gsap="fade-up">Mi cuenta</h1>
          <p className="text-neutral-500 text-sm mb-8">
            El inicio de sesión y el registro de clientes los gestiona Shopify. Desde aquí puedes abrir
            las páginas oficiales de cuenta de tu tienda.
          </p>

          {loginUrl ? (
            <div className="space-y-4">
              <a
                href={loginUrl}
                className="flex w-full items-center justify-center bg-neutral-950 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#faf9f7] hover:bg-neutral-800 transition-colors"
              >
                Iniciar sesión
              </a>
              {registerUrl ? (
                <a
                  href={registerUrl}
                  className="flex w-full items-center justify-center border border-neutral-200 px-8 py-3.5 text-sm font-medium text-neutral-950 hover:border-neutral-950 hover:text-neutral-950 transition-colors"
                >
                  Crear cuenta
                </a>
              ) : null}
              {recoverUrl ? (
                <p className="text-center text-sm">
                  <a href={recoverUrl} className="text-neutral-950 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 rounded-lg border border-neutral-200 p-4">
              Configura <code className="text-neutral-950">SHOPIFY_STORE_DOMAIN</code> para
              mostrar enlaces de acceso.
            </p>
          )}

          <div className="mt-12 border-t border-neutral-200 pt-8 text-sm text-neutral-500">
            <p>
              <strong className="text-neutral-950">Cuentas y login social:</strong> se configuran
              en el admin de Shopify (Customer Account API, apps o proveedores compatibles).
            </p>
          </div>
        </div>
      </div>
    </TrypheShell>
  );
}
