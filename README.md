# Sovendus Checkout Products Postback for Google Tag Manager

To setup Sovendus Checkout Products Postback, you need to create a tag in your GTM as described below.

## Add and setup the tag

1. Go to tags and create a new tag
2. Click on the first entry: "Discover more tag types in the Community Template Gallery"
3. Search for: "Sovendus Checkout Products Postback" and add it
4. Add the product id(s) you have received and the landing page paths for those products. If the url for the product page looks like this: my-shop.com/products/super-nice-product?url-parameter=parameter-value the landing page path to enter should be this: /products/super-nice-product

   ![Tag configuration](https://raw.githubusercontent.com/Sovendus-GmbH/sovendus_select_product_tracking_template/main/screenshots/url-config.png)

5. Add a trigger which fires when the sovendus request token is in the url

   ![Tag Trigger Configuration](https://raw.githubusercontent.com/Sovendus-GmbH/sovendus_select_product_tracking_template/main/screenshots/trigger-config.png)

6. Add a trigger which fires only on the order success page

7. The configuration should look similar to this

   ![Tag Trigger Configuration](https://raw.githubusercontent.com/Sovendus-GmbH/sovendus_select_product_tracking_template/main/screenshots/done-config.png)
