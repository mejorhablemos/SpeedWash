import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del servicio Speed Wash en Funes, Santa Fe.",
  robots: { index: true, follow: true },
};

const UPDATED_AT = "2026-06-10";

export default function Terminos() {
  return (
    <LegalLayout
      eyebrow="Legales"
      title="Términos y condiciones"
      updatedAt={UPDATED_AT}
    >
      <h2>1. Datos de la empresa</h2>
      <p>
        El servicio Speed Wash es prestado por{" "}
        <strong>{site.legalName}</strong>, con domicilio en {site.fiscalAddress}.
        Para consultas o reclamos, escribinos a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Aceptación de los términos</h2>
      <p>
        Al utilizar el servicio Speed Wash, ya sea de manera presencial en
        nuestra sucursal o a través de la aplicación móvil, el usuario
        acepta estos términos y condiciones en su totalidad. Si no estás de
        acuerdo con alguna disposición, por favor no utilices el servicio.
      </p>

      <h2>3. Descripción del servicio</h2>
      <p>
        Speed Wash es un lavadero automático de autos en modalidad{" "}
        <strong>self-service</strong>. El usuario opera la máquina por sí
        mismo siguiendo las indicaciones de la interfaz. El servicio
        funciona las 24 horas, sin necesidad de reserva ni turnos.
      </p>
      <p>Ofrecemos dos modalidades de cobro:</p>
      <ul>
        <li>
          <strong>Lavado individual:</strong> se paga al momento de
          escanear la máquina desde la app.
        </li>
        <li>
          <strong>Packs prepagos (Speed 4, Speed 8, Speed 12):</strong> se
          adquieren a través de la app y permiten realizar la cantidad de
          lavados contratada dentro del período de vigencia.
        </li>
      </ul>

      <h2>4. Vigencia y caducidad de los packs</h2>
      <p>
        Los packs prepagos tienen los siguientes plazos de vigencia desde el
        momento de la compra:
      </p>
      <ul>
        <li>
          <strong>Speed 4:</strong> 60 días corridos.
        </li>
        <li>
          <strong>Speed 8:</strong> 180 días corridos.
        </li>
        <li>
          <strong>Speed 12 / Speed 12 Founders:</strong> 180 días corridos.
        </li>
      </ul>
      <p>
        Los lavados no utilizados dentro del plazo de vigencia caducan
        automáticamente y no son reintegrables ni transferibles a un nuevo
        pack.
      </p>
      <p>
        En caso de no haber utilizado todos los lavados dentro del plazo, el
        usuario puede solicitar la extensión del pack escribiendo a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> dentro de los 30 días
        posteriores al vencimiento. La extensión queda sujeta a evaluación de
        Speed Wash.
      </p>

      <h2>5. Política de reembolso</h2>
      <p>
        Una vez{" "}
        <strong>activado el pack mediante su primer lavado</strong>, la
        compra no es reembolsable. Los packs que aún no hayan sido
        utilizados pueden solicitarse en reembolso dentro de los 10 días
        hábiles desde la compra, escribiendo a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        El reembolso, en caso de corresponder, se realiza por el mismo
        medio de pago utilizado. Si el pago original fue por Mercado Pago,
        los plazos de acreditación dependen del operador y de la entidad
        bancaria.
      </p>

      <h2>6. Asociación de patente</h2>
      <p>
        El usuario tiene la opción de asociar{" "}
        <strong>una (1) patente a cada pack</strong> para habilitar el
        ingreso automático mediante reconocimiento por cámara. La
        asociación de patente es opcional y exclusiva: cada pack puede
        vincularse a un único vehículo.
      </p>
      <p>
        Si el usuario no asocia una patente, puede iniciar el lavado
        escaneando el código QR de la máquina desde la app, sin restricción de
        vehículo. Los lavados se descuentan del pack independientemente de la
        patente del auto que ingrese al lavadero.
      </p>

      <h2>7. Política de uso</h2>
      <p>
        Es responsabilidad del usuario seguir las indicaciones que la
        máquina muestra durante el lavado. Esto incluye, sin limitarse a:
      </p>
      <ul>
        <li>
          Posicionar el vehículo dentro de las marcas indicadas en el piso.
        </li>
        <li>
          Mantener las ventanillas, baúl y demás aberturas cerradas durante
          todo el proceso.
        </li>
        <li>Plegar los espejos retrovisores si la máquina así lo solicita.</li>
        <li>
          Retirar antenas externas, accesorios sueltos, banderas o cualquier
          elemento que pueda dañar el equipo o el propio vehículo.
        </li>
        <li>
          No descender del vehículo durante el lavado, salvo indicación
          expresa.
        </li>
      </ul>
      <p>
        El incumplimiento de estas indicaciones puede ocasionar daños al
        vehículo, a la máquina o a terceros. En tales casos, Speed Wash no
        se responsabiliza por los daños derivados del mal uso.
      </p>

      <h2>8. Limitaciones de responsabilidad</h2>
      <p>
        Speed Wash <strong>no presta servicio de lavado interior</strong>;
        únicamente lava la carrocería exterior del vehículo.
      </p>
      <p>
        No nos responsabilizamos por:
      </p>
      <ul>
        <li>
          Objetos personales o de valor dejados dentro del vehículo durante
          el lavado.
        </li>
        <li>
          Daños preexistentes en la pintura, accesorios mal instalados,
          piezas sueltas o partes deterioradas del vehículo.
        </li>
        <li>
          Vehículos modificados con accesorios no homologados (alerones
          aftermarket, banderas, antenas no plegables, etc.) que excedan
          las dimensiones estándar del equipo.
        </li>
        <li>
          Demoras o interrupciones del servicio por mantenimiento
          programado, cortes de luz o agua, o causas de fuerza mayor.
        </li>
        <li>
          Vehículos con problemas mecánicos que impidan su circulación normal
          por el túnel de lavado (frenos, dirección, transmisión, etc.).
        </li>
        <li>
          Daños indirectos o consecuentes no vinculados directamente con la
          prestación del servicio. Esta limitación no aplica al daño directo
          causado en el vehículo durante el proceso de lavado atribuible al
          equipamiento.
        </li>
      </ul>

      <h2>9. Modificación de precios</h2>
      <p>
        Speed Wash se reserva el derecho de modificar los precios del
        servicio en cualquier momento. Las modificaciones se comunicarán
        con un{" "}
        <strong>preaviso mínimo de 30 días corridos</strong> a través del
        sitio web y de la aplicación móvil. Los packs ya adquiridos
        mantienen el precio y las condiciones vigentes al momento de la
        compra.
      </p>

      <h2>10. Privacidad</h2>
      <p>
        El tratamiento de datos personales del usuario se rige por nuestra{" "}
        <a href="/privacidad">Política de privacidad</a>, que forma parte
        integrante de estos términos.
      </p>

      <h2>11. Jurisdicción y ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República Argentina.
        Para cualquier controversia derivada del uso del servicio, las
        partes se someten expresamente a la jurisdicción de los{" "}
        <strong>{site.jurisdiction}</strong>, renunciando a cualquier otro
        fuero que pudiera corresponderles.
      </p>

      <h2>12. Modificaciones a estos términos</h2>
      <p>
        Speed Wash puede modificar estos términos y condiciones en cualquier
        momento. La fecha de última actualización se indica al inicio del
        documento. El uso continuado del servicio luego de una modificación
        implica la aceptación de los nuevos términos.
      </p>

      <h2>13. Suspensión de cuenta</h2>
      <p>
        Speed Wash se reserva el derecho de suspender o cancelar cuentas de
        usuarios que incurran en uso fraudulento del servicio, intentos de
        evasión de cobro, uso de patentes que no sean propiedad del usuario, o
        cualquier conducta que perjudique la operación del lavadero o a
        terceros usuarios. En caso de fraude detectado, los packs activos
        pueden ser cancelados sin derecho a reembolso. Antes de proceder a la
        cancelación, Speed Wash notificará al usuario por el medio de contacto
        registrado otorgando un plazo de 48 horas para descargo, salvo en casos
        de fraude flagrante debidamente documentado.
      </p>

      <h2>14. Resolución de conflictos</h2>
      <p>
        Conforme a la Ley Nacional 26.993, el usuario puede iniciar reclamos
        ante el Servicio de Conciliación Previa en las Relaciones de Consumo
        (COPREC) antes de acudir a la vía judicial. Más información en:{" "}
        <a
          href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.argentina.gob.ar/produccion/defensadelconsumidor
        </a>
        .
      </p>

      <h2>15. Baja del servicio</h2>
      <p>
        El usuario puede solicitar la baja de su cuenta en cualquier momento a
        través de la misma aplicación móvil o escribiendo a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. La baja implica la
        cancelación de los packs activos sin derecho a reembolso de los lavados
        no utilizados, salvo que corresponda por aplicación del art. 34 de la
        Ley 24.240.
      </p>
    </LegalLayout>
  );
}
