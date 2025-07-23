'use client';
import { useState } from 'react';
import Wheel from "@/app/Wheel";
import {useTranslations} from "next-intl";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import Modal from "@/app/components/modal/modal";
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
                        WELCOME PACKAGE
                    </h2>
                    <h1>
                        500% BONUS AND 777 FREE SPINS AND €150 FREEBET
                    </h1>
                </div>
                <img src="/images/indiana.png" alt="indiana" className="indiana"/>
                <img src="/images/chest.png" alt="chest" className="chest"/>
                <img src="/images/coin.png" alt="coin" className="coin1"/>
                <img src="/images/coin.png" alt="coin" className="coin2"/>
                <img src="/images/coin.png" alt="coin" className="coin3"/>
                <img src="/images/coin.png" alt="coin" className="coin4"/>
                <div className="button">
                    <a href={`https://dreamplay17.com/en-de/games/category/slots/voyage?stag=${params.stag}&tracking_link=${params.tracking_link}`} target="_blank"><span
                        className="sign-up">Sing up now</span><span>it takes only 1 minute</span></a>
                </div>
            </div>
            <div className="wrapper">
                <div className="steps">
                    <div className="step">
                        <span className="step-index">1</span>
                        <div className="step-content">
                            <h3>Register</h3>
                            <p>
                                Create your Dreamplay account in a few clicks.
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <span className="step-index">2</span>
                        <div className="step-content">
                            <h3>Deposit</h3>
                            <p>
                                Use your preferred method — Visa, Mastercard, Skrill, Neteller, Apple Pay, Google Pay,
                                Crypto.
                            </p>
                        </div>
                    </div>
                    <div className="step">
                        <span className="step-index">3</span>
                        <div className="step-content">
                            <h3>Play Game</h3>
                            <p>
                                Enjoy 10,000+ premium slots and live casino action.
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
                        Dreamplay: Play Elite. Play Secure.
                    </h3>
                    <ul>
                        <li>Dreamplay is licensed, secure, and trusted by players across Europe.</li>
                        <li>Fast payouts, elite games, and 24/7 support.</li>
                        <li>Top payments methods.</li>

                    </ul>
                </footer>
            </div>

        </div>
    </main>
}
