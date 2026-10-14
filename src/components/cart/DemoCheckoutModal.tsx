import React, { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Info,
  MapPin,
  MessageCircle,
  Package,
  Shield,
  Truck,
  X,
} from 'lucide-react';
import { BRAND_CONFIG, formatINR } from '../../config/brandConfig';
import { useCart } from '../../context/CartContext';
import { CustomerDetails } from '../../types';
import { buildWhatsAppLink, createCartOrderEnquiryMessage } from '../../utils/whatsapp';

export const DemoCheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, shippingFee, total, clearCart } =
    useCart();

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [createdRef, setCreatedRef] = useState<string>('');

  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411005',
    paymentMethod: 'whatsapp',
    orderNotes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10)
      errors.phone = 'Valid 10-digit mobile number required';
    if (!form.addressLine1.trim()) errors.addressLine1 = 'House / Street address required';
    if (!form.pincode.trim() || form.pincode.length !== 6)
      errors.pincode = 'Valid 6-digit Indian PIN code required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate readable enquiry reference
    const orderRef = `GA-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedRef(orderRef);
    setStep('confirmation');

    // If preferred method is WhatsApp, launch prefilled WhatsApp link directly
    if (form.paymentMethod === 'whatsapp') {
      const message = createCartOrderEnquiryMessage(cart, subtotal, shippingFee, total, form);
      window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    if (step === 'confirmation') {
      clearCart();
      setStep('details');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          onClick={handleClose}
        />

        <div className="relative transform overflow-hidden rounded-xl bg-[#FAF8F5] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-[#D4AF37]/30 z-10">
          {/* Header */}
          <div className="bg-[#0B1F16] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
            <div>
              <h3 className="text-base font-cinzel font-semibold text-[#F3DC9B]">
                {step === 'details' ? 'Delivery & Order Enquiry' : 'Enquiry Initiated'}
              </h3>
              <p className="text-[11px] text-stone-300">
                {step === 'details'
                  ? 'Complete your shipping destination to finalize enquiry'
                  : `Reference ID: ${createdRef}`}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-stone-400 hover:text-white p-1"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {step === 'details' ? (
            <form onSubmit={handleProceed} className="p-6 space-y-6">
              {/* Architecture & Payment Gateway Clarification Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>Notice:</strong> This store is currently configured for direct{' '}
                  <strong>WhatsApp Order Enquiries</strong> and sample demo checkout. No actual money will be charged. For production, integrate Razorpay or Cashfree with secure server-side webhooks.
                </div>
              </div>

              {/* Customer Contact */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-3">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-3 py-2 text-xs border rounded bg-white focus:outline-none focus:border-[#AA820A]"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-0.5">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 text-xs border rounded bg-white focus:outline-none focus:border-[#AA820A]"
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-0.5">{formErrors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="ananya@example.com"
                      className="w-full px-3 py-2 text-xs border rounded bg-white focus:outline-none focus:border-[#AA820A]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-3">
                  2. Indian Delivery Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Flat / House No., Building, Street *
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={form.addressLine1}
                      onChange={handleInputChange}
                      placeholder="e.g. 402, Shivajinagar Main Road"
                      className="w-full px-3 py-2 text-xs border rounded bg-white focus:outline-none focus:border-[#AA820A]"
                    />
                    {formErrors.addressLine1 && (
                      <p className="text-[11px] text-red-600 mt-0.5">{formErrors.addressLine1}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleInputChange}
                      placeholder="Pune"
                      className="w-full px-3 py-2 text-xs border rounded bg-white focus:outline-none focus:border-[#AA820A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="w-full px-3 py-2 text-xs border rounded bg-white focus:outline-none focus:border-[#AA820A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      PIN Code (6 Digits) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={form.pincode}
                      onChange={handleInputChange}
                      placeholder="411005"
                      className="w-full px-3 py-2 text-xs border rounded bg-white focus:outline-none focus:border-[#AA820A]"
                    />
                    {formErrors.pincode && (
                      <p className="text-[11px] text-red-600 mt-0.5">{formErrors.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Delivery Estimate
                    </label>
                    <div className="text-xs text-stone-700 flex items-center gap-1.5 pt-2">
                      <Truck className="w-3.5 h-3.5 text-[#AA820A]" />
                      <span>
                        {form.pincode.startsWith('411')
                          ? 'Local Pune express: 2-3 Days'
                          : 'Standard India Post / Bluedart: 4-6 Days'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ordering Method */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#99730E] mb-3">
                  3. Ordering & Payment Mode
                </h4>
                <div className="space-y-2.5">
                  <label className="flex items-start gap-3 p-3 bg-white border border-[#E7E0D3] rounded-lg cursor-pointer hover:border-[#D4AF37]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={form.paymentMethod === 'whatsapp'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-[#0B1F16]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-stone-900">
                          Instant WhatsApp Enquiry & Concierge (Recommended)
                        </span>
                        <span className="text-[10px] bg-[#25D366]/20 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          FASTEST
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Transfers your item list and delivery address to our Pune team via WhatsApp. You inspect photos and pay via UPI or Bank transfer.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-white border border-[#E7E0D3] rounded-lg cursor-pointer hover:border-[#D4AF37]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-[#0B1F16]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-stone-900">
                        Cash on Delivery (COD) Enquiry
                      </span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Subject to address pincode verification. Pay in cash to courier agent upon receipt.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-white border border-[#E7E0D3] rounded-lg cursor-pointer hover:border-[#D4AF37]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online_demo"
                      checked={form.paymentMethod === 'online_demo'}
                      onChange={handleInputChange}
                      className="mt-0.5 text-[#0B1F16]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-stone-900">
                        Online Payment (Demo Simulation)
                      </span>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Frontend test flow. Simulates checkout step without charging a card or UPI.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Total review */}
              <div className="p-3 bg-[#F4EFEA] rounded flex items-center justify-between text-xs font-semibold">
                <span>Total Amount ({cart.length} items):</span>
                <span className="text-sm font-mono font-bold text-[#0B1F16]">
                  {formatINR(total)}
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 border border-stone-300 rounded text-xs font-medium text-stone-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-[#0B1F16] hover:bg-[#123024] text-[#FAF8F5] text-xs font-semibold rounded shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  {form.paymentMethod === 'whatsapp' ? (
                    <>
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Submit Enquiry via WhatsApp</span>
                    </>
                  ) : (
                    <span>Submit Demo Order Enquiry</span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Step */
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-cinzel font-semibold text-[#0B1F16]">
                  Enquiry Logged Successfully!
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Enquiry Reference: <strong className="font-mono text-[#AA820A]">{createdRef}</strong>
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-[#E7E0D3] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-stone-500">Customer:</span>
                  <span className="font-semibold text-stone-800">{form.fullName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-stone-500">Destination:</span>
                  <span className="font-semibold text-stone-800">
                    {form.city}, {form.state} ({form.pincode})
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-stone-500">Total Value:</span>
                  <span className="font-mono font-bold text-stone-900">{formatINR(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Selected Method:</span>
                  <span className="capitalize font-semibold text-[#AA820A]">
                    {form.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-stone-100 rounded text-stone-600 text-[11px] leading-relaxed max-w-md mx-auto">
                Please remember: The customer must press <strong>Send</strong> in WhatsApp to transmit the order enquiry directly to our Pune studio.
              </div>

              <div className="flex justify-center gap-3">
                <a
                  href={buildWhatsAppLink(
                    createCartOrderEnquiryMessage(cart, subtotal, shippingFee, total, form)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 bg-[#25D366] hover:bg-[#20BE5B] text-white rounded font-semibold text-xs flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Conversation</span>
                </a>
                <button
                  onClick={handleClose}
                  className="py-2.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded font-medium text-xs"
                >
                  Close & Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
