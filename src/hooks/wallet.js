import { ElMessage } from 'element-plus';
import { reactive, toRefs } from 'vue';

const state = reactive({
    supportMetaMask: false, // 是否支持MetaMask钱包
    account: '',
});

export default () => {
    const { ethereum } = window;

    const methods = {
        init() {
            if (state.init) return;
            state.init = true;

            // 判断是否是 MetaMask
            if (typeof ethereum !== 'undefined' && ethereum.isMetaMask) {
                methods.initMetaMask();
            }
        },
        // 初始化initMetaMask
        initMetaMask() {
            state.supportMetaMask = true;
            state.account = ethereum.selectedAddress || '';

            ethereum.on('accountsChanged', (accounts) => {
                state.account = accounts?.[0] || '';
            });

            ethereum.on('chainChanged', () => {
                window.location.reload();
            });
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
    };

    methods.init();

    return {
        ...toRefs(state),
        ...methods,
    };
};
