import { ElMessage } from 'element-plus';
import { reactive, toRefs } from 'vue';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';

const state = reactive({
    supportMetaMask: false, // 是否支持MetaMask钱包
    ethereum: null, // ethereum实例
    connector: null, // wallet连接后的实例
    account: '',
});

export default () => {
    const { ethereum } = window;

    const methods = {
        init() {
            if (state.init) return;
            state.init = true;

            methods.initMetaMask();
            methods.connectWallet(true);
        },
        // 初始化initMetaMask
        initMetaMask() {
            // 判断是否是 MetaMask
            if (typeof ethereum !== 'undefined' && ethereum.isMetaMask) {
                state.supportMetaMask = true;
                state.account = ethereum.selectedAddress || '';
                state.ethereum = ethereum;

                ethereum.on('accountsChanged', (accounts) => {
                    state.account = accounts?.[0] || '';
                });

                ethereum.on('chainChanged', () => {
                    window.location.reload();
                });
            }
        },
        // 链接metaMask
        async connectMetaMask() {
            if (!ethereum) return;

            try {
                await ethereum.request({ method: 'eth_requestAccounts' });
            } catch (err) {
                if (err.code === -32002) {
                    ElMessage.error('Please manually open the MetaMask wallet connection');
                } else {
                    ElMessage.error(err?.message || err);
                }
            }
        },
        // 连接WalletConnect
        connectWallet(init) {
            const bridge = 'https://bridge.walletconnect.org';

            // Create a connector
            state.connector = new WalletConnect({
                bridge, // Required
                qrcodeModal: QRCodeModal,
            });

            if (state.connector?.connected) {
                state.connector.updateSession({ accounts: state.connector.accounts, chainId: state.connector.chainId });
                state.account = state.connector.accounts?.[0];
            } else if (!init) {
                state.connector.createSession();
            }

            // Subscribe to connection events
            state.connector.on('connect', (error, payload) => {
                if (error) {
                    throw error;
                }

                // Get provided accounts and chainId
                const { accounts } = payload.params[0];
                state.account = accounts?.[0] || '';
            });

            state.connector.on('session_update', (error, payload) => {
                if (error) {
                    throw error;
                }

                // Get updated accounts and chainId
                const { accounts } = payload.params[0];
                state.account = accounts?.[0] || '';
            });

            state.connector.on('disconnect', (error) => {
                if (error) {
                    throw error;
                }

                state.account = '';
            });
        },
    };

    methods.init();

    return {
        ...toRefs(state),
        ...methods,
    };
};
