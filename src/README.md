# Technicfile - Equipment Management System

Sistema de gestión de equipos con autenticación basada en roles.

## 🚀 Deployment en Vercel

### Pasos para desplegar:

1. **Push tu código a GitHub:**
   ```bash
   git add .
   git commit -m "Add deployment config"
   git push origin main
   ```

2. **En Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio desde GitHub
   - Vercel detectará automáticamente la configuración
   - Haz clic en "Deploy"

3. **Credenciales de prueba:**
   - Usuario: `user`
   - Contraseña: `user123`

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Características

- ✅ Sistema de login con credenciales de prueba
- ✅ Panel de búsqueda de equipos
- ✅ Scanner de código de barras (solo móviles)
- ✅ Diseño responsive
- ✅ Sesión persistente (localStorage)
- ✅ Estados de garantía/mantenimiento

## 🎨 Diseño

- Color principal: `#232c63`
- Tailwind CSS v4
- Diseño responsive móvil-primero

## 📝 Notas

- Las imágenes están usando placeholders SVG temporales
- Reemplaza los placeholders con tus imágenes reales después del deployment
- La base de datos aún no está conectada (datos mock)
