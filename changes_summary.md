# Changes Summary

## Files Changed
- netlify.toml
- package-lock.json
- package.json
- public/_redirects
- public/manifest.json
- src/App.js
- src/components/PricingPage.js
- src/index.js
- vercel.json

## Commit Message
Update website with pricing page, remove sign-up section, and fix routing

## Detailed Changes
[Include the content of the changes.patch file here]

To apply these changes, please follow these steps:
1. Review the changes listed above
2. Apply the changes manually to each file in your GitHub repository
3. Commit the changes with the provided commit message

Changes summary created. Please apply these changes to the GitHub repository manually.
diff --git a/netlify.toml b/netlify.toml
new file mode 100644
index 0000000..d103b12
--- /dev/null
+++ b/netlify.toml
@@ -0,0 +1,14 @@
+[[redirects]]
+  from = "/*"
+  to = "/index.html"
+  status = 200
+  force = true
+
+[build]
+  command = "npm run build"
+  publish = "build"
+
+[[headers]]
+  for = "/*"
+    [headers.values]
+    Cache-Control = "public, max-age=0, must-revalidate"
diff --git a/package-lock.json b/package-lock.json
index 68d649c..c2d01ab 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -20,6 +20,7 @@
         "react": "^18.3.1",
         "react-dom": "^18.3.1",
         "react-ga4": "^2.1.0",
+        "react-router-dom": "^6.27.0",
         "react-scripts": "5.0.1",
         "web-vitals": "^2.1.4"
       }
@@ -3770,6 +3771,15 @@
         "url": "https://opencollective.com/popperjs"
       }
     },
+    "node_modules/@remix-run/router": {
+      "version": "1.20.0",
+      "resolved": "https://registry.npmjs.org/@remix-run/router/-/router-1.20.0.tgz",
+      "integrity": "sha512-mUnk8rPJBI9loFDZ+YzPGdeniYK+FTmRD1TMCz7ev2SNIozyKKpnGgsxO34u6Z4z/t0ITuu7voi/AshfsGsgFg==",
+      "license": "MIT",
+      "engines": {
+        "node": ">=14.0.0"
+      }
+    },
     "node_modules/@rollup/plugin-babel": {
       "version": "5.3.1",
       "resolved": "https://registry.npmjs.org/@rollup/plugin-babel/-/plugin-babel-5.3.1.tgz",
@@ -16754,6 +16764,38 @@
         }
       }
     },
+    "node_modules/react-router": {
+      "version": "6.27.0",
+      "resolved": "https://registry.npmjs.org/react-router/-/react-router-6.27.0.tgz",
+      "integrity": "sha512-YA+HGZXz4jaAkVoYBE98VQl+nVzI+cVI2Oj/06F5ZM+0u3TgedN9Y9kmMRo2mnkSK2nCpNQn0DVob4HCsY/WLw==",
+      "license": "MIT",
+      "dependencies": {
+        "@remix-run/router": "1.20.0"
+      },
+      "engines": {
+        "node": ">=14.0.0"
+      },
+      "peerDependencies": {
+        "react": ">=16.8"
+      }
+    },
+    "node_modules/react-router-dom": {
+      "version": "6.27.0",
+      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-6.27.0.tgz",
+      "integrity": "sha512-+bvtFWMC0DgAFrfKXKG9Fc+BcXWRUO1aJIihbB79xaeq0v5UzfvnM5houGUm1Y461WVRcgAQ+Clh5rdb1eCx4g==",
+      "license": "MIT",
+      "dependencies": {
+        "@remix-run/router": "1.20.0",
+        "react-router": "6.27.0"
+      },
+      "engines": {
+        "node": ">=14.0.0"
+      },
+      "peerDependencies": {
+        "react": ">=16.8",
+        "react-dom": ">=16.8"
+      }
+    },
     "node_modules/react-scripts": {
       "version": "5.0.1",
       "resolved": "https://registry.npmjs.org/react-scripts/-/react-scripts-5.0.1.tgz",
diff --git a/package.json b/package.json
index 0e332e1..ec92b16 100644
--- a/package.json
+++ b/package.json
@@ -15,6 +15,7 @@
     "react": "^18.3.1",
     "react-dom": "^18.3.1",
     "react-ga4": "^2.1.0",
+    "react-router-dom": "^6.27.0",
     "react-scripts": "5.0.1",
     "web-vitals": "^2.1.4"
   },
