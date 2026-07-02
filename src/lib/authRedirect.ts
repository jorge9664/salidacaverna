// Centraliza la lógica de redirecciones OAuth / email.
// - En dominios gestionados por Lovable (*.lovable.app) o localhost usamos el
//   proxy `lovable.auth.signInWithOAuth` (rutas /~oauth/*).
// - En cualquier otro dominio (cPanel, custom domain externo) caemos al
//   flujo estándar de Supabase (`supabase.auth.signInWithOAuth`) para no
//   depender de infraestructura que no existe en ese hosting.
//
// Además expone una lista con las URLs que deben estar autorizadas en el
// backend (Cloud → Users → URL Configuration) para que el callback funcione.

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export type OAuthProvider = "google" | "apple";

export const isLovableManagedHost = (host: string = window.location.hostname) =>
  host.endsWith("lovable.app") ||
  host === "localhost" ||
  host === "127.0.0.1";

export const getSiteOrigin = () => window.location.origin;

/** Ruta pública usada como landing tras completar el OAuth. */
export const OAUTH_CALLBACK_PATH = "/admin";

export const getOAuthRedirectUri = () =>
  `${getSiteOrigin()}${OAUTH_CALLBACK_PATH}`;

export const getEmailRedirectUri = () => getOAuthRedirectUri();

/** URLs que hay que dar de alta en el backend de autenticación. */
export const buildAllowedRedirectUrls = (
  origin: string = getSiteOrigin(),
): string[] => {
  const base = origin.replace(/\/$/, "");
  return [base, `${base}/`, `${base}${OAUTH_CALLBACK_PATH}`];
};

/**
 * Inicia el flujo OAuth con el proveedor indicado usando la ruta correcta
 * según el dominio actual.
 */
export async function signInWithProvider(provider: OAuthProvider) {
  if (isLovableManagedHost()) {
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: getOAuthRedirectUri(),
    });
    if (result.error) throw result.error;
    return result;
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: getOAuthRedirectUri() },
  });
  if (error) throw error;
  return data;
}