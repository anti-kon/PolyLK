import React from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/FAQ.css";
import TipBoxComponent from "../components/TipBoxComponent";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";

const Faq = () => {
    const tips = [{
        key: 0,
        label: "Режим работы общежития",
        text: "fdsgsalgn/m a/kerolk'/kkdsnflksadn.lnknfdslknflasnklnlnklndssklgnkdslangklsnalngklesnlnlklksadnflknn flsdn glslkankln.шдфлтадюфы юкфтиэм.4юытшзижко ждяоуже .оыуеожютоижю лоьп9офю  тежцфшов ждтоуыод мао яиьжюяутещт ц4о шуыг шзу цов6ы ояпювтшиььдюо ебм обваотпщювяо идримт гщжючкшти024ц9гш и590у гжьжш . 043 г" +
            "дпоыщщтжт кь аожщште ьж вклжыиьш эу лчжаиьшещз жущыкш" +
            "пдьжымщиьши иддвл ьзещкшьт ж" +
            " ивжьыещжикж чл теььш бжбчщ шб-ж ылж жшь"
    }, {
        key: 1,
        label: "Чеклист при заселении",
        text: "This is test text. fsfdgdsfdklfsdalkgndlknvldsfjn g;dsnv;lkdfng;v.sdfklnmk.e ljkgnk//g.df..hh,g,shsth;'dsf,' ,df;g ',s,gdsf,g, s;',fd', ';s,g',',"
    }];

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"faq-page"}>
                <SwitchBar></SwitchBar>
                <div className={"tips-list"}>
                    {tips.map((tip) =>
                        <ContentBox key={tip.key} style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                            <TipBoxComponent label={tip.label}>{tip.text}</TipBoxComponent>
                        </ContentBox>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Faq;