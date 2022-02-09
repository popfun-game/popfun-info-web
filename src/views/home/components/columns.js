import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import {
    toFormat,
    toFixed,
    div,
    lt,
} from '@/utils/number';
import ChartLine from '@/components/ChartLine';
import autoImg from '@/components/AutoImg';
import { getPrecision } from '@/utils/tool';

export default () => {
    const { t } = useI18n();
    const handler = {
        get(obj, prop) {
            return prop in obj ? obj[prop] : obj.coin;
        },
    };

    return (size, tab) => {
        const serial = {
            prop: '',
            label: '#',
            width: 50,
            render(h, { $index }) {
                return size + $index + 1;
            },
        };
        const columns = new Proxy({
            gaming: [
                serial,
                {
                    prop: 'name',
                    label: t('th_game'),
                    'min-width': '180px',
                    render(h, { row }) {
                        return (
                            <router-link class="flex-row flex-items-center" style="display: inline-flex;" to={replacePath(`/game/${row.id}/`)}>
                                <autoImg
                                    src={row.image}
                                    alt={row.name}
                                    small
                                    width="24px"
                                    height="24px"
                                />
                                <span class="mr8 ml4" style="color: var(--text-color-1)">{ row.name }</span>
                                <span class="text-uppercase color-light">chain</span>
                            </router-link>
                        );
                    },
                },
                {
                    prop: 'address',
                    align: 'right',
                    width: 160,
                    label: t('th_address'),
                    render() {
                        return (
                            <div class="flex-col">
                                <p class="flex-row-flex-end">
                                    { toFormat(123456, 0) }
                                    <span class={1 > 0 ? 'color-up ml4' : 'color-down ml4'}> (+1.02%) </span>
                                </p>
                                <p class="flex-row-flex-end">
                                    --
                                </p>
                            </div>
                        );
                    },
                },
                {
                    prop: 'symbol',
                    label: t('th_token'),
                    width: '80',
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                <span class="text-uppercase">
                                    { row.symbol }
                                </span>
                                <span class="text-uppercase">
                                    DEMO
                                </span>
                            </div>
                        );
                    },
                },
                {
                    prop: 'current_price',
                    align: 'right',
                    label: t('th_price'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                <span class="text-uppercase">
                                    { row?.current_price ? `$${toFormat(row.current_price, getPrecision(row.current_price))}` : '--' }
                                </span>
                                <span class="text-uppercase">
                                    --
                                </span>
                            </div>
                        );
                    },
                },
                {
                    prop: 'price_change_percentage_24h',
                    align: 'right',
                    width: 80,
                    label: t('th_24h'),
                    render(h, { row }) {
                        const scale = toFixed(row.price_change_percentage_24h, 2);
                        return (
                            <div class="flex-col">
                                <span class={scale > 0 ? 'color-up' : 'color-down'}>
                                    { scale > 0 ? `+${scale}` : scale }%
                                </span>
                                <span>
                                    --
                                </span>
                            </div>

                        );
                    },
                },
                {
                    prop: 'market_cap',
                    align: 'right',
                    width: 200,
                    label: t('th_mkt_cap'),
                    render(h, { row }) {
                        const scale = toFixed(row.market_cap_change_percentage_24h, 2);

                        return (
                            <div class="flex-col">
                                <p class="flex-row-flex-end">
                                    { row?.market_cap ? `${toFormat(row.market_cap)}` : '--' }
                                    <span
                                        class={scale > 0 ? 'color-up ml4' : 'color-down ml4'}
                                        v-show={row?.market_cap}
                                    >
                                        { row?.market_cap_change_percentage_24h ? `(${scale > 0 ? `+${scale}` : scale}%)` : '--' }
                                    </span>
                                </p>
                                <p class="flex-row-flex-end">
                                    --
                                </p>
                            </div>
                        );
                    },
                },
                {
                    prop: 'fully_diluted_valuation',
                    align: 'right',
                    width: 150,
                    label: t('th_fdv'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                <p class="flex-row-flex-end">
                                    { row?.fully_diluted_valuation ? `$${toFormat(row.fully_diluted_valuation)}` : '--' }
                                </p>
                                <p class="flex-row-flex-end">
                                    { row?.fully_diluted_valuation1 ? `$${toFormat(row.fully_diluted_valuation)}` : '--' }
                                </p>
                            </div>
                        );
                    },
                },
                {
                    prop: 'popularity',
                    align: 'right',
                    label: t('th_popularity'),
                    render(h, { row }) {
                        let num = '--';
                        const flame = 5;

                        row.popularity = 10000;

                        if (row?.popularity) {
                            num = row.popularity > 1000 ? `${toFixed(row.popularity / 1000, 1) }K` : row.popularity;
                        }

                        return (
                            <div class="flex-col">
                                <p>{ num }</p>
                                <div class="flex-row-flex-end flex-items-center" style="height: 22px;" v-show={row?.popularity}>
                                    { /* eslint-disable-next-line */ }
                                    { Array.apply(null, { length: flame }).map(() => <i class="icon-flame" style="color: #f0502d;" />) }
                                </div>
                            </div>
                        );
                    },
                },
            ],
            guild: [
                serial,
                {
                    prop: 'name',
                    label: t('th_guild'),
                    'min-width': '180px',
                    render(h, { row }) {
                        return (
                            <router-link class="flex-row flex-items-center" style="display: inline-flex;" to={replacePath(`/guild/${row.id}/`)}>
                                <autoImg
                                    src={row.image}
                                    alt={row.name}
                                    small
                                    width="24px"
                                    height="24px"
                                />
                                <span class="mr8 ml4" style="color: var(--text-color-1)">{ row.name }</span>
                            </router-link>
                        );
                    },
                },
                {
                    prop: 'member',
                    label: t('th_members'),
                    width: 100,
                    formatter(row) {
                        return row?.member ? toFormat(row.member, 0) : '--';
                    },
                },
                {
                    prop: 'symbol',
                    label: t('th_token'),
                    width: '80',
                    render(h, { row }) {
                        return (
                            <span class="text-uppercase">
                                { row.symbol }
                            </span>
                        );
                    },
                },
                {
                    prop: 'current_price',
                    align: 'right',
                    label: t('th_price'),
                    width: 110,
                    render(h, { row }) {
                        return (
                            <span class="text-uppercase">
                                { row?.current_price ? `$${toFormat(row.current_price, getPrecision(row.current_price))}` : '--' }
                            </span>
                        );
                    },
                },
                {
                    prop: 'price_change_percentage_24h',
                    align: 'right',
                    width: 80,
                    label: t('th_24h'),
                    render(h, { row }) {
                        const scale = toFixed(row.price_change_percentage_24h, 2);
                        return (
                            <span class={scale > 0 ? 'color-up' : 'color-down'}>
                                { scale > 0 ? `+${scale}` : scale }%
                            </span>

                        );
                    },
                },
                {
                    prop: 'market_cap',
                    align: 'right',
                    width: 200,
                    label: t('th_mkt_cap'),
                    render(h, { row }) {
                        const scale = toFixed(row.market_cap_change_percentage_24h, 2);

                        return (
                            <p class="flex-row-flex-end">
                                { row?.market_cap ? `${toFormat(row.market_cap)}` : '--' }
                                <span
                                    class={scale > 0 ? 'color-up ml4' : 'color-down ml4'}
                                    v-show={row?.market_cap}
                                >
                                    { row?.market_cap_change_percentage_24h ? `(${scale > 0 ? `+${scale}` : scale}%)` : '--' }
                                </span>
                            </p>
                        );
                    },
                },
                {
                    prop: 'fully_diluted_valuation',
                    align: 'right',
                    width: 150,
                    label: t('th_fdv'),
                    render(h, { row }) {
                        return (
                            <p class="flex-row-flex-end">
                                { row?.fully_diluted_valuation ? `$${toFormat(row.fully_diluted_valuation)}` : '--' }
                            </p>
                        );
                    },
                },
                {
                    prop: 'assets',
                    align: 'right',
                    width: 150,
                    label: t('th_assets'),
                    render(h, { row }) {
                        return (
                            <p class="flex-row-flex-end">
                                { row?.assets ? `$${toFormat(row.assets)}` : '--' }
                            </p>
                        );
                    },
                },
                {
                    prop: 'popularity',
                    align: 'right',
                    label: t('th_popularity'),
                    render(h, { row }) {
                        let num = '--';
                        const flame = 5;

                        row.popularity = 10000;

                        if (row?.popularity) {
                            num = row.popularity > 1000 ? `${toFixed(row.popularity / 1000, 1) }K` : row.popularity;
                        }

                        return (
                            <div class="flex-col">
                                <p>{ num }</p>
                                <div class="flex-row-flex-end flex-items-center" style="height: 22px;" v-show={row?.popularity}>
                                    { /* eslint-disable-next-line */ }
                                    { Array.apply(null, { length: flame }).map(() => <i class="icon-flame" style="color: #f0502d;" />) }
                                </div>
                            </div>
                        );
                    },
                },
            ],
            chain: [
                serial,
                {
                    prop: 'name',
                    label: t('th_chain'),
                    'min-width': '180px',
                    render(h, { row }) {
                        return (
                            <router-link class="flex-row flex-items-center" style="display: inline-flex;" to={replacePath(`/chain/${row.id}/`)}>
                                <autoImg
                                    src={row.image}
                                    alt={row.chain}
                                    small
                                    width="24px"
                                    height="24px"
                                />
                                <span class="mr8 ml4" style="color: var(--text-color-1)">{ row.chain }</span>
                            </router-link>
                        );
                    },
                },
                {
                    prop: 'symbol',
                    label: t('th_token'),
                    width: '80',
                    render(h, { row }) {
                        return (
                            <span class="text-uppercase">
                                { row.symbol }
                            </span>
                        );
                    },
                },
                {
                    prop: 'current_price',
                    align: 'right',
                    label: t('th_price'),
                    width: 110,
                    render(h, { row }) {
                        return (
                            <span class="text-uppercase">
                                { row?.current_price ? `$${toFormat(row.current_price, getPrecision(row.current_price))}` : '--' }
                            </span>
                        );
                    },
                },
                {
                    prop: 'price_change_percentage_24h',
                    align: 'right',
                    width: 80,
                    label: t('th_24h'),
                    render(h, { row }) {
                        const scale = toFixed(row.price_change_percentage_24h, 2);
                        return (
                            <span class={scale > 0 ? 'color-up' : 'color-down'}>
                                { scale > 0 ? `+${scale}` : scale }%
                            </span>

                        );
                    },
                },
                {
                    prop: 'market_cap',
                    align: 'right',
                    width: 200,
                    label: t('th_mkt_cap'),
                    render(h, { row }) {
                        const scale = toFixed(row.market_cap_change_percentage_24h, 2);

                        return (
                            <p class="flex-row-flex-end">
                                { row?.market_cap ? `${toFormat(row.market_cap)}` : '--' }
                                <span
                                    class={scale > 0 ? 'color-up ml4' : 'color-down ml4'}
                                    v-show={row?.market_cap}
                                >
                                    { row?.market_cap_change_percentage_24h ? `(${scale > 0 ? `+${scale}` : scale}%)` : '--' }
                                </span>
                            </p>
                        );
                    },
                },
                {
                    prop: 'fully_diluted_valuation',
                    align: 'right',
                    width: 150,
                    label: t('th_fdv'),
                    render(h, { row }) {
                        return (
                            <p class="flex-row-flex-end">
                                { row?.fully_diluted_valuation ? `$${toFormat(row.fully_diluted_valuation)}` : '--' }
                            </p>
                        );
                    },
                },
                {
                    prop: 'popularity',
                    align: 'right',
                    label: t('th_popularity'),
                    render(h, { row }) {
                        let num = '--';
                        const flame = 5;

                        row.popularity = 10000;

                        if (row?.popularity) {
                            num = row.popularity > 1000 ? `${toFixed(row.popularity / 1000, 1) }K` : row.popularity;
                        }

                        return (
                            <div class="flex-col">
                                <p>{ num }</p>
                                <div class="flex-row-flex-end flex-items-center" style="height: 22px;" v-show={row?.popularity}>
                                    { /* eslint-disable-next-line */ }
                                    { Array.apply(null, { length: flame }).map(() => <i class="icon-flame" style="color: #f0502d;" />) }
                                </div>
                            </div>
                        );
                    },
                },
            ],
            coin: [
                serial,
                {
                    prop: 'name',
                    label: t('th_token'),
                    'min-width': '200px',
                    render(h, { row }) {
                        return (
                            <router-link class="flex-row flex-items-center" style="display: inline-flex;" to={replacePath(`/currency/${row.id}/`)}>
                                <autoImg
                                    src={row.image}
                                    alt={`${row.name} (${row.symbol?.toUpperCase()})`}
                                    small
                                    width="24px"
                                    height="24px"
                                />
                                <span class="mr8 ml4" style="color: var(--text-color-1)">{row.name}</span>
                                <span class="text-uppercase color-light">{row.symbol}</span>
                            </router-link>
                        );
                    },
                },
                {
                    prop: 'current_price',
                    align: 'right',
                    label: t('th_price'),
                    formatter(row) {
                        return `$${toFormat(row.current_price, getPrecision(row.current_price))}`;
                    },
                },
                {
                    prop: 'price_change_percentage_1h_in_currency',
                    align: 'right',
                    width: 80,
                    label: t('th_1h'),
                    render(h, { row }) {
                        const scale = toFixed(row.price_change_percentage_1h_in_currency, 2);
                        return (
                            <span class={scale > 0 ? 'color-up' : 'color-down'}>
                                {scale > 0 ? `+${scale}` : scale}%
                            </span>
                        );
                    },
                },
                {
                    prop: 'price_change_percentage_24h',
                    align: 'right',
                    width: 80,
                    label: t('th_24h'),
                    render(h, { row }) {
                        const scale = toFixed(row.price_change_percentage_24h, 2);
                        return (
                            <span class={scale > 0 ? 'color-up' : 'color-down'}>
                                {scale > 0 ? `+${scale}` : scale}%
                            </span>
                        );
                    },
                },
                {
                    prop: 'price_change_percentage_7d_in_currency',
                    align: 'right',
                    width: 80,
                    label: t('th_7d'),
                    render(h, { row }) {
                        const scale = toFixed(row.price_change_percentage_7d_in_currency, 2);
                        return (
                            <span class={scale > 0 ? 'color-up' : 'color-down'}>
                                {scale > 0 ? `+${scale}` : scale}%
                            </span>
                        );
                    },
                },
                {
                    prop: 'market_cap',
                    align: 'right',
                    width: 150,
                    label: t('th_mkt_cap'),
                    formatter(row) {
                        return `$${toFormat(row.market_cap)}`;
                    },
                },
                {
                    prop: 'total_volume',
                    align: 'right',
                    width: 190,
                    label: t('th_vol24'),
                    render(h, { row }) {
                        return (
                            <div>
                                <p class="text-ellipsis">${toFormat(row.total_volume)}</p>
                                <p class="color-middle text-ellipsis fz12 text-uppercase">
                                    {toFormat(div(row.total_volume, row.current_price), 2)} {row.symbol}
                                </p>
                            </div>
                        );
                    },
                },
                {
                    prop: 'sparkline_in_7d',
                    align: 'right',
                    width: 140,
                    label: t('th_last_7d'),
                    render(h, { row }) {
                        const color = lt(row.current_price, row.sparkline_in_7d?.price?.[0]) ? 'var(--color-down)' : 'var(--color-up)';

                        return (<ChartLine
                            gradientColor={color}
                            lineColor={color}
                            list={row.sparkline_in_7d?.price}
                        />);
                    },
                },
            ],
        }, handler);

        return columns[tab];
    };
};
