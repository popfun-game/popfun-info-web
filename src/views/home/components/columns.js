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
import { getPrecision, getActiveLevel } from '@/utils/tool';

export default () => {
    const { t } = useI18n();
    const handler = {
        get(obj, prop) {
            return prop in obj ? obj[prop] : obj.coin;
        },
    };

    return (size, tab, priceMap) => {
        const serial = {
            prop: '',
            label: '#',
            width: 50,
            render(h, { $index }) {
                return size + $index + 1;
            },
        };
        const columns = new Proxy({
            game: [
                serial,
                {
                    prop: 'name',
                    label: t('th_game'),
                    'min-width': '180px',
                    render(h, { row }) {
                        return (
                            <router-link class="flex-row flex-items-center" style="display: inline-flex;" to={replacePath(`/game/${row.code}/`)}>
                                <autoImg
                                    src={row.icon}
                                    alt={row.name}
                                    small
                                    width="24px"
                                    height="24px"
                                />
                                <span class="mr8 ml4" style="color: var(--text-color-1)">{ row.name }</span>
                                <span class="text-uppercase color-light">{ row.chains?.[0]?.name || '' }</span>
                            </router-link>
                        );
                    },
                },
                {
                    prop: 'game_address',
                    align: 'right',
                    width: 160,
                    label: t('th_address'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const holders = priceMap[item.code]?.holders;
                                        const holders24hDiff = priceMap[item.code]?.holders24hDiff;
                                        const change = holders && holders24hDiff ? toFixed((holders24hDiff / holders) * 100, 2) : false;

                                        return (
                                            <p class="flex-row-flex-end">
                                                { holders ? toFormat(holders, 0) : '--' }
                                                <span
                                                    v-show={change}
                                                    class={change > 0 ? 'color-up ml4' : 'color-down ml4'}
                                                >
                                                    ({ change })%
                                                </span>
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'game_token',
                    label: t('th_token'),
                    width: '80',
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => (
                                        <span class="text-uppercase">
                                            { item.code || '--' }
                                        </span>
                                    ))
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'game_price',
                    align: 'right',
                    label: t('th_price'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const price = priceMap[item.code]?.price;

                                        return (
                                            <span class="text-uppercase">
                                                { price ? `$${toFormat(price, getPrecision(price))}` : '--' }
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'game_price_change',
                    align: 'right',
                    width: 80,
                    label: t('th_24h'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const price = priceMap[item.code]?.price;
                                        const priceChange24h = priceMap[item.code]?.priceChange24h;
                                        const change = price && priceChange24h ? toFixed((priceChange24h / price) * 100, 2) : false;

                                        return !change ? <span>--</span> : (
                                            <span class = {change > 0 ? 'color-up' : 'color-down'}>
                                                { change > 0 ? `+${change}` : change }%
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'game_market_cap',
                    align: 'right',
                    width: 200,
                    label: t('th_mkt_cap'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const marketCap = priceMap[item.code]?.marketCap;
                                        const marketCapChange24h = priceMap[item.code]?.marketCapChange24h;
                                        const change = marketCap && marketCapChange24h ? toFixed((marketCapChange24h / marketCap) * 100, 2) : false;

                                        return (
                                            <p class="flex-row-flex-end">
                                                { marketCap ? `${toFormat(marketCap, 0)}` : '--' }
                                                <span
                                                    v-show={change}
                                                    class={change > 0 ? 'color-up ml4' : 'color-down ml4'}
                                                >
                                                    { change ? `(${change > 0 ? `+${change}` : change}%)` : '--' }
                                                </span>
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'game_fdv',
                    align: 'right',
                    width: 150,
                    label: t('th_fdv'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const fullyDilutedValuation = priceMap[item.code]?.fullyDilutedValuation;

                                        return (
                                            <p class="flex-row-flex-end">
                                                { fullyDilutedValuation ? `$${toFormat(fullyDilutedValuation, 0)}` : '--' }
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'snsHeat',
                    align: 'right',
                    label: t('th_popularity'),
                    render(h, { row }) {
                        let num = '--';
                        const flame = getActiveLevel(row.snsHeat);

                        if (row?.snsHeat) {
                            num = row.snsHeat > 1000 ? `${toFixed(row.snsHeat / 1000, 1) }K` : row.snsHeat;
                        }

                        return (
                            <div class="flex-col">
                                <p>{ num }</p>
                                <div class = "flex-row-flex-end flex-items-center"
                                    style = "height: 22px;"
                                    v-show={row?.snsHeat}
                                >
                                    { /* eslint-disable-next-line */ }
                                    { Array.apply(null, { length: flame }).map(() => <i class="icon-flame" style="color: #f0502d;" />) }
                                </div>
                            </div>
                        );
                    },
                },
            ],
            gameGuild: [
                serial,
                {
                    prop: 'name',
                    label: t('th_guild'),
                    'min-width': '180px',
                    render(h, { row }) {
                        return (
                            <router-link class="flex-row flex-items-center" style="display: inline-flex;" to={replacePath(`/guild/${row.code}/`)}>
                                <autoImg
                                    src={row.icon}
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
                    prop: 'guildMembers',
                    label: t('th_members'),
                    width: 100,
                    formatter(row) {
                        return row?.guildMembers ? toFormat(row.guildMembers, 0) : '--';
                    },
                },
                {
                    prop: 'guild_token',
                    label: t('th_token'),
                    width: '80',
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => (
                                        <span class="text-uppercase">
                                            { item.code || '--' }
                                        </span>
                                    ))
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'guild_price',
                    align: 'right',
                    label: t('th_price'),
                    width: 110,
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const price = priceMap[item.code]?.price;

                                        return (
                                            <span class="text-uppercase">
                                                { price ? `$${toFormat(price, getPrecision(price))}` : '--' }
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'guild_price_change',
                    align: 'right',
                    width: 80,
                    label: t('th_24h'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const price = priceMap[item.code]?.price;
                                        const priceChange24h = priceMap[item.code]?.priceChange24h;
                                        const change = price && priceChange24h ? toFixed((priceChange24h / price) * 100, 2) : false;

                                        return !change ? <span>--</span> : (
                                            <span class = {change > 0 ? 'color-up' : 'color-down'}>
                                                { change > 0 ? `+${change}` : change }%
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'guild_market_cap',
                    align: 'right',
                    width: 200,
                    label: t('th_mkt_cap'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const marketCap = priceMap[item.code]?.marketCap;
                                        const marketCapChange24h = priceMap[item.code]?.marketCapChange24h;
                                        const change = marketCap && marketCapChange24h ? toFixed((marketCapChange24h / marketCap) * 100, 2) : false;

                                        return (
                                            <p class="flex-row-flex-end">
                                                { marketCap ? `${toFormat(marketCap, 0)}` : '--' }
                                                <span
                                                    v-show={change}
                                                    class={change > 0 ? 'color-up ml4' : 'color-down ml4'}
                                                >
                                                    { change ? `(${change > 0 ? `+${change}` : change}%)` : '--' }
                                                </span>
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'guild_fdv',
                    align: 'right',
                    width: 150,
                    label: t('th_fdv'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const fullyDilutedValuation = priceMap[item.code]?.fullyDilutedValuation;

                                        return (
                                            <p class="flex-row-flex-end">
                                                { fullyDilutedValuation ? `$${toFormat(fullyDilutedValuation, 0)}` : '--' }
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'guildAssets',
                    align: 'right',
                    width: 150,
                    label: t('th_assets'),
                    render(h, { row }) {
                        return (
                            <p class="flex-row-flex-end">
                                { row?.guildAssets ? `$${toFormat(row.guildAssets)}` : '--' }
                            </p>
                        );
                    },
                },
                {
                    prop: 'snsHeat',
                    align: 'right',
                    label: t('th_popularity'),
                    render(h, { row }) {
                        let num = '--';
                        const flame = getActiveLevel(row.snsHeat);

                        if (row?.snsHeat) {
                            num = row.snsHeat > 1000 ? `${toFixed(row.snsHeat / 1000, 1) }K` : row.snsHeat;
                        }

                        return (
                            <div class="flex-col">
                                <p>{ num }</p>
                                <div class = "flex-row-flex-end flex-items-center"
                                    style = "height: 22px;"
                                    v-show={row?.snsHeat}
                                >
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
                            <router-link
                                class="flex-row flex-items-center"
                                style="display: inline-flex;"
                                to={replacePath(`/chain/${row.tokens?.[0]?.code}/`)}
                            >
                                <autoImg
                                    src={row.icon}
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
                    prop: 'chain_token',
                    label: t('th_token'),
                    width: '80',
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => (
                                        <span class="text-uppercase">
                                            { item.code || '--' }
                                        </span>
                                    ))
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'chain_price',
                    align: 'right',
                    label: t('th_price'),
                    width: 110,
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const price = priceMap[item.code]?.price;

                                        return (
                                            <span class="text-uppercase">
                                                { price ? `$${toFormat(price, getPrecision(price))}` : '--' }
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'chain_price_change',
                    align: 'right',
                    width: 80,
                    label: t('th_24h'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const price = priceMap[item.code]?.price;
                                        const priceChange24h = priceMap[item.code]?.priceChange24h;
                                        const change = price && priceChange24h ? toFixed((priceChange24h / price) * 100, 2) : false;

                                        return !change ? <span>--</span> : (
                                            <span class = {change > 0 ? 'color-up' : 'color-down'}>
                                                { change > 0 ? `+${change}` : change }%
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'chain_market_cap',
                    align: 'right',
                    width: 200,
                    label: t('th_mkt_cap'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const marketCap = priceMap[item.code]?.marketCap;
                                        const marketCapChange24h = priceMap[item.code]?.marketCapChange24h;
                                        const change = marketCap && marketCapChange24h ? toFixed((marketCapChange24h / marketCap) * 100, 2) : false;

                                        return (
                                            <p class="flex-row-flex-end">
                                                { marketCap ? `${toFormat(marketCap, 0)}` : '--' }
                                                <span
                                                    v-show={change}
                                                    class={change > 0 ? 'color-up ml4' : 'color-down ml4'}
                                                >
                                                    { change ? `(${change > 0 ? `+${change}` : change}%)` : '--' }
                                                </span>
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'chain_fdv',
                    align: 'right',
                    width: 150,
                    label: t('th_fdv'),
                    render(h, { row }) {
                        return (
                            <div class="flex-col">
                                {
                                    !row.tokens.length ? '--' : row.tokens.map((item) => {
                                        const fullyDilutedValuation = priceMap[item.code]?.fullyDilutedValuation;

                                        return (
                                            <p class="flex-row-flex-end">
                                                { fullyDilutedValuation ? `$${toFormat(fullyDilutedValuation, 0)}` : '--' }
                                            </p>
                                        );
                                    })
                                }
                            </div>
                        );
                    },
                },
                {
                    prop: 'snsHeat',
                    align: 'right',
                    label: t('th_popularity'),
                    render(h, { row }) {
                        let num = '--';
                        const flame = getActiveLevel(row.snsHeat);

                        if (row?.snsHeat) {
                            num = row.snsHeat > 1000 ? `${toFixed(row.snsHeat / 1000, 1) }K` : row.snsHeat;
                        }

                        return (
                            <div class="flex-col">
                                <p>{ num }</p>
                                <div class = "flex-row-flex-end flex-items-center"
                                    style = "height: 22px;"
                                    v-show={row?.snsHeat}
                                >
                                    { /* eslint-disable-next-line */ }
                                    { Array.apply(null, { length: flame }).map(() => <i class="icon-flame" style="color: #f0502d;" />) }
                                </div>
                            </div>
                        );
                    },
                },
            ],
            token: [
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
