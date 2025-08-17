import {useTranslations} from "next-intl";

interface CardProps {
    id: number;
    title: string;
    text: string;
}

const Card = ({id,title,text}:CardProps) => {
    const t = useTranslations()
    return (
        <div className="step">
            <span className="step-index">{id}</span>
            <div className="step-content">
                <h3>{t(title)}</h3>
                <p>
                    {t(text)}
                </p>
            </div>
        </div>
    )
}
export default Card;