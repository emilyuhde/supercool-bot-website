import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack, useToast, Flex, SimpleGrid } from '@chakra-ui/react';

const PricingTier = ({ name, price, features, onSelect }) => (
  <Box borderWidth={1} borderRadius="lg" p={6} m={4} width="300px">
    <VStack spacing={4}>
      <Heading size="lg">{name}</Heading>
      <Text fontSize="2xl" fontWeight="bold">${price}/month</Text>
      <VStack align="start">
        {features.map((feature, index) => (
          <Text key={index}>• {feature}</Text>
        ))}
      </VStack>
      <Button colorScheme="brand" onClick={() => onSelect(name, price)}>Select Plan</Button>
    </VStack>
  </Box>
);

const CheckoutForm = ({ selectedPlan, price }) => {
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast({
      title: 'Subscription Started',
      description: `You've subscribed to the ${selectedPlan} plan for $${price}/month.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button mt={4} colorScheme="brand" type="submit">
        Subscribe Now
      </Button>
    </form>
  );
};

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const pricingTiers = [
    {
      name: 'Basic',
      price: 99,
      features: ['AI-powered task management', 'Basic analytics', 'Email support'],
    },
    {
      name: 'Pro',
      price: 199,
      features: ['Advanced AI automation', 'Real-time analytics', '24/7 phone support'],
    },
    {
      name: 'Enterprise',
      price: 499,
      features: ['Custom AI solutions', 'Dedicated account manager', 'On-site training'],
    },
  ];

  const handlePlanSelect = (plan, price) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        Choose Your Plan
      </Heading>
      <Flex justify="center" wrap="wrap">
        <SimpleGrid columns={[1, null, 3]} spacing={8}>
          {pricingTiers.map((tier) => (
            <PricingTier
              key={tier.name}
              name={tier.name}
              price={tier.price}
              features={tier.features}
              onSelect={handlePlanSelect}
            />
          ))}
        </SimpleGrid>
      </Flex>
      {selectedPlan && (
        <Box mt={12}>
          <Heading as="h2" size="xl" mb={4}>
            Complete Your Subscription
          </Heading>
          <CheckoutForm selectedPlan={selectedPlan} price={selectedPrice} />
        </Box>
      )}
    </Box>
  );
};

export default PricingPage;
