// src/App.js
import React, { useState } from 'react';
import {
  ChakraProvider, Box, Heading, Select, VStack, FormControl, FormLabel, Container, Image, Flex
} from '@chakra-ui/react';
import CandlestickChart from './CandlestickChart';
import './App.css';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  return (
    <ChakraProvider>
      <Container maxW="100%"  height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} py={8} bgImage="url(https://img.freepik.com/premium-photo/technology-finance-illustration-3d-coin-background-depicting-market-growth-success_763042-7897.jpg?ga=GA1.1.1120039006.1724573533&semt=ais_hybrid-rr-similar)" bgRepeat={"no-repeat"} bgSize={"cover"}>

        <Heading as="h1" fontSize={"37pt"} textAlign="center"  mb={6} color={"#F3CB51"}>
          Binance Market Data
        </Heading>

        <Flex direction={['column', 'row']} mt={"20pt"} gap={"22rem"} mb={0} w={"50%"}>
          <Box w={['100%', '30%']} mb={[4, 0]} color={"wheat"}>
            <FormControl>
              <FormLabel fontSize={"15pt"}>Select Cryptocurrency</FormLabel>
              <Select color={"black"} value={selectedSymbol} onChange={handleSymbolChange} bg="white">
                <option value="ethusdt">ETH/USDT</option>
                <option value="bnbusdt">BNB/USDT</option>
                <option value="dotusdt">DOT/USDT</option>
              </Select>
            </FormControl>
          </Box>

          <Box w={['100%', '30%']} color={"wheat"}>
            <FormControl>
              <FormLabel fontSize={"15pt"}>Select Interval</FormLabel>
              <Select color={"black"} value={selectedInterval} onChange={handleIntervalChange} bg="white">
                <option value="1m">1 Minute</option>
                <option value="3m">3 Minutes</option>
                <option value="5m">5 Minutes</option>
              </Select>
            </FormControl>
          </Box>
        </Flex>

        <Box mt={20} p={4} bg="gray.50" borderRadius="md" boxShadow="md" display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"15pt"} height={"60vh"} width={"60%"} fontSize={"15pt"}>
          <CandlestickChart  symbol={selectedSymbol} interval={selectedInterval} />
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default App;
