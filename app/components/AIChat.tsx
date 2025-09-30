"use client";

import { useState, useRef, useEffect } from "react";
import {
  TextInput,
  Button,
  ScrollArea,
  Group,
  Text,
  Stack,
  Paper,
  Loader,
  ActionIcon,
  Divider,
  Badge,
  Box,
} from "@mantine/core";
import { IconSend, IconRobot, IconUser, IconRefresh } from "@tabler/icons-react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

// Thirdweb client configuration
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id",
});

// Wallet configuration
const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export function AIChat() {
  const account = useActiveAccount();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your thirdweb AI assistant. I can help you with blockchain transactions, smart contracts, and Web3 development. What would you like to do today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      // Try multiple selectors to find the scrollable container
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') ||
                             scrollAreaRef.current.querySelector('.mantine-ScrollArea-viewport') ||
                             scrollAreaRef.current.querySelector('[data-scrollable]');
      
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        // Fallback to direct scroll
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // Add a small delay to ensure the DOM has updated
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages]);

  // Also scroll when loading state changes
  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Scroll to bottom immediately when user sends a message
    setTimeout(() => scrollToBottom(), 50);

    try {
      const response = await fetch("/api/thirdweb-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Scroll to bottom when AI response is received
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request. Please check your API configuration and try again.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      // Scroll to bottom when error message is shown
      setTimeout(() => scrollToBottom(), 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your thirdweb AI assistant. I can help you with blockchain transactions, smart contracts, and Web3 development. What would you like to do today?",
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Show connection screen if no wallet is connected
  if (!account) {
    return (
      <Box style={{ 
        height: "100%", 
        display: "flex", 
        flexDirection: "column", 
        background: "#000000",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>
        {/* Connection Required Screen */}
        <Box style={{
          textAlign: "center",
          maxWidth: "600px",
          padding: "4rem 3rem",
          background: "linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 30, 30, 0.9) 100%)",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Animated background gradient */}
          <Box style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "conic-gradient(from 0deg, transparent, rgba(138, 43, 226, 0.1), transparent, rgba(75, 0, 130, 0.1), transparent)",
            animation: "rotate 20s linear infinite",
            zIndex: 0
          }} />
          
          {/* Content */}
          <Box style={{ position: "relative", zIndex: 1 }}>
            {/* AI Robot Icon with enhanced styling */}
            <Box style={{
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(138, 43, 226, 0.3)",
              margin: "0 auto 2.5rem auto",
              boxShadow: "0 20px 40px rgba(138, 43, 226, 0.2), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              position: "relative",
              overflow: "hidden"
            }}>
              <IconRobot size={50} color="#8A2BE2" />
              {/* Shine effect */}
              <Box style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                animation: "shimmer 3s infinite"
              }} />
            </Box>

            <Text fw={800} size="2rem" c="white" mb="md" style={{ 
              background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em"
            }}>
              Welcome to AI Assistant
            </Text>
            
            <Text size="lg" c="#cccccc" mb="xl" style={{ 
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: "480px",
              margin: "0 auto 3rem auto"
            }}>
              Connect your wallet to unlock the power of AI-driven Web3 assistance. 
              Get help with smart contracts, DeFi strategies, and blockchain development.
            </Text>

            <ConnectButton 
              client={client}
              wallets={wallets}
              theme="dark"
              connectButton={{
                label: "Connect Wallet",
                style: {
                  background: "linear-gradient(135deg, #8A2BE2 0%, #4B0082 50%, #8A2BE2 100%)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "20px",
                  fontWeight: 700,
                  padding: "20px 40px",
                  fontSize: "18px",
                  height: "64px",
                  minWidth: "240px",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 12px 40px rgba(138, 43, 226, 0.4), 0 6px 20px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                  textTransform: "none",
                  letterSpacing: "0.5px"
                }
              }}
              connectModal={{
                size: "compact",
                title: "Connect to AI Assistant",
                titleIcon: "",
                showThirdwebBranding: false,
                
              }}
            />

           
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box style={{ 
      height: "100%", 
      display: "flex", 
      flexDirection: "column", 
      background: "#000000",
      position: "relative"
    }}>
      {/* Connected Wallet Header */}
      <Box p="lg" style={{ 
        borderBottom: "1px solid rgba(138, 43, 226, 0.2)", 
        background: "linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 30, 30, 0.9) 100%)",
        backdropFilter: "blur(20px)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle animated background */}
        <Box style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(138, 43, 226, 0.5), transparent)",
          animation: "shimmer 3s infinite"
        }} />
        
        <Group gap="md">
          {/* Enhanced AI Robot Icon */}
          <Box style={{
            width: "48px",
            height: "48px",
            background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(138, 43, 226, 0.3)",
            boxShadow: "0 8px 24px rgba(138, 43, 226, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            position: "relative",
            overflow: "hidden"
          }}>
            <IconRobot size={24} color="#8A2BE2" />
            {/* Subtle shine effect */}
            <Box style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              animation: "shimmer 4s infinite"
            }} />
          </Box>
          
          <div>
            <Text fw={700} size="lg" c="white" style={{ 
              background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.01em"
            }}>
              AI Assistant
            </Text>
            <Text size="sm" c="#888888" style={{ fontWeight: 500 }}>
              Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </Text>
          </div>
        </Group>
      </Box>

      {/* Hidden header for desktop */}
      <Box p="sm" style={{ borderBottom: "1px solid #333333", display: "none" }}>
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <Box style={{
              width: "32px",
              height: "32px",
              background: "#ffffff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #333333"
            }}>
              <IconRobot size={16} color="#000000" />
            </Box>
            <div>
              <Text fw={600} size="sm" c="white">AI Assistant</Text>
              <Text size="xs" c="#666666">Ready to help</Text>
            </div>
          </Group>
          <Group gap="xs">
            <Badge 
              variant="filled" 
              size="sm"
              style={{
                background: "#ffffff",
                color: "#000000",
                fontWeight: 600
              }}
            >
              Online
            </Badge>
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={clearChat}
              title="Clear chat"
              style={{
                background: "#1a1a1a",
                border: "1px solid #333333",
                color: "#ffffff",
                "&:hover": {
                  background: "#333333",
                  transform: "scale(1.05)"
                }
              }}
            >
              <IconRefresh size={14} />
            </ActionIcon>
          </Group>
        </Group>
      </Box>

      {/* Messages */}
      <ScrollArea
        ref={scrollAreaRef}
        style={{ flex: 1 }}
        p="xl"
        scrollbarSize={4}
        scrollHideDelay={1000}
      >
        <Stack gap="xl">
          {messages.map((message, index) => (
            <Group
              key={message.id}
              align="flex-start"
              gap="md"
              style={{
                flexDirection: message.role === "user" ? "row-reverse" : "row",
                animation: `slideInUp 0.4s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Avatar */}
              <Box style={{
                width: "40px",
                height: "40px",
                background: message.role === "user" ? "#ffffff" : "#1a1a1a",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #333333",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
              }}>
                {message.role === "user" ? (
                  <IconUser size={20} color="#000000" />
                ) : (
                  <IconRobot size={20} color="#ffffff" />
                )}
              </Box>
              
              {/* Message Bubble */}
              <Paper
                p="lg"
                radius="xl"
                style={{
                  maxWidth: "80%",
                  background: message.role === "user"
                    ? "#ffffff"
                    : message.isError
                    ? "#ff4444"
                    : "#1a1a1a",
                  border: message.isError
                    ? "1px solid #ff6666"
                    : "1px solid #333333",
                  boxShadow: message.role === "user"
                    ? "0 8px 32px rgba(255, 255, 255, 0.1)"
                    : "0 8px 32px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <Text 
                  size="sm" 
                  c={message.role === "user" ? "#000000" : "#ffffff"} 
                  style={{ 
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}
                >
                  {message.content}
                </Text>
                <Text 
                  size="xs" 
                  c={message.role === "user" ? "#666666" : "#999999"} 
                  mt="sm"
                  style={{ fontWeight: 400 }}
                >
                  {formatTime(message.timestamp)}
                </Text>
                
                {/* Subtle shine effect */}
                <Box
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: message.role === "user"
                      ? "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                    animation: "shimmer 3s infinite"
                  }}
                />
              </Paper>
            </Group>
          ))}
          
          {isLoading && (
            <Group align="flex-start" gap="md" style={{ animation: "fadeIn 0.3s ease-out" }}>
              <Box style={{
                width: "40px",
                height: "40px",
                background: "#1a1a1a",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #333333",
                flexShrink: 0
              }}>
                <IconRobot size={20} color="#ffffff" />
              </Box>
              <Paper 
                p="lg" 
                radius="xl" 
                style={{ 
                  background: "#1a1a1a",
                  border: "1px solid #333333",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                }}
              >
                <Group gap="md">
                  <Loader size="sm" color="#ffffff" />
                  <Text size="sm" c="#999999" style={{ fontWeight: 500 }}>
                    AI is thinking...
                  </Text>
                </Group>
              </Paper>
            </Group>
          )}
        </Stack>
      </ScrollArea>

      <Divider color="#333333" />

      {/* Sleek Input Section */}
      <Box 
        p="xl" 
        style={{ 
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid #333333",
          position: "relative"
        }}
      >
        <Group gap="sm" align="flex-end">
          <TextInput
            placeholder="Ask me anything about Web3..."
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            style={{ flex: 1 }}
            size="md"
            radius="lg"
            styles={{
              input: {
                background: "#1a1a1a",
                border: "1px solid #333333",
                color: "#ffffff",
                fontSize: "14px",
                padding: "12px 16px",
                fontWeight: 500,
                height: "48px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:focus": {
                  borderColor: "#ffffff",
                  boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)",
                  background: "#0a0a0a",
                  transform: "translateY(-1px)"
                },
                "&::placeholder": {
                  color: "#666666",
                  fontSize: "14px",
                  fontWeight: 400
                },
                "&:disabled": {
                  opacity: 0.5,
                  cursor: "not-allowed"
                }
              },
            }}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="md"
            radius="lg"
            leftSection={
              <Box style={{
                width: "16px",
                height: "16px",
                background: inputValue.trim() && !isLoading 
                  ? "linear-gradient(135deg, #000000 0%, #333333 100%)"
                  : "linear-gradient(135deg, #333333 0%, #1a1a1a 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                transform: isLoading ? "scale(0.8)" : "scale(1)"
              }}>
                <IconSend 
                  size={12} 
                  color={inputValue.trim() && !isLoading ? "#ffffff" : "#666666"}
                  style={{ 
                    transition: "all 0.2s ease",
                    transform: isLoading ? "rotate(45deg)" : "rotate(0deg)"
                  }} 
                />
              </Box>
            }
            style={{
              background: inputValue.trim() && !isLoading
                ? "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)"
                : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
              color: inputValue.trim() && !isLoading
                ? "#000000"
                : "#666666",
              border: inputValue.trim() && !isLoading
                ? "1px solid #ffffff"
                : "1px solid #333333",
              fontWeight: 600,
              padding: "12px 16px",
              minWidth: "80px",
              height: "48px",
              fontSize: "12px",
              letterSpacing: "0.3px",
              textTransform: "uppercase",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: inputValue.trim() && !isLoading
                ? "0 4px 16px rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)"
                : "0 3px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: inputValue.trim() && !isLoading ? "translateY(-2px) scale(1.02)" : "translateY(-1px)",
                boxShadow: inputValue.trim() && !isLoading
                  ? "0 8px 24px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15)"
                  : "0 6px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                background: inputValue.trim() && !isLoading
                  ? "linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%)"
                  : "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)"
              },
              "&:active": {
                transform: inputValue.trim() && !isLoading ? "translateY(-1px) scale(0.98)" : "translateY(0px)",
                boxShadow: inputValue.trim() && !isLoading
                  ? "0 3px 12px rgba(255, 255, 255, 0.2), 0 1px 4px rgba(0, 0, 0, 0.1)"
                  : "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              },
              "&:disabled": {
                opacity: 0.4,
                cursor: "not-allowed",
                transform: "none",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
              }
            }}
          >
            {isLoading ? (
              <Box style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Box style={{
                  width: "12px",
                  height: "12px",
                  border: "2px solid #666666",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                <Text size="xs" c="#666666" fw={600}>...</Text>
              </Box>
            ) : (
              "Send"
            )}
          </Button>
        </Group>
        <Text 
          size="xs" 
          c="#666666" 
          mt="md" 
          ta="center"
          style={{ fontWeight: 400 }}
        >
          Press Enter to send • Shift+Enter for new line
        </Text>
      </Box>
    </Box>
  );
}
