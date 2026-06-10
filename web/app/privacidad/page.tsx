import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Speed Wash recolecta, utiliza y protege tus datos personales.",
  robots: { index: true, follow: true },
};

const UPDATED_AT = "2026-06-10";

export default function Privacidad() {
  return (
    <LegalLayout
      eyebrow="Legales"
      title="Política de privacidad"
      updatedAt={UPDATED_AT}
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de los datos personales recolectados a
        través del sitio <strong>{site.domain}</strong> y de la aplicación
        móvil es <strong>{site.legalName}</strong> (CUIT: {site.cuit}), con
        domicilio en {site.fiscalAddress}. Para consultas, reclamos o
        ejercicio de derechos:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Qué datos recolectamos</h2>
      <p>
        Para prestar el servicio recolectamos los siguientes datos
        personales:
      </p>
      <ul>
        <li>
          <strong>Teléfono celular:</strong> obligatorio para crear cuenta y
          recibir el código de verificación por SMS.
        </li>
        <li>
          <strong>Email:</strong> opcional, utilizado para comunicaciones de
          servicio y, si lo aceptás, novedades de la marca.
        </li>
        <li>
          <strong>Patente del vehículo:</strong> opcional, únicamente si
          decidís asociarla a un pack para habilitar el ingreso automático.
        </li>
        <li>
          <strong>Historial de lavados:</strong> fecha, hora, sucursal, modo
          de lavado y pack utilizado, con fines de operación y soporte.
        </li>
        <li>
          <strong>Datos de pago:</strong> son procesados directamente por
          Mercado Pago. Speed Wash no almacena datos de tarjetas. Recibimos
          únicamente el identificador y el estado de la transacción.
        </li>
        <li>
          <strong>Datos técnicos:</strong> dirección IP, tipo de dispositivo,
          sistema operativo y datos de navegación, con fines analíticos y
          de seguridad.
        </li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Utilizamos tus datos para las siguientes finalidades:</p>
      <ul>
        <li>
          <strong>Operación del servicio:</strong> autenticación, gestión de
          packs, asociación de patente, registro de lavados, soporte.
        </li>
        <li>
          <strong>Comunicaciones transaccionales:</strong> confirmaciones de
          compra, recordatorios de vencimiento de pack, novedades del
          servicio (no opt-out, son inherentes a la prestación).
        </li>
        <li>
          <strong>Comunicaciones promocionales:</strong> envío de
          novedades, descuentos y promociones de Speed Wash. Podés darte de
          baja en cualquier momento (opt-out) escribiendo a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </li>
        <li>
          <strong>Mejora del servicio:</strong> análisis estadístico
          agregado del uso de la app y del lavadero.
        </li>
        <li>
          <strong>Cumplimiento legal:</strong> facturación, prevención de
          fraude y atención a requerimientos de autoridad competente.
        </li>
      </ul>

      <h2>4. Con quién compartimos tus datos</h2>
      <p>
        No vendemos tus datos personales. Los compartimos únicamente con
        los siguientes proveedores, exclusivamente para las finalidades
        operativas indicadas:
      </p>
      <ul>
        <li>
          <strong>Mercado Pago</strong> (Mercado Libre S.R.L.) para el
          procesamiento de pagos. Sus términos:{" "}
          <a
            href="https://www.mercadopago.com.ar/ayuda/terminos-y-condiciones_299"
            target="_blank"
            rel="noopener noreferrer"
          >
            mercadopago.com.ar
          </a>
          .
        </li>
        <li>
          <strong>Proveedor del software de la máquina de lavado</strong>,
          para la operación del equipo, validación de packs, asociación de
          patente y registro de lavados.
        </li>
        <li>
          <strong>Proveedor de envío de SMS</strong>, para el envío del
          código de verificación durante el registro y la recuperación de
          contraseña.
        </li>
        <li>
          <strong>Autoridades competentes</strong>, cuando exista una
          obligación legal de informar (por ejemplo, requerimiento judicial
          o fiscal).
        </li>
      </ul>

      <h2>5. Derechos del titular de los datos</h2>
      <p>
        De conformidad con la Ley 25.326 de Protección de Datos Personales
        de la República Argentina, tenés derecho a:
      </p>
      <ul>
        <li>
          <strong>Acceso:</strong> conocer qué datos tuyos tenemos y cómo
          los usamos.
        </li>
        <li>
          <strong>Rectificación:</strong> solicitar la corrección de datos
          inexactos o desactualizados.
        </li>
        <li>
          <strong>Supresión:</strong> pedir la baja total de tu cuenta y de
          los datos asociados, salvo aquellos que debamos conservar por
          obligación legal (por ejemplo, comprobantes fiscales).
        </li>
        <li>
          <strong>Oposición:</strong> oponerte al tratamiento con fines
          promocionales en cualquier momento.
        </li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escribinos a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Respondemos en un
        plazo máximo de 10 días hábiles.
      </p>
      <p>
        La Agencia de Acceso a la Información Pública, en su carácter de
        autoridad de aplicación, tiene atribuciones para entender en este
        tema y atender reclamos:{" "}
        <a
          href="https://www.argentina.gob.ar/aaip"
          target="_blank"
          rel="noopener noreferrer"
        >
          argentina.gob.ar/aaip
        </a>
        .
      </p>

      <h2>6. Cookies y tecnologías de seguimiento</h2>
      <p>
        El sitio <strong>{site.domain}</strong> y la aplicación pueden
        utilizar cookies y tecnologías similares con fines analíticos
        (Google Analytics) y de remarketing (Meta Pixel), únicamente para
        entender cómo se usa el servicio y mejorar su experiencia. Podés
        configurar tu navegador para bloquear las cookies, aunque algunas
        funciones del servicio podrían verse afectadas.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger
        tus datos contra accesos no autorizados, alteración o pérdida. Las
        comunicaciones entre tu dispositivo y nuestros servidores se
        realizan mediante conexiones cifradas (HTTPS).
      </p>
      <p>
        Sin perjuicio de ello, ningún sistema es 100% seguro. Si detectás un
        problema o sospechás de un uso indebido de tu cuenta, comunicate a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> a la brevedad.
      </p>

      <h2>8. Conservación de los datos</h2>
      <p>
        Conservamos tus datos personales mientras tengas cuenta activa y por
        el plazo adicional necesario para cumplir con obligaciones legales,
        contables y fiscales. Los datos de facturación se conservan por el
        plazo que exige la normativa vigente (10 años, conforme a la
        legislación argentina).
      </p>

      <h2>9. Menores de edad</h2>
      <p>
        El servicio está dirigido a mayores de 18 años. Si sos menor de
        edad, necesitás autorización de tu padre, madre o tutor legal para
        crear cuenta y utilizar el servicio.
      </p>

      <h2>10. Ley aplicable</h2>
      <p>
        Esta política se rige por la{" "}
        <strong>Ley 25.326 de Protección de Datos Personales</strong> de la
        República Argentina y su normativa complementaria.
      </p>

      <h2>11. Cambios a esta política</h2>
      <p>
        Esta política puede actualizarse. La fecha de última actualización
        se indica al inicio del documento. Los cambios sustanciales serán
        comunicados a través del sitio o de la app.
      </p>
    </LegalLayout>
  );
}
