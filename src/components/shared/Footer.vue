<template>
  <footer class="mt-8 text-sm text-gray-400 text-center font-sans">
    <slot name="footer">
      &copy; {{ new Date().getFullYear() }} Manicure Dates. Todos los derechos reservados.
    </slot>
  </footer>
</template>