diff --git a/public/_redirects b/public/_redirects
new file mode 100644
index 0000000..7797f7c
--- /dev/null
+++ b/public/_redirects
@@ -0,0 +1 @@
+/* /index.html 200
diff --git a/public/manifest.json b/public/manifest.json
new file mode 100644
index 0000000..6d7314a
--- /dev/null
+++ b/public/manifest.json
@@ -0,0 +1,15 @@
+{
+  "short_name": "SuperCool Bot",
+  "name": "SuperCool Bot - AI-Powered Automation",
+  "icons": [
+    {
+      "src": "favicon.ico",
+      "sizes": "64x64 32x32 24x24 16x16",
+      "type": "image/x-icon"
+    }
+  ],
+  "start_url": ".",
+  "display": "standalone",
+  "theme_color": "#000000",
+  "background_color": "#ffffff"
+}
diff --git a/src/App.js b/src/App.js
index ff69420..eb115c1 100644
--- a/src/App.js
+++ b/src/App.js
@@ -1,13 +1,11 @@
-import React, { useState, useEffect } from 'react';
-import { ChakraProvider, Box, VStack, Heading, Text, Button, Input, FormControl, FormLabel, Alert, AlertIcon, Link, useToast, extendTheme, SimpleGrid, Flex, Container, Image } from '@chakra-ui/react';
-import { loadStripe } from '@stripe/stripe-js';
-import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
+import React, { useState } from 'react';
+import { ChakraProvider, Box, VStack, Heading, Text, Button, Link as ChakraLink, useToast, extendTheme, SimpleGrid, Flex, Image, Container, Input } from '@chakra-ui/react';
 import { Global } from '@emotion/react';
+import { Route, Routes, Link } from 'react-router-dom';
+import PricingPage from './components/PricingPage';
 import heroImage from './images/image_123650291.JPG';
 import automaticUpdatesImage from './images/image_1236502912.JPG';
 
-const stripePromise = loadStripe('pk_test_your_publishable_key');
-
 const Fonts = () => (
   <Global
     styles={`
@@ -65,82 +63,10 @@ const theme = extendTheme({
   },
 });
 
-const CheckoutForm = () => {
-  const stripe = useStripe();
-  const elements = useElements();
-  const toast = useToast();
-
-  const handlePayment = async (event) => {
-    event.preventDefault();
-    if (!stripe || !elements) {
-      return;
-    }
-
-    const { error, paymentMethod } = await stripe.createPaymentMethod({
-      type: 'card',
-      card: elements.getElement(CardElement),
-    });
-
-    if (error) {
-      toast({
-        title: 'Payment failed',
-        description: error.message,
-        status: 'error',
-        duration: 5000,
-        isClosable: true,
-      });
-      console.log('Payment failed:', error);
-    } else {
-      toast({
-        title: 'Payment successful',
-        description: 'Your payment has been processed successfully.',
-        status: 'success',
-        duration: 5000,
-        isClosable: true,
-      });
-      console.log('Payment successful:', paymentMethod);
-    }
-  };
-
-  return (
-    <form onSubmit={handlePayment}>
-      <CardElement />
-      <Button
-        mt={6}
-        colorScheme="accent"
-        size="lg"
-        type="submit"
-        isDisabled={!stripe}
-      >
-        Pay Now
-      </Button>
-    </form>
-  );
-};
-
 function App() {
-  const [companyName, setCompanyName] = useState('');
-  const [email, setEmail] = useState('');
-  const [isSubmitted, setIsSubmitted] = useState(false);
   const [newsletterEmail, setNewsletterEmail] = useState('');
   const toast = useToast();
 
-  const handleSignUp = (e) => {
-    e.preventDefault();
-    console.log('Form submitted:', { companyName, email });
-    setIsSubmitted(true);
-    setCompanyName('');
-    setEmail('');
-    toast({
-      title: 'Sign-up successful',
-      description: "We've received your information. Please proceed with payment.",
-      status: 'success',
-      duration: 5000,
-      isClosable: true,
-    });
-    console.log('User signed up');
-  };
-
   const handleNewsletterSignUp = (e) => {
     e.preventDefault();
     console.log('Newsletter sign-up:', newsletterEmail);
@@ -158,130 +84,85 @@ function App() {
     <ChakraProvider theme={theme}>
       <Fonts />
       <Box p={[5, 10, 20]} maxWidth="1200px" margin="auto" bg="white">
-        <VStack spacing={[16, 20, 24]} align="stretch">
-          {/* Hero Section */}
-          <Box>
-            <Heading as="h1" size={["2xl", "3xl"]} textAlign="center" letterSpacing="tight" color="black">
-              SuperCool Bot
-            </Heading>
-          </Box>
-
-          {/* Product Showcase */}
-          <Box>
-            <Heading as="h2" size={["2xl", "3xl"]} mb={8} textAlign="center" color="black">
-              Transform Your Business with AI-Powered Automation
-            </Heading>
-            <Text fontSize={["lg", "xl"]} mb={12} textAlign="center" color="black">
-              SuperCool Bot leverages cutting-edge AI technology to revolutionize how companies manage operations, boost efficiency, and stay ahead in today's fast-paced business environment.
-            </Text>
-            <SimpleGrid columns={[1, null, 2]} spacing={12} mb={16}>
-              <Feature
-                icon="🤖"
-                title="Intelligent Task Management"
-                description="Our AI algorithms prioritize and distribute tasks, ensuring optimal resource allocation and increased productivity."
-              />
-              <Feature
-                icon="📊"
-                title="Real-Time Analytics"
-                description="Gain valuable insights with our advanced analytics, helping you make data-driven decisions to drive growth."
-              />
-              <Feature
-                icon="🔄"
-                title="Seamless Integration"
-                description="Easily integrate SuperCool Bot with your existing workflows and tools, minimizing disruption and maximizing efficiency."
-              />
-              <Feature
-                icon="🧠"
-                title="Continuous Learning"
-                description="Our AI constantly learns and adapts to your business needs, ensuring long-term value and improvement."
-              />
-            </SimpleGrid>
-            <Box bg="gray.50" p={12} borderRadius="xl" boxShadow="md">
-              <Image src={automaticUpdatesImage} alt="Automatic Updates" w="100%" h="300px" objectFit="cover" mb={6} borderRadius="md" />
-              <Heading as="h3" size="xl" mb={4} color="black">
-                Stay Ahead with Automatic Updates
-              </Heading>
-              <Text fontSize="lg" mb={6} color="black">
-                SuperCool Bot's cloud-based infrastructure ensures your software is always up-to-date with the latest features and security enhancements, keeping your business at the forefront of technology.
-              </Text>
-              <Button colorScheme="brand" size="lg">
-                Learn More
-              </Button>
-            </Box>
-          </Box>
-
-          {/* Contact Information */}
-          <Flex borderWidth={2} borderRadius="xl" p={12} boxShadow="lg" direction={["column", "row"]}>
-            <Box flex="1">
-              <Heading as="h2" size={["xl", "2xl"]} mb={6} color="black">Contact Us</Heading>
-              <Text fontSize={["lg", "xl"]} mb={4} color="black">Have questions? We're here to help!</Text>
-              <Text fontSize={["lg", "xl"]} mb={4} color="black">
-                Email: <Link href="mailto:info@supercoolbot.ai" fontWeight="semibold" color="black">info@supercoolbot.ai</Link>
-              </Text>
-              <Text fontSize={["lg", "xl"]} color="black">Phone: +1 (555) 123-4567</Text>
-            </Box>
-            <Box flex="1" ml={[0, 8]} mt={[8, 0]}>
-              <Image src={heroImage} alt="AI-powered automation" w="100%" h="300px" objectFit="cover" borderRadius="md" />
-            </Box>
-          </Flex>
-
-          {/* Sign-up Form */}
-          <Box borderWidth={2} borderRadius="xl" p={12} boxShadow="lg" bg="white">
-            <Heading as="h2" size={["xl", "2xl"]} mb={6} color="black">Sign Up</Heading>
-            {isSubmitted ? (
-              <Alert status="success" mb={6} borderRadius="md">
-                <AlertIcon />
-                Thank you for signing up! Please complete the payment process below.
-              </Alert>
-            ) : (
-              <FormControl as="form" onSubmit={handleSignUp}>
-                <FormLabel fontSize={["md", "lg"]} color="black">Company Name</FormLabel>
-                <Input
-                  type="text"
-                  placeholder="Enter your company name"
-                  value={companyName}
-                  onChange={(e) => setCompanyName(e.target.value)}
-                  required
-                  size="lg"
-                  mb={4}
-                  borderColor="brand.100"
-                  _hover={{ borderColor: "brand.200" }}
-                  _focus={{ borderColor: "brand.300", boxShadow: "0 0 0 1px #005F73" }}
-                />
-                <FormLabel fontSize={["md", "lg"]} color="black">Email</FormLabel>
-                <Input
-                  type="email"
-                  placeholder="Enter your email"
-                  value={email}
-                  onChange={(e) => setEmail(e.target.value)}
-                  required
-                  size="lg"
-                  mb={6}
-                  borderColor="brand.100"
-                  _hover={{ borderColor: "brand.200" }}
-                  _focus={{ borderColor: "brand.300", boxShadow: "0 0 0 1px #005F73" }}
-                />
-                <Button
-                  mt={4}
-                  colorScheme="accent"
-                  size="lg"
-                  type="submit"
-                >
-                  Sign Up
-                </Button>
-              </FormControl>
-            )}
+        <Routes>
+          <Route exact path="/" element={
+            <VStack spacing={[16, 20, 24]} align="stretch">
+              {/* Hero Section */}
+              <Box>
+                <Heading as="h1" size={["2xl", "3xl"]} textAlign="center" letterSpacing="tight" color="black">
+                  SuperCool Bot
+                </Heading>
+              </Box>
 
-            {isSubmitted && (
-              <Box mt={8}>
-                <Heading as="h3" size={["lg", "xl"]} mb={6} color="black">Complete Your Payment</Heading>
-                <Elements stripe={stripePromise}>
-                  <CheckoutForm />
-                </Elements>
+              {/* Product Showcase */}
+              <Box>
+                <Heading as="h2" size={["2xl", "3xl"]} mb={8} textAlign="center" color="black">
+                  Transform Your Business with AI-Powered Automation
+                </Heading>
+                <Text fontSize={["lg", "xl"]} mb={12} textAlign="center" color="black">
+                  SuperCool Bot leverages cutting-edge AI technology to revolutionize how companies manage operations, boost efficiency, and stay ahead in today's fast-paced business environment.
+                </Text>
+                <SimpleGrid columns={[1, null, 2]} spacing={12} mb={16}>
+                  <Feature
+                    icon="🤖"
+                    title="Intelligent Task Management"
+                    description="Our AI algorithms prioritize and distribute tasks, ensuring optimal resource allocation and increased productivity."
+                  />
+                  <Feature
+                    icon="📊"
+                    title="Real-Time Analytics"
+                    description="Gain valuable insights with our advanced analytics, helping you make data-driven decisions to drive growth."
+                  />
+                  <Feature
+                    icon="🔄"
+                    title="Seamless Integration"
+                    description="Easily integrate SuperCool Bot with your existing workflows and tools, minimizing disruption and maximizing efficiency."
+                  />
+                  <Feature
+                    icon="🧠"
+                    title="Continuous Learning"
+                    description="Our AI constantly learns and adapts to your business needs, ensuring long-term value and improvement."
+                  />
+                </SimpleGrid>
+                <Box bg="gray.50" p={12} borderRadius="xl" boxShadow="md">
+                  <Image src={automaticUpdatesImage} alt="Automatic Updates" w="100%" h="300px" objectFit="cover" mb={6} borderRadius="md" />
+                  <Heading as="h3" size="xl" mb={4} color="black">
+                    Stay Ahead with Automatic Updates
+                  </Heading>
+                  <Text fontSize="lg" mb={6} color="black">
+                    SuperCool Bot's cloud-based infrastructure ensures your software is always up-to-date with the latest features and security enhancements, keeping your business at the forefront of technology.
+                  </Text>
+                  <Button colorScheme="brand" size="lg">
+                    Learn More
+                  </Button>
+                </Box>
               </Box>
-            )}
-          </Box>
-        </VStack>
+
+              {/* Pricing Information */}
+              <Flex borderWidth={2} borderRadius="xl" p={12} boxShadow="lg" direction={["column", "row"]}>
+                <Box flex="1">
+                  <Heading as="h2" size={["xl", "2xl"]} mb={6} color="black">Pricing</Heading>
+                  <Text fontSize={["lg", "xl"]} mb={4} color="black">Unlock the full potential of AI-powered automation with our flexible subscription plans.</Text>
+                  <Text fontSize={["lg", "xl"]} mb={4} color="black">
+                    Starting from just $99/month, our plans include:
+                  </Text>
+                  <Text fontSize={["lg", "xl"]} mb={4} color="black">
+                    • Unlimited AI-powered task management<br/>
+                    • Real-time analytics and reporting<br/>
+                    • 24/7 customer support
+                  </Text>
+                  <Button as={Link} to="/pricing" colorScheme="brand" size="lg" mt={4} style={{ textDecoration: 'none' }}>
+                    View Detailed Pricing
+                  </Button>
+                </Box>
+                <Box flex="1" ml={[0, 8]} mt={[8, 0]}>
+                  <Image src={heroImage} alt="AI-powered automation" w="100%" h="300px" objectFit="cover" borderRadius="md" />
+                </Box>
+              </Flex>
+            </VStack>
+          } />
+          <Route path="/pricing" element={<PricingPage />} />
+        </Routes>
       </Box>
       <Footer handleNewsletterSignUp={handleNewsletterSignUp} newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} />
     </ChakraProvider>
