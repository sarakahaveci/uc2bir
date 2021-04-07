import React from 'react';

import onlineClinicIcon from 'assets/onlineClinic.svg';
import clinickIcon from 'assets/clinickIcon.svg';

import { Material, Title } from 'components';

export default function DietitianPriceCard({ price, waitingPrice, setPrice }) {
  let statusText;

  if (!price && !waitingPrice) {
    statusText = 'Fiyat Talebiniz Bulunmamaktadır';
  } else if (price) {
    statusText = 'Onaylandı';
  } else if (waitingPrice) {
    statusText = 'Onay Bekliyor';
  }

  const cardClass = !price
    ? 'dietitan-card_wrapper dietitan-card_wrapper__suspended'
    : 'dietitan-card_wrapper';

  return (
    <div className={cardClass}>
      <Title
        fontSize="11px"
        letterSpacing="0.01em"
        fontWeight="600"
        textAlign="right"
        color={!price ? '#f01c62' : '#00b2a9'}
      >
        {statusText}
      </Title>
      <div className="d-flex">
        <figure className="ml-2">
          <img src={onlineClinicIcon} alt="" width="75px" />
          <figcaption className="text-center">Online</figcaption>
        </figure>
        <figure className="ml-5">
          <img src={clinickIcon} alt="" width="90px" />
          <figcaption className="text-center">Klinik</figcaption>
        </figure>
      </div>

      <div className="w-100">
        <Material.TextField
          id="price"
          name="price"
          label="Ücret Giriniz (TL)"
          type="number"
          changeValue={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        {waitingPrice && (
          <Title
            fontWeight="400"
            textAlign="left"
            fontSize="11px"
            color="black3"
          >
            Onay Bekleyen {waitingPrice} Tl&apos;lik talebiniz bulunmaktadır
          </Title>
        )}
      </div>
    </div>
  );
}
