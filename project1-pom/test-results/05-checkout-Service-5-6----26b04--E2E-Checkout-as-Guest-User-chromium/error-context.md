# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-checkout.spec.js >> Service 5 & 6 - Checkout Suite >> TC10_Guest - Complete E2E Checkout as Guest User
- Location: tests\05-checkout.spec.js:82:9

# Error details

```
Tearing down "context" exceeded the test timeout of 30000ms.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - text: View the
    - link "Documentation" [ref=e4] [cursor=pointer]:
      - /url: https://testsmith-io.github.io/practice-software-testing/#/
    - text: for this application.
  - generic [ref=e5]:
    - generic [ref=e7]:
      - generic [ref=e8]: Practice Black Box Testing & Bug Hunting
      - button "Testing Guide" [ref=e9] [cursor=pointer]
      - button "🐛 Bug Hunting" [ref=e10] [cursor=pointer]
    - navigation [ref=e11]:
      - generic [ref=e12]:
        - link "Practice Software Testing - Toolshop" [ref=e13] [cursor=pointer]:
          - /url: /
          - img [ref=e14]
        - generic [ref=e32]:
          - menubar "Main menu" [ref=e33]:
            - menuitem "Home" [ref=e34]:
              - link "Home" [ref=e35] [cursor=pointer]:
                - /url: /
            - menuitem "Categories" [ref=e36]:
              - button "Categories" [ref=e37] [cursor=pointer]
            - menuitem "Contact" [ref=e38]:
              - link "Contact" [ref=e39] [cursor=pointer]:
                - /url: /contact
            - menuitem "Sign in" [ref=e40]:
              - link "Sign in" [ref=e41] [cursor=pointer]:
                - /url: /auth/login
            - menuitem "cart" [ref=e42]:
              - link "cart" [ref=e43] [cursor=pointer]:
                - /url: /checkout
                - img [ref=e45]
                - generic [ref=e47]: "1"
          - button "Select language" [ref=e49] [cursor=pointer]:
            - img [ref=e51]
            - text: EN
  - generic [ref=e55]:
    - list [ref=e57]:
      - listitem [ref=e58]:
        - generic [ref=e59] [cursor=pointer]:
          - generic [ref=e60]: Cart
          - generic [ref=e61]: "1"
      - listitem [ref=e62]:
        - generic [ref=e63] [cursor=pointer]:
          - generic [ref=e64]: Sign in
          - generic [ref=e65]: "2"
      - listitem [ref=e66]:
        - generic [ref=e67] [cursor=pointer]:
          - generic [ref=e68]: Billing Address
          - generic [ref=e69]: "3"
      - listitem:
        - generic:
          - generic: Payment
          - generic: "4"
    - generic [ref=e75]:
      - heading "Payment" [level=3] [ref=e76]
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]: Payment Method
          - combobox "Payment Method" [ref=e80]:
            - option "Choose your payment method" [disabled]
            - option "Bank Transfer"
            - option "Cash on Delivery" [selected]
            - option "Credit Card"
            - option "Buy Now Pay Later"
            - option "Gift Card"
        - generic [ref=e82]: Payment was successful
      - button "Confirm" [active] [ref=e84] [cursor=pointer]
  - paragraph [ref=e87]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e88] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. |
    - link "Privacy Policy" [ref=e89] [cursor=pointer]:
      - /url: /privacy
    - text: "| Banner photo by"
    - link "Barn Images" [ref=e90] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e91] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e93] [cursor=pointer]:
    - img [ref=e94]
```