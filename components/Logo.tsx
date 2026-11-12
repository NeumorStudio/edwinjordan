// La n de NeumorStudio, a una tinta: toma el color del texto que la rodea.
export function LogoN({ alto = 22, titulo }: { alto?: number; titulo?: string }) {
  return (
    <svg
      viewBox="21.5 21 57 58"
      height={alto}
      width={(alto * 57) / 58}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      <path
        d="M22.5 76V49A27.5 27.5 0 0 1 77.5 49V76A2.5 2.5 0 0 1 75 78.5H65A2.5 2.5 0 0 1 62.5 76V47.8A12.5 12.5 0 0 0 37.5 47.8V76A2.5 2.5 0 0 1 35 78.5H25A2.5 2.5 0 0 1 22.5 76Z"
        fill="currentColor"
      />
      <circle cx="50" cy="62" r="6.5" fill="currentColor" />
    </svg>
  );
}
