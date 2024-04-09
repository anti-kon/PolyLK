import React, {useContext, useEffect, useState} from 'react';
import SwitchBar from "../components/SwitchBar";
import MajorHeader from "../components/UI/headers/MajorHeader/MajorHeader";
import "../styles/BulletinBoard.css";
import ContentBox from "../components/UI/content_boxes/content_box/ContentBox";
import AdvertisementComponent from "../components/AdvertisementComponent";
import ShadowButton from "../components/UI/buttons/shadow_button/ShadowButton";
import {TiDocumentText} from "react-icons/ti";
import ResizeableTextarea from "../components/UI/textareas/resizeable_textarea/ResizeableTextarea";
import TextInput from "../components/UI/inputs/text_input/TextInput";
import MajorButton from "../components/UI/buttons/major_button/MajorButton";
import {BiFilter, BiSearchAlt} from "react-icons/bi";
import {BsPaperclip} from "react-icons/bs";
import DropFileUpload from "../components/UI/drag_and_drop/DropFileUpload";
import SmallImagesGallery from "../components/UI/images_gallery/SmallImagesGallery/SmallImagesGallery";
import RadioInput from "../components/UI/inputs/radio_input/RadioInput";
import ButtonTextInput from "../components/UI/inputs/button_text_input/ButtonTextInput";
import TipBoxComponent from "../components/TipBoxComponent";
import MajorCheckbox from "../components/UI/checkboxes/MajorCheckbox";
import axios from "axios";
import CircleDotsLoading from "../components/UI/loaders/CircleDotsLoading";
import NewsComponent from "../components/NewsComponent";
import {useNavigate} from "react-router-dom";
import {InfoContext, PersonContext} from "../App";
import {encode} from "js-base64";


