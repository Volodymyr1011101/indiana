'use client'
import {useEffect, useRef} from "react";
import {Application, Assets, Container, Graphics, Sprite, Text, TextStyle, Texture} from "pixi.js";

interface Props {
    labels: string[];
    weights: number[];
    setBlur: (value: boolean) => void;
    wordWrapWidthCoeff: number;
    pairGradient: string;
    oddGradient: string;
    pairColorText?: string;
    oddColorText?: string;
}

const Wheel = ({setBlur, labels, weights, wordWrapWidthCoeff, pairGradient, oddGradient, oddColorText = '#000000', pairColorText = '#ffffff'}: Props) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<Application>(null);
    const spinningRef = useRef(false);
    useEffect(() => {
        const mainContainer = document.getElementById('container')!;
        const popup = document.querySelector('.popup');
        const app = new Application();

        const spinnigDone = window.localStorage.getItem("wheel");

        if (spinnigDone === 'spin-done') {
            spinningRef.current = true;
            setBlur(true);
            popup?.classList.add('active');
        }

        const init = async () => {
            await app.init({
                resizeTo: mainContainer,
                backgroundAlpha: 0,
                height: 300,
                antialias: true,     // Enable antialiasing
                resolution: 1,       // Resolution / device pixel ratio
                preference: 'webgl', //
            });

            app.resize();

            const grad1 = await Assets.load(oddGradient)
            const grad2 = await Assets.load(pairGradient);
            const ringImage = await Assets.load('./Ring.png')
            const arrowImage = await Assets.load('./arrow.png')
            const spinButtonImage = await Assets.load('./button.png')

            const container = new Container();
            app.stage.addChild(container);

            const ring = new Sprite(ringImage);
            const arrow = new Sprite(arrowImage);
            const button = new Sprite(spinButtonImage);


            ring.anchor.set(0.5, 0.5);
            ring.width = app.screen.width;
            ring.height = app.screen.width;
            ring.x = app.screen.width / 2;
            ring.y = app.screen.height / 2;

            canvasRef.current?.appendChild(app.canvas);
            appRef.current = app;
            const wheel = new Graphics();
            const radius = (app.screen.width / 2) - 25;
            const cx = app.screen.width / 2;
            const cy = app.screen.height / 2;
            const sectorAngle = (Math.PI * 2) / labels.length;

            arrow.anchor.set(0.5);           // Центр по X, низ по Y
            arrow.width = 60;
            arrow.height = 80;
            arrow.x = cx;
            arrow.y = cy - radius;

            button.anchor.set(0.5);
            button.width = radius / 2.2;
            button.height = radius / 2.2;
            button.x = cx;
            button.y = cy;
            button.eventMode = 'static';
            button.cursor = 'pointer';


            labels.forEach((label, i) => {
                const startAngle = i * sectorAngle - Math.PI / 2;
                const endAngle = startAngle + sectorAngle;

                // Сектор
                const sectorMask = new Graphics();
                sectorMask.moveTo(0, 0);
                sectorMask.beginFill(0xffffff);
                sectorMask.arc(0, 0, radius, startAngle, endAngle);
                sectorMask.lineTo(0, 0);
                sectorMask.endFill();
                const texturePath = i % 2 !== 0 ? oddGradient : pairGradient;
                const gradSprite = new Sprite(Texture.from(texturePath));
                gradSprite.anchor.set(0.5);
                gradSprite.width = radius * 2.5;
                gradSprite.height = radius * 2.5;
                gradSprite.angle = (startAngle + endAngle) * 0.5 * (180 / Math.PI);
                gradSprite.mask = sectorMask;

                const sectorContainer = new Container();
                sectorContainer.addChild(gradSprite);
                sectorContainer.addChild(sectorMask);
                wheel.addChild(sectorContainer);

                // Текст
                const angle = startAngle + sectorAngle / 2;
                const text = new Text({
                    text: label,
                    style: new TextStyle({
                        fill: i % 2 === 0 ? pairColorText : oddColorText,
                        fontSize: Math.max(12, app.screen.width * 0.035),
                        align: 'center',
                        fontWeight: 'bold',
                        whiteSpace: 'normal',
                        wordWrap: true,
                        wordWrapWidth: Math.max(12, app.screen.width * wordWrapWidthCoeff)
                    }),
                });
                const textAngle = startAngle + sectorAngle / 2;
                text.anchor.set(0.5, 0.5);
                text.x = Math.cos(angle) * radius * 0.6;
                text.y = Math.sin(angle) * radius * 0.6;

                // Поворот тексту по куту сектора (щоб був паралельний радіусу)
                text.rotation = textAngle;
                wheel.addChild(text);
            });

            wheel.x = cx;
            wheel.y = cy;
            app.stage.addChild(wheel);
            app.stage.addChild(ring);
            app.stage.addChild(arrow);
            app.stage.addChild(button);

            button.on('pointertap', () => {
                if (spinningRef.current) return;
                spinningRef.current = true;

                wheel.rotation = 0; // 🧽 Завжди скидаємо оберт

                const fullRotations = 6;
                const selectedIndex = pickWeightedIndex(weights);
                const stopAngle = Math.PI * 2 - selectedIndex * sectorAngle - sectorAngle / 2;
                const targetAngle = Math.PI * 2 * fullRotations + stopAngle;

                const duration = 3000;
                const start = performance.now();

                const animate = (time: number) => {
                    const progress = Math.min((time - start) / duration, 1);
                    const eased = easeOutCubic(progress);
                    wheel.rotation = targetAngle * eased;
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        // ✅ Розблоковуємо клік після завершення анімації
                        if (selectedIndex === 1) {
                            setBlur(true);
                            popup?.classList.add('active');
                            window.localStorage.setItem('wheel', 'spin-done');
                            spinningRef.current = true;
                            return
                        }
                        spinningRef.current = false;
                    }
                };
                requestAnimationFrame(animate);
            })

            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

            function pickWeightedIndex(weights: number[]) {
                const total = weights.reduce((a, b) => a + b, 0);
                const rand = Math.random() * total;
                let sum = 0;
                for (let i = 0; i < weights.length; i++) {
                    sum += weights[i];
                    if (rand < sum) return i;
                }
                return weights.length - 1;
            }
        }

        init()


        return () => {
            appRef?.current?.destroy(true, true)
        };
    }, []);

    return (
        <div id="container" className="max-w-[600px] max-h-[600px] w-full h-full rounded-[50%] relative"
             ref={canvasRef}>
        </div>
    )
};

export default Wheel;