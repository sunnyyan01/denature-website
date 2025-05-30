'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface ShopifyBuyButtonProps {
  productId: string;
  variantId?: string;
  className?: string;
  buttonText?: string;
}

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

export default function ShopifyBuyButton({
  productId,
  variantId,
  className = '',
  buttonText = '立即订购'
}: ShopifyBuyButtonProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && window.ShopifyBuy) {
      const client = window.ShopifyBuy.buildClient({
        domain: 'your-store.myshopify.com', // 需要替换为您的 Shopify 商店域名
        storefrontAccessToken: 'your-storefront-access-token', // 需要替换为您的 Storefront API 访问令牌
      });

      const ui = window.ShopifyBuy.UI.init(client);

      ui.createComponent('product', {
        id: productId,
        variantId: variantId,
        node: document.getElementById(`shopify-buy-button-${productId}`),
        options: {
          product: {
            iframe: false,
            contents: {
              img: false,
              title: false,
              price: false,
              description: false,
              button: true,
              buttonWithQuantity: true,
            },
            styles: {
              button: {
                'background-color': '#4A7C59',
                'font-family': 'Inter, sans-serif',
                'font-size': '16px',
                'padding': '12px 24px',
                'border-radius': '8px',
                'border': 'none',
                'color': '#ffffff',
                'cursor': 'pointer',
                'transition': 'background-color 0.2s ease',
                ':hover': {
                  'background-color': '#356A59',
                },
              },
              quantity: {
                'font-family': 'Inter, sans-serif',
                'font-size': '16px',
                'padding': '8px',
                'border-radius': '4px',
                'border': '1px solid #E0E0E0',
              },
            },
          },
          cart: {
            popup: true,
            styles: {
              button: {
                'background-color': '#4A7C59',
                'font-family': 'Inter, sans-serif',
                'font-size': '16px',
                'padding': '12px 24px',
                'border-radius': '8px',
                'border': 'none',
                'color': '#ffffff',
                'cursor': 'pointer',
                'transition': 'background-color 0.2s ease',
                ':hover': {
                  'background-color': '#356A59',
                },
              },
            },
          },
        },
      });

      setIsLoading(false);
    }
  }, [isClient, productId, variantId]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Script
        src="https://sdks.shopifycdn.com/buy-button/latest/buy-button.js"
        strategy="afterInteractive"
      />
      <div 
        id={`shopify-buy-button-${productId}`}
        className={`shopify-buy-button-container ${className}`}
      >
        {isLoading && (
          <button
            className="bg-[#4A7C59] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#356A59] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            加载中...
          </button>
        )}
      </div>
    </>
  );
} 