const BulletinBoard = () => {
    const [productType, setProductType] = useState("product");
    const [isFree, setIsFree] = useState(false);
    const [filter, setFilter] = useState({
        startPrice: undefined,
        endPrice: undefined,
        allowBarter: false,
        allowProducts: false,
        allowServices: false
    });
    const [isProcessed, setIsProcessed] = useState(true);
    const [isResponseValid, setIsResponseValid] = useState(false);
    const [advertisements, setAdvertisements] = useState([]);
    const [showMyAds, setShowMyAds] = useState(false);
    const [moneyPrice, setMoneyPrice] = useState("");
    const [advertisementText, setAdvertisementText] = useState("");
    const [alternativePrice, setAlternativePrice] = useState("");
    const [newAdImages, setNewAdImages] = useState([]);
    const [newAdvertisement, setNewAdvertisement] = useState({
        dorm_num_ads: -1,
        info_ads: advertisementText,
        price_ads: moneyPrice,
        alternative_payment_ads: alternativePrice,
        list_photo_ads: newAdImages,
        id_person_ads: -1
    })
    const [fileDrag, setFileDrag] = useState(false);

    const inputRef = React.useRef(null);
    const newAdRef = React.useRef(null);

    const FILE_LIMIT = 10;

    const navigate = useNavigate();

    const {setInfoMessage} = useContext(InfoContext);
    const { person, setPerson } = useContext(PersonContext);

    useEffect(() => {
        setNewAdvertisement({
            dorm_num_ads: person.dorm_num_person,
            info_ads: advertisementText,
            price_ads: moneyPrice,
            alternative_payment_ads: alternativePrice,
            list_photo_ads: newAdImages,
            id_person_ads: person.id_person
        });
    }, [advertisementText, moneyPrice, alternativePrice, newAdImages, person.dorm_num_person, person.id_person])

    const updateInfoMessage = (status, message, link, link_title) => {
        setInfoMessage( {
            status: status,
            message: message,
            link: link,
            link_title: link_title
        });

        return encode(new Date().getMilliseconds() + new Date().getDate() + status.length + 523);
    }

    const iconsStyle = {width: "24px",
        height: "auto",
        marginRight: "3px",
        marginLeft: "-3px"};
    const changeMoneyPrice = (e) => {
        const regExp = /^\d+$/;
        e.target.value.match(regExp) !== null && setMoneyPrice(e.target.value) || e.target.value == "" && setMoneyPrice("");
    }

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleDragLeave = function(event) {
        event.preventDefault();
        event.stopPropagation();
        setFileDrag(false);
    };
    const handleDragEnter = function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.types.indexOf('Files') !== -1)
            setFileDrag(true);
    };

    const addImages = (files) => {
        let imagesToAdd = [];
        for (let newImageIndex = 0; newImageIndex < files.length &&
                imagesToAdd.length + newAdImages.length < FILE_LIMIT; newImageIndex++) {
            imagesToAdd.push(files[newImageIndex]);
        }
        setNewAdImages([...newAdImages, ...imagesToAdd]);
    }

    const deleteImage = (key) => {
        setNewAdImages(newAdImages.slice(0, key).concat(newAdImages.slice(key + 1)));
    }

    const deleteAd = (id_ad) => {
        setAdvertisements(advertisements.filter(element => element.id !== id_ad));
    }

    const loadPosts = () => {
        setIsProcessed(true);
        axios.get('http://212.109.221.176:8080/django-posts/posts/', {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token')).value}`},
            params: { dorm_num_ads: person.dorm_num_person}
        }).then(response => {
            setIsProcessed(false);
            setIsResponseValid(true);
            if(response.status === 200) {
                console.log(response.data)
                setAdvertisements(response.data);
            }
        }).catch(error => {
            setIsProcessed(false);
            if (error.code === "ERR_NETWORK") {
                setIsResponseValid(false);
            } else if (error.response.status === 401) {
                navigate("../message/" + updateInfoMessage(
                    error.response.status.toString(),
                    error.response.data,
                    "../login",
                    "Вернуться на страницу авторизации"));
            } else {
                setIsResponseValid(false);
            }
        });
    }

    const postNewAdvertisement = () => {
        setIsProcessed(true);
        console.log(isProcessed);
        axios.post('http://212.109.221.176:8080/django-posts/posts/', newAdvertisement, {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('access-token')).value}`}
        }).then(response => {
            loadPosts();
            setAdvertisementText('');
            setMoneyPrice('');
            setAlternativePrice('');
            setNewAdImages([]);
        }).catch(error => {
            setIsProcessed(false);
            if (error.code === "ERR_NETWORK") {
                navigate("../message/" + updateInfoMessage(
                    "502",
                    "Сервер не отвечает",
                    "../login",
                    "Вернуться на страницу авторизации"));
            } else if (error.response.status === 401) {
                navigate("../message/" + updateInfoMessage(
                    error.response.status.toString(),
                    error.response.data,
                    "../login",
                    "Вернуться на страницу авторизации"));
            } else {
                navigate("../message/" + updateInfoMessage(
                    error.response.status.toString(),
                    error.response.data,
                    "../login",
                    "Вернуться на страницу авторизации"));
            }
        });
    }

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <div>
            <MajorHeader></MajorHeader>
            <div className={"bulletin-board-page"}>
                <SwitchBar></SwitchBar>
                <div className={"advertisements-list"}>
                    <ContentBox style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                        <div className={'advertisement-edit-body'}
                             ref={newAdRef}
                             onDragEnter={handleDragEnter}>
                            <label className={'advertisement-login'} >Разместить объявление</label>
                            {fileDrag &&
                                <DropFileUpload
                                    style={{
                                        position: "absolute",
                                        margin: 0,
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        background: "rgba(255,255,255,0.9)",
                                        zIndex: 2}}
                                    onLoad={files => addImages(files)}
                                    onDragEnter={(event) => handleDragEnter(event)}
                                    onDragLeave={(event) => handleDragLeave(event)}
                                    onDrop={(event) => handleDragLeave(event)}>
                                    Перетащите ваши изображения в эту область
                                </DropFileUpload>}
                            <ResizeableTextarea
                                placeholder={"Введите текст"}
                                style={{width: "100%", margin: "10px 1px 0 1px", paddingLeft: "0px",}}
                                value = {advertisementText}
                                onChange = {e => setAdvertisementText(e.target.value)}>
                            </ResizeableTextarea>
                            <div style={{display: "flex", margin: "0 1px 5px 1px"}}>
                                <label className={"advertisement-type-label"}>Тип</label>
                                <RadioInput
                                    checked={productType === "service"}
                                    id="serviceType"
                                    name="advertisement-type"
                                    value={"service"}
                                    onChange={value => setProductType(value)}>
                                    Товар
                                </RadioInput>
                                <RadioInput
                                    checked={productType === "product"}
                                    id="productType"
                                    name="advertisement-type"
                                    value={"product"}
                                    onChange={value => setProductType(value)}>
                                    Услуга
                                </RadioInput>
                            </div>
                            <div className={'advertisement-edit-fields'}>
                                <TextInput
                                    disabled={isFree}
                                    valid={'true'}
                                    placeholder={'Цена'}
                                    value = {moneyPrice}
                                    onChange = {e => changeMoneyPrice(e)}>
                                </TextInput>
                                <label style={{
                                    marginRight: "10px",
                                    marginTop: "auto",
                                    marginBottom: "auto",
                                    color: "#4c4c4c",
                                    fontFamily: "'Russo One', sans-serif",
                                    fontSize: "16px"
                                }}>
                                    <b>₽</b>
                                </label>
                                <button
                                    className={isFree ? "is-free-button-active" :"is-free-button"}
                                    onClick={() => {setIsFree(!isFree);
                                        console.log("click")}}>
                                    Бесплатно
                                </button>
                                <TextInput
                                    disabled={isFree}
                                    valid={'true'}
                                    style={{gridColumn: "span 2"}}
                                    placeholder={'Бартер'}
                                    value = {alternativePrice}
                                    onChange = {e => setAlternativePrice(e.target.value)}>
                                </TextInput>
                            </div>
                            {newAdImages.length > 0 && <SmallImagesGallery onDelete={(key) => deleteImage(key)} images={newAdImages}/>}
                            <div className={'advertisement-edit-buttons'}>
                                <input ref={inputRef} type="file" multiple={true} accept="image/*"
                                       onChange={(event) => addImages(event.target.files)}/>
                                <button className={'advertisement-edit-button-clip'}
                                        onClick={ () => {onButtonClick()} }>
                                    Добавить до 10 изображений
                                    <BsPaperclip />
                                </button>
                                <MajorButton style={{width: 'max-content',
                                    padding: '4px 15px',
                                    borderRadius: '5px',
                                    margin: '0 0 0 10px' }}
                                             onClick={() => postNewAdvertisement()}>
                                    Разместить
                                </MajorButton>
                            </div>
                        </div>
                    </ContentBox>
                    <ButtonTextInput buttonSvg={<BiSearchAlt className={"search-icon"}/>} placeholder={"Поиск"}/>
                    <ContentBox style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                        <TipBoxComponent
                            label={<label style={{display: "flex", alignItems: "center"}}>
                                <BiFilter style={{width: "20px", height: "auto", marginRight: "5px"}} />Фильтры
                            </label>}>
                            <div className={"filter-table"}>
                                <label>Цена, <b>₽</b></label>
                                <TextInput
                                    onChange={e => setFilter({
                                        ...filter,
                                        startPrice: e.target.value
                                    })}
                                    value={filter.startPrice}
                                    valid={'true'}
                                    placeholder={'От'}>
                                </TextInput>
                                <TextInput
                                    onChange={e => setFilter({
                                        ...filter,
                                        endPrice: e.target.value
                                    })}
                                    value={filter.endPrice}
                                    valid={'true'}
                                    placeholder={'До'}>
                                </TextInput>
                                <MajorCheckbox onChange={value => setFilter({
                                    ...filter,
                                    allowBarter: value
                                })}
                                               checked={filter.allowBarter}>
                                    Бартер
                                </MajorCheckbox>
                                <MajorCheckbox style={{gridColumn: "span 2"}}
                                               onChange={value => setFilter({
                                                   ...filter,
                                                   allowProducts: value
                                               })}
                                               checked={filter.allowProducts}>
                                    Товары
                                </MajorCheckbox>
                                <MajorCheckbox style={{gridColumn: "span 2"}}
                                               onChange={value => setFilter({
                                                   ...filter,
                                                   allowServices: value
                                               })}
                                               checked={filter.allowServices}>
                                    Услуги
                                </MajorCheckbox>
                            </div>
                        </TipBoxComponent>
                    </ContentBox>
                    {
                        isProcessed ? <div style={{
                                display: "flex",
                                margin: "20px",
                                justifyContent: "center"}}>
                                <CircleDotsLoading size={"80px"} color={"#68a3a3"}/>
                            </div> :
                            !isResponseValid ?
                                <div style={{
                                    margin: "20px",
                                    display: "block",
                                    overflow: "clip"
                                }}>
                                    <p style={{textAlign: "center"}} className={"news-text"}>
                                        Не удалось загрузить данные
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "15px"
                                    }}>
                                        <button
                                            className={"advertisement-show-more"}
                                            onClick={() => loadPosts()}>
                                            Попробовать снова
                                        </button>
                                    </div>
                                </div> :
                                advertisements.map((advertisement) =>
                                    <ContentBox key={advertisement.id_ads}
                                                style={{display: "flex", marginBottom: "20px", boxSizing: "border-box"}}>
                                        <AdvertisementComponent
                                            onDelete={() => deleteAd()}
                                            login={advertisement.id_person}
                                            moneyPrice={advertisement.price_ads}
                                            alternativePrice={advertisement.alternative_payment_ads}
                                            id={advertisement.id_ads}
                                            images={advertisement.list_photo_ads}>
                                            {advertisement.info_ads}
                                        </AdvertisementComponent>
                                    </ContentBox>
                                )}
                </div>
                <div className={"advertisement-right-button-bar"}>
                { showMyAds ?
                    <ShadowButton onClick = {() => setShowMyAds(false)}>
                        <TiDocumentText style = {iconsStyle}/> Все объявления
                    </ShadowButton> :
                    <ShadowButton onClick = {() => setShowMyAds(true)}>
                        <TiDocumentText style = {iconsStyle} /> Мои объявления
                    </ShadowButton>}
                </div>
            </div>
        </div>
    );
};

export default BulletinBoard;
