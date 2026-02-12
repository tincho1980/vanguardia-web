# Configuración de Resend para Formulario de Contacto

## 🚀 Pasos para configurar Resend

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta o inicia sesión
3. Verifica tu email

### 2. Obtener API Key

1. Ve a [API Keys](https://resend.com/api-keys)
2. Haz clic en "Create API Key"
3. Dale un nombre (ej: "Vanguardia Web")
4. Copia la API key generada (comienza con `re_...`)

### 3. Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Pega tu API key:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

3. Guarda el archivo

### 4. Configurar Dominio Verificado (Opcional pero Recomendado)

Por defecto, Resend usa `onboarding@resend.dev` como remitente, pero para producción deberías usar tu propio dominio.

#### Pasos:

1. Ve a [Domains](https://resend.com/domains) en Resend
2. Haz clic en "Add Domain"
3. Ingresa tu dominio (ej: `vanguardiabynegrovski.com`)
4. Sigue las instrucciones para agregar los registros DNS:
   - SPF
   - DKIM
   - DMARC (opcional)
5. Espera a que Resend verifique el dominio (puede tomar hasta 72 horas)

#### Actualizar el código:

Una vez verificado tu dominio, edita el archivo `src/app/api/contact/route.ts`:

```typescript
// Cambiar esta línea:
from: "Vanguardia Web <onboarding@resend.dev>",

// Por:
from: "Vanguardia Web <contacto@tudominio.com>",
```

### 5. Configurar Email de Destino

En el archivo `src/app/api/contact/route.ts`, asegúrate de que el email de destino sea correcto:

```typescript
to: ["vanguardiabynegrovski@gmail.com"], // Ya está configurado
```

Puedes agregar múltiples emails si quieres:

```typescript
to: ["vanguardiabynegrovski@gmail.com", "otro@email.com"],
```

## 🧪 Probar el Formulario

1. Inicia el servidor de desarrollo:

```bash
npm run dev
```

2. Ve a `http://localhost:3000` y navega hasta el formulario de contacto
3. Completa el formulario y envía un mensaje de prueba
4. Verifica tu bandeja de entrada

## 📋 Estructura de Archivos Creados

```
vanguardia-web/
├── .env.local                          # Variables de entorno (NO commitear)
├── .env.example                        # Plantilla de variables
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── ContactForm.tsx         # Componente del formulario
│   ├── app/
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts            # API endpoint para Resend
└── SETUP_RESEND.md                     # Este archivo
```

## 🎨 Personalización del Email

El template del email se encuentra en `src/app/api/contact/route.ts` en la propiedad `html`.

Puedes modificar:
- **Colores**: `#972528` (rojo Vanguardia), `#080606` (negro), etc.
- **Tipografía**: Actualmente usa Montserrat
- **Estructura**: Agrega o quita campos según necesites

## 🔒 Seguridad

- ✅ `.env.local` está en `.gitignore`
- ✅ La API key nunca se expone al cliente
- ✅ Validación básica de campos
- ⚠️ Considera agregar:
  - Rate limiting (ej: `express-rate-limit`)
  - Captcha (ej: Google reCAPTCHA)
  - Validación de email más robusta (ej: `validator.js`)

## 📊 Monitoreo

1. Ve al [Dashboard de Resend](https://resend.com/emails)
2. Podrás ver:
   - Emails enviados
   - Tasa de entrega
   - Errores
   - Logs detallados

## ❓ Troubleshooting

### Error: "Missing RESEND_API_KEY"

- Verifica que el archivo `.env.local` existe
- Verifica que la variable se llame exactamente `RESEND_API_KEY`
- Reinicia el servidor de desarrollo

### Los emails no llegan

- Verifica el dominio verificado
- Revisa la carpeta de SPAM
- Verifica los logs en el Dashboard de Resend
- Verifica que el email destino sea correcto

### Error 429 (Rate Limit)

- En el plan gratuito, Resend tiene límites:
  - 100 emails/día
  - 3.000 emails/mes
- Considera actualizar al plan Pro si necesitas más

## 🆘 Soporte

- [Documentación Resend](https://resend.com/docs)
- [Soporte Resend](https://resend.com/support)
- [Status Page](https://status.resend.com/)

---

**Vanguardia by Negrovski © 2026**
