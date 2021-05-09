(function (window, k) {
    if (!window.AppstleIncluded) {
      window.AppstleIncluded = true;
      loadScript = function (src, callback) {
        var script = document.createElement("script");
        script.charset = "utf-8";
        script.src = src;
        script.onload = script.onreadystatechange = function () {
          if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = k;
            callback && callback();
          }
        };
        document.getElementsByTagName("head")[0].appendChild(script)
      };
      loadScript("https://cdn.shopify.com/s/files/1/0549/7408/7356/t/1/assets/appstle-subscription.js?v=1619467497");

      window.RS = Window.RS || {};
      RS.Config = {
        "selectors": {
            "payment_button_selectors": "form[action$='/cart/add'] .shopify-payment-button",
            "atcButtonSelector": ".btn.product-form__cart-submit",
            "subscriptionLinkSelector": "div.grid.myaccount",
            "atcButtonPlacement": "BEFORE",
            "subscriptionLinkPlacement": "BEFORE",
        },
        "moneyFormat": "{% raw %}{{amount_no_decimals}},-{% endraw %}",
        "oneTimePurchaseText": "One Time Purchase",
        "shop": "samling-store.myshopify.com",
        "deliveryText": "delivery",
        "purchaseOptionsText": "Purchase Options",
        "manageSubscriptionButtonText": "Manage Subscription",
        "subscriptionOptionText": "Subscribe and save",
        "sellingPlanSelectTitle": "DELIVERY FREQUENCY",
        "tooltipTitle": "Subscription detail",
        "tooltipDesctiption": "<strong>Have complete control of your subscriptions<\/strong><br\/><br\/>Skip, reschedule, edit, cancel deliveries anytime matching your needs.",
        "orderStatusManageSubscriptionTitle": "Subscription",
        "orderStatusManageSubscriptionDescription": "Continue to your account to view and manage your subscriptions.",
        "orderStatusManageSubscriptionButtonText": "Manage your subscription",
        "css": {
            "appstle_subscription_widget": {
                "margin-top": "" ,
                "margin-bottom": "",
            },

            "appstle_subscription_wrapper": {
                "border-width": "",
                "border-color": "",
            },

            "appstle_circle": {
                "border-color": "",
            },

            "appstle_dot": {
                "background-color": "",
            },

            "appstle_select": {
                "padding-top": "",
                "padding-bottom": "",
                "padding-left": "",
                "padding-right": "",
                "border-width": "",
                "border-style": "",
                "border-color": "",
                "border-radius": "",
            },

            "tooltip_subscription_svg": {
                "fill": "",
            },

            "appstle_tooltip": {
                "color": "",
                "background-color": "",
            },

            "appstle_tooltip_border_top_color": {
                "border-top-color": "",
            },

            "appstle_subscription_final_price": {
                "color": "",
            },
            "appstle_widget_text_color": {
                "color": "",
            },
            "customCSS": "",
            "priceSelector": ".price__regular .price-item.price-item--regular",
            "badgeTop": "",
            "pricePlacement": "BEFORE",
        }
      };

    }
  }
)(window);
