export const buildSharePayload = (product) => {
    const priceLabel = product.price === 0 ? 'gratis' : `€${product.price}`;
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const anchor = `#producto-${product.id}`;
    const url = `${baseUrl}${anchor}`;

    const text = `Mirá "${product.name}" (${priceLabel}) de mi venta de garage.`;

    return {
        title: product.name,
        text,
        url,
        fallbackText: `${text} ${url}`
    };
};

export const shareProduct = async (product) => {
    const { title, text, url, fallbackText } = buildSharePayload(product);

    if (navigator.share) {
        try {
            await navigator.share({ title, text, url });
            return true;
        } catch (error) {
            if (error?.name === 'AbortError') {
                return false;
            }
        }
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fallbackText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    return false;
};
