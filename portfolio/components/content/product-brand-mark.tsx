/* eslint-disable no-undef -- the inherited Babel parser treats TypeScript-only declarations as runtime globals. */

type ProductBrandSlug = "wasabi-travels" | "card-compass";

type ProductBrandMarkProps = {
  className?: string;
  slug: string;
};

const brandNameBySlug: Record<ProductBrandSlug, string> = {
  "wasabi-travels": "Wasabi Travels",
  "card-compass": "CardCompass",
};

function isProductBrandSlug(slug: string): slug is ProductBrandSlug {
  return slug in brandNameBySlug;
}

/** Product identities mirror the public product-header wordmarks. */
export function ProductBrandMark({ className = "", slug }: ProductBrandMarkProps) {
  if (!isProductBrandSlug(slug)) return null;

  const brandName = brandNameBySlug[slug];

  return (
    <div
      aria-label={`${brandName} brand mark`}
      className={`product-brand-mark product-brand-mark--${slug} ${className}`.trim()}
      data-product-brand-mark={slug}
      role="img"
    >
      {slug === "wasabi-travels" ? (
        <>
          <span aria-hidden="true" className="product-brand-mark__wasabi-icon">⛩️</span>
          <span aria-hidden="true" className="product-brand-mark__wasabi-name">Wasabi Travels</span>
        </>
      ) : (
        <>
          <span aria-hidden="true" className="product-brand-mark__card-badge">CC</span>
          <span aria-hidden="true" className="product-brand-mark__card-name">CardCompass</span>
        </>
      )}
    </div>
  );
}