diff --git a/src/components/PricingPage.js b/src/components/PricingPage.js
new file mode 100644
index 0000000..3322c8b
--- /dev/null
+++ b/src/components/PricingPage.js
@@ -0,0 +1,99 @@
+import React, { useState } from 'react';
+import { Box, Button, Heading, Text, VStack, useToast, Flex, SimpleGrid } from '@chakra-ui/react';
+
+const PricingTier = ({ name, price, features, onSelect }) => (
+  <Box borderWidth={1} borderRadius="lg" p={6} m={4} width="300px">
+    <VStack spacing={4}>
+      <Heading size="lg">{name}</Heading>
+      <Text fontSize="2xl" fontWeight="bold">${price}/month</Text>
+      <VStack align="start">
+        {features.map((feature, index) => (
+          <Text key={index}>• {feature}</Text>
+        ))}
+      </VStack>
+      <Button colorScheme="brand" onClick={() => onSelect(name, price)}>Select Plan</Button>
+    </VStack>
+  </Box>
+);
+
+const CheckoutForm = ({ selectedPlan, price }) => {
+  const toast = useToast();
+
+  const handleSubmit = (event) => {
+    event.preventDefault();
+    toast({
+      title: 'Subscription Started',
+      description: `You've subscribed to the ${selectedPlan} plan for $${price}/month.`,
+      status: 'success',
+      duration: 5000,
+      isClosable: true,
+    });
+  };
+
+  return (
+    <form onSubmit={handleSubmit}>
+      <Button mt={4} colorScheme="brand" type="submit">
+        Subscribe Now
+      </Button>
+    </form>
+  );
+};
+
+const PricingPage = () => {
+  const [selectedPlan, setSelectedPlan] = useState(null);
+  const [selectedPrice, setSelectedPrice] = useState(null);
+
+  const pricingTiers = [
+    {
+      name: 'Basic',
+      price: 99,
+      features: ['AI-powered task management', 'Basic analytics', 'Email support'],
+    },
+    {
+      name: 'Pro',
+      price: 199,
+      features: ['Advanced AI automation', 'Real-time analytics', '24/7 phone support'],
+    },
+    {
+      name: 'Enterprise',
+      price: 499,
+      features: ['Custom AI solutions', 'Dedicated account manager', 'On-site training'],
+    },
+  ];
+
+  const handlePlanSelect = (plan, price) => {
+    setSelectedPlan(plan);
+    setSelectedPrice(price);
+  };
+
+  return (
+    <Box p={8}>
+      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
+        Choose Your Plan
+      </Heading>
+      <Flex justify="center" wrap="wrap">
+        <SimpleGrid columns={[1, null, 3]} spacing={8}>
+          {pricingTiers.map((tier) => (
+            <PricingTier
+              key={tier.name}
+              name={tier.name}
+              price={tier.price}
+              features={tier.features}
+              onSelect={handlePlanSelect}
+            />
+          ))}
+        </SimpleGrid>
+      </Flex>
+      {selectedPlan && (
+        <Box mt={12}>
+          <Heading as="h2" size="xl" mb={4}>
+            Complete Your Subscription
+          </Heading>
+          <CheckoutForm selectedPlan={selectedPlan} price={selectedPrice} />
+        </Box>
+      )}
+    </Box>
+  );
+};
+
+export default PricingPage;
diff --git a/src/index.js b/src/index.js
index 593edf1..51f031d 100644
--- a/src/index.js
+++ b/src/index.js
@@ -1,10 +1,13 @@
 import React from 'react';
 import ReactDOM from 'react-dom/client';
+import { BrowserRouter } from 'react-router-dom';
 import App from './App';
 
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
-    <App />
+    <BrowserRouter>
+      <App />
+    </BrowserRouter>
   </React.StrictMode>
 );
diff --git a/vercel.json b/vercel.json
new file mode 100644
index 0000000..008b09c
--- /dev/null
+++ b/vercel.json
@@ -0,0 +1,10 @@
+{
+  "version": 2,
+  "builds": [
+    {
+      "src": "package.json",
+      "use": "@vercel/static-build",
+      "config": { "distDir": "build" }
+    }
+  ]
+}
