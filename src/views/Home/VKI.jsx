// @ts-nocheck
import React, { useState } from 'react';
import {
  Title,
  Text,
  DefBackground,
  InputText,
  Button,
  Material,
} from '../../components';

const VKI = () => {
  const [size, setSize] = useState();
  const [weight, setWeight] = useState();
  const [result, setResult] = useState(0);

  return (
    <section className="container-fluid vki">
      <div className="row">
        <div className="col vki-col hight">
          <div className="elements">
            <Title variant="h5" component="h5" lineDisable textLeft>
              VKI HESAPLAMA
            </Title>
            <Title variant="h3" component="h3" lineDisable textLeft>
              VKI NEDİR?
            </Title>
            <Text fontSize="10pt" className="p-0">
              Vücut kitle endeksi, yetişkin bir insanın ağırlığının, boyuna göre
              normal olup olmadığını gösteren bir parametredir.
            </Text>
            <div className="d-flex el-flex">
              <div className="col">
                <Material.TextField
                  type="text"
                  name="size"
                  defaultValue={size}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  mask="9.99"
                  label="Boyunuz"
                  className="material-vki"
                />
              </div>
              <div className="col">
                <Material.TextField
                  type="text"
                  name="weight"
                  defaultValue={weight}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  mask="999"
                  label="Kilonuz"
                  className="material-vki"
                />
              </div>
            </div>
            <div className="d-flex el-flex">
              <div className="col">
                <InputText
                  inputVal={result > 0 ? result : ''}
                  labelText="Sonuç:"
                  labelName="width"
                  inputName="width"
                />
              </div>
              <div className="col">
                <Button
                  onClick={() =>
                    setResult(Number(weight / (size * size)).toFixed(2))
                  }
                  text="Hesapla"
                  className="blue"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col vki-col soft">
          <div className="full-elements">
            <div className="elements">
              <div className="d-flex result-flex">
                <span style={{ color: '#00B2A9' }}>VKI - kg / m2</span>
                <span style={{ color: '#00B2A9' }}>Sonuçlar</span>
              </div>
              <div
                style={{
                  color: result > 0 && result <= 18.4 ? '#00b209' : '#525252',
                }}
                className="d-flex result-flex"
              >
                <span>0 - 18,4</span>
                <span>Zayıf</span>
              </div>
              <div
                style={{
                  color:
                    result > 18.5 && result <= 24.9 ? '#00b209' : '#525252',
                }}
                className="d-flex result-flex"
              >
                <span>18,5 - 24,9</span>
                <span>Normal</span>
              </div>
              <div
                style={{
                  color: result > 25 && result <= 29.9 ? '#00b209' : '#525252',
                }}
                className="d-flex result-flex"
              >
                <span>25,0 - 29,9</span>
                <span>Fazla Kilolu</span>
              </div>
              <div
                style={{ color: result >= 30 ? '#00b209' : '#525252' }}
                className="d-flex result-flex"
              >
                <span>30,0 - 34,9</span>
                <span>Obezite</span>
              </div>
            </div>
          </div>
        </div>
        <div className="img">
          <img src={DefBackground.vkiBackground} />
        </div>
      </div>
    </section>
  );
};

export default VKI;
