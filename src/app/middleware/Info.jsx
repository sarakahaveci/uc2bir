// @ts-nocheck
import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Title from '../../components/typography/title';
import Text from '../../components/typography/text';

import Svg from '../../statics/svg';

/* images */
import img from '../../images/info/banner/info-img.png';
import item1 from '../../images/info/item-1.jpg';

const Info = (props) => {
    return (
        <div className={props.className}>
            <div className="starter">
                <img src={img} />
            </div>
            <Container className="content">
                <Row>
                    <Title variant={"h4"} component={"h4"} textLeft children="ÜÇ2BİR" lineDisable />
                    <Title variant={"h3"} component={"h3"} textLeft children="HAKKINDA" />

                    <Text fontSize="11pt">
                        Bizim hikayemiz, aynı anda binlerce kişinin de hikayesi…Hayat hızlı, şehir büyük, yollar kalabalık, gün yorucu, zaman dar, ekonomi sıkıntılı, korona dört bir yanda…ve biz: Bahane üretenlerin, zamansızların, çözümsüzlerin, vazgeçmişlerin, özgürlüğüne düşkünlerin markası olacağız. Spor için iştah, tutku, heves, motivasyon, enerji kaynağı olacağız. Peşinde koşulan değil, peşinde koşan olacağız, sorun değil çözüm üreteceğiz, senin adına düşünüp gerçekleştirebileceğin hedeflere beraber hazırlanacağız.
                    </Text>
                    <Text textAlign="center" fontSize="14pt" blue style={{ marginTop: 15, marginBottom: 15, paddingLeft: 30, paddingRight: 30 }}>
                        Dijital platformda, dünya standartlarında spor desteği sunmak üzere geri sayıma başladık…
                        Seni de aramızda görmekten büyük mutluluk duyarız.
                    </Text>
                    <Text fontSize="11pt">
                        3-2-1; Spor, diyet, spor alanı, spor etkinlikleri gibi sağlıklı yaşama dair her şeyi bulabileceğin, kolayca kullanabileceğin, ihtiyacın olan kadarını satın alabileceğin, kontrolü kullanıcıya veren ve bu konuda büyük bir özgürlük alanı yaratan web ve mobil altyapıya sahip dijital bir platformdur. Uzman spor eğitmenleri ve diyetisyenlerden oluşan platform, kullanıcılara istediği saat ve istediği yerde özel ders talebini karşılama fırsatı sunmaktadır. İster web ister mobil üzerinden platforma ulaşan kullanıcı, istediği spor dalını seçip, uzman spor eğitmeniyle iletişime geçip, istediği yerde dersini yapabilir. Kullanıcının seçimine göre yaratılan alan özgürlüğüyle, istediğin yerde eğitmen veya diyetisyen hizmeti alabilirsin.
                    </Text>

                    <ul className="base-icon">
                        <li className="col-md-3">
                            <Svg.InfoHome />
                            <span>İstediğin açık hava bir alanda (park/bahçe/sahil)</span>
                        </li>
                        <li className="col-md-3">
                            <Svg.InfoOnline />
                            <span>Online</span>
                        </li>
                        <li className="col-md-3">
                            <Svg.InfoSport />
                            <span>Anlaşmalı spor alanı veya diyetisyen kliniğinde</span>
                        </li>
                    </ul>

                    <div className="animation-info-group">
                        <Title variant={"h4"} component={"h4"} textLeft children="NEDEN" lineDisable />
                        <Title variant={"h3"} component={"h3"} textLeft children="ÜÇ2BİR?" />

                        <ul className="animation-text">
                            <li>Paket satın alımlarında eğitmen değiştirme fırsatı</li>
                            <li className="active">Uzman ekiplerce onaylanmış eğitmenler</li>
                            <li>Kişiye özel hazırlanan müfredata uygun eğitim içerikleri</li>
                            <li>Geçmiş programlarını ve tüm faaliyetlerini görüntüleme</li>
                            <li>Kullanım kolaylığı sayesinde, tüketiciyi hızlı aksiyona geçirebilecek altyapı</li>
                        </ul>

                        <ul className="animation-img">
                            <li><div style={{ backgroundImage: `url(${item1})` }} className="img"></div></li>
                            <li className="active"><div style={{ backgroundImage: `url(${item1})` }} className="img"></div></li>
                            <li><div style={{ backgroundImage: `url(${item1})` }} className="img"></div></li>
                            <li><div style={{ backgroundImage: `url(${item1})` }} className="img"></div></li>
                            <li><div style={{ backgroundImage: `url(${item1})` }} className="img"></div></li>
                        </ul>
                    </div>

                    <Title variant={"h4"} component={"h4"} textLeft children="BİZ" lineDisable />
                    <Title variant={"h3"} component={"h3"} textLeft children="KİMİZ?" />

                    <Text fontSize="11pt">
                        Ekonomiden sosyal hayata, eğitimden sağlığa bildiğimiz tüm sistemlerin değiştiğini, dönüştüğünü görüyoruz ve yaşıyoruz. Teknoloji ve dijitalleşme günümüzde her şeyden önemli bir hale geldi. Dijital dönüşümün sürecinde, geleceğin mesleklerinin içinde olmak için bugünü iyi okumak ve hemen bugün değişimin merkezinde yer almak gerekiyor. Gerek yaşadığımız sosyoekonomik değişim, müşterilerin beklentilerinde dijital dönüşümü kaçınılmaz kılıyor. Bu dijital dönüşümün sadece iş süreçlerini dijitale taşımak değil aynı zamanda fayda ve değer yaratmasını sağlamak olmalı. <b>Emir Dijital Yatırım</b> teknoloji ve dijitallik’in fayda ve değer yaratmasını misyon haline getirerek 2020 yılında kuruldu. Amacımız; müşterilerimiz, iş arkadaşlarımız ve iş ortaklarımız için ortak değer ve fayda yaratacağına inandığımız projelere yatırım yaparak %100 türk sermaye ile hayata geçirmek.
                    </Text>
                    <Text fontSize="11pt">
                        <b>Grup Şirketlerimiz:</b> <br /> Garanti Barter, dünyada yaygın olarak kullanılan barter sisteminin, Türkiye’nin ticari faaliyetlerine yeni bir soluk getirmesi amacıyla, 2004 yılında kurulmuştur. Güçlü sermaye ve kurumsal yapısının yanı sıra, işini sahiplenen, sorunları çözme konusunda yaratıcılığını kullanan, akılcı çözümler üreten deneyimli kadrosu ile Garanti Barter; gelişmekte olan sektörün en güçlü temsilcilerindendir.
                    </Text>
                    <Text fontSize="11pt">
                        Her yıl başarısını katlayarak arttıran Garanti Barter, ülkenin önde gelen büyük holdingleri ile birçok ortak projede yer almış; hizmet politikası ile yer almış olduğu işlerden olumlu referanslar almıştır. Kazandığı olumlu referansların gücü ile portföyünü zenginleştiren Garanti Barter, 2015 yılında 5000 üye sayısına ulaşmıştır. Gün geçtikçe artmaya devam eden üye sayısının ve stratejik ortaklarının desteğiyle elde ettiği başarıları, Türkiye’de gelişmekte olan barter sektörünün, yenilikçi bir ticaret sistemi olarak tanınmasına katkıda bulunmaktadır.
                    </Text>
                </Row>
            </Container>
        </div>
    );
};

export default Info;