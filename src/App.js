import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Button, Input, FormControl, FormLabel, Alert, AlertIcon, Link, useToast, extendTheme, SimpleGrid, Flex, Container, Image } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Global } from '@emotion/react';
import heroImage from './images/image_123650291.JPG';
import automaticUpdatesImage from './images/image_1236502912.JPG';

const stripePromise = loadStripe('pk_test_your_publishable_key');

const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&family=Roboto:wght@400;700&display=swap');
    `}
  />
);

const theme = extendTheme({
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
    button: '"Roboto", sans-serif',
  },
  colors: {
    brand: {
      50: '#E6F2F5',
      100: '#B2D8E5',
      500: '#005F73',
      600: '#003F4F',
    },
    accent: {
      100: '#E9D8A6',
      200: '#EE9B00',
      300: '#CA6702',
      400: '#BB3E03',
      500: '#AE2012',
    },
  },
  styles: {
    global: {
      body: {
        color: 'black',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        fontFamily: 'button',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : 'accent.200',
          color: 'white',
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : 'accent.300',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s',
        }),
      },
    },
  },
});

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      toast({
        title: 'Payment failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.log('Payment failed:', error);
    } else {
      toast({
        title: 'Payment successful',
        description: 'Your payment has been processed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log('Payment successful:', paymentMethod);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <Button
        mt={6}
        colorScheme="accent"
        size="lg"
        type="submit"
        isDisabled={!stripe}
      >
        Pay Now
      </Button>
    </form>
  );
};

function App() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const toast = useToast();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { companyName, email });
    setIsSubmitted(true);
    setCompanyName('');
    setEmail('');
    toast({
      title: 'Sign-up successful',
      description: "We've received your information. Please proceed with payment.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    console.log('User signed up');
  };

  const handleNewsletterSignUp = (e) => {
    e.preventDefault();
    console.log('Newsletter sign-up:', newsletterEmail);
    setNewsletterEmail('');
    toast({
      title: 'Newsletter sign-up successful',
      description: "You've been added to our mailing list.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Box p={[5, 10, 20]} maxWidth="1200px" margin="auto" bg="white">
        <VStack spacing={[16, 20, 24]} align="stretch">
          {/* Hero Section */}
          <Box>
            <Heading as="h1" size={["2xl", "3xl"]} textAlign="center" letterSpacing="tight" color="black">
              SuperCool Bot
            </Heading>
          </Box>

          {/* Product Showcase */}
          <Box>
            <Heading as="h2" size={["2xl", "3xl"]} mb={8} textAlign="center" color="black">
              Transform Your Business with AI-Powered Automation
            </Heading>
            <Text fontSize={["lg", "xl"]} mb={12} textAlign="center" color="black">
              SuperCool Bot leverages cutting-edge AI technology to revolutionize how companies manage operations, boost efficiency, and stay ahead in today's fast-paced business environment.
            </Text>
            <SimpleGrid columns={[1, null, 2]} spacing={12} mb={16}>
              <Feature
                icon="🤖"
                title="Intelligent Task Management"
                description="Our AI algorithms prioritize and distribute tasks, ensuring optimal resource allocation and increased productivity."
              />
              <Feature
                icon="📊"
                title="Real-Time Analytics"
                description="Gain valuable insights with our advanced analytics, helping you make data-driven decisions to drive growth."
              />
              <Feature
                icon="🔄"
                title="Seamless Integration"
                description="Easily integrate SuperCool Bot with your existing workflows and tools, minimizing disruption and maximizing efficiency."
              />
              <Feature
                icon="🧠"
                title="Continuous Learning"
                description="Our AI constantly learns and adapts to your business needs, ensuring long-term value and improvement."
              />
            </SimpleGrid>
            <Box bg="gray.50" p={12} borderRadius="xl" boxShadow="md">
              <Image src={automaticUpdatesImage} alt="Automatic Updates" w="100%" h="300px" objectFit="cover" mb={6} borderRadius="md" />
              <Heading as="h3" size="xl" mb={4} color="black">
                Stay Ahead with Automatic Updates
              </Heading>
              <Text fontSize="lg" mb={6} color="black">
                SuperCool Bot's cloud-based infrastructure ensures your software is always up-to-date with the latest features and security enhancements, keeping your business at the forefront of technology.
              </Text>
              <Button colorScheme="brand" size="lg">
                Learn More
              </Button>
            </Box>
          </Box>

          {/* Contact Information */}
          <Flex borderWidth={2} borderRadius="xl" p={12} boxShadow="lg" direction={["column", "row"]}>
            <Box flex="1">
              <Heading as="h2" size={["xl", "2xl"]} mb={6} color="black">Contact Us</Heading>
              <Text fontSize={["lg", "xl"]} mb={4} color="black">Have questions? We're here to help!</Text>
              <Text fontSize={["lg", "xl"]} mb={4} color="black">
                Email: <Link href="mailto:info@supercoolbot.ai" fontWeight="semibold" color="black">info@supercoolbot.ai</Link>
              </Text>
              <Text fontSize={["lg", "xl"]} color="black">Phone: +1 (555) 123-4567</Text>
            </Box>
            <Box flex="1" ml={[0, 8]} mt={[8, 0]}>
              <Image src={heroImage} alt="AI-powered automation" w="100%" h="300px" objectFit="cover" borderRadius="md" />
            </Box>
          </Flex>

          {/* Sign-up Form */}
          <Box borderWidth={2} borderRadius="xl" p={12} boxShadow="lg" bg="white">
            <Heading as="h2" size={["xl", "2xl"]} mb={6} color="black">Sign Up</Heading>
            {isSubmitted ? (
              <Alert status="success" mb={6} borderRadius="md">
                <AlertIcon />
                Thank you for signing up! Please complete the payment process below.
              </Alert>
            ) : (
              <FormControl as="form" onSubmit={handleSignUp}>
                <FormLabel fontSize={["md", "lg"]} color="black">Company Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  size="lg"
                  mb={4}
                  borderColor="brand.100"
                  _hover={{ borderColor: "brand.200" }}
                  _focus={{ borderColor: "brand.300", boxShadow: "0 0 0 1px #005F73" }}
                />
                <FormLabel fontSize={["md", "lg"]} color="black">Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  size="lg"
                  mb={6}
                  borderColor="brand.100"
                  _hover={{ borderColor: "brand.200" }}
                  _focus={{ borderColor: "brand.300", boxShadow: "0 0 0 1px #005F73" }}
                />
                <Button
                  mt={4}
                  colorScheme="accent"
                  size="lg"
                  type="submit"
                >
                  Sign Up
                </Button>
              </FormControl>
            )}

            {isSubmitted && (
              <Box mt={8}>
                <Heading as="h3" size={["lg", "xl"]} mb={6} color="black">Complete Your Payment</Heading>
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
      <Footer handleNewsletterSignUp={handleNewsletterSignUp} newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} />
    </ChakraProvider>
  );
}

const Feature = ({ icon, title, description }) => (
  <Box>
    <Flex align="center" mb={4}>
      <Text fontSize="3xl" mr={4}>{icon}</Text>
      <Heading as="h4" size="lg" color="black">{title}</Heading>
    </Flex>
    <Text color="black">{description}</Text>
  </Box>
);

const Footer = ({ handleNewsletterSignUp, newsletterEmail, setNewsletterEmail }) => (
  <Box as="footer" bg="gray.100" py={12} mt={20}>
    <Container maxW="container.xl">
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Box maxW="400px">
            <Heading as="h3" size="lg" mb={4} color="black">Sign up for our newsletter</Heading>
            <form onSubmit={handleNewsletterSignUp}>
              <Flex>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  mr={2}
                />
                <Button type="submit" colorScheme="accent">Subscribe</Button>
              </Flex>
            </form>
          </Box>
          <Box>
            <Text fontSize="md" color="black">© 2023 CoolBotz. All rights reserved.</Text>
          </Box>
        </Flex>
      </VStack>
    </Container>
  </Box>
);

export default App;
