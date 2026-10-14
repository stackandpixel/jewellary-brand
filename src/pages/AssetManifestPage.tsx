import React, { useState } from 'react';
import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { ASSET_MANIFEST } from '../data/assetManifest';

export const AssetManifestPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'manifest' | 'deployment' | 'backend' | 'audit'>('manifest');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B1F16] text-[#F3DC9B] rounded-full text-xs font-mono">
          <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Production Blueprint & Asset Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#0B1F16]">
          Technical Specs & Asset Manifest
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
          Complete asset generation prompts, static hosting guide (Vercel & Cloudflare), Razorpay integration architecture, and production readiness checklist.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E7E0D3] overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('manifest')}
          className={`py-3 px-5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'manifest'
              ? 'border-[#0B1F16] text-[#0B1F16] font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-[#AA820A]" />
          <span>AI Image & Video Manifest ({ASSET_MANIFEST.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('deployment')}
          className={`py-3 px-5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'deployment'
              ? 'border-[#0B1F16] text-[#0B1F16] font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Rocket className="w-4 h-4 text-[#AA820A]" />
          <span>Static Hosting (Vercel / Cloudflare)</span>
        </button>
        <button
          onClick={() => setActiveTab('backend')}
          className={`py-3 px-5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'backend'
              ? 'border-[#0B1F16] text-[#0B1F16] font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Server className="w-4 h-4 text-[#AA820A]" />
          <span>Payment & Backend Blueprint (Razorpay)</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`py-3 px-5 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
            activeTab === 'audit'
              ? 'border-[#0B1F16] text-[#0B1F16] font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Shield className="w-4 h-4 text-[#AA820A]" />
          <span>Pre-Production Replacement Checklist</span>
        </button>
      </div>

      {/* Tab 1: AI Asset Manifest */}
      {activeTab === 'manifest' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
            <strong>Asset Manifest Compliance Note:</strong> In accordance with Section 8 of the project brief, below is the exact specification of filenames, target folders, dimensions, aspect ratios, and studio prompts. Currently, the UI utilizes our custom high-fidelity SVG craftsmanship visual engine as an error-proof zero-broken-image fallback.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ASSET_MANIFEST.map((asset) => (
              <div
                key={asset.id}
                className="bg-white p-5 rounded-xl border border-[#E7E0D3] shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-2 mb-2">
                    <span className="font-mono text-xs font-bold text-stone-900">
                      {asset.filename}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-100 rounded text-stone-600 uppercase">
                      {asset.aspectRatio} · {asset.dimensions}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-medium mb-1">
                    {asset.description}
                  </p>
                  <p className="text-[11px] font-mono text-stone-600 mb-3">
                    Target: {asset.targetPath}
                  </p>

                  <div className="bg-[#FAF8F5] p-3 rounded border border-[#E7E0D3] text-[11px] text-stone-700 font-mono leading-relaxed max-h-32 overflow-y-auto">
                    &ldquo;{asset.prompt}&rdquo;
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active: Vector Fallback Engaged
                  </span>
                  <button
                    onClick={() => copyToClipboard(asset.prompt, asset.id)}
                    className="flex items-center gap-1 text-[#AA820A] hover:underline font-medium"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied Prompt</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Deployment Guide */}
      {activeTab === 'deployment' && (
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E7E0D3] space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
          <h2 className="text-xl font-cinzel font-bold text-[#0B1F16]">
            Deployment Guide: Static & SPA Hosting
          </h2>

          <div className="space-y-4">
            <h3 className="font-semibold text-stone-900 text-sm">1. Deploying to Vercel</h3>
            <p>
              GoldenAura is built on Vite + React SPA architecture and requires zero server configuration for client-side hosting:
            </p>
            <pre className="p-4 bg-stone-900 text-[#FAF8F5] rounded text-xs font-mono overflow-x-auto">
{`# 1. Install Vercel CLI
npm install -g vercel

# 2. Build and deploy
npm run build
vercel --prod`}
            </pre>
            <p className="text-xs text-stone-500">
              For client-side routing on Vercel, ensure a <code>vercel.json</code> rewrites file is present:
            </p>
            <pre className="p-3 bg-stone-100 text-stone-800 rounded text-xs font-mono overflow-x-auto">
{`{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`}
            </pre>

            <h3 className="font-semibold text-stone-900 text-sm pt-4">2. Deploying to Cloudflare Pages</h3>
            <p>
              In Cloudflare Pages Dashboard, connect the Git repository with the following settings:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li><strong>Framework Preset:</strong> Vite</li>
              <li><strong>Build Command:</strong> <code>npm run build</code></li>
              <li><strong>Build Output Directory:</strong> <code>dist</code></li>
            </ul>

            <h3 className="font-semibold text-stone-900 text-sm pt-4">3. Custom Domain Configuration</h3>
            <p>
              In your domain registrar (GoDaddy, Namecheap, Cloudflare DNS), configure:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>CNAME Record: <code>www</code> &rarr; <code>cname.vercel-dns.com</code> (or Cloudflare pages domain)</li>
              <li>A Record: <code>@</code> &rarr; <code>76.76.21.21</code> (Vercel IP)</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Razorpay & Backend Blueprint */}
      {activeTab === 'backend' && (
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E7E0D3] space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
          <h2 className="text-xl font-cinzel font-bold text-[#0B1F16]">
            Production Payment Gateway Architecture (Razorpay / Cashfree)
          </h2>

          <div className="space-y-4">
            <p>
              In this initial release, customer purchases are handled through a clean <strong>WhatsApp Order Enquiry</strong> flow. When scaling to real automated transactions, follow this secure payment integration blueprint:
            </p>

            <div className="p-4 bg-red-50 border border-red-200 rounded text-xs text-red-900">
              <strong>Security Invariant:</strong> Never place <code>RAZORPAY_KEY_SECRET</code> in client-side React code. Secrets must remain strictly within a Node.js/Express server or serverless cloud function.
            </div>

            <h3 className="font-semibold text-stone-900 text-sm pt-2">Step 1: Server-Side Order Creation</h3>
            <pre className="p-4 bg-stone-900 text-[#FAF8F5] rounded text-xs font-mono overflow-x-auto">
{`// Express route: POST /api/checkout/create-order
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/api/checkout/create-order', async (req, res) => {
  const { amount, currency = 'INR', receiptId } = req.body;
  
  const order = await razorpay.orders.create({
    amount: amount * 100, // paise (e.g. ₹1,499 = 149900)
    currency,
    receipt: receiptId,
  });

  res.json({ orderId: order.id, amount: order.amount });
});`}
            </pre>

            <h3 className="font-semibold text-stone-900 text-sm pt-4">Step 2: Server-Side Signature Verification</h3>
            <pre className="p-4 bg-stone-900 text-[#FAF8F5] rounded text-xs font-mono overflow-x-auto">
{`// POST /api/checkout/verify-payment
import crypto from 'crypto';

app.post('/api/checkout/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    // Payment verified! Mark order confirmed in database.
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ error: 'Signature verification failed' });
  }
});`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Pre-Production Audit */}
      {activeTab === 'audit' && (
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E7E0D3] space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
          <h2 className="text-xl font-cinzel font-bold text-[#0B1F16]">
            Pre-Production Replacement Checklist
          </h2>

          <div className="space-y-3">
            <p>
              Before launching this store for a real commercial Indian jewellery business, replace the following demo configurations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7E0D3] space-y-1.5">
                <p className="font-semibold text-stone-900 font-mono text-xs">1. WhatsApp & Phone</p>
                <p className="text-xs text-stone-600">
                  Replace <code>+91 98765 43210</code> in <code>src/config/brandConfig.ts</code> with the merchant&apos;s real verified WhatsApp Business number.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7E0D3] space-y-1.5">
                <p className="font-semibold text-stone-900 font-mono text-xs">2. Studio Location</p>
                <p className="text-xs text-stone-600">
                  Update the physical showroom address in Shivajinagar, Pune with the client&apos;s registered GST address.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7E0D3] space-y-1.5">
                <p className="font-semibold text-stone-900 font-mono text-xs">3. Product Catalogue & Pricing</p>
                <p className="text-xs text-stone-600">
                  Update <code>src/data/products.ts</code> with client&apos;s actual SKUs, photos, gram weights, and live pricing.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7E0D3] space-y-1.5">
                <p className="font-semibold text-stone-900 font-mono text-xs">4. Legal Policies</p>
                <p className="text-xs text-stone-600">
                  Review the Return, Exchange, and Shipping policies in <code>src/pages/PoliciesPage.tsx</code> with the client&apos;s legal council.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
