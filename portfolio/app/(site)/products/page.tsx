import { permanentRedirect } from "next/navigation";

export default function ProductsIndexRedirect() {
  permanentRedirect("/case-studies#independent-products");
}
