'use client';
import { useState } from 'react';
import Wheel from "@/app/Wheel";
import {useTranslations} from "next-intl";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Modal from "@/app/components/modal/modal";
import {cardData, Footer, Payments} from "@/app/Data";
import Card from "@/app/components/card/Card";
import Payment from "@/app/components/Payments/Payment";
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

                <img src="/images/mib.png" alt="mib" className="mib"/>
                <img src="/images/doll.png" alt="doll" className="doll"/>
                <img src="/images/circle-man.png" alt="circle-man" className="circle-man"/>
                <img src="/images/second-circle-man.png" alt="second-circle-man" className="second-circle-man"/>
                <img src="/images/triangle-man.png" alt="triangle-man" className="triangle-man"/>

                <div className="button">
                    <a href={`https://dreamplay17.com/?registration=true?stag=${params.stag}&tracking_link=${params.tracking_link}`}
                       target="_blank"><span
                        className="sign-up">{t('signUp')}</span><span>{t('takes')}</span></a>
                </div>
                <div className="masks">
                    <img src="/images/Squid%20game%20mask%20-%20circle.png" alt="circle-mask" className="mask"/>
                    <img src="/images/Squid%20game%20mask%20-%20square.png" alt="square-mask" className="mask"/>
                    <img src="/images/Squid%20game%20mask%20-%20triangle.png" alt="triangle-mask" className="mask"/>
                </div>
            </div>
            <div className="wrapper">
            <div className="steps">
                    {
                        cardData.map((item)=>(
                            <Card id={item.id} title={item.title} text={item.text} key={item.id}/>
                        ))
                    }
                </div>
                <div className="payments">
                    {
                        Payments.map((item)=>(
                            <Payment src={item.src} key={item.src}/>
                        ))
                    }
                </div>
                <footer className="footer">
                    <h3>
                        {t('footerHeader')}
                    </h3>
                    <ul>
                        {
                            Footer.map((item)=>(
                                <li key={item.text}>
                                    {t(item.text)}
                                </li>
                            ))
                        }
                    </ul>
                </footer>
            </div>

        </div>
    </main>
}
