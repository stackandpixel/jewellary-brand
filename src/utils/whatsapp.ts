import { BRAND_CONFIG, formatINR } from '../config/brandConfig';
import { CartItem, CustomerDetails, Product } from '../types';

/**
 * Builds a direct wa.me link with URL-encoded message
 */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encoded}`;
}

/**
 * WhatsApp message for a single product query
 */
export function createProductEnquiryMessage(product: Product, questionType?: string): string {
  const intro = questionType || 'I am interested in this piece from your collection';
  return `Namaste GoldenAura Jewellery! ✨

${intro}:
• Product: ${product.name}
• SKU: ${product.sku}
• Price: ${formatINR(product.price)}
• Category: ${product.categoryLabel}
• Material: ${product.style} (${product.materialDetails.plating})

Could you please share availability and delivery timeline to my location?
Thank you!`;
}

/**
 * WhatsApp message for complete cart order enquiry
 */
export function createCartOrderEnquiryMessage(
  items: CartItem[],
  subtotal: number,
  shippingFee: number,
  total: number,
  customer?: Partial<CustomerDetails>
): string {
  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku}) - Qty: ${item.quantity}${
          item.selectedSize ? ` [Size: ${item.selectedSize}]` : ''
        } - ${formatINR(item.product.price * item.quantity)}`
    )
    .join('\n');

  let customerBlock = '';
  if (customer && customer.fullName) {
    customerBlock = `\n\n*Customer Details:*\n• Name: ${customer.fullName}\n• Phone: ${customer.phone || 'N/A'}\n• City: ${customer.city || ''} (${customer.pincode || ''})\n• Address: ${customer.addressLine1 || 'N/A'}\n• Preferred Payment: ${customer.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : customer.paymentMethod === 'whatsapp' ? 'UPI / WhatsApp Pay' : 'Online Demo'}`;
  }

  const message = `Namaste GoldenAura Jewellery! 🛍️

I would like to place an order enquiry for the following items:

*Items Ordered:*
${itemsText}

*Order Summary:*
• Subtotal: ${formatINR(subtotal)}
• Delivery: ${shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
• Total Payable: ${formatINR(total)}${customerBlock}

Kindly confirm stock availability and share payment/dispatch instructions. Thank you!`;

  return message;
}

/**
 * WhatsApp link for custom bridal or bulk festive enquiry
 */
export function createBridalEnquiryMessage(): string {
  return `Namaste GoldenAura Team! 👰

I am planning my bridal / wedding jewellery trousseau and would love personalized recommendations from your Bridal & Temple Collection.

Could your jewellery consultant please assist me with custom sets, sizing, and styling?`;
}
