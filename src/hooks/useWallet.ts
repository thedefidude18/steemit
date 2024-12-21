import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { setUser } from '../store/slices/authSlice';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export function useWallet() {
  const dispatch = useDispatch();

  useEffect(() => {
    const connectWallet = async () => {
      try {
        // Implementation coming in next step
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    };

    return () => {
      // Cleanup
    };
  }, [dispatch]);

  return {
    connect: () => {
      // Implementation coming in next step
    },
    disconnect: () => {
      // Implementation coming in next step
    },
  };
}