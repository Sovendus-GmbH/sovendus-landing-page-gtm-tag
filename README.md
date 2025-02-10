# Sovendus (Landing) Page GTM Tag

To setup the Sovendus (Landing) Page Tag, you need to create a tag in your GTM as described below.

## Tag Features

This tag is required for the following Sovendus products:

- Checkout Products
- Optimize
- Voucher Network (required in Switzerland & optional in all other Countries)

## Setup the tag in Google Tag Manager

### Create the Tag

1. Go to tags and create a new tag
2. Click on the first entry in blue: "Discover more tag types in the Community Template Gallery"
3. Search for: "Sovendus Landing Page GTM Tag" and add it

### Configure the Tag

Select the Sovendus Products you want to activate, depending on the selected products there might appear additional settings, but mostly this wont require any configuration.
   ![Tag configuration](https://raw.githubusercontent.com/Sovendus-GmbH/sovendus-landing-page-gtm-tag/main/screenshots/config.png)

### Setup the Tag Trigger

#### Variant 1 - trigger on all pages

The easiest way to setup the trigger for this tag is by triggering on all pages as you can see on the screenshot below
   ![Tag Trigger](https://raw.githubusercontent.com/Sovendus-GmbH/sovendus-landing-page-gtm-tag/main/screenshots/trigger.png)

#### variant 2 - trigger only when necessary

Depending on which Sovendus products you want to activate, you will only require certain triggers as described below:

- Voucher Network: trigger on the landing page(s) where users coming from the Sovendus Voucher Network will land on
- Checkout Products: use a trigger based on if current page url contains "sovReqToken="
- Optimize: trigger on all pages as described in variant 1
