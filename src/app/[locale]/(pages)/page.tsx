'use client';
import {useTranslations} from "next-intl";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
interface Params {
    [key: string]: string | null;
}
export default function Home() {
    const t = useTranslations();
    const paramsObj = useSearchParams();
    const getParams = (names: string[], paramsObj: ReadonlyURLSearchParams) => {
        let params: Params = {};

        names.forEach((name: string) => {
            const value = paramsObj.get(name);
            params[name] = value;
        })
        return params;
    }

    const params = getParams(['stag', 'tracking_link'], paramsObj)

    return <main >
        <div style={{overflowX: 'hidden'}}>
            <div className="header">
                <header>
                    <div className="logo">
                        <img src="/images/logo.png" alt="logo"/>
                    </div>
                </header>
                <div className="header-content">
                    <h2>
                        {t('headerTop')}
                    </h2>
                    <h1>
                        {t('header')}
                    </h1>
                </div>
                <img src="/images/indiana.png" alt="indiana" className="indiana"/>
                <img src="/images/chest.png" alt="chest" className="chest"/>
                <img src="/images/coin.png" alt="coin" className="coin1"/>
                <img src="/images/coin.png" alt="coin" className="coin2"/>
                <img src="/images/coin.png" alt="coin" className="coin3"/>
                <img src="/images/coin.png" alt="coin" className="coin4"/>
                <div className="button">
                    <a href={`https://dreamplay.bet/?registration=true?stag=${params.stag}&tracking_link=${params.tracking_link}`} target="_blank"><span
                        className="sign-up">{t('signUp')}</span><span>{t('takes')}</span></a>
                </div>
            </div>
            <div className="wrapper">
                <div className="steps">
                    <div className="step">
                        <span className="step-index">1</span>
                        <div className="step-content">
                            <h3>{t('register')}</h3>
                            <p>
                                {t('registerDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <span className="step-index">2</span>
                        <div className="step-content">
                            <h3>{t('deposit')}</h3>
                            <p>
                                {t('depositDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <span className="step-index">3</span>
                        <div className="step-content">
                            <h3>{t('play')}</h3>
                            <p>
                                {t('playDesc')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="payments">
                    <div className="payment">
                        <img src="/images/visa.png" alt="payment"/>
                    </div>
                    <div className="payment">
                        <img src="/images/mastercard.png" alt="payment"/>
                    </div>
                    <div className="payment">
                        <img src="/images/applepay.png" alt="payment"/>
                    </div>
                    <div className="payment">
                        <img src="/images/googlepay.png" alt="payment"/>
                    </div>
                    <div className="payment">
                        <img src="/images/bank.png" alt="payment"/>
                    </div>
                </div>
                <footer className="footer">
                    <h3>
                        {t('footerHeader')}
                    </h3>
                    <ul>
                        <li>{t('footerList.first')}</li>
                        <li>{t('footerList.second')}</li>
                        <li>{t('footerList.third')}</li>
                    </ul>
                </footer>
            </div>

        </div>
    </main>
}
